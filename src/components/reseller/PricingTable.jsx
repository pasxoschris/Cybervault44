import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Edit, Trash2, Save, X, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

const CATEGORIES = [
  ['spotlight_pos','Spotlight POS'],['network_equipment','Εξοπλισμός Δικτύου'],
  ['printers','Εκτυπωτές'],['installation','Εγκατάσταση'],['training','Εκπαίδευση'],
  ['services','Υπηρεσίες'],['other','Άλλο']
];

const EMPTY = { name:'', description:'', category:'other', unit_price:0, vat_rate:24, default_discount_percentage:0, is_active:true };

export default function PricingTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | item.id
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (col) => {
    if (sortCol === col) {
      if (sortDir === 'asc') setSortDir('desc');
      else { setSortCol(null); setSortDir('asc'); }
    } else {
      setSortCol(col); setSortDir('asc');
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (!sortCol) return 0;
    let va = a[sortCol]; let vb = b[sortCol];
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ col }) => {
    if (sortCol !== col) return <ArrowUpDown size={11} className="text-white/20 inline ml-1"/>;
    return sortDir === 'asc' ? <ArrowUp size={11} className="text-[#00CFFF] inline ml-1"/> : <ArrowDown size={11} className="text-[#00CFFF] inline ml-1"/>;
  };

  const load = () => base44.entities.ResellerPricingItem.list().then(setItems).finally(()=>setLoading(false));
  useEffect(()=>{ load(); },[]);

  const startEdit = (item) => { setEditing(item.id); setForm({...item}); };
  const startNew = () => { setEditing('new'); setForm(EMPTY); };
  const cancel = () => { setEditing(null); };

  const save = async () => {
    setSaving(true);
    if (editing === 'new') {
      const created = await base44.entities.ResellerPricingItem.create(form);
      setItems(p=>[...p, created]);
    } else {
      const updated = await base44.entities.ResellerPricingItem.update(editing, form);
      setItems(p=>p.map(x=>x.id===editing?updated:x));
    }
    setEditing(null);
    setSaving(false);
  };

  const toggle = async (item) => {
    const updated = await base44.entities.ResellerPricingItem.update(item.id, { is_active: !item.is_active });
    setItems(p=>p.map(x=>x.id===item.id?updated:x));
  };

  const remove = async (id) => {
    if (!window.confirm('Διαγραφή;')) return;
    await base44.entities.ResellerPricingItem.delete(id);
    setItems(p=>p.filter(x=>x.id!==id));
  };

  const inputCls = "bg-[#0E1235] border border-[#2A3580] rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 w-full";

  if (loading) return <div className="text-center py-12 text-white/30 text-sm">Φόρτωση...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#00CFFF] text-[#0E1235] rounded-xl text-sm font-bold hover:bg-[#00CFFF]/80 transition-colors">
          <Plus size={14}/> Νέο Προϊόν
        </button>
      </div>

      {/* New/Edit inline form */}
      {editing && (
        <div className="bg-[#131840] border border-[#00CFFF]/30 rounded-2xl p-5">
          <h4 className="font-orbitron text-xs text-[#00CFFF] mb-4 tracking-wider">{editing==='new'?'ΝΕΟ ΠΡΟΪΟΝ':'ΕΠΕΞΕΡΓΑΣΙΑ'}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div><label className="text-white/40 text-xs block mb-1">Όνομα</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} className={inputCls}/></div>
            <div><label className="text-white/40 text-xs block mb-1">Περιγραφή</label><input value={form.description||''} onChange={e=>setForm(f=>({...f,description:e.target.value}))} className={inputCls}/></div>
            <div><label className="text-white/40 text-xs block mb-1">Κατηγορία</label>
              <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className={inputCls}>
                {CATEGORIES.map(([v,l])=><option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div><label className="text-white/40 text-xs block mb-1">Τιμή (€)</label><input type="number" min={0} step={0.01} value={form.unit_price} onChange={e=>setForm(f=>({...f,unit_price:parseFloat(e.target.value)||0}))} className={inputCls}/></div>
            <div><label className="text-white/40 text-xs block mb-1">ΦΠΑ %</label><input type="number" min={0} max={100} value={form.vat_rate} onChange={e=>setForm(f=>({...f,vat_rate:parseFloat(e.target.value)||24}))} className={inputCls}/></div>
            <div><label className="text-white/40 text-xs block mb-1">Έκπτωση % (προεπιλογή)</label><input type="number" min={0} max={100} step={0.5} value={form.default_discount_percentage||0} onChange={e=>setForm(f=>({...f,default_discount_percentage:parseFloat(e.target.value)||0}))} className={inputCls}/></div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#00CFFF] text-[#0E1235] rounded-lg text-sm font-bold disabled:opacity-40">
              <Save size={13}/> {saving?'Αποθήκευση...':'Αποθήκευση'}
            </button>
            <button onClick={cancel} className="flex items-center gap-2 px-4 py-2 border border-[#2A3580] rounded-lg text-white/60 text-sm hover:border-[#00CFFF]/30 transition-colors">
              <X size={13}/> Ακύρωση
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-[#2A3580]">
        <table className="w-full text-sm" style={{fontFamily:'Inter,sans-serif'}}>
          <thead>
            <tr className="bg-[#131840] border-b border-[#2A3580]">
              {[['name','Όνομα'],['description','Περιγραφή'],['category','Κατηγορία'],['unit_price','Τιμή'],['vat_rate','ΦΠΑ %'],['default_discount_percentage','Έκπτωση %'],['is_active','Ενεργό'],[null,'']].map(([col,h])=>(
                <th key={h} className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                  {col ? (
                    <button onClick={()=>handleSort(col)} className="flex items-center gap-0.5 hover:text-[#00CFFF] transition-colors">
                      {h}<SortIcon col={col}/>
                    </button>
                  ) : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item,i)=>(
              <tr key={item.id} className={`border-b border-[#2A3580]/50 hover:bg-[#131840]/70 transition-colors ${i%2===0?'bg-[#0E1235]':'bg-[#0f1339]/60'}`}>
                <td className="px-3 py-3 text-white font-medium whitespace-nowrap">{item.name}</td>
                <td className="px-3 py-3 text-white/50 max-w-[180px] truncate">{item.description||'—'}</td>
                <td className="px-3 py-3 text-white/60 whitespace-nowrap">{CATEGORIES.find(c=>c[0]===item.category)?.[1]||item.category}</td>
                <td className="px-3 py-3 font-mono text-[#00CFFF] whitespace-nowrap">€{Number(item.unit_price).toFixed(2)}</td>
                <td className="px-3 py-3 text-white/60">{item.vat_rate}%</td>
                <td className="px-3 py-3 text-white/60">{item.default_discount_percentage||0}%</td>
                <td className="px-3 py-3">
                  <button onClick={()=>toggle(item)} className={`px-2 py-0.5 rounded-full text-xs font-medium border ${item.is_active?'bg-green-100 text-green-700 border-green-200':'bg-gray-100 text-gray-500 border-gray-200'}`}>
                    {item.is_active?'Ναι':'Όχι'}
                  </button>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <button onClick={()=>startEdit(item)} className="p-1 rounded hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition-colors"><Edit size={13}/></button>
                    <button onClick={()=>remove(item.id)} className="p-1 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={13}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length===0 && <div className="text-center py-12 text-white/30 text-sm">Δεν υπάρχουν προϊόντα.</div>}
      </div>
    </div>
  );
}