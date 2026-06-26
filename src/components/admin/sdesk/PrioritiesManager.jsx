import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminTable from './AdminTable';
import AdminModal from './AdminModal';

const COLOR_OPTIONS = ['#ef4444', '#f59e0b', '#00CFFF', '#22c55e', '#a855f7', '#64748b'];

export default function PrioritiesManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', color: '#00CFFF', display_order: 0, is_active: true });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    base44.entities.Priority.list('display_order', 50).then(setItems).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm({ name: '', color: '#ef4444', display_order: items.length, is_active: true }); setError(''); setModal({ mode: 'add' }); };
  const openEdit = (item) => { setForm({ name: item.name, color: item.color || '#ef4444', display_order: item.display_order || 0, is_active: item.is_active !== false }); setError(''); setModal({ mode: 'edit', item }); };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Το όνομα είναι υποχρεωτικό.'); return; }
    setSaving(true); setError('');
    try {
      if (modal.mode === 'add') await base44.entities.Priority.create(form);
      else await base44.entities.Priority.update(modal.item.id, form);
      setModal(null); load();
    } catch { setError('Σφάλμα αποθήκευσης.'); }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    if (!confirm(`Διαγραφή "${item.name}";`)) return;
    await base44.entities.Priority.delete(item.id);
    load();
  };

  const handleToggle = async (item) => {
    await base44.entities.Priority.update(item.id, { is_active: !item.is_active });
    load();
  };

  const handleReorder = async (reordered) => {
    setItems(reordered);
    await base44.entities.Priority.bulkUpdate(reordered.map((item, i) => ({ id: item.id, display_order: i })));
  };

  const columns = [
    { key: 'name', render: item => (
      <div className="flex items-center gap-2">
        {item.color && <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />}
        <span className="text-white font-medium text-sm">{item.name}</span>
      </div>
    )},
    { key: 'color', render: item => <span className="text-white/40 text-xs font-mono-cyber">{item.color || '—'}</span> },
  ];

  return (
    <>
      <AdminTable items={items} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggle} onReorder={handleReorder} />
      {modal && (
        <AdminModal title={modal.mode === 'add' ? 'Νέα Προτεραιότητα' : 'Επεξεργασία Προτεραιότητας'}
          onClose={() => setModal(null)} onSave={handleSave} saving={saving} error={error}>
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΟΝΟΜΑ *</label>
            <input className="cyber-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="π.χ. Urgent" />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-2 font-mono-cyber tracking-widest">ΧΡΩΜΑ</label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_OPTIONS.map(color => (
                <button key={color} type="button" onClick={() => setForm(f => ({ ...f, color }))}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${form.color === color ? 'border-white scale-125' : 'border-transparent'}`}
                  style={{ background: color }} />
              ))}
            </div>
          </div>
        </AdminModal>
      )}
    </>
  );
}