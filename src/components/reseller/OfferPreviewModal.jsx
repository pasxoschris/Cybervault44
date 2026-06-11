import { X, Mail } from 'lucide-react';
import { useState } from 'react';
import EmailModal from './EmailModal';

const CATEGORY_LABELS = {
  spotlight_pos: 'Spotlight POS', network_equipment: 'Εξοπλισμός Δικτύου',
  printers: 'Εκτυπωτές', installation: 'Εγκατάσταση', training: 'Εκπαίδευση',
  services: 'Υπηρεσίες', other: 'Άλλο'
};

const fmt = (n) => Number(n).toFixed(2);

export default function OfferPreviewModal({ customer, lines, totals, settings, refNumber, savedOffer, onClose, onSaveBeforeEmail }) {
  const [showEmail, setShowEmail] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleEmailClick = async () => {
    if (!savedOffer && onSaveBeforeEmail) {
      setSaving(true);
      await onSaveBeforeEmail();
      setSaving(false);
    }
    setShowEmail(true);
  };
  const today = new Date().toLocaleDateString('el-GR');
  const validityDays = settings?.offer_validity_days || 30;
  const expiresDate = new Date(Date.now() + validityDays * 86400000).toLocaleDateString('el-GR');
  const { subtotalBefore, subtotalAfter, totalDiscount, vatRate, vatAmount, finalTotal } = totals;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-white text-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10">
          <X size={20} />
        </button>


        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-orbitron tracking-wide">
                <span className="text-[#0E1235]">CYBER</span><span className="text-[#0099cc]">VAULT</span>
              </h1>
              {settings?.company_name && <p className="text-sm text-gray-500 mt-0.5">{settings.company_name}</p>}
              {settings?.company_address && <p className="text-xs text-gray-400">{settings.company_address}</p>}
              {settings?.company_vat_number && <p className="text-xs text-gray-400">ΑΦΜ: {settings.company_vat_number}</p>}
              {settings?.public_phone && <p className="text-xs text-gray-400">Τηλ: {settings.public_phone}</p>}
              {settings?.public_email && <p className="text-xs text-gray-400">{settings.public_email}</p>}
            </div>
            <div className="text-right">
              <div className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-1">ΠΡΟΣΦΟΡΑ</div>
              <div className="text-lg font-bold font-mono text-[#0099cc]">{refNumber || '—'}</div>
              <div className="text-xs text-gray-400 mt-1">Ημ/νία: {today}</div>
              <div className="text-xs text-gray-400">Ισχύς έως: {expiresDate}</div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Στοιχεία Πελάτη</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              {customer.company_legal_name && <Row label="Επωνυμία" value={customer.company_legal_name} />}
              {customer.store_name && <Row label="Κατάστημα" value={customer.store_name} />}
              {customer.vat_number && <Row label="ΑΦΜ" value={customer.vat_number} />}
              {customer.address && <Row label="Διεύθυνση" value={customer.address} />}
              {customer.contact_person && <Row label="Υπεύθυνος" value={customer.contact_person} />}
              {customer.email && <Row label="Email" value={customer.email} />}
              {customer.phone && <Row label="Τηλέφωνο" value={customer.phone} />}
            </div>
          </div>

          {/* Lines Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Αναλυτική Προσφορά</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0E1235] text-white">
                  <th className="text-left px-3 py-2 rounded-tl-lg text-xs font-semibold">Περιγραφή</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold">Ποσότητα</th>
                  <th className="text-right px-3 py-2 text-xs font-semibold">Τιμή Μον.</th>
                  <th className="text-right px-3 py-2 text-xs font-semibold">Έκπτωση</th>
                  <th className="text-right px-3 py-2 rounded-tr-lg text-xs font-semibold">Σύνολο</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l, i) => {
                  const sub = l.quantity * l.unit_price;
                  const total = sub * (1 - l.discount_pct / 100);
                  return (
                    <tr key={l.id} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-3 py-2.5">
                        <div className="font-medium text-gray-800">{l.name}</div>
                        {l.description && <div className="text-xs text-gray-400">{l.description}</div>}
                      </td>
                      <td className="px-3 py-2.5 text-center text-gray-600">{l.quantity}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-gray-700">€{fmt(l.unit_price)}</td>
                      <td className="px-3 py-2.5 text-right text-gray-500">{l.discount_pct > 0 ? `${l.discount_pct}%` : '—'}</td>
                      <td className="px-3 py-2.5 text-right font-mono font-semibold text-[#0099cc]">€{fmt(total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-500"><span>Σύνολο πριν έκπτωση</span><span className="font-mono">€{fmt(subtotalBefore)}</span></div>
              {totalDiscount > 0 && <div className="flex justify-between text-red-500"><span>Έκπτωση</span><span className="font-mono">-€{fmt(totalDiscount)}</span></div>}
              <div className="flex justify-between text-gray-500"><span>Καθαρό ποσό</span><span className="font-mono">€{fmt(subtotalAfter)}</span></div>
              <div className="flex justify-between text-gray-500"><span>ΦΠΑ {vatRate}%</span><span className="font-mono">€{fmt(vatAmount)}</span></div>
              <div className="flex justify-between border-t border-gray-300 pt-2 text-[#0E1235] font-bold text-base">
                <span>Σύνολο</span><span className="font-mono">€{fmt(finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {customer.notes && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Σημειώσεις</h3>
              <p className="text-sm text-gray-600">{customer.notes}</p>
            </div>
          )}

          {/* Terms */}
          {settings?.default_terms && (
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Όροι & Προϋποθέσεις</h3>
              <p className="text-xs text-gray-400 whitespace-pre-wrap">{settings.default_terms}</p>
            </div>
          )}
        </div>
        {/* Bottom actions */}
        <div className="border-t border-gray-100 px-8 py-4 flex justify-end">
          <button
            onClick={handleEmailClick}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0E1235] text-white text-sm rounded-xl hover:bg-[#0099cc] transition-colors font-medium disabled:opacity-50"
          >
            <Mail size={15} /> {saving ? 'Αποθήκευση...' : 'Αποστολή Email'}
          </button>
        </div>
      </div>
      {showEmail && (
        <EmailModal
          offer={savedOffer}
          customer={customer}
          defaultSettings={settings}
          onClose={() => setShowEmail(false)}
        />
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <>
      <span className="text-gray-400 text-xs">{label}:</span>
      <span className="text-gray-700 font-medium text-xs">{value}</span>
    </>
  );
}