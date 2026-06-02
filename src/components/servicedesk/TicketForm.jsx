import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const today = () => new Date().toISOString().split('T')[0];
const nowTime = () => new Date().toTimeString().slice(0, 5);

const CATEGORIES = [
  { key: 'category_not_spotlight',  label: 'ΔΕΝ ΑΦΟΡΟΥΣΕ ΤΗ SPOTLIGHT' },
  { key: 'category_printers',       label: 'ΕΚΤΥΠΩΤΕΣ' },
  { key: 'category_settings',       label: 'ΡΥΘΜΙΣΕΙΣ ΕΦΑΡΜΟΓΗΣ' },
  { key: 'category_pos',            label: 'POS' },
  { key: 'category_pda',            label: 'PDA' },
  { key: 'category_invoices',       label: 'Τιμολόγια' },
];

export default function TicketForm({ user, onSaved }) {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    base44.functions.invoke('getStores', {}).then(res => setStores(res.data?.stores || []));
  }, []);

  const [form, setForm] = useState({
    date: today(),
    time: nowTime(),
    operator: user?.full_name || '',
    store: '',
    caller: '',
    phone: '',
    problem: '',
    resolved: false,
    notes: '',
    category_not_spotlight: false,
    category_printers: false,
    category_settings: false,
    category_pos: false,
    category_pda: false,
    category_invoices: false,
  });
  const [storeSearch, setStoreSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const filteredStores = stores.filter(s =>
    s.toLowerCase().includes(storeSearch.toLowerCase())
  ).slice(0, 50);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await base44.entities.Ticket.create(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setForm({
        date: today(), time: nowTime(), operator: user?.full_name || '',
        store: '', caller: '', phone: '', problem: '', resolved: false, notes: '',
        category_not_spotlight: false, category_printers: false, category_settings: false,
        category_pos: false, category_pda: false, category_invoices: false,
      });
      setStoreSearch('');
      onSaved();
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Row: Date + Time + Operator */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Ημερομηνία</label>
          <input
            type="date"
            value={form.date}
            onChange={e => set('date', e.target.value)}
            className="cyber-input"
            required
            style={{ colorScheme: 'dark' }}
            placeholder="ηη/μμ/εεεε"
          />
        </div>
        <div>
          <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Ώρα</label>
          <input
            type="time"
            value={form.time}
            onChange={e => set('time', e.target.value)}
            className="cyber-input"
          />
        </div>
        <div>
          <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Χειριστής</label>
          <input
            type="text"
            value={form.operator}
            onChange={e => set('operator', e.target.value)}
            className="cyber-input"
            placeholder="Όνομα χειριστή"
          />
        </div>
      </div>

      {/* Store searchable dropdown */}
      <div className="relative">
        <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Κατάστημα</label>
        <input
          type="text"
          value={storeSearch || form.store}
          onChange={e => { setStoreSearch(e.target.value); set('store', ''); setShowDropdown(true); }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          className="cyber-input"
          placeholder="Αναζήτηση καταστήματος..."
          required={!form.store}
        />
        {form.store && !storeSearch && (
          <div className="absolute right-3 top-9 text-[#00CFFF] text-xs font-mono-cyber">{form.store}</div>
        )}
        {showDropdown && storeSearch && filteredStores.length > 0 && (
          <div className="absolute z-50 left-0 right-0 mt-1 max-h-56 overflow-y-auto border border-[#00CFFF]/30 bg-[#0E1235] shadow-lg shadow-black/50">
            {filteredStores.map(s => (
              <div
                key={s}
                onMouseDown={() => { set('store', s); setStoreSearch(''); setShowDropdown(false); }}
                className="px-4 py-2 text-white/80 hover:bg-[#00CFFF]/10 hover:text-[#00CFFF] cursor-pointer font-rajdhani text-sm"
              >
                {s}
              </div>
            ))}
          </div>
        )}
        {form.store && (
          <div className="mt-1 text-[#00CFFF] font-rajdhani text-sm">✓ {form.store}</div>
        )}
      </div>

      {/* Caller + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Ποιος κάλεσε</label>
          <input
            type="text"
            value={form.caller}
            onChange={e => set('caller', e.target.value)}
            className="cyber-input"
            placeholder="Όνομα καλούντα"
          />
        </div>
        <div>
          <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Τηλέφωνο</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
            className="cyber-input"
            placeholder="6900000000"
          />
        </div>
      </div>

      {/* Problem */}
      <div>
        <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Πρόβλημα</label>
        <textarea
          value={form.problem}
          onChange={e => set('problem', e.target.value)}
          className="cyber-input resize-none"
          rows={3}
          placeholder="Περιγραφή προβλήματος..."
          required
        />
      </div>

      {/* Resolved checkbox */}
      <div
        onClick={() => set('resolved', !form.resolved)}
        className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
          form.resolved
            ? 'border-[#00CFFF]/60 bg-[#00CFFF]/10'
            : 'border-[#00CFFF]/20 bg-[#131840]/60 hover:border-[#00CFFF]/40'
        }`}
      >
        <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-all ${
          form.resolved ? 'border-[#00CFFF] bg-[#00CFFF]' : 'border-[#00CFFF]/40'
        }`}>
          {form.resolved && <span className="text-[#0E1235] text-xs font-bold">✓</span>}
        </div>
        <span className="font-rajdhani text-white/80 text-base">Επιλύθηκε ή στάλθηκε στο support@ox.one</span>
      </div>

      {/* Notes / Ενέργειες */}
      <div>
        <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Ενέργειες</label>
        <textarea
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
          className="cyber-input resize-none"
          rows={3}
          placeholder="Ενέργειες που έγιναν..."
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-3 uppercase">Το πρόβλημα αφορούσε</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CATEGORIES.map(cat => (
            <div
              key={cat.key}
              onClick={() => set(cat.key, !form[cat.key])}
              className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${
                form[cat.key]
                  ? 'border-[#00CFFF]/60 bg-[#00CFFF]/10'
                  : 'border-[#00CFFF]/15 bg-[#131840]/40 hover:border-[#00CFFF]/35'
              }`}
            >
              <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all ${
                form[cat.key] ? 'border-[#00CFFF] bg-[#00CFFF]' : 'border-[#00CFFF]/40'
              }`}>
                {form[cat.key] && <span className="text-[#0E1235] text-[10px] font-bold">✓</span>}
              </div>
              <span className="font-mono-cyber text-xs text-white/70 tracking-wider">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={saving || saved || !form.store}
        className="w-full cyber-btn disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saved ? '✓ ΑΠΟΘΗΚΕΥΤΗΚΕ' : saving ? 'ΑΠΟΘΗΚΕΥΣΗ...' : 'ΚΑΤΑΧΩΡΗΣΗ TICKET'}
      </button>
    </form>
  );
}