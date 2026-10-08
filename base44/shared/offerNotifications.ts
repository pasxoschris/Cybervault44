// Κοινή ειδοποίηση αποδοχής προσφοράς.
// Χρησιμοποιείται από τις συναρτήσεις που καταγράφουν αποδοχή από τον πελάτη
// (acceptOffer, verifyOfferOtp) ώστε να στέλνεται πάντα η ίδια ειδοποίηση
// στις σταθερές διευθύνσεις του γραφείου.

export const ACCEPTED_NOTIFICATION_EMAILS = [
  'pasxoschris@cybervault.gr',
  'info@cybervault.gr',
];

const CONSOLE_URL = 'https://cybervault.gr/reseller-console';

// Ο server τρέχει σε UTC — οι ημερομηνίες εμφανίζονται πάντα σε ώρα Ελλάδας.
export function formatAthensDateTime(value) {
  return value ? new Date(value).toLocaleString('el-GR', { timeZone: 'Europe/Athens' }) : '—';
}

export function formatAthensDate(value) {
  return value ? new Date(value).toLocaleDateString('el-GR', { timeZone: 'Europe/Athens' }) : '—';
}

export function buildAcceptedNotificationHtml(offer, { acceptedAt, ip, method, pdfUrl }) {
  return `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:#0E1235;padding:20px 30px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;font-size:20px;color:#fff;"><span>CYBER</span><span style="color:#00cfff;">VAULT</span></h1>
  </div>
  <div style="background:#f9f9f9;padding:24px 30px;border:1px solid #eee;border-radius:0 0 8px 8px;">
    <div style="display:inline-block;background:#e8f5e9;color:#2e7d32;padding:8px 18px;border-radius:20px;font-weight:bold;font-size:13px;margin-bottom:16px;">✓ ΑΠΟΔΕΚΤΗ</div>
    <p style="font-size:14px;">Η προσφορά <strong>${offer.reference_number || ''}</strong> έγινε αποδεκτή από τον πελάτη.</p>
    <table style="width:100%;font-size:13px;margin-top:12px;">
      <tr><td style="color:#888;padding:4px 0;">Αρ. Αναφοράς:</td><td><strong>${offer.reference_number || '—'}</strong></td></tr>
      <tr><td style="color:#888;padding:4px 0;">Πελάτης:</td><td>${offer.company_legal_name || offer.store_name || '—'}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Email:</td><td>${offer.email || '—'}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Ημ/νία Αποδοχής:</td><td>${formatAthensDateTime(acceptedAt)}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">IP:</td><td style="font-family:monospace;">${ip || '—'}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Μέθοδος:</td><td>${method || '—'}</td></tr>
    </table>
    <div style="margin-top:20px;">
      <a href="${CONSOLE_URL}" style="display:inline-block;background:#0E1235;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;">Άνοιγμα Reseller Console</a>
    </div>
    ${pdfUrl ? `<div style="margin-top:10px;"><a href="${pdfUrl}" style="display:inline-block;background:#0E1235;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;">📄 Λήψη PDF Αποδοχής</a></div>` : ''}
  </div>
</body></html>`;
}

export async function sendAcceptedNotifications({ offer, acceptedAt, ip, method, pdfUrl, apiKey }) {
  if (!apiKey) {
    console.error('Accepted offer notification skipped: RESEND_API_KEY missing');
    return;
  }
  const html = buildAcceptedNotificationHtml(offer, { acceptedAt, ip, method, pdfUrl });
  const subject = `[CyberVault] Αποδοχή Προσφοράς – ${offer.reference_number || ''}`;

  const results = await Promise.allSettled(ACCEPTED_NOTIFICATION_EMAILS.map(async (to) => {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'CyberVault <offers@cybervault.gr>', to: [to], subject, html }),
    });
    if (!res.ok) throw new Error(`${to}: ${res.status} ${await res.text()}`);
    return to;
  }));

  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.error(`Accepted offer notification failed for ${ACCEPTED_NOTIFICATION_EMAILS[i]}:`, result.reason?.message);
    }
  });
}