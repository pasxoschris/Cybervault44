import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { X, Send } from 'lucide-react';

export default function EmailModal({ offer, customer, lines: linesProp, totals: totalsProp, defaultSettings, onClose }) {
  const qc = useQueryClient();
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
  const [body, setBody] = useState(defaultSettings?.default_email_body || '');

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
      ${offer?.public_token ? `
      <div style="margin-top:24px;padding:24px;background:#f0f9ff;border:2px solid #0099cc;border-radius:8px;text-align:center;">
        <p style="margin:0 0 8px;font-size:15px;color:#0E1235;font-weight:bold;">Αποδοχή ή Απόρριψη Προσφοράς</p>
        <p style="margin:0 0 16px;font-size:13px;color:#666;">Κάντε κλικ στον παρακάτω σύνδεσμο για να δείτε και να αποδεχτείτε ηλεκτρονικά την προσφορά:</p>
        <a href="${window.location.origin}/offers/${offer.public_token}" style="display:inline-block;background:#0099cc;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;">Προβολή &amp; Αποδοχή Προσφοράς</a>
      </div>` : ''}
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

  const handleSend = async () => {
    if (!to) { setError('Εισάγετε email παραλήπτη.'); return; }
    if (!offer?.id) { setError('Αποθηκεύστε πρώτα την προσφορά.'); return; }
    setSending(true);
    setError('');
    try {
      const res = await base44.functions.invoke('sendResellerEmail', {
        to, cc, subject,
        offer_id: offer.id,
        custom_body: body,
      });
      if (res.data?.success) {
        setSent(true);
        qc.invalidateQueries({ queryKey: ['reseller', 'offers'] });
      } else {
        setError(res.data?.error || 'Σφάλμα αποστολής.');
      }
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Σφάλμα αποστολής.');
    } finally {
      setSending(false);
    }
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
            <div>
              <label className="text-white/40 text-xs block mb-1">Σώμα Email</label>
              <textarea
                value={body}
                onChange={e=>setBody(e.target.value)}
                rows={6}
                className={inputCls + ' resize-y'}
                placeholder="Εισάγετε το κείμενο του email..."
              />
              <p className="text-white/30 text-[10px] mt-1">Επεξεργαστείτε το κείμενο για να στείλετε ένα custom μήνυμα. Αφήστε το όπως είναι για τις προεπιλογές.</p>
            </div>
            <div className="text-xs text-white/30 bg-[#0E1235] border border-[#2A3580] rounded-lg px-3 py-2">
              📄 Το email θα περιλαμβάνει αναλυτικά τη προσφορά, {offer?.public_token ? 'κουμπί ηλεκτρονικής αποδοχής,' : ''} και το PDF ως συνημμένο αρχείο.
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