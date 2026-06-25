import { useEffect, useState, useMemo } from 'react';
import { Pencil, Search, X, ChevronDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EditTicketModal from '@/components/servicedesk/EditTicketModal';

const toDisplayDate = (d) => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; };
const toStorageDate = (d) => { const p = d.split('/'); if (p.length !== 3) return d; return `${p[2]}-${p[1]}-${p[0]}`; };
const toGreekDate = (d) => { if (!d) return '—'; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; };

const PRIORITY_LABELS = {
  urgent: { label: '⚡ ΚΡΙΣΙΜΗ', cls: 'border-red-400/40 text-red-400 bg-red-500/10' },
  high:   { label: '▲ ΥΨΗΛΗ',   cls: 'border-yellow-400/40 text-yellow-400 bg-yellow-500/10' },
  low:    { label: '▼ ΧΑΜΗΛΗ',  cls: 'border-blue-400/40 text-blue-400 bg-blue-500/10' },
  normal: { label: '● ΚΑΝΟΝΙΚΗ', cls: 'border-[#00CFFF]/40 text-[#00CFFF] bg-[#00CFFF]/5' },
};

function CyberSelect({ value, onChange, children }) {
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className="cyber-input text-xs font-mono-cyber appearance-none pr-7 cursor-pointer"
        style={{ background: 'rgba(19,24,64,0.8)' }}>
        {children}
      </select>
      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#00CFFF]/50 pointer-events-none" />
    </div>
  );
}

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTicket, setEditingTicket] = useState(null);
  const [categories, setCategories] = useState([]);
  const [resolutionStatuses, setResolutionStatuses] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [resolutionFilter, setResolutionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [ticketTypeFilter, setTicketTypeFilter] = useState('');
  const [ticketTypes, setTicketTypes] = useState([]);

  const loadTickets = () => {
    setLoading(true);
    base44.entities.Ticket.list('-created_date', 200)
      .then(setTickets)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTickets();
    base44.entities.TicketCategory.list('display_order', 50).then(setCategories);
    base44.entities.ResolutionStatus.list('display_order', 20).then(setResolutionStatuses);
    base44.entities.TicketType.list('display_order', 10).then(setTicketTypes);
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
          !(t.notes || '').toLowerCase().includes(q) &&
          !(t.category || '').toLowerCase().includes(q) &&
          !(t.subcategory || '').toLowerCase().includes(q)
        ) return false;
      }
      if (dateFrom && t.date < dateFrom) return false;
      if (dateTo && t.date > dateTo) return false;
      if (resolutionFilter && t.resolution_status !== resolutionFilter) return false;
      if (categoryFilter && t.category_id !== categoryFilter) return false;
      if (priorityFilter && t.priority !== priorityFilter) return false;
      if (ticketTypeFilter && t.ticket_type_id !== ticketTypeFilter) return false;
      return true;
    });
  }, [tickets, searchText, dateFrom, dateTo, resolutionFilter, categoryFilter, priorityFilter, ticketTypeFilter]);

  const clearFilters = () => {
    setSearchText(''); setDateFrom(''); setDateTo('');
    setResolutionFilter(''); setCategoryFilter(''); setPriorityFilter(''); setTicketTypeFilter('');
  };

  const hasFilters = searchText || dateFrom || dateTo || resolutionFilter || categoryFilter || priorityFilter || ticketTypeFilter;

  if (loading) {
    return <div className="text-center py-16 font-mono-cyber text-[#00CFFF]/40 text-sm tracking-widest">ΦΟΡΤΩΣΗ...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="border border-[#00CFFF]/20 bg-[#131840]/80 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Search size={14} className="text-[#00CFFF]/50 flex-shrink-0" />
          <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)}
            className="cyber-input flex-1 text-sm"
            placeholder="Αναζήτηση σε κατάστημα, πρόβλημα, κατηγορία, χειριστή..." />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <span>ΑΠΟ</span>
            <input type="text" value={toDisplayDate(dateFrom)} onChange={e => setDateFrom(toStorageDate(e.target.value))}
              className="cyber-input text-xs w-32" placeholder="ηη/μμ/εεεε" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <span>ΕΩΣ</span>
            <input type="text" value={toDisplayDate(dateTo)} onChange={e => setDateTo(toStorageDate(e.target.value))}
              className="cyber-input text-xs w-32" placeholder="ηη/μμ/εεεε" />
          </div>
          <CyberSelect value={ticketTypeFilter} onChange={setTicketTypeFilter}>
            <option value="">ΟΛΟΙ ΟΙ ΤΥΠΟΙ</option>
            {ticketTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </CyberSelect>
          <CyberSelect value={categoryFilter} onChange={setCategoryFilter}>
            <option value="">ΟΛΕΣ ΟΙ ΚΑΤΗΓΟΡΙΕΣ</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </CyberSelect>
          <CyberSelect value={resolutionFilter} onChange={setResolutionFilter}>
            <option value="">ΟΛΑ ΤΑ STATUS</option>
            {resolutionStatuses.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </CyberSelect>
          <CyberSelect value={priorityFilter} onChange={setPriorityFilter}>
            <option value="">ΟΛΕΣ ΟΙ ΠΡΟΤΕΡΑΙΟΤΗΤΕΣ</option>
            <option value="low">ΧΑΜΗΛΗ</option>
            <option value="normal">ΚΑΝΟΝΙΚΗ</option>
            <option value="high">ΥΨΗΛΗ</option>
            <option value="urgent">ΚΡΙΣΙΜΗ</option>
          </CyberSelect>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs font-mono-cyber text-red-400/70 hover:text-red-400 tracking-wider transition-colors">
              <X size={12} /> ΚΑΘΑΡΙΣΜΟΣ
            </button>
          )}
        </div>
        <div className="text-xs font-mono-cyber text-white/25 tracking-widest">
          {filteredTickets.length} / {tickets.length} TICKETS
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-16 font-mono-cyber text-white/20 text-sm tracking-widest">ΔΕΝ ΥΠΑΡΧΟΥΝ TICKETS</div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-16 font-mono-cyber text-white/30 text-sm tracking-widest">ΔΕΝ ΒΡΕΘΗΚΑΝ ΑΠΟΤΕΛΕΣΜΑΤΑ</div>
      ) : (
        filteredTickets.map(t => {
          const prio = PRIORITY_LABELS[t.priority] || PRIORITY_LABELS.normal;
          return (
            <div key={t.id} className="border border-[#00CFFF]/20 bg-[#131840]/80 p-5 space-y-3">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="flex gap-3 font-mono-cyber text-xs text-[#00CFFF]/60">
                  <span>{toGreekDate(t.date)}</span>
                  {t.time && <span>{t.time}</span>}
                  {t.operator && <span className="text-white/40">· {t.operator}</span>}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {t.ticket_type && (
                    <span className="px-2 py-0.5 text-[10px] font-mono-cyber tracking-widest border border-white/20 text-white/50">
                      {t.ticket_type}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 text-[10px] font-mono-cyber tracking-widest border ${prio.cls}`}>
                    {prio.label}
                  </span>
                  {t.support_level && (
                    <span className="px-2 py-0.5 text-[10px] font-mono-cyber tracking-widest border border-[#00CFFF]/30 text-[#00CFFF]/70 bg-[#00CFFF]/5">
                      {t.support_level}
                    </span>
                  )}
                  {t.resolution_status && (
                    <span className={`px-2 py-0.5 text-[10px] font-mono-cyber tracking-widest border ${
                      t.resolution_status === 'Resolved'
                        ? 'border-green-500/40 text-green-400 bg-green-500/10'
                        : t.resolution_status === 'Escalated'
                        ? 'border-orange-400/40 text-orange-400 bg-orange-500/10'
                        : 'border-white/20 text-white/40'
                    }`}>
                      {t.resolution_status}
                    </span>
                  )}
                  <button onClick={() => setEditingTicket(t)} className="text-white/20 hover:text-[#00CFFF] transition-colors" title="Επεξεργασία">
                    <Pencil size={13} />
                  </button>
                </div>
              </div>

              {/* Store */}
              <div className="font-orbitron text-[#00CFFF] text-sm tracking-wide">{t.store}</div>

              {/* Category breadcrumb */}
              {t.category && (
                <div className="text-[#00CFFF]/50 text-xs font-mono-cyber">
                  {t.category}{t.subcategory ? ` › ${t.subcategory}` : ''}
                  {t.root_cause ? <span className="text-white/30 ml-2">Root: {t.root_cause}</span> : null}
                </div>
              )}

              {/* Caller + Phone */}
              {(t.caller || t.phone) && (
                <div className="text-white/60 text-sm">
                  {t.caller && <span>{t.caller}</span>}
                  {t.caller && t.phone && <span className="mx-2 text-white/20">·</span>}
                  {t.phone && <span>{t.phone}</span>}
                </div>
              )}

              {/* Problem */}
              <div className="text-white/85 text-base leading-relaxed">{t.problem}</div>

              {/* Notes & Resolution */}
              {t.notes && (
                <div className="text-white/45 text-sm italic border-t border-[#00CFFF]/10 pt-3">{t.notes}</div>
              )}
              {t.resolution_notes && (
                <div className="text-green-400/70 text-sm border-t border-[#00CFFF]/10 pt-2">
                  <span className="font-mono-cyber text-[10px] tracking-widest text-green-400/50 mr-2">ΕΠΙΛΥΣΗ:</span>
                  {t.resolution_notes}
                </div>
              )}
              {t.escalated_to && (
                <div className="text-orange-400/70 text-xs font-mono-cyber tracking-wider">
                  ΚΛΙΜΑΚΩΘΗΚΕ ΣΕ: {t.escalated_to}
                </div>
              )}
            </div>
          );
        })
      )}

      {editingTicket && (
        <EditTicketModal
          ticket={editingTicket}
          onClose={() => setEditingTicket(null)}
          onSaved={() => { setEditingTicket(null); loadTickets(); }}
        />
      )}
    </div>
  );
}