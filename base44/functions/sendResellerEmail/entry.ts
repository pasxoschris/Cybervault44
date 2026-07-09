import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { PDFDocument, rgb, StandardFonts } from 'npm:pdf-lib@1.17.1';
import fontkit from 'npm:@pdf-lib/fontkit@1.1.1';

// Helper: generate PDF bytes from offer data
async function buildOfferPdf(offer, customer, lines, totals, settings) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Fetch Noto Sans from CDN for Greek support
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

  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const fmt = (n) => `€${Number(n).toFixed(2)}`;

  const darkBlue = rgb(0.055, 0.071, 0.208);
  const cyan = rgb(0, 0.6, 0.8);
  const white = rgb(1, 1, 1);
  const gray = rgb(0.4, 0.4, 0.47);
  const lightGray = rgb(0.96, 0.96, 0.98);
  const black = rgb(0.16, 0.16, 0.24);

  let y = height - 20;

  // Header background
  page.drawRectangle({ x: 0, y: height - 60, width, height: 60, color: darkBlue });

  // CYBERVAULT title
  page.drawText('CYBERVAULT', { x: 20, y: height - 38, size: 22, font: boldFont, color: white });
  if (settings?.company_name) {
    page.drawText(settings.company_name, { x: 20, y: height - 54, size: 9, font: regularFont, color: rgb(0.7, 0.7, 0.7) });
  }

  // Reference top-right
  const ref = offer?.reference_number || '';
  const today = new Date().toLocaleDateString('el-GR');
  const validityDays = settings?.offer_validity_days || 30;
  const expiresDate = offer?.expires_at
    ? new Date(offer.expires_at).toLocaleDateString('el-GR')
    : new Date(Date.now() + validityDays * 86400000).toLocaleDateString('el-GR');

  if (ref) {
    const refW = boldFont.widthOfTextAtSize(ref, 10);
    page.drawText(ref, { x: width - 20 - refW, y: height - 30, size: 10, font: boldFont, color: cyan });
  }
  const dateStr = `Ημ/νία: ${today}`;
  page.drawText(dateStr, { x: width - 20 - regularFont.widthOfTextAtSize(dateStr, 8), y: height - 44, size: 8, font: regularFont, color: rgb(0.7, 0.7, 0.7) });
  const expStr = `Ισχύς έως: ${expiresDate}`;
  page.drawText(expStr, { x: width - 20 - regularFont.widthOfTextAtSize(expStr, 8), y: height - 55, size: 8, font: regularFont, color: rgb(0.7, 0.7, 0.7) });

  y = height - 75;

  // Customer box
  const custBoxH = 70;
  page.drawRectangle({ x: 20, y: y - custBoxH, width: width - 40, height: custBoxH, color: lightGray });
  page.drawText('ΣΤΟΙΧΕΙΑ ΠΕΛΑΤΗ', { x: 23, y: y - 14, size: 7, font: boldFont, color: gray });

  const cust = customer || {};
  const col1 = [];
  const col2 = [];
  if (cust.company_legal_name) col1.push(`Επωνυμία: ${cust.company_legal_name}`);
  if (cust.store_name) col1.push(`Κατάστημα: ${cust.store_name}`);
  if (cust.vat_number) col1.push(`ΑΦΜ: ${cust.vat_number}`);
  if (cust.address) col1.push(`Διεύθυνση: ${cust.address}`);
  if (cust.contact_person) col2.push(`Υπεύθυνος: ${cust.contact_person}`);
  if (cust.email) col2.push(`Email: ${cust.email}`);
  if (cust.phone) col2.push(`Τηλ: ${cust.phone}`);

  col1.forEach((line, i) => page.drawText(line, { x: 23, y: y - 26 - i * 13, size: 9, font: regularFont, color: black }));
  col2.forEach((line, i) => page.drawText(line, { x: width / 2, y: y - 26 - i * 13, size: 9, font: regularFont, color: black }));

  y -= custBoxH + 10;

  // Table header
  page.drawRectangle({ x: 20, y: y - 18, width: width - 40, height: 18, color: darkBlue });
  page.drawText('Περιγραφή', { x: 23, y: y - 13, size: 8, font: boldFont, color: white });
  page.drawText('Ποσ.', { x: 300, y: y - 13, size: 8, font: boldFont, color: white });
  page.drawText('Τιμή', { x: 370, y: y - 13, size: 8, font: boldFont, color: white });
  page.drawText('Έκπτ.', { x: 430, y: y - 13, size: 8, font: boldFont, color: white });
  page.drawText('Σύνολο', { x: width - 20 - boldFont.widthOfTextAtSize('Σύνολο', 8), y: y - 13, size: 8, font: boldFont, color: white });
  y -= 18;

  // Table rows
  (lines || []).forEach((l, idx) => {
    const sub = l.quantity * l.unit_price;
    const total = sub * (1 - l.discount_pct / 100);
    const rowColor = idx % 2 === 0 ? white : lightGray;
    page.drawRectangle({ x: 20, y: y - 16, width: width - 40, height: 16, color: rowColor });
    const name = (l.name || '').substring(0, 50);
    page.drawText(name, { x: 23, y: y - 11, size: 8.5, font: regularFont, color: black });
    page.drawText(String(l.quantity), { x: 305, y: y - 11, size: 8.5, font: regularFont, color: black });
    page.drawText(fmt(l.unit_price), { x: 365, y: y - 11, size: 8.5, font: regularFont, color: black });
    page.drawText(l.discount_pct > 0 ? `${l.discount_pct}%` : '-', { x: 433, y: y - 11, size: 8.5, font: regularFont, color: black });
    const totStr = fmt(total);
    page.drawText(totStr, { x: width - 20 - boldFont.widthOfTextAtSize(totStr, 8.5), y: y - 11, size: 8.5, font: boldFont, color: cyan });
    y -= 16;
  });

  y -= 20;

  // Totals
  const t = totals || {};
  const drawTotalRow = (label, value, isBold, color) => {
    const f = isBold ? boldFont : regularFont;
    const c = color || gray;
    page.drawText(label, { x: width - 180, y, size: 9, font: f, color: c });
    const valStr = fmt(value);
    page.drawText(valStr, { x: width - 20 - f.widthOfTextAtSize(valStr, 9), y, size: 9, font: f, color: c });
    y -= 13;
  };

  drawTotalRow('Σύνολο πριν έκπτωση:', t.subtotalBefore || 0, false);
  if ((t.totalDiscount || 0) > 0) drawTotalRow('Έκπτωση:', -(t.totalDiscount || 0), false, rgb(0.86, 0.24, 0.24));
  drawTotalRow('Καθαρό ποσό:', t.subtotalAfter || 0, false);
  drawTotalRow(`ΦΠΑ ${t.vatRate || 24}%:`, t.vatAmount || 0, false);

  // Final total box — draw AFTER all rows, with extra gap
  y -= 8;
  page.drawRectangle({ x: width - 170, y: y - 5, width: 150, height: 22, color: darkBlue });
  page.drawText('ΣΥΝΟΛΟ:', { x: width - 162, y: y + 3, size: 10, font: boldFont, color: white });
  const finalStr = fmt(t.finalTotal || 0);
  page.drawText(finalStr, { x: width - 20 - boldFont.widthOfTextAtSize(finalStr, 10), y: y + 3, size: 10, font: boldFont, color: cyan });
  y -= 30;

  // Terms
  if (settings?.default_terms && y > 80) {
    page.drawText('ΟΡΟΙ & ΠΡΟΫΠΟΘΕΣΕΙΣ', { x: 20, y, size: 7, font: boldFont, color: gray });
    y -= 12;
    const words = settings.default_terms.split(' ');
    let line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (regularFont.widthOfTextAtSize(test, 7) > width - 40) {
        if (y < 60) break;
        page.drawText(line, { x: 20, y, size: 7, font: regularFont, color: gray });
        y -= 10;
        line = word;
      } else {
        line = test;
      }
    }
    if (line && y > 60) page.drawText(line, { x: 20, y, size: 7, font: regularFont, color: gray });
  }

  // Footer
  page.drawRectangle({ x: 0, y: 0, width, height: 30, color: darkBlue });
  const footerParts = [];
  if (settings?.public_phone) footerParts.push(`Τηλ: ${settings.public_phone}`);
  if (settings?.public_email) footerParts.push(settings.public_email);
  if (footerParts.length > 0) {
    const footerStr = footerParts.join('   |   ');
    const fw = regularFont.widthOfTextAtSize(footerStr, 7.5);
    page.drawText(footerStr, { x: (width - fw) / 2, y: 10, size: 7.5, font: regularFont, color: rgb(0.59, 0.59, 0.67) });
  }

  const pdfBytes = await pdfDoc.save();
  // Convert Uint8Array to base64 safely (chunked to avoid stack overflow)
  const CHUNK = 8192;
  let binary = '';
  for (let i = 0; i < pdfBytes.length; i += CHUNK) {
    binary += String.fromCharCode(...pdfBytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

// Build HTML email body from stored offer data (ensures totals are always correct)
function buildHtmlBody(offer, lines, totals, settings, origin) {
  const intro = settings?.default_email_body
    ? settings.default_email_body.replace(/\n/g, '<br>')
    : `Αγαπητέ/ή ${offer?.contact_person || ''},<br><br>Σας αποστέλλουμε την προσφορά μας για το σύστημα Spotlight POS.`;

  const fmt = (n) => Number(n).toFixed(2);
  const ref = offer?.reference_number || '';
  const expires = offer?.expires_at ? new Date(offer.expires_at).toLocaleDateString('el-GR') : '';

  const itemRows = (lines || []).map(l => {
    const sub = l.quantity * l.unit_price;
    const total = sub * (1 - l.discount_pct / 100);
    return `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">
          <strong>${l.name || ''}</strong>${l.description ? `<br><span style="color:#888;font-size:12px;">${l.description}</span>` : ''}
        </td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${l.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">€${fmt(l.unit_price)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${l.discount_pct > 0 ? l.discount_pct + '%' : '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;color:#0099cc;">€${fmt(total)}</td>
      </tr>`;
  }).join('');

  const t = totals || {};
  const totalsHtml = `
    <tr><td colspan="4" style="padding:6px 12px;text-align:right;color:#666;">Σύνολο πριν έκπτωση</td><td style="padding:6px 12px;text-align:right;font-family:monospace;">€${fmt(t.subtotalBefore||0)}</td></tr>
    ${(t.totalDiscount||0) > 0 ? `<tr><td colspan="4" style="padding:6px 12px;text-align:right;color:#e55;">Έκπτωση</td><td style="padding:6px 12px;text-align:right;font-family:monospace;color:#e55;">-€${fmt(t.totalDiscount||0)}</td></tr>` : ''}
    <tr><td colspan="4" style="padding:6px 12px;text-align:right;color:#666;">Καθαρό ποσό</td><td style="padding:6px 12px;text-align:right;font-family:monospace;">€${fmt(t.subtotalAfter||0)}</td></tr>
    <tr><td colspan="4" style="padding:6px 12px;text-align:right;color:#666;">ΦΠΑ ${t.vatRate||24}%</td><td style="padding:6px 12px;text-align:right;font-family:monospace;">€${fmt(t.vatAmount||0)}</td></tr>
    <tr style="background:#0E1235;"><td colspan="4" style="padding:10px 12px;text-align:right;color:#fff;font-weight:bold;">ΣΥΝΟΛΟ</td><td style="padding:10px 12px;text-align:right;font-family:monospace;font-weight:bold;color:#00cfff;font-size:16px;">€${fmt(t.finalTotal||0)}</td></tr>`;

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#333;max-width:700px;margin:0 auto;padding:20px;">
    <div style="background:#0E1235;padding:20px 30px;border-radius:8px 8px 0 0;">
      <h1 style="margin:0;font-size:22px;color:#fff;"><span style="color:#fff;">CYBER</span><span style="color:#0099cc;">VAULT</span></h1>
      ${settings?.company_name ? `<p style="margin:4px 0 0;color:#aaa;font-size:13px;">${settings.company_name}</p>` : ''}
    </div>
    <div style="background:#f9f9f9;padding:20px 30px;border:1px solid #eee;">
      <p style="margin:0 0 16px;">${intro}</p>
      ${ref ? `<p style="margin:4px 0;"><strong>Αριθμός Προσφοράς:</strong> <span style="color:#0099cc;font-family:monospace;">${ref}</span></p>` : ''}
      ${expires ? `<p style="margin:4px 0;"><strong>Ισχύς έως:</strong> ${expires}</p>` : ''}
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:0;">
      <thead>
        <tr style="background:#0E1235;color:#fff;">
          <th style="padding:10px 12px;text-align:left;font-size:12px;">Περιγραφή</th>
          <th style="padding:10px 12px;text-align:center;font-size:12px;">Ποσότητα</th>
          <th style="padding:10px 12px;text-align:right;font-size:12px;">Τιμή Μον.</th>
          <th style="padding:10px 12px;text-align:center;font-size:12px;">Έκπτωση</th>
          <th style="padding:10px 12px;text-align:right;font-size:12px;">Σύνολο</th>
        </tr>
      </thead>
      <tbody>${itemRows}${totalsHtml}</tbody>
    </table>
    ${offer?.public_token ? `
    <div style="margin-top:24px;padding:24px;background:#f0f9ff;border:2px solid #0099cc;border-radius:8px;text-align:center;">
      <p style="margin:0 0 8px;font-size:15px;color:#0E1235;font-weight:bold;">Αποδοχή ή Απόρριψη Προσφοράς</p>
      <p style="margin:0 0 16px;font-size:13px;color:#666;">Κάντε κλικ στον παρακάτω σύνδεσμο για να δείτε και να αποδεχτείτε ηλεκτρονικά την προσφορά:</p>
      <a href="${origin}/offers/${offer.public_token}" style="display:inline-block;background:#0099cc;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;">Προβολή &amp; Αποδοχή Προσφοράς</a>
    </div>` : ''}
    ${settings?.default_terms ? `<div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:6px;font-size:11px;color:#888;"><strong>Όροι & Προϋποθέσεις</strong><br>${settings.default_terms.replace(/\n/g, '<br>')}</div>` : ''}
    <div style="margin-top:20px;padding:16px;border-top:2px solid #0099cc;font-size:12px;color:#888;">
      ${settings?.public_phone ? `Τηλ: ${settings.public_phone} &nbsp;|&nbsp; ` : ''}
      ${settings?.public_email ? `Email: ${settings.public_email}` : ''}
    </div>
  </body></html>`;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { to, cc, subject, offer_id } = body;

    if (!to || !subject) {
      return Response.json({ error: 'Missing required fields: to, subject' }, { status: 400 });
    }

    if (!offer_id) {
      return Response.json({ error: 'Missing offer_id' }, { status: 400 });
    }

    // ─── Fetch offer from DB (source of truth, same as acceptOffer) ───
    const offers = await base44.asServiceRole.entities.ResellerOffer.filter({ id: offer_id });
    if (!offers || offers.length === 0) {
      return Response.json({ error: 'Offer not found' }, { status: 404 });
    }
    const offer = offers[0];

    // ─── Fetch settings from DB ───
    const settingsList = await base44.asServiceRole.entities.ResellerSettings.list();
    const settings = settingsList[0] || {};

    // ─── Parse items from stored offer ───
    let lines = [];
    try { lines = JSON.parse(offer.items || '[]'); } catch {}

    // ─── Use stored financial fields (always correct) ───
    const totals = {
      subtotalBefore: offer.subtotal_before_discount || 0,
      subtotalAfter: offer.subtotal_after_discount || 0,
      totalDiscount: offer.total_discount || 0,
      vatRate: offer.vat_rate || settings.default_vat_rate || 24,
      vatAmount: offer.vat_amount || 0,
      finalTotal: offer.final_total || 0,
    };

    const customer = {
      company_legal_name: offer.company_legal_name,
      store_name: offer.store_name,
      vat_number: offer.vat_number,
      address: offer.address,
      contact_person: offer.contact_person,
      email: offer.email,
      phone: offer.phone,
    };

    // ─── Build HTML body on backend (uses stored totals) ───
    let origin = req.headers.get('origin');
    if (!origin) {
      const referer = req.headers.get('referer');
      if (referer) {
        try { origin = new URL(referer).origin; } catch {}
      }
    }
    origin = origin || 'https://app.base44.com';
    const htmlBody = buildHtmlBody(offer, lines, totals, settings, origin);

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    // ─── Build PDF on backend ───
    let pdfBase64 = null;
    let pdfFilename = null;
    try {
      pdfBase64 = await buildOfferPdf(offer, customer, lines, totals, settings);
      pdfFilename = offer?.reference_number ? `Προσφορά-${offer.reference_number}.pdf` : 'Προσφορά.pdf';
    } catch (e) {
      console.error('PDF build error:', e.message);
    }

    const sendViaResend = async (recipient) => {
      const payload = {
        from: 'CyberVault <offers@cybervault.gr>',
        to: [recipient],
        subject,
        html: htmlBody,
      };
      if (pdfBase64 && pdfFilename) {
        payload.attachments = [{ filename: pdfFilename, content: pdfBase64 }];
      }
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const resBody = await res.json();
      console.log('Resend response status:', res.status, 'body:', JSON.stringify(resBody));
      if (!res.ok) {
        throw new Error(resBody.message || 'Resend error');
      }
      return resBody;
    };

    const sendResult = await sendViaResend(to);
    if (cc) await sendViaResend(cc);

    // Update offer status and log
    const now = new Date().toISOString();
    let history = [];
    try { history = JSON.parse(offer.email_history || '[]'); } catch {}
    history.push({ sent_at: now, to, cc: cc || null, subject });
    await base44.asServiceRole.entities.ResellerOffer.update(offer_id, {
      status: 'sent',
      last_sent_at: now,
      last_sent_to: to,
      email_history: JSON.stringify(history),
    });

    return Response.json({ success: true, resend_id: sendResult?.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});