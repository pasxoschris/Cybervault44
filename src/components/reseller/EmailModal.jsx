import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Send } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function EmailModal({ offer, customer, lines: linesProp, totals: totalsProp, defaultSettings, onClose }) {
  // If lines/totals not passed directly, derive them from the saved offer object
  const lines = linesProp && linesProp.length > 0
    ? linesProp
    : (() => { try { return JSON.parse(offer?.items || '[]'); } catch { return []; } })();

  const totals = totalsProp || {
    subtotalBefore: offer?.subtotal_before_discount || 0,
    subtotalAfter: offer?.subtotal_after_discount || 0,
    totalDiscount: offer?.total_discount || 0,
    vatRate: offer?.vat_rate || 24,
    vatAmount: offer?.vat_amount || 0,
    finalTotal: offer?.final_total || 0,
  };

  const [to, setTo] = useState(customer?.email || offer?.email || '');
  const [cc, setCc] = useState('');
  const [subject, setSubject] = useState(defaultSettings?.default_email_subject || 'Προσφορά Spotlight POS – CyberVault');

  const buildHtmlBody = () => {
    const intro = defaultSettings?.default_email_body
      ? defaultSettings.default_email_body.replace(/\n/g, '<br>')
      : `Αγαπητέ/ή ${customer?.contact_person || ''},<br><br>Σας αποστέλλουμε την προσφορά μας για το σύστημα Spotlight POS.`;

    const fmt = (n) => Number(n).toFixed(2);
    const ref = offer?.reference_number || '';
    const expires = offer?.expires_at ? new Date(offer.expires_at).toLocaleDateString('el-GR') : '';

    const itemRows = (lines || []).map(l => {
      const sub = l.quantity * l.unit_price;
      const total = sub * (1 - l.discount_pct / 100);
      return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">
            <strong>${l.name}</strong>${l.description ? `<br><span style="color:#888;font-size:12px;">${l.description}</span>` : ''}
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
        ${defaultSettings?.company_name ? `<p style="margin:4px 0 0;color:#aaa;font-size:13px;">${defaultSettings.company_name}</p>` : ''}
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
      ${defaultSettings?.default_terms ? `<div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:6px;font-size:11px;color:#888;"><strong>Όροι & Προϋποθέσεις</strong><br>${defaultSettings.default_terms.replace(/\n/g, '<br>')}</div>` : ''}
      <div style="margin-top:20px;padding:16px;border-top:2px solid #0099cc;font-size:12px;color:#888;">
        ${defaultSettings?.public_phone ? `Τηλ: ${defaultSettings.public_phone} &nbsp;|&nbsp; ` : ''}
        ${defaultSettings?.public_email ? `Email: ${defaultSettings.public_email}` : ''}
      </div>
    </body></html>`;
  };


  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const buildPdfBase64 = async () => {
    const fmt = (n) => Number(n).toFixed(2);
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Load Noto Sans font (supports Greek) from Google Fonts CDN
    const fontResp = await fetch('https://fonts.gstatic.com/s/notosans/v36/o-0IIpQlx3QUlC5A4PNr6DRAW.woff2');
    const fontBuffer = await fontResp.arrayBuffer();
    // Convert to base64
    const fontBase64 = btoa(String.fromCharCode(...new Uint8Array(fontBuffer)));
    doc.addFileToVFS('NotoSans.ttf', fontBase64);
    doc.addFont('NotoSans.ttf', 'NotoSans', 'normal');

    const fontRespBold = await fetch('https://fonts.gstatic.com/s/notosans/v36/o-0NIpQlx3QUlC5A4PNjXhFVatyBx2pqPIif.woff2');
    const fontBufferBold = await fontRespBold.arrayBuffer();
    const fontBase64Bold = btoa(String.fromCharCode(...new Uint8Array(fontBufferBold)));
    doc.addFileToVFS('NotoSans-Bold.ttf', fontBase64Bold);
    doc.addFont('NotoSans-Bold.ttf', 'NotoSans', 'bold');

    const t = totals || {};
    const ref = offer?.reference_number || '';
    const today = new Date().toLocaleDateString('el-GR');
    const validityDays = defaultSettings?.offer_validity_days || 30;
    const expiresDate = new Date(Date.now() + validityDays * 86400000).toLocaleDateString('el-GR');

    let y = 20;
    const lm = 15;
    const pw = 180;

    // Header bar
    doc.setFillColor(14, 18, 53);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('NotoSans', 'bold');
    doc.text('CYBERVAULT', lm, 20);
    if (defaultSettings?.company_name) {
      doc.setFontSize(9);
      doc.setFont('NotoSans', 'normal');
      doc.setTextColor(180, 180, 180);
      doc.text(defaultSettings.company_name, lm, 27);
    }
    doc.setTextColor(0, 153, 204);
    doc.setFontSize(10);
    doc.setFont('NotoSans', 'bold');
    doc.text(ref, 195, 15, { align: 'right' });
    doc.setTextColor(180, 180, 180);
    doc.setFontSize(8);
    doc.setFont('NotoSans', 'normal');
    doc.text(`Ημ/νία: ${today}`, 195, 21, { align: 'right' });
    doc.text(`Ισχύς έως: ${expiresDate}`, 195, 26, { align: 'right' });

    y = 40;

    // Customer info box
    doc.setFillColor(245, 245, 250);
    doc.rect(lm, y, pw, 28, 'F');
    doc.setDrawColor(200, 200, 220);
    doc.rect(lm, y, pw, 28, 'S');
    doc.setTextColor(100, 100, 120);
    doc.setFontSize(7);
    doc.setFont('NotoSans', 'bold');
    doc.text('ΣΤΟΙΧΕΙΑ ΠΕΛΑΤΗ', lm + 3, y + 6);
    doc.setFont('NotoSans', 'normal');
    doc.setTextColor(50, 50, 70);
    doc.setFontSize(9);
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
    col1.forEach((line, i) => doc.text(line, lm + 3, y + 12 + i * 5));
    col2.forEach((line, i) => doc.text(line, lm + pw / 2, y + 12 + i * 5));

    y += 34;

    // Table header
    doc.setFillColor(14, 18, 53);
    doc.rect(lm, y, pw, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('NotoSans', 'bold');
    doc.text('Περιγραφή', lm + 3, y + 5.5);
    doc.text('Ποσ.', lm + 100, y + 5.5, { align: 'center' });
    doc.text('Τιμή', lm + 126, y + 5.5, { align: 'right' });
    doc.text('Έκπτ.', lm + 148, y + 5.5, { align: 'center' });
    doc.text('Σύνολο', lm + pw, y + 5.5, { align: 'right' });
    y += 8;

    // Table rows
    (lines || []).forEach((l, idx) => {
      const sub = l.quantity * l.unit_price;
      const total = sub * (1 - l.discount_pct / 100);
      doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 252);
      doc.rect(lm, y, pw, 8, 'F');
      doc.setDrawColor(230, 230, 240);
      doc.line(lm, y + 8, lm + pw, y + 8);
      doc.setTextColor(40, 40, 60);
      doc.setFont('NotoSans', 'normal');
      doc.setFontSize(8.5);
      doc.text(l.name.substring(0, 45), lm + 3, y + 5.5);
      doc.text(String(l.quantity), lm + 100, y + 5.5, { align: 'center' });
      doc.text(`€${fmt(l.unit_price)}`, lm + 126, y + 5.5, { align: 'right' });
      doc.text(l.discount_pct > 0 ? `${l.discount_pct}%` : '—', lm + 148, y + 5.5, { align: 'center' });
      doc.setTextColor(0, 153, 204);
      doc.setFont('NotoSans', 'bold');
      doc.text(`€${fmt(total)}`, lm + pw, y + 5.5, { align: 'right' });
      y += 8;
      if (y > 250) { doc.addPage(); y = 20; }
    });

    // Totals
    y += 4;
    const addTotal = (label, value, bold, color) => {
      doc.setFontSize(9);
      doc.setFont('NotoSans', bold ? 'bold' : 'normal');
      if (color) doc.setTextColor(...color); else doc.setTextColor(80, 80, 100);
      doc.text(label, lm + pw - 55, y);
      doc.text(`€${fmt(value)}`, lm + pw, y, { align: 'right' });
      y += 6;
    };
    addTotal('Σύνολο πριν έκπτωση:', t.subtotalBefore || 0, false);
    if ((t.totalDiscount || 0) > 0) addTotal('Έκπτωση:', -(t.totalDiscount || 0), false, [220, 60, 60]);
    addTotal('Καθαρό ποσό:', t.subtotalAfter || 0, false);
    addTotal(`ΦΠΑ ${t.vatRate || 24}%:`, t.vatAmount || 0, false);
    // Final total box
    doc.setFillColor(14, 18, 53);
    doc.rect(lm + pw - 60, y - 1, 62, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('NotoSans', 'bold');
    doc.setFontSize(10);
    doc.text('ΣΥΝΟΛΟ:', lm + pw - 57, y + 6);
    doc.setTextColor(0, 207, 255);
    doc.text(`€${fmt(t.finalTotal || 0)}`, lm + pw, y + 6, { align: 'right' });
    y += 16;

    // Terms
    if (defaultSettings?.default_terms) {
      if (y > 240) { doc.addPage(); y = 20; }
      doc.setTextColor(120, 120, 140);
      doc.setFontSize(7);
      doc.setFont('NotoSans', 'bold');
      doc.text('ΟΡΟΙ & ΠΡΟΫΠΟΘΕΣΕΙΣ', lm, y);
      y += 4;
      doc.setFont('NotoSans', 'normal');
      const termLines = doc.splitTextToSize(defaultSettings.default_terms, pw);
      doc.text(termLines, lm, y);
    }

    // Footer
    doc.setFillColor(14, 18, 53);
    doc.rect(0, 285, 210, 12, 'F');
    doc.setTextColor(150, 150, 170);
    doc.setFontSize(7.5);
    doc.setFont('NotoSans', 'normal');
    const footerParts = [];
    if (defaultSettings?.public_phone) footerParts.push(`Τηλ: ${defaultSettings.public_phone}`);
    if (defaultSettings?.public_email) footerParts.push(defaultSettings.public_email);
    doc.text(footerParts.join('   |   '), 105, 292, { align: 'center' });

    return doc.output('datauristring').split(',')[1];
  };

  const handleSend = async () => {
    if (!to) { setError('Εισάγετε email παραλήπτη.'); return; }
    setSending(true);
    setError('');
    const htmlBody = buildHtmlBody();
    const pdfBase64 = await buildPdfBase64();
    const filename = offer?.reference_number ? `Προσφορά-${offer.reference_number}.pdf` : 'Προσφορά.pdf';
    const res = await base44.functions.invoke('sendResellerEmail', {
      to, cc, subject, html_body: htmlBody, offer_id: offer?.id,
      pdf_base64: pdfBase64, pdf_filename: filename
    });
    if (res.data?.success) {
      setSent(true);
    } else {
      setError(res.data?.error || 'Σφάλμα αποστολής.');
    }
    setSending(false);
  };

  const inputCls = "w-full bg-[#0E1235] border border-[#2A3580] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 placeholder-white/20";

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#131840] border border-[#2A3580] rounded-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-5 border-b border-[#2A3580]">
          <h3 className="text-white text-sm font-semibold">Αποστολή Email</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={18} /></button>
        </div>
        {sent ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <Send size={20} className="text-green-400" />
            </div>
            <p className="text-white text-sm font-semibold">Το email εστάλη!</p>
            <p className="text-white/40 text-xs mt-1">Στάλθηκε σε: {to}</p>
            <button onClick={onClose} className="mt-4 px-6 py-2 bg-[#00CFFF] text-[#0E1235] rounded-xl font-semibold text-sm">Κλείσιμο</button>
          </div>
        ) : (
          <div className="p-5 space-y-3">
            <div>
              <label className="text-white/40 text-xs block mb-1">Παραλήπτης *</label>
              <input value={to} onChange={e=>setTo(e.target.value)} className={inputCls} placeholder="email@example.com" />
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1">CC</label>
              <input value={cc} onChange={e=>setCc(e.target.value)} className={inputCls} placeholder="cc@example.com" />
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1">Θέμα</label>
              <input value={subject} onChange={e=>setSubject(e.target.value)} className={inputCls} />
            </div>
            <div className="text-xs text-white/30 bg-[#0E1235] border border-[#2A3580] rounded-lg px-3 py-2">
              📄 Το email θα περιλαμβάνει αναλυτικά τη προσφορά με όλα τα είδη και τα σύνολα, καθώς και το PDF ως συνημμένο αρχείο.
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <div className="flex gap-3 pt-1">
              <button onClick={handleSend} disabled={sending}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#00CFFF] text-[#0E1235] rounded-xl font-bold text-sm hover:bg-[#00CFFF]/80 transition-colors disabled:opacity-50">
                <Send size={14} /> {sending ? 'Αποστολή...' : 'Αποστολή'}
              </button>
              <button onClick={onClose} className="px-5 py-2.5 border border-[#2A3580] rounded-xl text-white/60 text-sm hover:border-[#00CFFF]/30 transition-colors">
                Ακύρωση
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}