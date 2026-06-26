import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminTable from './AdminTable';
import AdminModal from './AdminModal';

export default function TicketTypesManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit', item? }
  const [form, setForm] = useState({ name: '', description: '', display_order: 0, is_active: true });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    base44.entities.TicketType.list('display_order', 100).then(setItems).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm({ name: '', description: '', display_order: items.length, is_active: true }); setError(''); setModal({ mode: 'add' }); };
  const openEdit = (item) => { setForm({ name: item.name, description: item.description || '', display_order: item.display_order || 0, is_active: item.is_active !== false }); setError(''); setModal({ mode: 'edit', item }); };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Το όνομα είναι υποχρεωτικό.'); return; }
    setSaving(true); setError('');
    try {
      if (modal.mode === 'add') await base44.entities.TicketType.create(form);
      else await base44.entities.TicketType.update(modal.item.id, form);
      setModal(null); load();
    } catch { setError('Σφάλμα αποθήκευσης.'); }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    if (!confirm(`Διαγραφή "${item.name}";`)) return;
    await base44.entities.TicketType.delete(item.id);
    load();
  };

  const handleToggle = async (item) => {
    await base44.entities.TicketType.update(item.id, { is_active: !item.is_active });
    load();
  };

  const handleReorder = async (reordered) => {
    setItems(reordered);
    await base44.entities.TicketType.bulkUpdate(reordered.map((item, i) => ({ id: item.id, display_order: i })));
  };

  const columns = [
    { key: 'name', render: item => <span className="text-white font-medium text-sm">{item.name}</span> },
    { key: 'description', render: item => <span className="text-white/50 text-xs">{item.description || '—'}</span> },
  ];

  return (
    <>
      <AdminTable title="Ticket Types" items={items} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggle} onReorder={handleReorder} />
      {modal && (
        <AdminModal title={modal.mode === 'add' ? 'Νέος Τύπος' : 'Επεξεργασία Τύπου'}
          onClose={() => setModal(null)} onSave={handleSave} saving={saving} error={error}>
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΟΝΟΜΑ *</label>
            <input className="cyber-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="π.χ. Incident" />
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