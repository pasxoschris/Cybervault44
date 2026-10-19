// Κοινή λογική για την προσφορά πελάτη: καταγραφή προβολής, αποδοχή και απόρριψη.
// Τη χρησιμοποιούν οι συναρτήσεις της εφαρμογής (logOfferView, acceptOffer,
// rejectOffer) και η δημόσια σελίδα προσφοράς (publicOffer), ώστε η συμπεριφορά
// και τα έγγραφα να είναι παντού τα ίδια.
import { PDFDocument, rgb, StandardFonts } from 'npm:pdf-lib@1.17.1';
import fontkit from 'npm:@pdf-lib/fontkit@1.1.1';
import { sendAcceptedNotifications, formatAthensDate, formatAthensDateTime } from './offerNotifications.ts';

const FINAL_STATUSES = ['accepted', 'rejected', 'expired'];

/** Βρίσκει προσφορά με το εσωτερικό της id. */
export async function findOffer(base44, offerId) {
  const offers = await base44.asServiceRole.entities.ResellerOffer.filter({ id: offerId });
  return offers && offers.length > 0 ? offers[0] : null;
}

/** Βρίσκει προσφορά με το τυχαίο δημόσιο token της (crypto.randomUUID). */
export async function findOfferByToken(base44, token) {
  if (!token) return null;
  const offers = await base44.asServiceRole.entities.ResellerOffer.filter({ public_token: token });
  return offers && offers.length > 0 ? offers[0] : null;
}

export async function logOfferViewCore(base44, offerId, meta) {
  const ip = meta.ip || 'unknown';
  const userAgent = meta.userAgent || 'unknown';
  const now = new Date().toISOString();

  const offer = await findOffer(base44, offerId);
  if (!offer) return { ok: false, status: 404, error: 'Offer not found' };

  if (FINAL_STATUSES.includes(offer.status)) {
    return { ok: true, skipped: true, offer };
  }

  let auditLog = [];
  try { auditLog = JSON.parse(offer.audit_log || '[]'); } catch {}

  const alreadyViewed = auditLog.some(e => e.action === 'viewed');
  const updates = {};

  auditLog.push({
    action: 'viewed',
    timestamp: now,
    actor: 'customer',
    details: { ip, user_agent: userAgent }
  });

  if (!alreadyViewed) {
    updates.status = 'viewed';
    updates.viewed_at = now;
  }

  updates.audit_log = JSON.stringify(auditLog);

  await base44.asServiceRole.entities.ResellerOffer.update(offerId, updates);

  return { ok: true, skipped: false, offer: { ...offer, ...updates } };
}

/** Οριστική αποδοχή της προσφοράς από τον πελάτη: σφραγίδα χρόνου, ειδοποιήσεις. */
export async function acceptOfferCore(base44, offerId, meta) {
  const ip = meta.ip || 'unknown';
  const userAgent = meta.userAgent || 'unknown';
  const now = new Date().toISOString();

  const offer = await findOffer(base44, offerId);
  if (!offer) return { ok: false, status: 404, error: 'Offer not found' };
  if (FINAL_STATUSES.includes(offer.status)) {
    return { ok: false, status: 400, error: 'Η προσφορά δεν μπορεί να τροποποιηθεί.' };
  }

  const verificationDetails = {
    method: 'direct_click',
    verified_email: offer.email,
    verified_at: now,
    ip,
    user_agent: userAgent,
  };

  let auditLog = [];
  try { auditLog = JSON.parse(offer.audit_log || '[]'); } catch {}
  auditLog.push({ action: 'accepted', timestamp: now, actor: 'customer', details: { ip, user_agent: userAgent, method: 'direct_click' } });

  const updateData = {
    status: 'accepted',
    accepted_at: now,
    verification_details: JSON.stringify(verificationDetails),
    audit_log: JSON.stringify(auditLog),
  };

  await base44.asServiceRole.entities.ResellerOffer.update(offerId, updateData);

  // Send confirmation email to the customer
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

  const buildConfirmHtml = () => {
    const heading = `Η αποδοχή σας καταγράφηκε με επιτυχία για την προσφορά <strong>${offer.reference_number}</strong>.`;
    return `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:#0E1235;padding:20px 30px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;font-size:20px;color:#fff;"><span>CYBER</span><span style="color:#00cfff;">VAULT</span></h1>
  </div>
  <div style="background:#f9f9f9;padding:24px 30px;border:1px solid #eee;border-radius:0 0 8px 8px;">
    <div style="display:inline-block;background:#e8f5e9;color:#2e7d32;padding:8px 18px;border-radius:20px;font-weight:bold;font-size:13px;margin-bottom:16px;">✓ ΑΠΟΔΕΚΤΗ</div>
    <p style="font-size:14px;">${heading}</p>
    <table style="width:100%;font-size:13px;margin-top:12px;">
      <tr><td style="color:#888;padding:4px 0;">Αρ. Αναφοράς:</td><td><strong>${offer.reference_number || '—'}</strong></td></tr>
      <tr><td style="color:#888;padding:4px 0;">Πελάτης:</td><td>${offer.company_legal_name || offer.store_name || '—'}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Email:</td><td>${offer.email || '—'}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Ημ/νία Αποδοχής:</td><td>${formatAthensDateTime(now)}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">IP:</td><td style="font-family:monospace;">${ip}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Μέθοδος:</td><td>Direct Acceptance</td></tr>
    </table>
  </div>
</body></html>`;
  };

  const emailsToSend = [];
  if (offer.email) emailsToSend.push({ to: offer.email, subject: `Επιβεβαίωση Αποδοχής – ${offer.reference_number}`, html: buildConfirmHtml() });

  await Promise.allSettled(emailsToSend.map(e =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'CyberVault <offers@cybervault.gr>', to: [e.to], subject: e.subject, html: e.html }),
    })
  ));

  // Ειδοποίηση αποδοχής στις σταθερές διευθύνσεις του γραφείου
  await sendAcceptedNotifications({
    offer,
    acceptedAt: now,
    ip,
    method: 'Direct Acceptance (Click-to-Accept)',
    apiKey: RESEND_API_KEY,
  });

  return { ok: true, offer: { ...offer, ...updateData } };
}

/** Απόρριψη της προσφοράς από τον πελάτη. */
export async function rejectOfferCore(base44, offerId, meta) {
  const ip = meta.ip || 'unknown';
  const userAgent = meta.userAgent || 'unknown';
  const now = new Date().toISOString();

  const offer = await findOffer(base44, offerId);
  if (!offer) return { ok: false, status: 404, error: 'Offer not found' };
  if (FINAL_STATUSES.includes(offer.status)) {
    return { ok: false, status: 400, error: 'Η προσφορά δεν μπορεί να τροποποιηθεί.' };
  }

  let auditLog = [];
  try { auditLog = JSON.parse(offer.audit_log || '[]'); } catch {}
  auditLog.push({
    action: 'rejected',
    timestamp: now,
    actor: 'customer',
    details: { ip, user_agent: userAgent }
  });

  const updateData = {
    status: 'rejected',
    rejected_at: now,
    audit_log: JSON.stringify(auditLog),
  };

  await base44.asServiceRole.entities.ResellerOffer.update(offerId, updateData);

  return { ok: true, offer: { ...offer, ...updateData } };
}