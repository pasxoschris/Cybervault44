import { useState, useEffect } from 'react';
import { Pencil, Phone, Tag, AlertTriangle, ShieldCheck, CheckCircle, Wrench, BookOpen, ChevronDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EditTicketModal from '@/components/servicedesk/EditTicketModal';

const toDisplayDate = (d) => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; };
const toStorageDate = (d) => { const p = d.split('/'); if (p.length !== 3) return d; return `${p[2]}-${p[1]}-${p[0]}`; };
const today = () => new Date().toISOString().split('T')[0];
const nowTime = () => new Date().toTimeString().slice(0, 5);
const toGreekDate = (d) => { if (!d) return '—'; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; };

const ROOT_CAUSES = ['User Error', 'Configuration', 'Network', 'Hardware', 'Software Bug', 'Vendor Issue', 'ISP', 'Unknown'];
const ESCALATED_TO_OPTIONS = ['Spotlight', 'VIVA', 'Nexi', 'MyPOS', 'Wolt', 'eFood', 'AADE', 'Other'];

const PRIORITY_OPTIONS = [
  { key: 'low', label: 'ΧΑΜΗΛΗ', color: 'border-blue-400/40 text-blue-400 bg-blue-400/5' },
  { key: 'normal', label: 'ΚΑΝΟΝΙΚΗ', color: 'border-[#00CFFF]/40 text-[#00CFFF] bg-[#00CFFF]/5' },
  { key: 'high', label: 'ΥΨΗΛΗ', color: 'border-yellow-400/40 text-yellow-400 bg-yellow-400/5' },
  { key: 'urgent', label: 'ΚΡΙΣΙΜΗ', color: 'border-red-400/40 text-red-400 bg-red-400/5' },
];

function CyberSelect({ value, onChange, placeholder, children, required }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full cyber-input appearance-none pr-8 cursor-pointer"
        style={{ background: 'rgba(19,24,64,0.8)' }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00CFFF]/50 pointer-events-none" />
    </div>
  );
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="border border-[#00CFFF]/20 bg-[#131840]/80 p-4 space-y-3">
      <div className="flex items-center gap-2 border-b border-[#00CFFF]/10 pb-3">
        <Icon size={14} className="text-[#00CFFF]" />
        <span className="font-mono-cyber text-[11px] tracking-widest text-[#00CFFF]/70 uppercase">{title}</span>
      </div>
      {children}
    </div>
  );
}

