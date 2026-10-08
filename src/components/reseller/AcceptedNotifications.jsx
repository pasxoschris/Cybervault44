import { useEffect, useState } from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { formatDateTime, formatEuro } from '@/lib/resellerUtils';

const SEEN_KEY = 'reseller_accepted_seen_at';

// Ειδοποιήσεις αποδοχής μέσα στο Reseller Console.
// Δείχνει τις προσφορές που έγιναν αποδεκτές από τον πελάτη, με ένδειξη για
// όσες προστέθηκαν από την τελευταία φορά που άνοιξε το πάνελ.
export default function AcceptedNotifications() {
  const [open, setOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const [seenAt, setSeenAt] = useState(() => localStorage.getItem(SEEN_KEY) || '');

  const load = async () => {
    const page = await base44.entities.ResellerOffer.filter(
      { status: 'accepted' },
      { sort: '-accepted_at', limit: 20, fields: ['reference_number', 'company_legal_name', 'store_name', 'accepted_at', 'final_total'] }
    );
    setOffers(page.items || []);
  };

  useEffect(() => {
    load();
    const unsubscribe = base44.entities.ResellerOffer.subscribe((event) => {
      if (event?.type === 'delete' || event?.data?.status === 'accepted') load();
    });
    return unsubscribe;
  }, []);

  const unseen = offers.filter(o => o.accepted_at && (!seenAt || new Date(o.accepted_at) > new Date(seenAt))).length;

  const toggle = () => {
    if (!open) {
      const now = new Date().toISOString();
      localStorage.setItem(SEEN_KEY, now);
      setSeenAt(now);
    }
    setOpen(!open);
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={toggle}
        title="Ειδοποιήσεις αποδοχής"
        className="relative flex items-center gap-2 px-3 py-2.5 border rounded-lg text-[#00CFFF] border-[#00CFFF]/30 hover:border-[#00CFFF]/60 hover:bg-[#00CFFF]/5 transition-all"
      >
        <Bell size={18} />
        <span className="hidden sm:inline text-xs font-medium">Αποδοχές</span>
        {unseen > 0 && (
          <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1.5 rounded-full bg-[#00CFFF] text-[#0E1235] text-[11px] font-bold flex items-center justify-center">
            {unseen}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-[#131840] border border-[#2A3580] rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A3580] text-white/60 text-xs font-semibold uppercase tracking-wide">
              Αποδοχές Προσφορών
            </div>
            {offers.length === 0 ? (
              <div className="px-4 py-8 text-center text-white/30 text-sm">Δεν υπάρχουν αποδοχές ακόμα.</div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {offers.map((o, i) => (
                  <div key={o.id} className={`px-4 py-3 border-b border-[#2A3580]/50 last:border-0 ${i % 2 === 0 ? 'bg-[#0E1235]' : 'bg-[#0f1339]/60'}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-cyber text-[#00CFFF] text-xs">{o.reference_number || '—'}</span>
                      <span className="flex items-center gap-1 text-green-400 text-[11px] whitespace-nowrap">
                        <CheckCircle2 size={11} /> {formatDateTime(o.accepted_at)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="text-white/80 text-xs truncate">{o.company_legal_name || o.store_name || '—'}</span>
                      <span className="font-mono text-[#00CFFF] text-xs whitespace-nowrap">{formatEuro(o.final_total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}