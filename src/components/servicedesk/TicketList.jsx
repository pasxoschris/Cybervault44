import { useEffect, useState, useMemo } from 'react';
import { Pencil, Search, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EditTicketModal from '@/components/servicedesk/EditTicketModal';

const toGreekDate = (d) => { if (!d) return '—'; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; };

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

  // Filters
  const [searchText, setSearchText] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | resolved | unresolved
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const loadTickets = () => {
    setLoading(true);
    base44.entities.Ticket.list('-created_date', 100)
      .then(setTickets)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      if (searchText) {
        const q = searchText.toLowerCase();
        if (
          !(t.store || '').toLowerCase().includes(q) &&
          !(t.problem || '').toLowerCase().includes(q) &&
          !(t.caller || '').toLowerCase().includes(q) &&
          !(t.operator || '').toLowerCase().includes(q) &&
          !(t.notes || '').toLowerCase().includes(q)
        ) return false;
      }
      if (dateFrom && t.date < dateFrom) return false;
      if (dateTo && t.date > dateTo) return false;
      if (statusFilter === 'resolved' && !t.resolved) return false;
      if (statusFilter === 'unresolved' && t.resolved) return false;
      if (categoryFilter && !t[categoryFilter]) return false;
      if (priorityFilter && t.priority !== priorityFilter) return false;
      return true;
    });
  }, [tickets, searchText, dateFrom, dateTo, statusFilter, categoryFilter, priorityFilter]);

  const clearFilters = () => {
    setSearchText('');
    setDateFrom('');
    setDateTo('');
    setStatusFilter('all');
    setCategoryFilter('');
    setPriorityFilter('');
  };

  const hasFilters = searchText || dateFrom || dateTo || statusFilter !== 'all' || categoryFilter || priorityFilter;

  if (loading) {
    return <div className="text-center py-16 font-mono-cyber text-[#00CFFF]/40 text-sm tracking-widest">ΦΟΡΤΩΣΗ...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="border border-[#00CFFF]/20 bg-[#131840]/80 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Search size={14} className="text-[#00CFFF]/50 flex-shrink-0" />
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="cyber-input flex-1 text-sm"
            placeholder="Αναζήτηση σε κατάστημα, πρόβλημα, καλούντα, χειριστή..."
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono-cyber text-[#00CFFF]/60 tracking-wider">
            <span>ΑΠΟ</span>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="cyber-input text-xs w-36"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono-cyber text-[#00CFFF]/60 tracking-wider">
            <span>ΕΩΣ</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="cyber-input text-xs w-36"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="cyber-input text-xs w-40 font-mono-cyber"
          >
            <option value="all">ΟΛΑ</option>
            <option value="resolved">ΕΠΙΛΥΜΕΝΑ</option>
            <option value="unresolved">ΑΝΟΙΧΤΑ</option>
          </select>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="cyber-input text-xs w-44 font-mono-cyber"
          >
            <option value="">ΟΛΕΣ ΟΙ ΚΑΤΗΓΟΡΙΕΣ</option>
            {CATEGORIES.map(c => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="cyber-input text-xs w-40 font-mono-cyber"
          >
            <option value="">ΟΛΕΣ ΟΙ ΠΡΟΤΕΡΑΙΟΤΗΤΕΣ</option>
            <option value="low">ΧΑΜΗΛΗ</option>
            <option value="normal">ΚΑΝΟΝΙΚΗ</option>
            <option value="high">ΥΨΗΛΗ</option>
            <option value="urgent">ΕΠΕΙΓΟΥΣΑ</option>
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs font-mono-cyber text-red-400/70 hover:text-red-400 tracking-wider transition-colors">
              <X size={12} /> ΚΑΘΑΡΙΣΜΟΣ
            </button>
          )}
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-16 font-mono-cyber text-white/20 text-sm tracking-widest">ΔΕΝ ΥΠΑΡΧΟΥΝ TICKETS</div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-16 font-mono-cyber text-white/30 text-sm tracking-widest">ΔΕΝ ΒΡΕΘΗΚΑΝ ΑΠΟΤΕΛΕΣΜΑΤΑ</div>
      ) : (
        filteredTickets.map(t => (
          <div key={t.id} className="border border-[#00CFFF]/20 bg-[#131840]/80 p-5 space-y-3">
            {/* Header row */}
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <div className="flex gap-3 font-mono-cyber text-xs text-[#00CFFF]/60">
                <span>{toGreekDate(t.date)}</span>
                {t.time && <span>{t.time}</span>}
                {t.operator && <span className="text-white/40">· {t.operator}</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-[10px] font-mono-cyber tracking-widest border ${
                  t.priority === 'urgent' ? 'border-red-400/40 text-red-400 bg-red-500/10' :
                  t.priority === 'high' ? 'border-yellow-400/40 text-yellow-400 bg-yellow-500/10' :
                  t.priority === 'low' ? 'border-blue-400/40 text-blue-400 bg-blue-500/10' :
                  'border-[#00CFFF]/40 text-[#00CFFF] bg-[#00CFFF]/5'
                }`}>
                  {t.priority === 'urgent' ? '⚡ ΕΠΕΙΓΟΥΣΑ' : t.priority === 'high' ? '▲ ΥΨΗΛΗ' : t.priority === 'low' ? '▼ ΧΑΜΗΛΗ' : '● ΚΑΝΟΝΙΚΗ'}
                </span>
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
        ))
      )}
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