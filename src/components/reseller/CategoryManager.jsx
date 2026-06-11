import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Edit, Trash2, Save, X, GripVertical } from 'lucide-react';

const EMPTY = { name: '', display_order: 0, is_active: true };

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const list = await base44.entities.ResellerCategory.list('display_order');
    setCategories(list);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => {
    const maxOrder = categories.length > 0 ? Math.max(...categories.map(c => c.display_order || 0)) + 1 : 0;
    setEditing('new');
    setForm({ ...EMPTY, display_order: maxOrder });
  };

  const startEdit = (cat) => { setEditing(cat.id); setForm({ ...cat }); };
  const cancel = () => setEditing(null);

  const save = async () => {
    setSaving(true);
    if (editing === 'new') {
      const created = await base44.entities.ResellerCategory.create(form);
      setCategories(p => [...p, created].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
    } else {
      const updated = await base44.entities.ResellerCategory.update(editing, form);
      setCategories(p => p.map(x => x.id === editing ? updated : x).sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
    }
    setEditing(null);
    setSaving(false);
  };

  const remove = async (id) => {
    if (!window.confirm('Διαγραφή κατηγορίας;')) return;
    await base44.entities.ResellerCategory.delete(id);
    setCategories(p => p.filter(x => x.id !== id));
  };

  const toggle = async (cat) => {
    const updated = await base44.entities.ResellerCategory.update(cat.id, { is_active: !cat.is_active });
    setCategories(p => p.map(x => x.id === cat.id ? updated : x));
  };

  const inputCls = "bg-[#0E1235] border border-[#2A3580] rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 w-full";

  if (loading) return <div className="text-center py-12 text-white/30 text-sm">Φόρτωση...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-white/40 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          {categories.length} κατηγορίες — χρησιμοποιείται στον Τιμοκατάλογο & τη Νέα Προσφορά
        </p>
        <button onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#00CFFF] text-[#0E1235] rounded-xl text-sm font-bold hover:bg-[#00CFFF]/80 transition-colors">
          <Plus size={14} /> Νέα Κατηγορία
        </button>
      </div>

      {/* Inline form */}
      {editing && (
        <div className="bg-[#131840] border border-[#00CFFF]/30 rounded-2xl p-5">
          <h4 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">
            {editing === 'new' ? 'Νέα Κατηγορία' : 'Επεξεργασία Κατηγορίας'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-white/40 text-xs block mb-1">Όνομα Κατηγορίας</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="π.χ. Spotlight POS Άδειες" />
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1">Σειρά Εμφάνισης</label>
              <input type="number" min={0} value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} className={inputCls} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} disabled={saving || !form.name.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-[#00CFFF] text-[#0E1235] rounded-lg text-sm font-bold disabled:opacity-40">
              <Save size={13} /> {saving ? 'Αποθήκευση...' : 'Αποθήκευση'}
            </button>
            <button onClick={cancel} className="flex items-center gap-2 px-4 py-2 border border-[#2A3580] rounded-lg text-white/60 text-sm hover:border-[#00CFFF]/30 transition-colors">
              <X size={13} /> Ακύρωση
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {categories.length === 0 ? (
        <div className="text-center py-12 text-white/30 text-sm border border-[#2A3580] rounded-2xl">
          Δεν υπάρχουν κατηγορίες. Πατήστε «Νέα Κατηγορία» για να ξεκινήσετε.
        </div>
      ) : (
        <div className="rounded-2xl border border-[#2A3580] overflow-hidden">
          {categories.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)).map((cat, i) => (
            <div key={cat.id} className={`flex items-center justify-between px-4 py-3.5 border-b border-[#2A3580]/50 last:border-0 ${i % 2 === 0 ? 'bg-[#0E1235]' : 'bg-[#0f1339]/60'}`}>
              <div className="flex items-center gap-3">
                <GripVertical size={14} className="text-white/20" />
                <div>
                  <div className="text-white font-medium text-sm">{cat.name}</div>
                  <div className="text-white/30 text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>Σειρά: {cat.display_order}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggle(cat)}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${cat.is_active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                  {cat.is_active ? 'Ενεργή' : 'Ανενεργή'}
                </button>
                <button onClick={() => startEdit(cat)} className="p-1.5 rounded hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition-colors"><Edit size={13} /></button>
                <button onClick={() => remove(cat.id)} className="p-1.5 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}