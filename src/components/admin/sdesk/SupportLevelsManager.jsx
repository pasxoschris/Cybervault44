import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminTable from './AdminTable';
import AdminModal from './AdminModal';

export default function SupportLevelsManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', level_number: '', description: '', display_order: 0, is_active: true });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    base44.entities.SupportLevel.list('display_order', 20).then(setItems).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm({ name: '', level_number: '', description: '', display_order: items.length, is_active: true }); setError(''); setModal({ mode: 'add' }); };
  const openEdit = (item) => { setForm({ name: item.name, level_number: item.level_number || '', description: item.description || '', display_order: item.display_order || 0, is_active: item.is_active !== false }); setError(''); setModal({ mode: 'edit', item }); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.level_number) { setError('Όνομα και αριθμός επιπέδου είναι υποχρεωτικά.'); return; }
    setSaving(true); setError('');
    try {
      const data = { ...form, level_number: Number(form.level_number) };
      if (modal.mode === 'add') await base44.entities.SupportLevel.create(data);
      else await base44.entities.SupportLevel.update(modal.item.id, data);
      setModal(null); load();
    } catch { setError('Σφάλμα αποθήκευσης.'); }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    if (!confirm(`Διαγραφή "${item.name}";`)) return;
    await base44.entities.SupportLevel.delete(item.id);
    load();
  };

  const handleToggle = async (item) => {
    await base44.entities.SupportLevel.update(item.id, { is_active: !item.is_active });
    load();
  };

  const handleReorder = async (reordered) => {
    setItems(reordered);
    await base44.entities.SupportLevel.bulkUpdate(reordered.map((item, i) => ({ id: item.id, display_order: i })));
  };

  const columns = [
    { key: 'name', render: item => <span className="text-white font-medium text-sm">{item.name}</span> },
    { key: 'level_number', render: item => <span className="text-[#00CFFF]/70 text-xs font-mono-cyber">L{item.level_number}</span> },
    { key: 'description', render: item => <span className="text-white/40 text-xs">{item.description || '—'}</span> },
  ];

  return (
    <>
      <AdminTable items={items} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggle} onReorder={handleReorder} />
      {modal && (
        <AdminModal title={modal.mode === 'add' ? 'Νέο Support Level' : 'Επεξεργασία Support Level'}
          onClose={() => setModal(null)} onSave={handleSave} saving={saving} error={error}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΟΝΟΜΑ *</label>
              <input className="cyber-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="π.χ. Level 1" />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΑΡΙΘΜΟΣ *</label>
              <input type="number" className="cyber-input" value={form.level_number} onChange={e => setForm(f => ({ ...f, level_number: e.target.value }))} placeholder="1" />
            </div>
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΠΕΡΙΓΡΑΦΗ</label>
            <textarea className="cyber-input resize-none" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
        </AdminModal>
      )}
    </>
  );
}