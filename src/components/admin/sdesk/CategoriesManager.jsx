import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminTable from './AdminTable';
import AdminModal from './AdminModal';

const ICON_OPTIONS = ['Monitor', 'Wifi', 'CreditCard', 'Printer', 'HardDrive', 'Settings', 'AlertTriangle', 'PhoneCall', 'Package', 'Server', 'Shield', 'Database'];
const COLOR_OPTIONS = ['#00CFFF', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#f97316', '#06b6d4', '#64748b'];

export default function CategoriesManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', icon: '', color: '#00CFFF', display_order: 0, is_active: true });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    base44.entities.TicketCategory.list('display_order', 100).then(setItems).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm({ name: '', icon: '', color: '#00CFFF', display_order: items.length, is_active: true }); setError(''); setModal({ mode: 'add' }); };
  const openEdit = (item) => { setForm({ name: item.name, icon: item.icon || '', color: item.color || '#00CFFF', display_order: item.display_order || 0, is_active: item.is_active !== false }); setError(''); setModal({ mode: 'edit', item }); };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Το όνομα είναι υποχρεωτικό.'); return; }
    setSaving(true); setError('');
    try {
      if (modal.mode === 'add') await base44.entities.TicketCategory.create(form);
      else await base44.entities.TicketCategory.update(modal.item.id, form);
      setModal(null); load();
    } catch { setError('Σφάλμα αποθήκευσης.'); }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    if (!confirm(`Διαγραφή "${item.name}";`)) return;
    await base44.entities.TicketCategory.delete(item.id);
    load();
  };

  const handleToggle = async (item) => {
    await base44.entities.TicketCategory.update(item.id, { is_active: !item.is_active });
    load();
  };

  const handleReorder = async (reordered) => {
    setItems(reordered);
    await base44.entities.TicketCategory.bulkUpdate(reordered.map((item, i) => ({ id: item.id, display_order: i })));
  };

  const columns = [
    { key: 'name', render: item => (
      <div className="flex items-center gap-2">
        {item.color && <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />}
        <span className="text-white font-medium text-sm">{item.name}</span>
      </div>
    )},
    { key: 'icon', render: item => <span className="text-white/50 text-xs font-mono-cyber">{item.icon || '—'}</span> },
  ];

  return (
    <>
      <AdminTable title="Κατηγορίες" items={items} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggle} onReorder={handleReorder} />
      {modal && (
        <AdminModal title={modal.mode === 'add' ? 'Νέα Κατηγορία' : 'Επεξεργασία Κατηγορίας'}
          onClose={() => setModal(null)} onSave={handleSave} saving={saving} error={error}>
          <div>
            <label className="block text-white/40 text-xs mb-1 font-mono-cyber tracking-widest">ΟΝΟΜΑ *</label>
            <input className="cyber-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="π.χ. Hardware" />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-2 font-mono-cyber tracking-widest">ICON (Lucide)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {ICON_OPTIONS.map(icon => (
                <button key={icon} type="button" onClick={() => setForm(f => ({ ...f, icon }))}
                  className={`px-2 py-1 text-xs font-mono-cyber border transition-all ${form.icon === icon ? 'border-[#00CFFF] text-[#00CFFF] bg-[#00CFFF]/10' : 'border-white/20 text-white/40 hover:border-[#00CFFF]/50'}`}>
                  {icon}
                </button>
              ))}
            </div>
            <input className="cyber-input text-xs" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="Ή πληκτρολογήστε Lucide icon name..." />
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