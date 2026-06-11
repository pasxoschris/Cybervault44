import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const body = await req.json();
  const { offer_id } = body;
  if (!offer_id) return Response.json({ error: 'Missing offer_id' }, { status: 400 });

  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const now = new Date();

  const offers = await base44.asServiceRole.entities.ResellerOffer.filter({ id: offer_id });
  if (!offers || offers.length === 0) return Response.json({ error: 'Offer not found' }, { status: 404 });

  const offer = offers[0];

  // Guard: final states
  if (['accepted', 'rejected', 'expired'].includes(offer.status)) {
    return Response.json({ error: 'Η προσφορά δεν μπορεί να τροποποιηθεί.' }, { status: 400 });
  }

  // Check expiry
  if (offer.expires_at && new Date(offer.expires_at) < now) {
    await base44.asServiceRole.entities.ResellerOffer.update(offer_id, { status: 'expired' });
    return Response.json({ error: 'Η προσφορά έχει λήξει.' }, { status: 400 });
  }

  // Resend cooldown: 60 seconds
  if (offer.otp_last_sent_at) {
    const secondsSinceLast = (now.getTime() - new Date(offer.otp_last_sent_at).getTime()) / 1000;
    if (secondsSinceLast < 60) {
      const waitSeconds = Math.ceil(60 - secondsSinceLast);
      return Response.json({ error: `Παρακαλώ περιμένετε ${waitSeconds} δευτερόλεπτα πριν την επαναποστολή.` }, { status: 429 });
    }
  }

  // Generate 6-digit OTP
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const otpHash = await sha256(otp);
  const otpExpiresAt = new Date(now.getTime() + 15 * 60 * 1000).toISOString();

  // Parse audit log
  let auditLog = [];
  try { auditLog = JSON.parse(offer.audit_log || '[]'); } catch {}
  auditLog.push({
    action: 'otp_requested',
    timestamp: now.toISOString(),
    actor: 'customer',
    details: { ip, user_agent: userAgent }
  });

  // Save hash (never plain text)
  await base44.asServiceRole.entities.ResellerOffer.update(offer_id, {
    otp_hash: otpHash,
    otp_expires_at: otpExpiresAt,
    otp_attempts: 0,
    otp_last_sent_at: now.toISOString(),
    audit_log: JSON.stringify(auditLog),
  });

  // Send OTP email via Resend
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  const recipientEmail = offer.email;
  if (!recipientEmail) return Response.json({ error: 'Δεν υπάρχει email πελάτη στην προσφορά.' }, { status: 400 });

  const htmlBody = `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;color:#333;max-width:500px;margin:0 auto;padding:20px;">
  <div style="background:#0E1235;padding:20px 30px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;font-size:20px;color:#fff;"><span style="color:#fff;">CYBER</span><span style="color:#00cfff;">VAULT</span></h1>
  </div>
  <div style="background:#f9f9f9;padding:24px 30px;border:1px solid #eee;border-radius:0 0 8px 8px;">
    <h2 style="margin:0 0 8px;font-size:16px;color:#333;">Κωδικός Αποδοχής Προσφοράς</h2>
    <p style="color:#555;margin:0 0 20px;font-size:14px;">Προσφορά: <strong>${offer.reference_number || offer_id}</strong></p>
    <div style="background:#0E1235;border-radius:12px;padding:20px;text-align:center;margin-bottom:20px;">
      <div style="font-size:36px;font-family:monospace;letter-spacing:12px;color:#00cfff;font-weight:bold;">${otp}</div>
    </div>
    <p style="color:#888;font-size:12px;margin:0;">Ο κωδικός ισχύει για <strong>15 λεπτά</strong>. Μην τον κοινοποιείτε σε κανέναν.</p>
  </div>
</body></html>`;

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'CyberVault <offers@cybervault.gr>',
      to: [recipientEmail],
      subject: `Κωδικός OTP – Προσφορά ${offer.reference_number || ''}`,
      html: htmlBody,
    }),
  });

  if (!resendRes.ok) {
    const err = await resendRes.json();
    return Response.json({ error: err.message || 'Σφάλμα αποστολής email.' }, { status: 500 });
  }

  return Response.json({ success: true, message: `Ο κωδικός στάλθηκε στο ${recipientEmail}. Ισχύει για 15 λεπτά.` });
});