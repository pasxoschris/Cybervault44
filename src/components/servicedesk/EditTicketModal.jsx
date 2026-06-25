import { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const toDisplayDate = (d) => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; };
const toStorageDate = (d) => { const p = d.split('/'); if (p.length !== 3) return d; return `${p[2]}-${p[1]}-${p[0]}`; };

const ROOT_CAUSES = ['User Error', 'Configuration', 'Network', 'Hardware', 'Software Bug', 'Vendor Issue', 'ISP', 'Unknown'];
const ESCALATED_TO_OPTIONS = ['Spotlight', 'VIVA', 'Nexi', 'MyPOS', 'Wolt', 'eFood', 'AADE', 'Other'];
const PRIORITY_OPTIONS = [
  { key: 'low', label: 'ΧΑΜΗΛΗ', color: 'border-blue-400/40 text-blue-400 bg-blue-400/5' },
  { key: 'normal', label: 'ΚΑΝΟΝΙΚΗ', color: 'border-[#00CFFF]/40 text-[#00CFFF] bg-[#00CFFF]/5' },
  { key: 'high', label: 'ΥΨΗΛΗ', color: 'border-yellow-400/40 text-yellow-400 bg-yellow-400/5' },
  { key: 'urgent', label: 'ΚΡΙΣΙΜΗ', color: 'border-red-400/40 text-red-400 bg-red-400/5' },
];

function CyberSelect({ value, onChange, placeholder, children, disabled }) {
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled}
        className="w-full cyber-input text-xs appearance-none pr-7 cursor-pointer disabled:opacity-40"
        style={{ background: 'rgba(19,24,64,0.8)' }}>
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#00CFFF]/50 pointer-events-none" />
    </div>
  );
}

