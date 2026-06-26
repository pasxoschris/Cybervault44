import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminTable from './AdminTable';
import AdminModal from './AdminModal';

export default function SubcategoriesManager() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [supportLevels, setSupportLevels] = useState([]);
  const [resolutionStatuses, setResolutionStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [form, setForm] = useState({ name: '', category_id: '', description: '', default_priority_id: '', default_support_level_id: '', default_resolution_status_id: '', sla_minutes: '', display_order: 0, is_active: true });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([
      base44.entities.TicketSubcategory.list('display_order', 200),
      base44.entities.TicketCategory.list('display_order', 100),
      base44.entities.Priority.list('display_order', 50),
      base44.entities.SupportLevel.list('display_order', 20),
      base44.entities.ResolutionStatus.list('display_order', 20),
    ]).then(([subs, cats, prios, levels, statuses]) => {
      setItems(subs); setCategories(cats); setPriorities(prios); setSupportLevels(levels); setResolutionStatuses(statuses);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const blankForm = () => ({ name: '', category_id: categoryFilter, description: '', default_priority_id: '', default_support_level_id: '', default_resolution_status_id: '', sla_minutes: '', display_order: items.length, is_active: true });

  const openAdd = () => { setForm(blankForm()); setError(''); setModal({ mode: 'add' }); };
  const openEdit = (item) => {
    setForm({ name: item.name, category_id: item.category_id || '', description: item.description || '',
      default_priority_id: item.default_priority_id || '', default_support_level_id: item.default_support_level_id || '',
      default_resolution_status_id: item.default_resolution_status_id || '', sla_minutes: item.sla_minutes || '',
      display_order: item.display_order || 0, is_active: item.is_active !== false });
    setError(''); setModal({ mode: 'edit', item });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.category_id) { setError('Όνομα και Κατηγορία είναι υποχρεωτικά.'); return; }
    setSaving(true); setError('');
    try {
      const data = { ...form, sla_minutes: form.sla_minutes ? Number(form.sla_minutes) : undefined };
      if (modal.mode === 'add') await base44.entities.TicketSubcategory.create(data);
      else await base44.entities.TicketSubcategory.update(modal.item.id, data);
      setModal(null); load();
    } catch { setError('Σφάλμα αποθήκευσης.'); }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    if (!confirm(`Διαγραφή "${item.name}";`)) return;
    await base44.entities.TicketSubcategory.delete(item.id);
    load();
  };

  const handleToggle = async (item) => {
    await base44.entities.TicketSubcategory.update(item.id, { is_active: !item.is_active });
    load();
  };

  const handleReorder = async (reordered) => {
    setItems(prev => {
      const ids = new Set(reordered.map(r => r.id));
      return [...reordered, ...prev.filter(p => !ids.has(p.id))];
    });
    await base44.entities.TicketSubcategory.bulkUpdate(reordered.map((item, i) => ({ id: item.id, display_order: i })));
  };

  const catName = id => categories.find(c => c.id === id)?.name || '—';
  const displayed = categoryFilter ? items.filter(i => i.category_id === categoryFilter) : items;

  const columns = [
    { key: 'name', render: item => <span className="text-white font-medium text-sm">{item.name}</span> },
    { key: 'category_id', render: item => <span className="text-[#00CFFF]/70 text-xs font-mono-cyber">{catName(item.category_id)}</span> },
    { key: 'sla_minutes', render: item => <span className="text-white/40 text-xs">{item.sla_minutes ? `${item.sla_minutes} min` : '—'}</span> },
  ];

  return (
    <>
      {/* Category filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => setCategoryFilter('')}
          className={`px-3 py-1.5 font-mono-cyber text-xs tracking-widest border transition-all ${!categoryFilter ? 'border-[#00CFFF] text-[#00CFFF] bg-[#00CFFF]/10' : 'border-white/20 text-white/40 hover:border-[#00CFFF]/40'}`}>
          ΟΛΑ
        </button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setCategoryFilter(c.id)}
            className={`px-3 py-1.5 font-mono-cyber text-xs tracking-widest border transition-all ${categoryFilter === c.id ? 'border-[#00CFFF] text-[#00CFFF] bg-[#00CFFF]/10' : 'border-white/20 text-white/40 hover:border-[#00CFFF]/40'}`}>
            {c.name}
          </button>
        ))}
      </div>

      <AdminTable title="Υποκατηγορίες" items={displayed} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggle} onReorder={handleReorder} />

      {modal && (
        <AdminModal title={modal.mode === 'add' ? 'Νέα Υποκατηγορία' : 'Επεξεργασία Υποκατηγορίας'}
          onClose={() => setModal(null)} onSave={handleSave} saving={saving} error={error}>
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΚΑΤΗΓΟΡΙΑ *</label>
            <select className="cyber-input appearance-none" value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))} style={{ background: 'rgba(19,24,64,0.8)' }}>
              <option value="">Επιλέξτε κατηγορία...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΟΝΟΜΑ *</label>
            <input className="cyber-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Υποκατηγορία..." />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΠΕΡΙΓΡΑΦΗ</label>
            <input className="cyber-input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>

          <div className="border border-[#00CFFF]/15 bg-[#00CFFF]/5 p-3 space-y-3">
            <div className="font-mono-cyber text-[10px] text-[#00CFFF]/60 tracking-widest mb-2">SMART DEFAULTS</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">DEFAULT PRIORITY</label>
                <select className="cyber-input text-xs appearance-none" value={form.default_priority_id} onChange={e => setForm(f => ({ ...f, default_priority_id: e.target.value }))} style={{ background: 'rgba(19,24,64,0.8)' }}>
                  <option value="">—</option>
                  {priorities.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">DEFAULT SUPPORT LEVEL</label>
                <select className="cyber-input text-xs appearance-none" value={form.default_support_level_id} onChange={e => setForm(f => ({ ...f, default_support_level_id: e.target.value }))} style={{ background: 'rgba(19,24,64,0.8)' }}>
                  <option value="">—</option>
                  {supportLevels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">DEFAULT RESOLUTION STATUS</label>
                <select className="cyber-input text-xs appearance-none" value={form.default_resolution_status_id} onChange={e => setForm(f => ({ ...f, default_resolution_status_id: e.target.value }))} style={{ background: 'rgba(19,24,64,0.8)' }}>
                  <option value="">—</option>
                  {resolutionStatuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">SLA (ΛΕΠΤΑ)</label>
                <input type="number" className="cyber-input text-xs" value={form.sla_minutes} onChange={e => setForm(f => ({ ...f, sla_minutes: e.target.value }))} placeholder="60" />
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </>
  );
}