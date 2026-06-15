import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { PDFDocument, rgb, StandardFonts } from 'npm:pdf-lib@1.17.1';
import fontkit from 'npm:@pdf-lib/fontkit@1.1.1';

async function buildAcceptedPdf(offer, verificationDetails) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  let regularFont, boldFont;
  try {
    const [regBytes, boldBytes] = await Promise.all([
      fetch('https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSans/hinted/ttf/NotoSans-Regular.ttf').then(r => r.arrayBuffer()),
      fetch('https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSans/hinted/ttf/NotoSans-Bold.ttf').then(r => r.arrayBuffer()),
    ]);
    regularFont = await pdfDoc.embedFont(regBytes);
    boldFont = await pdfDoc.embedFont(boldBytes);
  } catch {
    regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  }

  const darkBlue = rgb(0.055, 0.071, 0.208);
  const cyan = rgb(0, 0.6, 0.8);
  const white = rgb(1, 1, 1);
  const gray = rgb(0.4, 0.4, 0.47);
  const lightGray = rgb(0.96, 0.96, 0.98);
  const black = rgb(0.16, 0.16, 0.24);
  const green = rgb(0.1, 0.6, 0.3);

  // ---- PAGE 1: Offer Summary ----
  const page1 = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page1.getSize();
  const fmt = (n) => `€${Number(n).toFixed(2)}`;

  let y = height - 20;

  page1.drawRectangle({ x: 0, y: height - 60, width, height: 60, color: darkBlue });
  page1.drawText('CYBERVAULT', { x: 20, y: height - 38, size: 22, font: boldFont, color: white });

  const today = new Date().toLocaleDateString('el-GR');
  const ref = offer.reference_number || '';
  if (ref) {
    const refW = boldFont.widthOfTextAtSize(ref, 10);
    page1.drawText(ref, { x: width - 20 - refW, y: height - 30, size: 10, font: boldFont, color: cyan });
  }
  page1.drawText(`Ημ/νία: ${today}`, { x: width - 20 - regularFont.widthOfTextAtSize(`Ημ/νία: ${today}`, 8), y: height - 44, size: 8, font: regularFont, color: rgb(0.7, 0.7, 0.7) });

  y = height - 70;
  page1.drawRectangle({ x: 20, y: y - 22, width: width - 40, height: 22, color: green });
  page1.drawText('ΑΠΟΔΕΚΤΗ ΠΡΟΣΦΟΡΑ – ELECTRONIC ACCEPTANCE CONFIRMED', { x: 25, y: y - 15, size: 8, font: boldFont, color: white });
  y -= 30;

  const custBoxH = 70;
  page1.drawRectangle({ x: 20, y: y - custBoxH, width: width - 40, height: custBoxH, color: lightGray });
  page1.drawText('ΣΤΟΙΧΕΙΑ ΠΕΛΑΤΗ', { x: 23, y: y - 14, size: 7, font: boldFont, color: gray });

  const col1 = [];
  const col2 = [];
  if (offer.company_legal_name) col1.push(`Επωνυμία: ${offer.company_legal_name}`);
  if (offer.store_name) col1.push(`Κατάστημα: ${offer.store_name}`);
  if (offer.vat_number) col1.push(`ΑΦΜ: ${offer.vat_number}`);
  if (offer.address) col1.push(`Διεύθυνση: ${offer.address}`);
  if (offer.contact_person) col2.push(`Υπεύθυνος: ${offer.contact_person}`);
  if (offer.email) col2.push(`Email: ${offer.email}`);
  if (offer.phone) col2.push(`Τηλ: ${offer.phone}`);
  col1.forEach((line, i) => page1.drawText(line, { x: 23, y: y - 26 - i * 13, size: 9, font: regularFont, color: black }));
  col2.forEach((line, i) => page1.drawText(line, { x: width / 2, y: y - 26 - i * 13, size: 9, font: regularFont, color: black }));
  y -= custBoxH + 10;

  page1.drawRectangle({ x: 20, y: y - 18, width: width - 40, height: 18, color: darkBlue });
  page1.drawText('Περιγραφή', { x: 23, y: y - 13, size: 8, font: boldFont, color: white });
  page1.drawText('Ποσ.', { x: 300, y: y - 13, size: 8, font: boldFont, color: white });
  page1.drawText('Τιμή', { x: 370, y: y - 13, size: 8, font: boldFont, color: white });
  page1.drawText('Έκπτ.', { x: 430, y: y - 13, size: 8, font: boldFont, color: white });
  page1.drawText('Σύνολο', { x: width - 20 - boldFont.widthOfTextAtSize('Σύνολο', 8), y: y - 13, size: 8, font: boldFont, color: white });
  y -= 18;

  let lines = [];
  try { lines = JSON.parse(offer.items || '[]'); } catch {}
  lines.forEach((l, idx) => {
    const total = l.quantity * l.unit_price * (1 - l.discount_pct / 100);
    const rowColor = idx % 2 === 0 ? white : lightGray;
    page1.drawRectangle({ x: 20, y: y - 16, width: width - 40, height: 16, color: rowColor });
    page1.drawText((l.name || '').substring(0, 50), { x: 23, y: y - 11, size: 8.5, font: regularFont, color: black });
    page1.drawText(String(l.quantity), { x: 305, y: y - 11, size: 8.5, font: regularFont, color: black });
    page1.drawText(fmt(l.unit_price), { x: 365, y: y - 11, size: 8.5, font: regularFont, color: black });
    page1.drawText(l.discount_pct > 0 ? `${l.discount_pct}%` : '-', { x: 433, y: y - 11, size: 8.5, font: regularFont, color: black });
    const totStr = fmt(total);
    page1.drawText(totStr, { x: width - 20 - boldFont.widthOfTextAtSize(totStr, 8.5), y: y - 11, size: 8.5, font: boldFont, color: cyan });
    y -= 16;
  });
  y -= 20;

  const drawRow = (label, value, isBold, color) => {
    const f = isBold ? boldFont : regularFont;
    const c = color || gray;
    page1.drawText(label, { x: width - 180, y, size: 9, font: f, color: c });
    const valStr = fmt(value);
    page1.drawText(valStr, { x: width - 20 - f.widthOfTextAtSize(valStr, 9), y, size: 9, font: f, color: c });
    y -= 13;
  };
  drawRow('Σύνολο πριν έκπτωση:', offer.subtotal_before_discount || 0, false);
  if ((offer.total_discount || 0) > 0) drawRow('Έκπτωση:', -(offer.total_discount || 0), false, rgb(0.86, 0.24, 0.24));
  drawRow('Καθαρό ποσό:', offer.subtotal_after_discount || 0, false);
  drawRow(`ΦΠΑ ${offer.vat_rate || 24}%:`, offer.vat_amount || 0, false);
  y -= 8;
  page1.drawRectangle({ x: width - 170, y: y - 5, width: 150, height: 22, color: darkBlue });
  page1.drawText('ΣΥΝΟΛΟ:', { x: width - 162, y: y + 3, size: 10, font: boldFont, color: white });
  const finalStr = fmt(offer.final_total || 0);
  page1.drawText(finalStr, { x: width - 20 - boldFont.widthOfTextAtSize(finalStr, 10), y: y + 3, size: 10, font: boldFont, color: cyan });

  page1.drawRectangle({ x: 0, y: 0, width, height: 30, color: darkBlue });
  page1.drawText('Σελίδα 1/2 – Αναλυτική Προσφορά', { x: 20, y: 10, size: 7, font: regularFont, color: rgb(0.6, 0.6, 0.7) });

  // ---- PAGE 2: Electronic Acceptance Certificate ----
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  const p = page2;
  const w = 595.28;
  const h2 = 841.89;

  p.drawRectangle({ x: 0, y: 0, width: w, height: h2, color: white });

  p.drawRectangle({ x: 0, y: h2 - 80, width: w, height: 80, color: darkBlue });
  p.drawText('CYBERVAULT', { x: 30, y: h2 - 45, size: 26, font: boldFont, color: white });
  const certLabel = 'ELECTRONIC ACCEPTANCE CERTIFICATE';
  const certW = boldFont.widthOfTextAtSize(certLabel, 10);
  p.drawText(certLabel, { x: (w - certW) / 2, y: h2 - 65, size: 10, font: boldFont, color: cyan });

  p.drawRectangle({ x: 30, y: h2 - 120, width: w - 60, height: 30, color: green });
  const acceptedLabel = 'STATUS: ACCEPTED';
  const alW = boldFont.widthOfTextAtSize(acceptedLabel, 13);
  p.drawText(acceptedLabel, { x: (w - alW) / 2, y: h2 - 110, size: 13, font: boldFont, color: white });

  let cy = h2 - 170;
  const certBoxX = 50;
  const certBoxW = w - 100;
  const certBoxH = 420;
  p.drawRectangle({ x: certBoxX, y: cy - certBoxH, width: certBoxW, height: certBoxH, color: lightGray, borderColor: rgb(0.8, 0.8, 0.85), borderWidth: 1 });

  const drawCertRow = (label, value) => {
    p.drawText(label, { x: certBoxX + 20, y: cy, size: 9, font: boldFont, color: gray });
    p.drawText(value || '—', { x: certBoxX + 20, y: cy - 16, size: 11, font: boldFont, color: darkBlue });
    p.drawRectangle({ x: certBoxX + 15, y: cy - 26, width: certBoxW - 30, height: 0.5, color: rgb(0.85, 0.85, 0.9) });
    cy -= 46;
  };

  cy -= 10;
  drawCertRow('OFFER ID', offer.reference_number || offer.id);
  drawCertRow('AUDIT REFERENCE (Public Token)', offer.public_token || '—');
  drawCertRow('CUSTOMER', offer.company_legal_name || offer.store_name || '—');
  drawCertRow('EMAIL', verificationDetails.verified_email || offer.email || '—');
  drawCertRow('ACCEPTED AT', verificationDetails.verified_at ? new Date(verificationDetails.verified_at).toLocaleString('el-GR') : '—');
  drawCertRow('VERIFICATION METHOD', 'Direct Acceptance (Click-to-Accept)');
  drawCertRow('IP ADDRESS', verificationDetails.ip || '—');

  p.drawRectangle({ x: 0, y: 0, width: w, height: 60, color: darkBlue });
  const note = 'Αυτό το έγγραφο αποτελεί ηλεκτρονική απόδειξη αποδοχής μέσω direct click-to-accept.';
  const noteW = regularFont.widthOfTextAtSize(note, 8);
  p.drawText(note, { x: (w - noteW) / 2, y: 38, size: 8, font: regularFont, color: rgb(0.7, 0.7, 0.7) });
  p.drawText('Σελίδα 2/2 – Electronic Acceptance Certificate', { x: 20, y: 15, size: 7, font: regularFont, color: rgb(0.5, 0.5, 0.6) });
  const dateStr2 = `Generated: ${new Date().toISOString()}`;
  p.drawText(dateStr2, { x: w - 20 - regularFont.widthOfTextAtSize(dateStr2, 6), y: 15, size: 6, font: regularFont, color: rgb(0.5, 0.5, 0.6) });

  const pdfBytes = await pdfDoc.save();
  const CHUNK = 8192;
  let binary = '';
  for (let i = 0; i < pdfBytes.length; i += CHUNK) {
    binary += String.fromCharCode(...pdfBytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const body = await req.json();
  const { offer_id } = body;
  if (!offer_id) return Response.json({ error: 'Missing offer_id' }, { status: 400 });

  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const now = new Date().toISOString();

  const offers = await base44.asServiceRole.entities.ResellerOffer.filter({ id: offer_id });
  if (!offers || offers.length === 0) return Response.json({ error: 'Offer not found' }, { status: 404 });

  const offer = offers[0];

  if (['accepted', 'rejected', 'expired'].includes(offer.status)) {
    return Response.json({ error: 'Η προσφορά δεν μπορεί να τροποποιηθεί.' }, { status: 400 });
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

  // Generate accepted PDF
  let acceptedPdfBase64 = null;
  try {
    acceptedPdfBase64 = await buildAcceptedPdf(offer, verificationDetails);
    auditLog.push({ action: 'pdf_generated', timestamp: new Date().toISOString(), actor: 'system', details: {} });
  } catch (e) {
    console.error('PDF generation error:', e.message);
  }

  // Upload PDF to storage
  let acceptedPdfUrl = null;
  if (acceptedPdfBase64) {
    try {
      const pdfBlob = new Blob([Uint8Array.from(atob(acceptedPdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
      const uploadRes = await base44.asServiceRole.integrations.Core.UploadFile({ file: pdfBlob });
      acceptedPdfUrl = uploadRes?.file_url || null;
    } catch (e) {
      console.error('PDF upload error:', e.message);
    }
  }

  // Update offer
  const updateData = {
    status: 'accepted',
    accepted_at: now,
    verification_details: JSON.stringify(verificationDetails),
    audit_log: JSON.stringify(auditLog),
  };
  if (acceptedPdfUrl) updateData.accepted_pdf_url = acceptedPdfUrl;

  await base44.asServiceRole.entities.ResellerOffer.update(offer_id, updateData);

  // Send confirmation emails
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  const settingsList = await base44.asServiceRole.entities.ResellerSettings.list();
  const settings = settingsList[0] || {};

  const buildConfirmHtml = (isAdmin) => {
    const heading = isAdmin
      ? `Η προσφορά <strong>${offer.reference_number}</strong> έγινε αποδεκτή από τον πελάτη.`
      : `Η αποδοχή σας καταγράφηκε με επιτυχία για την προσφορά <strong>${offer.reference_number}</strong>.`;
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
      <tr><td style="color:#888;padding:4px 0;">Ημ/νία Αποδοχής:</td><td>${new Date(now).toLocaleString('el-GR')}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">IP:</td><td style="font-family:monospace;">${ip}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Μέθοδος:</td><td>Direct Acceptance</td></tr>
    </table>
    ${acceptedPdfUrl ? `<div style="margin-top:20px;"><a href="${acceptedPdfUrl}" style="display:inline-block;background:#0E1235;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;">📄 Λήψη PDF Αποδοχής</a></div>` : ''}
  </div>
</body></html>`;
  };

  const emailsToSend = [];
  if (offer.email) emailsToSend.push({ to: offer.email, subject: `Επιβεβαίωση Αποδοχής – ${offer.reference_number}`, html: buildConfirmHtml(false) });
  if (settings.public_email) emailsToSend.push({ to: settings.public_email, subject: `[CyberVault] Αποδοχή Προσφοράς – ${offer.reference_number}`, html: buildConfirmHtml(true) });

  const attachments = acceptedPdfBase64 ? [{ filename: `Accepted-${offer.reference_number}.pdf`, content: acceptedPdfBase64 }] : [];

  await Promise.allSettled(emailsToSend.map(e =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'CyberVault <offers@cybervault.gr>', to: [e.to], subject: e.subject, html: e.html, attachments }),
    })
  ));

  return Response.json({ success: true, message: 'Η αποδοχή ολοκληρώθηκε επιτυχώς.' });
});