export default function EditTicketModal({ ticket, onClose, onSaved }) {
  const [form, setForm] = useState({});
  const [stores, setStores] = useState([]);
  const [storeSearch, setStoreSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [masterData, setMasterData] = useState({
    ticketTypes: [], categories: [], subcategories: [], supportLevels: [], resolutionStatuses: []
  });

  useEffect(() => {
    if (!ticket) return;
    setForm({
      date: ticket.date || '', time: ticket.time || '', operator: ticket.operator || '',
      store_id: ticket.store_id || '', store: ticket.store || '',
      caller: ticket.caller || '', phone: ticket.phone || '',
      ticket_type_id: ticket.ticket_type_id || '', ticket_type: ticket.ticket_type || '',
      category_id: ticket.category_id || '', category: ticket.category || '',
      subcategory_id: ticket.subcategory_id || '', subcategory: ticket.subcategory || '',
      priority: ticket.priority || 'normal',
      support_level_id: ticket.support_level_id || '', support_level: ticket.support_level || '',
      resolution_status_id: ticket.resolution_status_id || '', resolution_status: ticket.resolution_status || '',
      escalated_to: ticket.escalated_to || '',
      root_cause: ticket.root_cause || '',
      problem: ticket.problem || '', notes: ticket.notes || '', resolution_notes: ticket.resolution_notes || '',
      create_kb_article: ticket.create_kb_article || false,
    });

    Promise.all([
      base44.functions.invoke('getStores', {}),
      base44.entities.TicketType.list('display_order', 50),
      base44.entities.TicketCategory.list('display_order', 50),
      base44.entities.TicketSubcategory.list('display_order', 200),
      base44.entities.SupportLevel.list('display_order', 10),
      base44.entities.ResolutionStatus.list('display_order', 20),
    ]).then(([storesRes, ticketTypes, categories, subcategories, supportLevels, resolutionStatuses]) => {
      setStores(storesRes.data?.stores || []);
      setMasterData({ ticketTypes, categories, subcategories, supportLevels, resolutionStatuses });
    });
  }, [ticket]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const filteredSubcategories = masterData.subcategories.filter(s => s.category_id === form.category_id);

  const filteredStores = stores.filter(s => {
    const q = storeSearch.toLowerCase();
    return s.label.toLowerCase().includes(q) || s.business_name.toLowerCase().includes(q) ||
      s.trade_name.toLowerCase().includes(q) || s.store_name.toLowerCase().includes(q) || s.vat_number.toLowerCase().includes(q);
  }).slice(0, 50);

  const selectStore = (storeObj) => { set('store_id', storeObj.id); set('store', storeObj.label); setStoreSearch(''); setShowDropdown(false); };

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
    setForm(f => ({ ...f, resolution_status_id: id, resolution_status: s?.name || '' }));
  };

  const handleSave = async () => {
    if (!form.store || !form.problem) { setError('Το κατάστημα και το πρόβλημα είναι υποχρεωτικά.'); return; }
    setSaving(true); setError('');
    try {
      await base44.entities.Ticket.update(ticket.id, form);
      onSaved(); onClose();
    } catch {
      setError('Σφάλμα αποθήκευσης. Δοκιμάστε ξανά.');
    }
    setSaving(false);
  };

  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0E1235] border border-[#00CFFF]/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-[#00CFFF]/20 sticky top-0 bg-[#0E1235] z-10">
          <h3 className="font-orbitron text-white text-base">ΕΠΕΞΕΡΓΑΣΙΑ TICKET</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={20} /></button>
        </div>

        <div className="p-5 space-y-4">
          {/* Date + Time + Operator */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΗΜΕΡΟΜΗΝΙΑ</label>
              <input type="text" value={toDisplayDate(form.date)} onChange={e => set('date', toStorageDate(e.target.value))}
                className="cyber-input text-xs" placeholder="ηη/μμ/εεεε" />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΩΡΑ</label>
              <input type="text" value={form.time} onChange={e => set('time', e.target.value)}
                className="cyber-input text-xs" placeholder="ΩΩ:ΛΛ" />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΧΕΙΡΙΣΤΗΣ</label>
              <input type="text" value={form.operator} onChange={e => set('operator', e.target.value)}
                className="cyber-input text-xs" placeholder="Όνομα" />
            </div>
          </div>

          {/* Store */}
          <div className="relative">
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΚΑΤΑΣΤΗΜΑ</label>
            <input type="text"
              value={storeSearch || form.store}
              onChange={e => { setStoreSearch(e.target.value); set('store', ''); set('store_id', ''); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              className="cyber-input text-xs" placeholder="Αναζήτηση..." />
            {showDropdown && storeSearch && filteredStores.length > 0 && (
              <div className="absolute z-50 left-0 right-0 mt-1 max-h-44 overflow-y-auto border border-[#00CFFF]/30 bg-[#0E1235] shadow-lg">
                {filteredStores.map(s => (
                  <div key={s.id} onMouseDown={() => selectStore(s)}
                    className="px-3 py-2 text-white/80 hover:bg-[#00CFFF]/10 hover:text-[#00CFFF] cursor-pointer text-xs">
                    {s.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Caller + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΠΟΙΟΣ ΚΑΛΕΣΕ</label>
              <input type="text" value={form.caller} onChange={e => set('caller', e.target.value)} className="cyber-input text-xs" />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΤΗΛΕΦΩΝΟ</label>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="cyber-input text-xs" />
            </div>
          </div>

          {/* Ticket Type */}
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΤΥΠΟΣ TICKET</label>
            <CyberSelect value={form.ticket_type_id} onChange={selectTicketType} placeholder="Επιλέξτε τύπο...">
              {masterData.ticketTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </CyberSelect>
          </div>

          {/* Category + Subcategory */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΚΑΤΗΓΟΡΙΑ</label>
              <CyberSelect value={form.category_id} onChange={selectCategory} placeholder="Κατηγορία...">
                {masterData.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </CyberSelect>
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΥΠΟΚΑΤΗΓΟΡΙΑ</label>
              <CyberSelect value={form.subcategory_id} onChange={selectSubcategory} placeholder="Υποκατηγορία..." disabled={!form.category_id}>
                {filteredSubcategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </CyberSelect>
            </div>
          </div>

          {/* Root Cause */}
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ROOT CAUSE</label>
            <CyberSelect value={form.root_cause} onChange={v => set('root_cause', v)} placeholder="Επιλέξτε αιτία...">
              {ROOT_CAUSES.map(r => <option key={r} value={r}>{r}</option>)}
            </CyberSelect>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-white/40 text-xs mb-2 font-mono-cyber tracking-widest">ΠΡΟΤΕΡΑΙΟΤΗΤΑ</label>
            <div className="grid grid-cols-4 gap-1.5">
              {PRIORITY_OPTIONS.map(p => (
                <div key={p.key} onClick={() => set('priority', p.key)}
                  className={`flex items-center justify-center gap-1 p-2 border cursor-pointer transition-all font-mono-cyber text-[10px] tracking-widest ${
                    form.priority === p.key ? `${p.color} border-current` : 'border-[#00CFFF]/15 bg-[#131840]/40 text-white/35 hover:border-[#00CFFF]/35'
                  }`}>
                  <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    form.priority === p.key ? 'border-current bg-current' : 'border-[#00CFFF]/40'}`}>
                    {form.priority === p.key && <span className="text-[#0E1235] text-[6px] font-bold">✓</span>}
                  </div>
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Support Level */}
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΕΠΙΠΕΔΟ ΥΠΟΣΤΗΡΙΞΗΣ</label>
            <CyberSelect value={form.support_level_id} onChange={selectSupportLevel} placeholder="Επιλέξτε επίπεδο...">
              {masterData.supportLevels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </CyberSelect>
          </div>

          {/* Resolution Status */}
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΚΑΤΑΣΤΑΣΗ ΕΠΙΛΥΣΗΣ</label>
            <CyberSelect value={form.resolution_status_id} onChange={selectResolutionStatus} placeholder="Επιλέξτε κατάσταση...">
              {masterData.resolutionStatuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </CyberSelect>
          </div>



          {/* Problem */}
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΠΕΡΙΓΡΑΦΗ ΠΡΟΒΛΗΜΑΤΟΣ</label>
            <textarea value={form.problem} onChange={e => set('problem', e.target.value)}
              className="cyber-input resize-none text-xs" rows={3} placeholder="Περιγραφή..." />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΕΝΕΡΓΕΙΕΣ ΠΟΥ ΕΓΙΝΑΝ</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
              className="cyber-input resize-none text-xs" rows={2} placeholder="Βήματα που ακολουθήθηκαν..." />
          </div>

          {/* Resolution Notes */}
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΣΗΜΕΙΩΣΕΙΣ ΕΠΙΛΥΣΗΣ</label>
            <textarea value={form.resolution_notes} onChange={e => set('resolution_notes', e.target.value)}
              className="cyber-input resize-none text-xs" rows={2} placeholder="Τι επέλυσε το πρόβλημα..." />
          </div>

          {/* KB Article */}
          <div onClick={() => set('create_kb_article', !form.create_kb_article)}
            className={`flex items-center gap-3 p-3 border cursor-pointer transition-all text-xs ${
              form.create_kb_article ? 'border-[#00CFFF]/60 bg-[#00CFFF]/10' : 'border-[#00CFFF]/20 bg-[#131840]/60 hover:border-[#00CFFF]/40'
            }`}>
            <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 ${
              form.create_kb_article ? 'border-[#00CFFF] bg-[#00CFFF]' : 'border-[#00CFFF]/40'}`}>
              {form.create_kb_article && <span className="text-[#0E1235] text-xs font-bold">✓</span>}
            </div>
            <span className="text-white/80">Δημιουργία άρθρου Knowledge Base</span>
          </div>

          {error && <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 px-3 py-2">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 border border-[#00CFFF]/30 text-white/50 font-orbitron text-xs tracking-widest hover:border-[#00CFFF]/60 hover:text-white/70 transition-all">
              ΑΚΥΡΟ
            </button>
            <button onClick={handleSave} disabled={saving} className="flex-1 cyber-btn text-xs disabled:opacity-50">
              {saving ? 'ΑΠΟΘΗΚΕΥΣΗ...' : 'ΑΠΟΘΗΚΕΥΣΗ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}