export default function TicketForm({ user, onSaved }) {
  const [stores, setStores] = useState([]);
  const [storesError, setStoresError] = useState('');
  const [masterData, setMasterData] = useState({
    ticketTypes: [], categories: [], subcategories: [], supportLevels: [], resolutionStatuses: []
  });

  useEffect(() => {
    base44.functions.invoke('getStores', {})
      .then(res => setStores(res.data?.stores || []))
      .catch(() => setStoresError('Αδυναμία φόρτωσης καταστημάτων.'));

    Promise.all([
      base44.entities.TicketType.list('display_order', 50),
      base44.entities.TicketCategory.list('display_order', 50),
      base44.entities.TicketSubcategory.list('display_order', 200),
      base44.entities.SupportLevel.list('display_order', 10),
      base44.entities.ResolutionStatus.list('display_order', 20),
    ]).then(([ticketTypes, categories, subcategories, supportLevels, resolutionStatuses]) => {
      const defaultType = ticketTypes.find(t => t.name === 'Incident');
      const defaultLevel = supportLevels.find(l => l.level_number === 1);
      setMasterData({ ticketTypes, categories, subcategories, supportLevels, resolutionStatuses });
      setForm(f => ({
        ...f,
        ticket_type_id: defaultType?.id || '',
        ticket_type: defaultType?.name || '',
        support_level_id: defaultLevel?.id || '',
        support_level: defaultLevel?.name || '',
      }));
    });
  }, []);

  const [form, setForm] = useState({
    date: today(), time: nowTime(), operator: user?.full_name || '',
    store_id: '', store: '',
    caller: '', phone: '',
    ticket_type_id: '', ticket_type: '',
    category_id: '', category: '',
    subcategory_id: '', subcategory: '',
    priority: 'normal',
    support_level_id: '', support_level: '',
    resolution_status_id: '', resolution_status: '',
    escalated_to: '',
    root_cause: '',
    problem: '', notes: '', resolution_notes: '',
    create_kb_article: false,
  });

  const [storeSearch, setStoreSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [storeTickets, setStoreTickets] = useState([]);
  const [storeTicketsLoading, setStoreTicketsLoading] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    if (!form.store_id) { setStoreTickets([]); return; }
    setStoreTicketsLoading(true);
    base44.functions.invoke('getStoreTickets', { store_id: form.store_id, store: form.store })
      .then(res => setStoreTickets(res.data?.tickets || []))
      .catch(() => {})
      .finally(() => setStoreTicketsLoading(false));
  }, [form.store_id]);

  const filteredSubcategories = masterData.subcategories.filter(s => s.category_id === form.category_id);

  const filteredStores = stores.filter(s => {
    const q = storeSearch.toLowerCase();
    return s.label.toLowerCase().includes(q) || s.business_name.toLowerCase().includes(q) ||
      s.trade_name.toLowerCase().includes(q) || s.store_name.toLowerCase().includes(q) || s.vat_number.toLowerCase().includes(q);
  }).slice(0, 50);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const selectStore = (storeObj) => {
    set('store_id', storeObj.id); set('store', storeObj.label);
    setStoreSearch(''); setShowDropdown(false);
  };

  const selectTicketType = (id) => {
    const t = masterData.ticketTypes.find(x => x.id === id);
    setForm(f => ({ ...f, ticket_type_id: id, ticket_type: t?.name || '' }));
  };

  const selectCategory = (id) => {
    const c = masterData.categories.find(x => x.id === id);
    setForm(f => ({ ...f, category_id: id, category: c?.name || '', subcategory_id: '', subcategory: '' }));
  };

  const selectSubcategory = (id) => {
    const s = masterData.subcategories.find(x => x.id === id);
    setForm(f => ({ ...f, subcategory_id: id, subcategory: s?.name || '' }));
  };

  const selectSupportLevel = (id) => {
    const l = masterData.supportLevels.find(x => x.id === id);
    setForm(f => ({ ...f, support_level_id: id, support_level: l?.name || '' }));
  };

  const selectResolutionStatus = (id) => {
    const s = masterData.resolutionStatuses.find(x => x.id === id);
    setForm(f => ({ ...f, resolution_status_id: id, resolution_status: s?.name || '', escalated_to: s?.name === 'Escalated' ? f.escalated_to : '' }));
  };

  const isEscalated = form.resolution_status === 'Escalated';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setSubmitError('');
    try {
      await base44.entities.Ticket.create(form);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setForm({
          date: today(), time: nowTime(), operator: user?.full_name || '',
          store_id: '', store: '', caller: '', phone: '',
          ticket_type_id: form.ticket_type_id, ticket_type: form.ticket_type,
          category_id: '', category: '', subcategory_id: '', subcategory: '',
          priority: 'normal',
          support_level_id: form.support_level_id, support_level: form.support_level,
          resolution_status_id: '', resolution_status: '',
          escalated_to: '', root_cause: '',
          problem: '', notes: '', resolution_notes: '',
          create_kb_article: false,
        });
        setStoreSearch('');
        onSaved();
      }, 1200);
    } catch {
      setSubmitError('Σφάλμα καταχώρησης. Παρακαλώ δοκιμάστε ξανά.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ── Row 1: Date / Time / Operator ── */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΗΜΕΡΟΜΗΝΙΑ</label>
          <input type="text" value={toDisplayDate(form.date)} onChange={e => set('date', toStorageDate(e.target.value))}
            className="cyber-input" required placeholder="ηη/μμ/εεεε" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΩΡΑ</label>
          <input type="text" value={form.time} onChange={e => set('time', e.target.value)}
            className="cyber-input" placeholder="ΩΩ:ΛΛ" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΧΕΙΡΙΣΤΗΣ</label>
          <input type="text" value={form.operator} onChange={e => set('operator', e.target.value)}
            className="cyber-input" placeholder="Όνομα" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5 items-start">
        {/* ── LEFT COLUMN ── */}
        <div className="space-y-4">

          {/* SECTION: Ticket Info */}
          <SectionCard icon={Phone} title="Στοιχεία Κλήσης">
            {/* Store */}
            <div className="relative">
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΚΑΤΑΣΤΗΜΑ *</label>
              {storesError && <p className="text-red-400 text-xs mb-1">{storesError}</p>}
              <input
                type="text"
                value={storeSearch || form.store}
                onChange={e => { setStoreSearch(e.target.value); set('store', ''); set('store_id', ''); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                className="cyber-input"
                placeholder="Αναζήτηση καταστήματος..."
                required={!form.store}
              />
              {form.store && !storeSearch &&
                <div className="mt-1 text-[#00CFFF] text-xs font-mono-cyber">✓ {form.store}</div>
              }
              {showDropdown && storeSearch && filteredStores.length > 0 && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                  <div className="absolute z-50 left-0 right-0 mt-1 max-h-52 overflow-y-auto border border-[#00CFFF]/30 bg-[#0E1235] shadow-2xl shadow-black/70">
                    {filteredStores.map(s => (
                      <div key={s.id} onClick={() => selectStore(s)}
                        className="px-4 py-2 text-white/80 hover:bg-[#00CFFF]/10 hover:text-[#00CFFF] cursor-pointer text-sm">
                        <div>{s.label}</div>
                        {s.vat_number && <div className="text-white/30 text-xs">ΑΦΜ: {s.vat_number}</div>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Caller + Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΠΟΙΟΣ ΚΑΛΕΣΕ</label>
                <input type="text" value={form.caller} onChange={e => set('caller', e.target.value)}
                  className="cyber-input" placeholder="Όνομα καλούντα" />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΤΗΛΕΦΩΝΟ</label>
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                  className="cyber-input" placeholder="6900000000" />
              </div>
            </div>
          </SectionCard>

          {/* SECTION: Classification */}
          <SectionCard icon={Tag} title="Κατηγοριοποίηση">
            {/* Ticket Type */}
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΤΥΠΟΣ TICKET *</label>
              <CyberSelect value={form.ticket_type_id} onChange={selectTicketType} placeholder="Επιλέξτε τύπο..." required>
                {masterData.ticketTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </CyberSelect>
            </div>

            {/* Category + Subcategory side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΚΑΤΗΓΟΡΙΑ</label>
                <CyberSelect value={form.category_id} onChange={selectCategory} placeholder="Κατηγορία...">
                  {masterData.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </CyberSelect>
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΥΠΟΚΑΤΗΓΟΡΙΑ</label>
                <CyberSelect value={form.subcategory_id} onChange={selectSubcategory} placeholder="Υποκατηγορία..."
                  disabled={!form.category_id}>
                  {filteredSubcategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </CyberSelect>
              </div>
            </div>

            {/* Root Cause */}
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ROOT CAUSE</label>
              <CyberSelect value={form.root_cause} onChange={v => set('root_cause', v)} placeholder="Επιλέξτε αιτία (προαιρετικό)...">
                {ROOT_CAUSES.map(r => <option key={r} value={r}>{r}</option>)}
              </CyberSelect>
            </div>
          </SectionCard>

          {/* SECTION: Priority + Support Level */}
          <SectionCard icon={AlertTriangle} title="Προτεραιότητα & Επίπεδο Υποστήριξης">
            <div>
              <label className="block text-white/40 text-xs mb-2 font-mono-cyber tracking-widest">ΠΡΟΤΕΡΑΙΟΤΗΤΑ</label>
              <div className="grid grid-cols-4 gap-2">
                {PRIORITY_OPTIONS.map(p => (
                  <div key={p.key} onClick={() => set('priority', p.key)}
                    className={`flex items-center justify-center gap-2 p-2 border cursor-pointer transition-all font-mono-cyber text-[11px] tracking-widest ${
                      form.priority === p.key ? `${p.color} border-current` : 'border-[#00CFFF]/15 bg-[#131840]/40 text-white/35 hover:border-[#00CFFF]/35'
                    }`}>
                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                      form.priority === p.key ? 'border-current bg-current' : 'border-[#00CFFF]/40'}`}>
                      {form.priority === p.key && <span className="text-[#0E1235] text-[7px] font-bold">✓</span>}
                    </div>
                    {p.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/40 text-xs mb-2 font-mono-cyber tracking-widest">ΕΠΙΠΕΔΟ ΥΠΟΣΤΗΡΙΞΗΣ</label>
              <div className="grid grid-cols-3 gap-2">
                {masterData.supportLevels.map(l => (
                  <div key={l.id} onClick={() => selectSupportLevel(l.id)}
                    className={`p-3 border cursor-pointer transition-all text-center ${
                      form.support_level_id === l.id
                        ? 'border-[#00CFFF]/70 bg-[#00CFFF]/10 text-[#00CFFF]'
                        : 'border-[#00CFFF]/15 bg-[#131840]/40 text-white/40 hover:border-[#00CFFF]/35'
                    }`}>
                    <div className="font-orbitron text-sm font-bold">{l.name}</div>
                    {l.description && (
                      <div className="text-[10px] mt-1 leading-tight opacity-60 font-mono-cyber line-clamp-2">{l.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* SECTION: Resolution */}
          <SectionCard icon={CheckCircle} title="Κατάσταση Επίλυσης">
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΚΑΤΑΣΤΑΣΗ</label>
              <CyberSelect value={form.resolution_status_id} onChange={selectResolutionStatus} placeholder="Επιλέξτε κατάσταση...">
                {masterData.resolutionStatuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </CyberSelect>
            </div>
            {isEscalated && (
              <div>
                <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΚΛΙΜΑΚΩΘΗΚΕ ΣΕ</label>
                <CyberSelect value={form.escalated_to} onChange={v => set('escalated_to', v)} placeholder="Επιλέξτε...">
                  {ESCALATED_TO_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </CyberSelect>
              </div>
            )}
          </SectionCard>

          {/* SECTION: Description & Actions */}
          <SectionCard icon={Wrench} title="Περιγραφή & Ενέργειες">
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΠΕΡΙΓΡΑΦΗ ΠΡΟΒΛΗΜΑΤΟΣ *</label>
              <textarea value={form.problem} onChange={e => set('problem', e.target.value)}
                className="cyber-input resize-none" rows={3}
                placeholder="Περιγραφή προβλήματος όπως το αντιλαμβάνεται ο χρήστης..." required />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΕΝΕΡΓΕΙΕΣ ΠΟΥ ΕΓΙΝΑΝ</label>
              <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                className="cyber-input resize-none" rows={2} placeholder="Βήματα που ακολουθήθηκαν..." />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΣΗΜΕΙΩΣΕΙΣ ΕΠΙΛΥΣΗΣ</label>
              <textarea value={form.resolution_notes} onChange={e => set('resolution_notes', e.target.value)}
                className="cyber-input resize-none" rows={2} placeholder="Τι επέλυσε το πρόβλημα..." />
            </div>
          </SectionCard>

          {/* SECTION: Knowledge Base */}
          <SectionCard icon={BookOpen} title="Knowledge Base">
            <div onClick={() => set('create_kb_article', !form.create_kb_article)}
              className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${
                form.create_kb_article ? 'border-[#00CFFF]/60 bg-[#00CFFF]/10' : 'border-[#00CFFF]/20 bg-[#131840]/60 hover:border-[#00CFFF]/40'
              }`}>
              <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-all ${
                form.create_kb_article ? 'border-[#00CFFF] bg-[#00CFFF]' : 'border-[#00CFFF]/40'}`}>
                {form.create_kb_article && <span className="text-[#0E1235] text-xs font-bold">✓</span>}
              </div>
              <div>
                <div className="text-white/80 text-sm">Δημιουργία άρθρου Knowledge Base</div>
                <div className="text-white/30 text-xs mt-0.5">Το CyberVault AI Assistant θα μετατρέψει αυτό το ticket σε άρθρο γνώσης.</div>
              </div>
            </div>
          </SectionCard>

          {submitError && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">{submitError}</p>}

          <button type="submit" disabled={saving || saved || !form.store}
            className="w-full cyber-btn disabled:opacity-50 disabled:cursor-not-allowed">
            {saved ? '✓ ΑΠΟΘΗΚΕΥΤΗΚΕ' : saving ? 'ΑΠΟΘΗΚΕΥΣΗ...' : 'ΚΑΤΑΧΩΡΗΣΗ TICKET'}
          </button>
        </div>

        {/* ── RIGHT COLUMN: Store History ── */}
        {form.store && (
          <aside className="border border-[#00CFFF]/20 bg-[#131840]/80 p-5 space-y-4 sticky top-28">
            <div>
              <div className="text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΙΣΤΟΡΙΚΟ ΚΑΤΑΣΤΗΜΑΤΟΣ</div>
              <h3 className="font-orbitron text-white text-sm leading-snug">{form.store}</h3>
            </div>
            {storeTicketsLoading && (
              <div className="py-8 text-center font-mono-cyber text-[#00CFFF]/40 text-xs tracking-widest">ΦΟΡΤΩΣΗ...</div>
            )}
            {!storeTicketsLoading && storeTickets.length === 0 && (
              <div className="py-8 text-center text-white/35 text-sm">Δεν υπάρχουν προηγούμενα tickets.</div>
            )}
            {!storeTicketsLoading && storeTickets.length > 0 && (
              <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
                {storeTickets.map(ticket => (
                  <StoreTicketCard key={ticket.id} ticket={ticket} onEdit={() => setEditingTicket(ticket)} />
                ))}
              </div>
            )}
          </aside>
        )}
      </div>

      {editingTicket && (
        <EditTicketModal
          ticket={editingTicket}
          onClose={() => setEditingTicket(null)}
          onSaved={() => {
            setEditingTicket(null);
            if (form.store_id) {
              base44.functions.invoke('getStoreTickets', { store_id: form.store_id, store: form.store })
                .then(res => setStoreTickets(res.data?.tickets || [])).catch(() => {});
            }
          }}
        />
      )}
    </form>
  );
}

function StoreTicketCard({ ticket, onEdit }) {
  return (
    <div className="border border-[#00CFFF]/10 bg-[#0E1235]/80 p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="font-mono-cyber text-xs text-[#00CFFF]/60">
          {toGreekDate(ticket.date)}{ticket.time ? ` · ${ticket.time}` : ''}
        </div>
        <div className="flex items-center gap-2">
          {ticket.operator && <span className="text-white/40 text-xs">{ticket.operator}</span>}
          {ticket.ticket_type && (
            <span className="px-1.5 py-0.5 text-[9px] font-mono-cyber tracking-widest border border-[#00CFFF]/30 text-[#00CFFF]/70 bg-[#00CFFF]/5">
              {ticket.ticket_type}
            </span>
          )}
          {ticket.resolution_status && (
            <span className={`px-1.5 py-0.5 text-[9px] font-mono-cyber tracking-widest border ${
              ticket.resolution_status === 'Resolved'
                ? 'border-green-500/40 text-green-400 bg-green-500/10'
                : 'border-white/20 text-white/40'
            }`}>{ticket.resolution_status}</span>
          )}
          <button onClick={onEdit} className="text-white/20 hover:text-[#00CFFF] transition-colors ml-1" title="Επεξεργασία">
            <Pencil size={12} />
          </button>
        </div>
      </div>
      {ticket.category && (
        <div className="text-[#00CFFF]/60 text-xs font-mono-cyber">
          {ticket.category}{ticket.subcategory ? ` › ${ticket.subcategory}` : ''}
        </div>
      )}
      {ticket.problem && <div className="text-white/80 text-sm leading-relaxed">{ticket.problem}</div>}
      {ticket.notes && <div className="text-white/50 text-xs leading-relaxed italic">"{ticket.notes}"</div>}
    </div>
  );
}