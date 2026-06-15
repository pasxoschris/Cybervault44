import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { CheckCircle, XCircle, Clock, AlertTriangle, Download, FileText } from 'lucide-react';

const fmt = (n) => `€${Number(n).toFixed(2)}`;
const fmtDate = (s) => s ? new Date(s).toLocaleDateString('el-GR') : '—';
const fmtDateTime = (s) => s ? new Date(s).toLocaleString('el-GR') : '—';

const STATUS_CONFIG = {
  draft:    { label: 'Προσχέδιο',   color: 'bg-gray-100 text-gray-600',   icon: FileText },
  sent:     { label: 'Εστάλη',      color: 'bg-blue-100 text-blue-700',   icon: FileText },
  viewed:   { label: 'Εθεάθη',      color: 'bg-purple-100 text-purple-700', icon: FileText },
  accepted: { label: 'Αποδεκτή',   color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: 'Απορρίφθηκε', color: 'bg-red-100 text-red-700',    icon: XCircle },
  expired:  { label: 'Έληξε',       color: 'bg-amber-100 text-amber-700', icon: Clock },
};

export default function PublicOfferPage() {
  const { publicToken } = useParams();
  const [offer, setOffer] = useState(null);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [acceptConfirm, setAcceptConfirm] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState('');
  const [rejectConfirm, setRejectConfirm] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  useEffect(() => {
    if (!publicToken) { setNotFound(true); setLoading(false); return; }
    Promise.all([
      base44.entities.ResellerOffer.filter({ public_token: publicToken }),
      base44.entities.ResellerSettings.list(),
    ]).then(([offers, settingsList]) => {
      if (!offers || offers.length === 0) { setNotFound(true); setLoading(false); return; }
      const found = offers[0];
      setOffer(found);
      if (settingsList[0]) setSettings(settingsList[0]);
      logView(found);
    }).finally(() => setLoading(false));
  }, [publicToken]);

  const logView = async (foundOffer) => {
    if (['accepted', 'rejected', 'expired'].includes(foundOffer.status)) return;
    try {
      await base44.functions.invoke('logOfferView', { offer_id: foundOffer.id });
      const updated = await base44.entities.ResellerOffer.filter({ public_token: publicToken });
      if (updated[0]) setOffer(updated[0]);
    } catch (e) {}
  };

  const handleAccept = async () => {
    setAccepting(true);
    setAcceptError('');
    try {
      const res = await base44.functions.invoke('acceptOffer', { offer_id: offer.id });
      if (res.data?.success) {
        const updated = await base44.entities.ResellerOffer.filter({ public_token: publicToken });
        if (updated[0]) setOffer(updated[0]);
        setAcceptConfirm(false);
      } else {
        setAcceptError(res.data?.error || 'Σφάλμα αποδοχής.');
        setAcceptConfirm(false);
      }
    } catch (e) {
      setAcceptError('Σφάλμα αποδοχής. Παρακαλώ δοκιμάστε ξανά.');
      setAcceptConfirm(false);
    }
    setAccepting(false);
  };

  const handleReject = async () => {
    setRejecting(true);
    try {
      await base44.functions.invoke('rejectOffer', { offer_id: offer.id });
      const updated = await base44.entities.ResellerOffer.filter({ public_token: publicToken });
      if (updated[0]) setOffer(updated[0]);
    } catch (e) {}
    setRejecting(false);
    setRejectConfirm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0099cc] rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <AlertTriangle size={48} className="text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Η προσφορά δεν βρέθηκε</h2>
          <p className="text-gray-500 text-sm">Ο σύνδεσμος μπορεί να είναι λανθασμένος ή η προσφορά να έχει αφαιρεθεί.</p>
        </div>
      </div>
    );
  }

  const isExpired = offer.status === 'expired' || (offer.expires_at && new Date(offer.expires_at) < new Date());
  const isAccepted = offer.status === 'accepted';
  const isRejected = offer.status === 'rejected';
  const isReadOnly = isExpired || isAccepted || isRejected;

  const lines = (() => { try { return JSON.parse(offer.items || '[]'); } catch { return []; } })();
  const statusCfg = STATUS_CONFIG[offer.status] || STATUS_CONFIG.draft;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0E1235] text-white py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-orbitron">
              <span className="text-white">CYBER</span><span className="text-[#00CFFF]">VAULT</span>
            </h1>
            {settings?.company_name && <p className="text-xs text-white/50 mt-0.5">{settings.company_name}</p>}
          </div>
          <div className="text-right">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-0.5">Προσφορά</div>
            <div className="font-mono text-[#00CFFF] text-sm font-bold">{offer.reference_number || '—'}</div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Status Banner */}
        {isAccepted && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-4">
            <CheckCircle size={28} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-green-800">Η προσφορά έχει γίνει αποδεκτή</h3>
              <p className="text-green-700 text-sm mt-0.5">Ηλεκτρονική αποδοχή στις {fmtDateTime(offer.accepted_at)}</p>
              {offer.accepted_pdf_url && (
                <a href={offer.accepted_pdf_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-xl hover:bg-green-700 transition-colors">
                  <Download size={14} /> Λήψη Υπογεγραμμένου PDF
                </a>
              )}
            </div>
          </div>
        )}

        {isRejected && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
            <XCircle size={28} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800">Η προσφορά απορρίφθηκε</h3>
              <p className="text-red-700 text-sm mt-0.5">{fmtDateTime(offer.rejected_at)}</p>
            </div>
          </div>
        )}

        {isExpired && !isAccepted && !isRejected && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
            <Clock size={28} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-800">Η προσφορά έχει λήξει</h3>
              <p className="text-amber-700 text-sm mt-0.5">Ισχύς έως: {fmtDate(offer.expires_at)}</p>
            </div>
          </div>
        )}

        {/* Offer Info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 text-lg">Στοιχεία Προσφοράς</h2>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusCfg.color}`}>
              {statusCfg.label}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <InfoRow label="Αρ. Αναφοράς" value={offer.reference_number} />
            <InfoRow label="Ημ/νία Έκδοσης" value={fmtDate(offer.created_date)} />
            <InfoRow label="Ισχύς Έως" value={fmtDate(offer.expires_at)} highlight={isExpired} />
            {offer.viewed_at && <InfoRow label="Εθεάθη" value={fmtDateTime(offer.viewed_at)} />}
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Στοιχεία Πελάτη</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {offer.company_legal_name && <InfoRow label="Επωνυμία" value={offer.company_legal_name} />}
            {offer.store_name && <InfoRow label="Κατάστημα" value={offer.store_name} />}
            {offer.vat_number && <InfoRow label="ΑΦΜ" value={offer.vat_number} />}
            {offer.address && <InfoRow label="Διεύθυνση" value={offer.address} />}
            {offer.contact_person && <InfoRow label="Υπεύθυνος" value={offer.contact_person} />}
            {offer.email && <InfoRow label="Email" value={offer.email} />}
            {offer.phone && <InfoRow label="Τηλέφωνο" value={offer.phone} />}
          </div>
        </div>

        {/* Lines */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Αναλυτική Προσφορά</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0E1235] text-white">
                  <th className="text-left px-3 py-2.5 text-xs font-semibold rounded-tl-lg">Περιγραφή</th>
                  <th className="text-center px-3 py-2.5 text-xs font-semibold">Ποσ.</th>
                  <th className="text-right px-3 py-2.5 text-xs font-semibold">Τιμή</th>
                  <th className="text-right px-3 py-2.5 text-xs font-semibold">Έκπτ.</th>
                  <th className="text-right px-3 py-2.5 text-xs font-semibold rounded-tr-lg">Σύνολο</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l, i) => {
                  const total = l.quantity * l.unit_price * (1 - l.discount_pct / 100);
                  return (
                    <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-3 py-2.5">
                        <div className="font-medium text-gray-800">{l.name}</div>
                        {l.description && <div className="text-xs text-gray-400">{l.description}</div>}
                      </td>
                      <td className="px-3 py-2.5 text-center text-gray-600">{l.quantity}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-gray-700">{fmt(l.unit_price)}</td>
                      <td className="px-3 py-2.5 text-right text-gray-500">{l.discount_pct > 0 ? `${l.discount_pct}%` : '—'}</td>
                      <td className="px-3 py-2.5 text-right font-mono font-semibold text-[#0099cc]">{fmt(total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mt-4">
            <div className="w-64 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-500"><span>Σύνολο πριν έκπτωση</span><span className="font-mono">{fmt(offer.subtotal_before_discount || 0)}</span></div>
              {(offer.total_discount || 0) > 0 && <div className="flex justify-between text-red-500"><span>Έκπτωση</span><span className="font-mono">-{fmt(offer.total_discount)}</span></div>}
              <div className="flex justify-between text-gray-500"><span>Καθαρό ποσό</span><span className="font-mono">{fmt(offer.subtotal_after_discount || 0)}</span></div>
              <div className="flex justify-between text-gray-500"><span>ΦΠΑ {offer.vat_rate || 24}%</span><span className="font-mono">{fmt(offer.vat_amount || 0)}</span></div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-[#0E1235] font-bold text-base">
                <span>Σύνολο</span><span className="font-mono">{fmt(offer.final_total || 0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        {settings?.default_terms && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 text-sm mb-3">Όροι & Προϋποθέσεις</h2>
            <p className="text-xs text-gray-400 whitespace-pre-wrap">{settings.default_terms}</p>
          </div>
        )}

        {/* Action Area */}
        {!isReadOnly && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-4">Αποδοχή Προσφοράς</h2>
            <p className="text-sm text-gray-600 mb-5">
              Μπορείτε να αποδεχτείτε ή να απορρίψετε την προσφορά απευθείας. Η αποδοχή είναι οριστική.
            </p>

            {acceptError && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 rounded-lg px-4 py-3">{acceptError}</p>
            )}

            <div className="flex flex-wrap gap-3">
              <button onClick={() => setAcceptConfirm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#0E1235] text-white rounded-xl font-semibold text-sm hover:bg-[#0099cc] transition-colors">
                <CheckCircle size={16} /> Αποδοχή Προσφοράς
              </button>
              <button onClick={() => setRejectConfirm(true)}
                className="flex items-center gap-2 px-6 py-3 border border-red-200 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-50 transition-colors">
                <XCircle size={16} /> Απόρριψη
              </button>
            </div>

            {/* Accept confirm dialog */}
            {acceptConfirm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                  <h3 className="font-bold text-gray-800 mb-2">Αποδοχή Προσφοράς</h3>
                  <p className="text-gray-600 text-sm mb-5">
                    Είστε σίγουροι ότι θέλετε να αποδεχτείτε οριστικά αυτή την προσφορά; Θα λάβετε επιβεβαίωση στο email σας.
                  </p>
                  <div className="flex gap-3">
                    <button onClick={handleAccept} disabled={accepting}
                      className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors disabled:opacity-50">
                      {accepting ? 'Αποδοχή...' : 'Ναι, Αποδοχή'}
                    </button>
                    <button onClick={() => { setAcceptConfirm(false); setAcceptError(''); }}
                      className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:border-gray-300 transition-colors">
                      Ακύρωση
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Reject confirm dialog */}
            {rejectConfirm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                  <h3 className="font-bold text-gray-800 mb-2">Απόρριψη Προσφοράς</h3>
                  <p className="text-gray-600 text-sm mb-5">Είστε σίγουροι ότι θέλετε να απορρίψετε αυτή την προσφορά;</p>
                  <div className="flex gap-3">
                    <button onClick={handleReject} disabled={rejecting}
                      className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors disabled:opacity-50">
                      {rejecting ? 'Απόρριψη...' : 'Ναι, Απόρριψη'}
                    </button>
                    <button onClick={() => setRejectConfirm(false)}
                      className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:border-gray-300 transition-colors">
                      Ακύρωση
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 pb-8 space-y-1">
          {settings?.public_phone && <p>Τηλ: {settings.public_phone}</p>}
          {settings?.public_email && <p>{settings.public_email}</p>}
          <p>© CyberVault — Ηλεκτρονική Αποδοχή Προσφοράς</p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <>
      <span className="text-gray-400 text-xs">{label}:</span>
      <span className={`font-medium text-xs ${highlight ? 'text-red-600' : 'text-gray-700'}`}>{value || '—'}</span>
    </>
  );
}