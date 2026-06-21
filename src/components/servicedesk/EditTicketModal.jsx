import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const toDisplayDate = (d) => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; };
const toStorageDate = (d) => { const p = d.split('/'); if (p.length !== 3) return d; return `${p[2]}-${p[1]}-${p[0]}`; };

const CATEGORIES = [
  { key: 'category_not_spotlight', label: 'ΔΕΝ ΑΦΟΡΟΥΣΕ ΤΗ SPOTLIGHT' },
  { key: 'category_printers', label: 'ΕΚΤΥΠΩΤΕΣ' },
  { key: 'category_settings', label: 'ΡΥΘΜΙΣΕΙΣ ΕΦΑΡΜΟΓΗΣ' },
  { key: 'category_pos', label: 'POS' },
  { key: 'category_pda', label: 'PDA' },
  { key: 'category_invoices', label: 'Τιμολόγια' },
];

export default function EditTicketModal({ ticket, onClose, onSaved }) {
  const [form, setForm] = useState({});
  const [stores, setStores] = useState([]);
  const [storeSearch, setStoreSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ticket) return;
    setForm({
      date: ticket.date || '',
      time: ticket.time || '',
      operator: ticket.operator || '',
      store_id: ticket.store_id || '',
      store: ticket.store || '',
      caller: ticket.caller || '',
      phone: ticket.phone || '',
      problem: ticket.problem || '',
      priority: ticket.priority || 'normal',
      resolved: ticket.resolved || false,
      notes: ticket.notes || '',
      category_not_spotlight: ticket.category_not_spotlight || false,
      category_printers: ticket.category_printers || false,
      category_settings: ticket.category_settings || false,
      category_pos: ticket.category_pos || false,
      category_pda: ticket.category_pda || false,
      category_invoices: ticket.category_invoices || false,
    });
    base44.functions.invoke('getStores', {})
      .then(res => setStores(res.data?.stores || []))
      .catch(() => {});
  }, [ticket]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const filteredStores = stores.filter(s => {
    const q = storeSearch.toLowerCase();
    return s.label.toLowerCase().includes(q)
      || s.business_name.toLowerCase().includes(q)
      || s.trade_name.toLowerCase().includes(q)
      || s.store_name.toLowerCase().includes(q)
      || s.vat_number.toLowerCase().includes(q);
  }).slice(0, 50);

  const selectStore = (storeObj) => {
    set('store_id', storeObj.id);
    set('store', storeObj.label);
    setStoreSearch('');
    setShowDropdown(false);
  };

  const handleSave = async () => {
    if (!form.store || !form.problem) {
      setError('Το κατάστημα και το πρόβλημα είναι υποχρεωτικά.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await base44.entities.Ticket.update(ticket.id, form);
      onSaved();
      onClose();
    } catch {
      setError('Σφάλμα αποθήκευσης. Δοκιμάστε ξανά.');
    }
    setSaving(false);
  };

  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0E1235] border border-[#00CFFF]/30 w-full max-w-xl max-h-[85vh] overflow-y-auto mx-4" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#00CFFF]/20">
          <h3 className="font-orbitron text-white text-base">ΕΠΕΞΕΡΓΑΣΙΑ TICKET</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Date + Time + Operator */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-mono-cyber text-xs tracking-widest text-[#00CFFF]/60 mb-1 uppercase">Ημερομηνία</label>
              <input type="text" value={toDisplayDate(form.date)} onChange={e => set('date', toStorageDate(e.target.value))}
                className="cyber-input text-xs" placeholder="ηη/μμ/εεεε" />
            </div>
            <div>
              <label className="block font-mono-cyber text-xs tracking-widest text-[#00CFFF]/60 mb-1 uppercase">Ώρα</label>
              <input type="time" value={form.time} onChange={e => set('time', e.target.value)}
                className="cyber-input text-xs" />
            </div>
            <div>
              <label className="block font-mono-cyber text-xs tracking-widest text-[#00CFFF]/60 mb-1 uppercase">Χειριστής</label>
              <input type="text" value={form.operator} onChange={e => set('operator', e.target.value)}
                className="cyber-input text-xs" placeholder="Όνομα" />
            </div>
          </div>

          {/* Store */}
          <div className="relative">
            <label className="block font-mono-cyber text-xs tracking-widest text-[#00CFFF]/60 mb-1 uppercase">Κατάστημα</label>
            <input
              type="text"
              value={storeSearch || form.store}
              onChange={e => { setStoreSearch(e.target.value); set('store', ''); set('store_id', ''); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              className="cyber-input text-xs"
              placeholder="Αναζήτηση..."
            />
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
              <label className="block font-mono-cyber text-xs tracking-widest text-[#00CFFF]/60 mb-1 uppercase">Ποιος κάλεσε</label>
              <input type="text" value={form.caller} onChange={e => set('caller', e.target.value)}
                className="cyber-input text-xs" placeholder="Όνομα" />
            </div>
            <div>
              <label className="block font-mono-cyber text-xs tracking-widest text-[#00CFFF]/60 mb-1 uppercase">Τηλέφωνο</label>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                className="cyber-input text-xs" placeholder="6900000000" />
            </div>
          </div>

          {/* Problem */}
          <div>
            <label className="block font-mono-cyber text-xs tracking-widest text-[#00CFFF]/60 mb-1 uppercase">Πρόβλημα</label>
            <textarea value={form.problem} onChange={e => set('problem', e.target.value)}
              className="cyber-input resize-none text-xs" rows={3} placeholder="Περιγραφή..." />
          </div>

          {/* Priority */}
          <div>
            <label className="block font-mono-cyber text-xs tracking-widest text-[#00CFFF]/60 mb-1 uppercase">Προτεραιότητα</label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { key: 'low', label: 'ΧΑΜΗΛΗ', color: 'border-blue-400/40 text-blue-400 bg-blue-400/5' },
                { key: 'normal', label: 'ΚΑΝΟΝΙΚΗ', color: 'border-[#00CFFF]/40 text-[#00CFFF] bg-[#00CFFF]/5' },
                { key: 'high', label: 'ΥΨΗΛΗ', color: 'border-yellow-400/40 text-yellow-400 bg-yellow-400/5' },
                { key: 'urgent', label: 'ΕΠΕΙΓΟΥΣΑ', color: 'border-red-400/40 text-red-400 bg-red-400/5' },
              ].map(p => (
                <div
                  key={p.key}
                  onClick={() => set('priority', p.key)}
                  className={`flex items-center justify-center gap-1 p-1.5 border cursor-pointer transition-all font-mono-cyber text-[10px] tracking-widest ${
                    form.priority === p.key
                      ? `${p.color} border-current`
                      : 'border-[#00CFFF]/15 bg-[#131840]/40 text-white/35 hover:border-[#00CFFF]/35'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                    form.priority === p.key ? 'border-current bg-current' : 'border-[#00CFFF]/40'
                  }`}>
                    {form.priority === p.key && <span className="text-[#0E1235] text-[6px] font-bold">✓</span>}
                  </div>
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Resolved */}
          <div onClick={() => set('resolved', !form.resolved)}
            className={`flex items-center gap-3 p-3 border cursor-pointer transition-all text-xs ${
              form.resolved ? 'border-[#00CFFF]/60 bg-[#00CFFF]/10' : 'border-[#00CFFF]/20 bg-[#131840]/60 hover:border-[#00CFFF]/40'
            }`}>
            <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all ${
              form.resolved ? 'border-[#00CFFF] bg-[#00CFFF]' : 'border-[#00CFFF]/40'
            }`}>
              {form.resolved && <span className="text-[#0E1235] text-xs font-bold">✓</span>}
            </div>
            <span className="text-white/80">Επιλύθηκε ή στάλθηκε στο support@ox.one</span>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-mono-cyber text-xs tracking-widest text-[#00CFFF]/60 mb-1 uppercase">Ενέργειες</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
              className="cyber-input resize-none text-xs" rows={3} placeholder="Ενέργειες που έγιναν..." />
          </div>

          {/* Categories */}
          <div>
            <label className="block font-mono-cyber text-xs tracking-widest text-[#00CFFF]/60 mb-2 uppercase">Κατηγορίες</label>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.map(cat => (
                <div key={cat.key} onClick={() => set(cat.key, !form[cat.key])}
                  className={`flex items-center gap-2 p-2 border cursor-pointer transition-all ${
                    form[cat.key] ? 'border-[#00CFFF]/60 bg-[#00CFFF]/10' : 'border-[#00CFFF]/15 bg-[#131840]/40 hover:border-[#00CFFF]/35'
                  }`}>
                  <div className={`w-3.5 h-3.5 border flex items-center justify-center flex-shrink-0 transition-all ${
                    form[cat.key] ? 'border-[#00CFFF] bg-[#00CFFF]' : 'border-[#00CFFF]/40'
                  }`}>
                    {form[cat.key] && <span className="text-[#0E1235] text-[8px] font-bold">✓</span>}
                  </div>
                  <span className="font-mono-cyber text-xs text-white/70 tracking-wider">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 px-3 py-2">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 border border-[#00CFFF]/30 text-white/50 font-orbitron text-xs tracking-widest hover:border-[#00CFFF]/60 hover:text-white/70 transition-all">
              ΑΚΥΡΟ
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex-1 cyber-btn text-xs disabled:opacity-50">
              {saving ? 'ΑΠΟΘΗΚΕΥΣΗ...' : 'ΑΠΟΘΗΚΕΥΣΗ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}