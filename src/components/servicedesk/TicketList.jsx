import { useEffect, useState, useMemo, useRef } from 'react';
import { Pencil, Search, X, Upload } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EditTicketModal from '@/components/servicedesk/EditTicketModal';

const toDisplayDate = (d) => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; };
const toStorageDate = (d) => { const p = d.split('/'); if (p.length !== 3) return d; return `${p[2]}-${p[1]}-${p[0]}`; };
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
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState('');
  const [sheetName, setSheetName] = useState('Support');
  const [deleteExisting, setDeleteExisting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    setImportStatus('Φόρτωση αρχείου...');
    try {
      const uploadRes = await base44.integrations.Core.UploadFile({ file });
      setImportStatus('Ανάλυση δεδομένων...');
      const res = await base44.functions.invoke('importTicketsFromExcel', {
        file_url: uploadRes.file_url,
        sheet_name: sheetName || 'Support',
      });
      const data = res.data;
      if (data.error) {
        setImportStatus(`Σφάλμα: ${data.error}`);
        return;
      }
      const tickets = data.tickets || [];
      if (tickets.length === 0) {
        setImportStatus('Δεν βρέθηκαν έγκυρα tickets (απαιτείται Κατάστημα & Πρόβλημα).');
        return;
      }
      // Delete existing if checkbox is checked
      if (deleteExisting) {
        setImportStatus('Διαγραφή υπαρχόντων tickets...');
        const existing = await base44.entities.Ticket.list();
        for (let i = 0; i < existing.length; i += 200) {
          const batch = existing.slice(i, i + 200);
          await Promise.all(batch.map(t => base44.entities.Ticket.delete(t.id)));
        }
      }
      setImportStatus(`Δημιουργία ${tickets.length} tickets...`);
      // Batch in chunks of 200
      const batchSize = 200;
      let imported = 0;
      for (let i = 0; i < tickets.length; i += batchSize) {
        const batch = tickets.slice(i, i + batchSize);
        await base44.entities.Ticket.bulkCreate(batch);
        imported += batch.length;
        setImportStatus(`Δημιουργία ${imported}/${tickets.length} tickets...`);
      }
      setImportStatus(`✓ Εισήχθησαν ${imported} tickets! (Sheet: ${data.sheet_used})`);
      loadTickets();
    } catch (err) {
      setImportStatus(`Σφάλμα: ${err.message || 'Δοκιμάστε ξανά.'}`);
    } finally {
      setImporting(false);
      setTimeout(() => setImportStatus(''), 6000);
    }
    e.target.value = '';
  };

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
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileImport}
            accept=".xlsx,.csv,.xls,.json"
            className="hidden"
          />
          <input
            type="text"
            value={sheetName}
            onChange={e => setSheetName(e.target.value)}
            className="cyber-input text-xs w-44 flex-shrink-0"
            placeholder="Sheet name (προαιρετικό)"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            className="flex items-center gap-1.5 px-3 py-2 border border-[#00CFFF]/30 text-[#00CFFF]/70 text-xs hover:bg-[#00CFFF]/10 hover:border-[#00CFFF]/60 transition-colors disabled:opacity-40 flex-shrink-0"
          >
            <Upload size={13} />
            {importing ? 'Εισαγωγή...' : 'Εισαγωγή'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={deleteExisting}
              onChange={e => setDeleteExisting(e.target.checked)}
              className="w-3.5 h-3.5 accent-[#00CFFF]"
            />
            <span className="text-xs text-white/50">Διαγραφή υπαρχόντων πριν την εισαγωγή</span>
          </label>
        </div>
        {importStatus && (
          <div className={`text-xs px-3 py-1.5 border ${importStatus.startsWith('✓') ? 'border-green-500/30 bg-green-500/10 text-green-400' : importStatus.startsWith('Σφάλμα') ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-[#00CFFF]/20 bg-[#00CFFF]/5 text-[#00CFFF]/70'}`}>
            {importStatus}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <span>ΑΠΟ</span>
            <input
              type="text"
              value={toDisplayDate(dateFrom)}
              onChange={e => setDateFrom(toStorageDate(e.target.value))}
              className="cyber-input text-xs w-36"
              placeholder="ηη/μμ/εεεε"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <span>ΕΩΣ</span>
            <input
              type="text"
              value={toDisplayDate(dateTo)}
              onChange={e => setDateTo(toStorageDate(e.target.value))}
              className="cyber-input text-xs w-36"
              placeholder="ηη/μμ/εεεε"
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