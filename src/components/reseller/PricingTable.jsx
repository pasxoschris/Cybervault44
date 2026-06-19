import { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Edit, Trash2, Save, X, ArrowUp, ArrowDown, ArrowUpDown, Search } from 'lucide-react';

const EMPTY = { name: '', description: '', category_id: '', unit_price: 0, vat_rate: 24, is_vat_exempt: false, default_discount_percentage: 0, display_order: 0, is_active: true };

export default function PricingTable() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [quickEditId, setQuickEditId] = useState(null);
  const [quickEditVal, setQuickEditVal] = useState('');
  const [search, setSearch] = useState('');
  const editRef = useRef(null);

  const handleSort = (col) => {
    if (sortCol === col) {
      if (sortDir === 'asc') setSortDir('desc');
      else { setSortCol(null); setSortDir('asc'); }
    } else {
      setSortCol(col); setSortDir('asc');
    }
  };

  const filteredItems = items.filter(item => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (item.name || '').toLowerCase().includes(q) ||
      (item.description || '').toLowerCase().includes(q)
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortCol) return 0;
    let va = a[sortCol]; let vb = b[sortCol];
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ col }) => {
    if (sortCol !== col) return <ArrowUpDown size={11} className="text-white/20 inline ml-1" />;
    return sortDir === 'asc' ? <ArrowUp size={11} className="text-[#00CFFF] inline ml-1" /> : <ArrowDown size={11} className="text-[#00CFFF] inline ml-1" />;
  };

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || '—';

  const load = async () => {
    const [itemList, catList] = await Promise.all([
      base44.entities.ResellerPricingItem.list(),
      base44.entities.ResellerCategory.list('display_order'),
    ]);
    setItems(itemList);
    setCategories(catList);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ ...item, display_order: item.display_order ?? 0 });
    setTimeout(() => editRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };
  const startNew = () => {
    setEditing('new');
    setForm({ ...EMPTY, category_id: categories[0]?.id || '' });
    setTimeout(() => editRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };
  const cancel = () => setEditing(null);

  const save = async () => {
    setSaving(true);
    if (editing === 'new') {
      const created = await base44.entities.ResellerPricingItem.create(form);
      setItems(p => [...p, created]);
    } else {
      const updated = await base44.entities.ResellerPricingItem.update(editing, form);
      setItems(p => p.map(x => x.id === editing ? updated : x));
    }
    setEditing(null);
    setSaving(false);
  };

  const toggle = async (item) => {
    const updated = await base44.entities.ResellerPricingItem.update(item.id, { is_active: !item.is_active });
    setItems(p => p.map(x => x.id === item.id ? updated : x));
  };

  const remove = async (id) => {
    if (!window.confirm('Διαγραφή;')) return;
    await base44.entities.ResellerPricingItem.delete(id);
    setItems(p => p.filter(x => x.id !== id));
  };

  const startQuickEdit = (item) => {
    setQuickEditId(item.id);
    setQuickEditVal(String(item.display_order ?? 0));
  };

  const saveQuickEdit = async (id) => {
    const val = parseInt(quickEditVal) || 0;
    const updated = await base44.entities.ResellerPricingItem.update(id, { display_order: val });
    setItems(p => p.map(x => x.id === id ? updated : x));
    setQuickEditId(null);
  };

  const inputCls = "bg-[#0E1235] border border-[#2A3580] rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 w-full";

  if (loading) return <div className="text-center py-12 text-white/30 text-sm">Φόρτωση...</div>;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Αναζήτηση προϊόντος ή υπηρεσίας..."
          className="w-full bg-[#0E1235] border border-[#2A3580] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 placeholder-white/20"
        />
      </div>

      <div className="flex justify-end">
        <button onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#00CFFF] text-[#0E1235] rounded-xl text-sm font-bold hover:bg-[#00CFFF]/80 transition-colors">
          <Plus size={14} /> Νέο Προϊόν
        </button>
      </div>

      {editing && (
        <div ref={editRef} className="bg-[#131840] border border-[#00CFFF]/30 rounded-2xl p-5">
          <h4 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">{editing === 'new' ? 'Νέο Προϊόν' : 'Επεξεργασία'}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div><label className="text-white/40 text-xs block mb-1">Όνομα</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} /></div>
            <div><label className="text-white/40 text-xs block mb-1">Περιγραφή</label><input value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={inputCls} /></div>
            <div>
              <label className="text-white/40 text-xs block mb-1">Κατηγορία</label>
              <select value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))} className={inputCls}>
                <option value="">— Χωρίς κατηγορία —</option>
                {categories.filter(c => c.is_active).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div><label className="text-white/40 text-xs block mb-1">Τιμή (€)</label><input type="number" min={0} step={0.01} value={form.unit_price} onChange={e => setForm(f => ({ ...f, unit_price: parseFloat(e.target.value) || 0 }))} className={inputCls} /></div>
            <div><label className="text-white/40 text-xs block mb-1">ΦΠΑ %</label><input type="number" min={0} max={100} value={form.vat_rate} onChange={e => setForm(f => ({ ...f, vat_rate: parseFloat(e.target.value) || 24 }))} className={inputCls} disabled={form.is_vat_exempt} /></div>
            <div>
              <label className="text-white/40 text-xs block mb-1">Απαλλαγή ΦΠΑ</label>
              <button type="button" onClick={() => setForm(f => ({ ...f, is_vat_exempt: !f.is_vat_exempt }))}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded border text-sm transition-colors ${form.is_vat_exempt ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-[#0E1235] border-[#2A3580] text-white/40 hover:border-[#00CFFF]/30'}`}>
                <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${form.is_vat_exempt ? 'border-amber-400 bg-amber-400' : 'border-white/30'}`}>
                  {form.is_vat_exempt && <span className="text-[#0E1235] text-[10px] font-bold">✓</span>}
                </span>
                {form.is_vat_exempt ? 'Απαλλαγή (άρθρο 39α)' : 'Χωρίς απαλλαγή'}
              </button>
            </div>
            <div><label className="text-white/40 text-xs block mb-1">Έκπτωση % (προεπιλογή)</label><input type="number" min={0} max={100} step={0.5} value={form.default_discount_percentage || 0} onChange={e => setForm(f => ({ ...f, default_discount_percentage: parseFloat(e.target.value) || 0 }))} className={inputCls} /></div>
            <div><label className="text-white/40 text-xs block mb-1">Σειρά Εμφάνισης</label><input type="number" min={0} value={form.display_order ?? 0} onChange={e => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} className={inputCls} /></div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#00CFFF] text-[#0E1235] rounded-lg text-sm font-bold disabled:opacity-40">
              <Save size={13} /> {saving ? 'Αποθήκευση...' : 'Αποθήκευση'}
            </button>
            <button onClick={cancel} className="flex items-center gap-2 px-4 py-2 border border-[#2A3580] rounded-lg text-white/60 text-sm hover:border-[#00CFFF]/30 transition-colors">
              <X size={13} /> Ακύρωση
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-[#2A3580]">
        <table className="w-full text-sm" style={{ fontFamily: 'Inter,sans-serif' }}>
          <thead>
            <tr className="bg-[#131840] border-b border-[#2A3580]">
              {[
                ['name', 'Όνομα'],
                ['description', 'Περιγραφή'],
                ['category_id', 'Κατηγορία'],
                ['unit_price', 'Τιμή'],
                ['vat_rate', 'ΦΠΑ %'],
                ['default_discount_percentage', 'Έκπτωση %'],
                ['display_order', 'Σειρά'],
                ['is_active', 'Ενεργό'],
                [null, '']
              ].map(([col, h]) => (
                <th key={h} className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                  {col ? (
                    <button onClick={() => handleSort(col)} className="flex items-center gap-0.5 hover:text-[#00CFFF] transition-colors">
                      {h}<SortIcon col={col} />
                    </button>
                  ) : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item, i) => (
              <tr key={item.id} className={`border-b border-[#2A3580]/50 hover:bg-[#131840]/70 transition-colors ${i % 2 === 0 ? 'bg-[#0E1235]' : 'bg-[#0f1339]/60'}`}>
                <td className="px-3 py-3 text-white font-medium whitespace-nowrap cursor-pointer hover:text-[#00CFFF] transition-colors" onClick={() => startEdit(item)}>{item.name}</td>
                <td className="px-3 py-3 text-white/50 max-w-[180px] truncate">{item.description || '—'}</td>
                <td className="px-3 py-3 text-white/60 whitespace-nowrap">{getCategoryName(item.category_id)}</td>
                <td className="px-3 py-3 font-mono text-[#00CFFF] whitespace-nowrap">€{Number(item.unit_price).toFixed(2)}</td>
                <td className="px-3 py-3 whitespace-nowrap">{item.is_vat_exempt ? <span className="px-2 py-0.5 rounded text-xs border border-amber-500/40 bg-amber-500/10 text-amber-300">Απαλλαγή</span> : <span className="text-white/60">{item.vat_rate}%</span>}</td>
                <td className="px-3 py-3 text-white/60">{item.default_discount_percentage || 0}%</td>
                <td className="px-3 py-3">
                  {quickEditId === item.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number" value={quickEditVal}
                        onChange={e => setQuickEditVal(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') saveQuickEdit(item.id); if (e.key === 'Escape') setQuickEditId(null); }}
                        autoFocus
                        className="bg-[#0E1235] border border-[#00CFFF]/40 rounded px-1.5 py-0.5 text-white text-xs w-14 focus:outline-none"
                      />
                      <button onClick={() => saveQuickEdit(item.id)} className="text-[#00CFFF] hover:text-white transition-colors"><Save size={11} /></button>
                      <button onClick={() => setQuickEditId(null)} className="text-white/30 hover:text-white transition-colors"><X size={11} /></button>
                    </div>
                  ) : (
                    <button onClick={() => startQuickEdit(item)}
                      className="font-mono text-white/60 hover:text-[#00CFFF] transition-colors text-xs px-1.5 py-0.5 rounded hover:bg-[#00CFFF]/10 border border-transparent hover:border-[#00CFFF]/20">
                      {item.display_order ?? 0}
                    </button>
                  )}
                </td>
                <td className="px-3 py-3">
                  <button onClick={() => toggle(item)} className={`px-2 py-0.5 rounded-full text-xs font-medium border ${item.is_active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                    {item.is_active ? 'Ναι' : 'Όχι'}
                  </button>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEdit(item)} className="p-1 rounded hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition-colors"><Edit size={13} /></button>
                    <button onClick={() => remove(item.id)} className="p-1 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="text-center py-12 text-white/30 text-sm">Δεν υπάρχουν προϊόντα.</div>}
      </div>
    </div>
  );
}