import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { X, Send } from 'lucide-react';

export default function EmailModal({ offer, customer, defaultSettings, onClose, onCloseAfterSent }) {
  const qc = useQueryClient();
  const [to, setTo] = useState(customer?.email || offer?.email || '');
  const [cc, setCc] = useState('');
  const [subject, setSubject] = useState(defaultSettings?.default_email_subject || 'Προσφορά Spotlight POS – CyberVault');
  const [body, setBody] = useState(defaultSettings?.default_email_body || '');

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
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#131840] border border-[#2A3580] rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
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
            <button onClick={() => (onCloseAfterSent ? onCloseAfterSent() : onClose())} className="mt-4 px-6 py-2 bg-[#00CFFF] text-[#0E1235] rounded-xl font-semibold text-sm">Κλείσιμο</button>
          </div>
        ) : (
          <div className="p-5 space-y-3">
            <div>
              <label className="text-white/40 text-xs block mb-1">Παραλήπτης *</label>
              <input value={to} onChange={e=>setTo(e.target.value)} className={inputCls} placeholder="email@example.com" />
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1">CC <span className="text-white/25">(διαχωρίστε με κόμμα για πολλαπλά)</span></label>
              <input value={cc} onChange={e=>setCc(e.target.value)} className={inputCls} placeholder="cc1@example.com, cc2@example.com" />
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
                rows={12}
                className={inputCls + ' resize-y'}
                placeholder="Εισάγετε το κείμενο του email..."
              />
              <p className="text-white/30 text-[10px] mt-1">Επεξεργαστείτε το κείμενο για να στείλετε ένα custom μήνυμα. Αφήστε το όπως είναι για τις προεπιλογές.</p>
            </div>
            <div className="text-xs text-white/30 bg-[#0E1235] border border-[#2A3580] rounded-lg px-3 py-2">
              📄 Το email περιέχει μόνο σύντομο μήνυμα και κουμπί ανοίγματος της προσφοράς. Μόλις ο πελάτης την ανοίξει, ενημερώνεται η στήλη «Εθεάθη» στο Ιστορικό.
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