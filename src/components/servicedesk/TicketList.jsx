import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EditTicketModal from '@/components/servicedesk/EditTicketModal';

const CATEGORIES = [
  { key: 'category_not_spotlight', label: 'ΔΕΝ ΑΦΟΡΟΥΣΕ ΤΗ SPOTLIGHT' },
  { key: 'category_printers', label: 'ΕΚΤΥΠΩΤΕΣ' },
  { key: 'category_settings', label: 'ΡΥΘΜΙΣΕΙΣ ΕΦΑΡΜΟΓΗΣ' },
  { key: 'category_pos', label: 'POS' },
  { key: 'category_pda', label: 'PDA' },
  { key: 'category_invoices', label: 'Τιμολόγια' },
];

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTicket, setEditingTicket] = useState(null);

  const loadTickets = () => {
    base44.entities.Ticket.list('-created_date', 100)
      .then(setTickets);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  if (loading) {
    return <div className="text-center py-16 font-mono-cyber text-[#00CFFF]/40 text-sm tracking-widest">ΦΟΡΤΩΣΗ...</div>;
  }

  if (tickets.length === 0) {
    return <div className="text-center py-16 font-mono-cyber text-white/20 text-sm tracking-widest">ΔΕΝ ΥΠΑΡΧΟΥΝ TICKETS</div>;
  }

  return (
    <div className="space-y-4">
      {tickets.map(t => (
        <div key={t.id} className="border border-[#00CFFF]/20 bg-[#131840]/80 p-5 space-y-3">
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex gap-3 font-mono-cyber text-xs text-[#00CFFF]/60">
              <span>{t.date}</span>
              {t.time && <span>{t.time}</span>}
              {t.operator && <span className="text-white/40">· {t.operator}</span>}
            </div>
            <div className="flex items-center gap-2">
              {t.resolved && (
                <span className="px-2 py-0.5 text-[10px] font-mono-cyber tracking-widest border border-green-500/40 text-green-400 bg-green-500/10">
                  ✓ ΕΠΙΛΥΘΗΚΕ
                </span>
              )}
              <button onClick={() => setEditingTicket(t)} className="text-white/20 hover:text-[#00CFFF] transition-colors" title="Επεξεργασία">
                <Pencil size={13} />
              </button>
            </div>
          </div>

          {/* Store */}
          <div className="font-orbitron text-[#00CFFF] text-sm tracking-wide">{t.store}</div>

          {/* Caller + Phone */}
          {(t.caller || t.phone) && (
            <div className=" text-white/60 text-sm">
              {t.caller && <span>{t.caller}</span>}
              {t.caller && t.phone && <span className="mx-2 text-white/20">·</span>}
              {t.phone && <span>{t.phone}</span>}
            </div>
          )}

          {/* Problem */}
          <div className=" text-white/85 text-base leading-relaxed">{t.problem}</div>

          {/* Categories */}
          {CATEGORIES.some(c => t[c.key]) && (
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => t[c.key]).map(c => (
                <span key={c.key} className="px-2 py-0.5 text-[10px] font-mono-cyber tracking-widest border border-[#00CFFF]/30 text-[#00CFFF]/70 bg-[#00CFFF]/5">
                  {c.label}
                </span>
              ))}
            </div>
          )}

          {/* Notes */}
          {t.notes && (
            <div className=" text-white/45 text-sm italic border-t border-[#00CFFF]/10 pt-3">{t.notes}</div>
          )}
        </div>
      ))}
      {editingTicket && (
        <EditTicketModal
          ticket={editingTicket}
          onClose={() => setEditingTicket(null)}
          onSaved={() => {
            setEditingTicket(null);
            loadTickets();
          }}
        />
      )}
    </div>
  );
}