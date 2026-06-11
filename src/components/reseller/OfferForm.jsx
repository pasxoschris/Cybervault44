import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, Save, Eye, Mail, RotateCcw, Search, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import EmailModal from './EmailModal';
import OfferPreviewModal from './OfferPreviewModal';

function generateRef() {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `CYV-SPOT-${date}-${seq}`;
}

const EMPTY_CUSTOMER = { store_name: '', company_legal_name: '', vat_number: '', address: '', contact_person: '', email: '', phone: '', notes: '' };

// Sort items within a category: by display_order (nulls last), then by name
const sortItems = (items) => [...items].sort((a, b) => {
  const ao = a.display_order == null ? 99999 : a.display_order;
  const bo = b.display_order == null ? 99999 : b.display_order;
  if (ao !== bo) return ao - bo;
  return (a.name || '').localeCompare(b.name || '');
});

export default function OfferForm({ editOffer, onSaved }) {
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [pricingItems, setPricingItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lines, setLines] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [savedOffer, setSavedOffer] = useState(null);
  const [settings, setSettings] = useState({ vat_rate: 24, offer_validity_days: 30 });
  const [search, setSearch] = useState('');
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    Promise.all([
      base44.entities.ResellerPricingItem.filter({ is_active: true }),
      base44.entities.ResellerCategory.list('display_order'),
      base44.entities.ResellerSettings.list(),
    ]).then(([items, cats, settingsList]) => {
      setPricingItems(items);
      setCategories(cats.filter(c => c.is_active));
      if (settingsList[0]) setSettings(settingsList[0]);
      const openState = {};
      const activeCats = cats.filter(c => c.is_active);
      activeCats.forEach((c, idx) => { openState[c.id] = idx === 0; });
      openState['__uncategorized__'] = false;
      setOpenCategories(openState);
    });
    if (editOffer) {
      setCustomer({
        store_name: editOffer.store_name || '', company_legal_name: editOffer.company_legal_name || '',
        vat_number: editOffer.vat_number || '', address: editOffer.address || '',
        contact_person: editOffer.contact_person || '', email: editOffer.email || '',
        phone: editOffer.phone || '', notes: editOffer.notes || ''
      });
      try { setLines(JSON.parse(editOffer.items || '[]')); } catch { }
    }
  }, [editOffer]);

  const toggleCategory = (id) => setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));

  const addLine = (item) => {
    setLines(prev => [...prev, {
      id: Date.now(), name: item.name, description: item.description || '',
      quantity: 1, unit_price: item.unit_price,
      discount_pct: item.default_discount_percentage || 0
    }]);
  };

  const updateLine = (id, field, val) => {
    setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: val } : l));
  };

  const removeLine = (id) => setLines(prev => prev.filter(l => l.id !== id));

  const lineTotal = (l) => {
    const sub = l.quantity * l.unit_price;
    return sub * (1 - l.discount_pct / 100);
  };

  const subtotalBefore = lines.reduce((s, l) => s + l.quantity * l.unit_price, 0);
  const subtotalAfter = lines.reduce((s, l) => s + lineTotal(l), 0);
  const totalDiscount = subtotalBefore - subtotalAfter;
  const vatRate = settings.default_vat_rate || 24;
  const vatAmount = subtotalAfter * vatRate / 100;
  const finalTotal = subtotalAfter + vatAmount;
  const fmt = (n) => Number(n).toFixed(2);

  const handleSave = async (status = 'draft') => {
    setSaving(true);
    const validityDays = settings.offer_validity_days || 30;
    const expiresAt = new Date(Date.now() + validityDays * 86400000).toISOString().split('T')[0];
    const data = {
      ...customer,
      reference_number: editOffer?.reference_number || generateRef(),
      status,
      items: JSON.stringify(lines),
      subtotal_before_discount: subtotalBefore,
      total_discount: totalDiscount,
      subtotal_after_discount: subtotalAfter,
      vat_rate: vatRate,
      vat_amount: vatAmount,
      final_total: finalTotal,
      expires_at: expiresAt,
    };
    let saved;
    if (editOffer) {
      saved = await base44.entities.ResellerOffer.update(editOffer.id, data);
    } else {
      saved = await base44.entities.ResellerOffer.create(data);
    }
    setSavedOffer(saved);
    setSaving(false);
    if (onSaved) onSaved(saved);
  };

  const handleClear = () => {
    setCustomer(EMPTY_CUSTOMER);
    setLines([]);
    setSavedOffer(null);
  };

  // Drag-and-drop handler: reorder items within the same category and persist display_order
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const catId = result.source.droppableId;
    if (catId !== result.destination.droppableId) return;

    // Get current items for this category, sorted
    const catItems = sortItems(pricingItems.filter(i =>
      catId === '__uncategorized__'
        ? (!i.category_id || !categories.find(c => c.id === i.category_id))
        : i.category_id === catId
    ));

    const reordered = [...catItems];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    // Assign new display_order values
    const updates = reordered.map((item, idx) => ({ id: item.id, display_order: idx * 10 }));

    // Optimistic update
    setPricingItems(prev => prev.map(item => {
      const upd = updates.find(u => u.id === item.id);
      return upd ? { ...item, display_order: upd.display_order } : item;
    }));

    // Persist to backend
    await Promise.all(updates.map(u =>
      base44.entities.ResellerPricingItem.update(u.id, { display_order: u.display_order })
    ));
  };

  const inputCls = "w-full bg-[#0E1235] border border-[#2A3580] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 placeholder-white/20";

  // Filter items
  const q = search.trim().toLowerCase();
  const filteredItems = q
    ? pricingItems.filter(i => i.name.toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q))
    : pricingItems;

  // Build grouped structure: ordered categories, sorted items within each
  const grouped = categories.map(cat => ({
    cat,
    items: sortItems(filteredItems.filter(i => i.category_id === cat.id)),
  })).filter(g => g.items.length > 0);

  const uncategorized = sortItems(filteredItems.filter(i => !i.category_id || !categories.find(c => c.id === i.category_id)));

  return (
    <div className="space-y-6">
      {/* Customer */}
      <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5">
        <h3 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">Στοιχεία Πελάτη</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            ['store_name', 'Κατάστημα', 'text'], ['company_legal_name', 'Επωνυμία', 'text'],
            ['vat_number', 'ΑΦΜ', 'text'], ['address', 'Διεύθυνση', 'text'],
            ['contact_person', 'Υπεύθυνος', 'text'], ['email', 'Email', 'email'],
            ['phone', 'Τηλέφωνο', 'tel']
          ].map(([key, label, type]) => (
            <div key={key}>
              <label className="block text-white/40 text-xs mb-1">{label}</label>
              <input type={type} value={customer[key]} onChange={e => setCustomer(c => ({ ...c, [key]: e.target.value }))} className={inputCls} />
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block text-white/40 text-xs mb-1">Σημειώσεις</label>
            <textarea value={customer.notes} onChange={e => setCustomer(c => ({ ...c, notes: e.target.value }))} rows={2} className={inputCls} />
          </div>
        </div>
      </div>

      {/* Item selector — categorized with DnD */}
      <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-[#00CFFF] uppercase tracking-widest">Επιλογή Εξοπλισμού / Υπηρεσιών</h3>
          {lines.length > 0 && (
            <span className="text-xs text-white/40" style={{ fontFamily: 'Inter,sans-serif' }}>{lines.length} επιλεγμένα</span>
          )}
        </div>

        {pricingItems.length === 0 ? (
          <p className="text-white/30 text-sm">Δεν υπάρχουν ενεργά προϊόντα. Προσθέστε τιμές στον Τιμοκατάλογο.</p>
        ) : (
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Αναζήτηση προϊόντος..."
                className="w-full bg-[#0E1235] border border-[#2A3580] rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 placeholder-white/20"
              />
            </div>

            {grouped.length === 0 && uncategorized.length === 0 && (
              <p className="text-white/30 text-sm text-center py-6">Δεν βρέθηκαν αποτελέσματα.</p>
            )}

            <DragDropContext onDragEnd={handleDragEnd}>
              {grouped.map(({ cat, items }) => (
                <div key={cat.id} className="border border-[#2A3580] rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-[#0E1235] hover:bg-[#131840] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {openCategories[cat.id] ? <ChevronDown size={14} className="text-[#00CFFF]" /> : <ChevronRight size={14} className="text-white/40" />}
                      <span className="text-xs font-medium text-white">{cat.name}</span>
                      <span className="text-xs text-white/30 font-mono">({items.length})</span>
                    </div>
                  </button>
                  {openCategories[cat.id] && (
                    <Droppable droppableId={cat.id} isDropDisabled={!!q}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col p-3 gap-1.5 bg-[#0a0d28]/40">
                          {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={!!q}>
                              {(drag, snapshot) => (
                                <div ref={drag.innerRef} {...drag.draggableProps}
                                  className={`${snapshot.isDragging ? 'opacity-80 shadow-lg shadow-[#00CFFF]/10' : ''}`}>
                                  <ItemCard item={item} onAdd={addLine} fmt={fmt} dragHandleProps={drag.dragHandleProps} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                </div>
              ))}

              {uncategorized.length > 0 && (
                <div className="border border-[#2A3580] rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleCategory('__uncategorized__')}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-[#0E1235] hover:bg-[#131840] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {openCategories['__uncategorized__'] ? <ChevronDown size={14} className="text-[#00CFFF]" /> : <ChevronRight size={14} className="text-white/40" />}
                      <span className="text-xs font-medium text-white/60">Χωρίς κατηγορία</span>
                      <span className="text-xs text-white/30 font-mono">({uncategorized.length})</span>
                    </div>
                  </button>
                  {openCategories['__uncategorized__'] && (
                    <Droppable droppableId="__uncategorized__" isDropDisabled={!!q}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col p-3 gap-1.5 bg-[#0a0d28]/40">
                          {uncategorized.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={!!q}>
                              {(drag, snapshot) => (
                                <div ref={drag.innerRef} {...drag.draggableProps}
                                  className={`${snapshot.isDragging ? 'opacity-80 shadow-lg shadow-[#00CFFF]/10' : ''}`}>
                                  <ItemCard item={item} onAdd={addLine} fmt={fmt} dragHandleProps={drag.dragHandleProps} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                </div>
              )}
            </DragDropContext>
          </div>
        )}
      </div>

      {/* Lines table */}
      {lines.length > 0 && (
        <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5">
          <h3 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">Γραμμές Προσφοράς</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A3580]">
                  {['Προϊόν/Υπηρεσία', 'Περιγραφή', 'Ποσότητα', 'Τιμή', 'Έκπτωση %', 'Σύνολο', ''].map(h => (
                    <th key={h} className="text-left py-2 px-2 text-white/40 text-xs font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lines.map(l => (
                  <tr key={l.id} className="border-b border-[#2A3580]/40">
                    <td className="py-2 px-2">
                      <input value={l.name} onChange={e => updateLine(l.id, 'name', e.target.value)} className="bg-transparent text-white text-sm focus:outline-none w-32 border-b border-transparent focus:border-[#00CFFF]/30" />
                    </td>
                    <td className="py-2 px-2">
                      <input value={l.description} onChange={e => updateLine(l.id, 'description', e.target.value)} className="bg-transparent text-white/50 text-xs focus:outline-none w-28 border-b border-transparent focus:border-[#00CFFF]/30" />
                    </td>
                    <td className="py-2 px-2">
                      <input type="number" min={1} value={l.quantity} onChange={e => updateLine(l.id, 'quantity', parseFloat(e.target.value) || 1)}
                        className="bg-[#0E1235] border border-[#2A3580] rounded px-2 py-1 text-white text-sm w-16 focus:outline-none focus:border-[#00CFFF]/40" />
                    </td>
                    <td className="py-2 px-2">
                      <input type="number" min={0} step={0.01} value={l.unit_price} onChange={e => updateLine(l.id, 'unit_price', parseFloat(e.target.value) || 0)}
                        className="bg-[#0E1235] border border-[#2A3580] rounded px-2 py-1 text-white text-sm w-20 focus:outline-none focus:border-[#00CFFF]/40" />
                    </td>
                    <td className="py-2 px-2">
                      <input type="number" min={0} max={100} step={0.5} value={l.discount_pct} onChange={e => updateLine(l.id, 'discount_pct', parseFloat(e.target.value) || 0)}
                        className="bg-[#0E1235] border border-[#2A3580] rounded px-2 py-1 text-white text-sm w-16 focus:outline-none focus:border-[#00CFFF]/40" />
                    </td>
                    <td className="py-2 px-2 text-[#00CFFF] font-mono text-sm">€{fmt(lineTotal(l))}</td>
                    <td className="py-2 px-2">
                      <button onClick={() => removeLine(l.id)} className="text-white/30 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-4 flex justify-end">
            <div className="w-64 space-y-1.5 text-sm">
              <div className="flex justify-between text-white/60"><span>Σύνολο πριν έκπτωση</span><span className="font-mono">€{fmt(subtotalBefore)}</span></div>
              <div className="flex justify-between text-red-400"><span>Έκπτωση</span><span className="font-mono">-€{fmt(totalDiscount)}</span></div>
              <div className="flex justify-between text-white/60"><span>Καθαρό ποσό</span><span className="font-mono">€{fmt(subtotalAfter)}</span></div>
              <div className="flex justify-between text-white/60"><span>ΦΠΑ {vatRate}%</span><span className="font-mono">€{fmt(vatAmount)}</span></div>
              <div className="flex justify-between border-t border-[#2A3580] pt-2 text-[#00CFFF] font-bold text-base">
                <span>Σύνολο</span><span className="font-mono">€{fmt(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => handleSave('draft')} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#131840] border border-[#2A3580] rounded-xl text-white text-sm hover:border-[#00CFFF]/40 transition-colors disabled:opacity-40">
          <Save size={15} /> {saving ? 'Αποθήκευση...' : 'Αποθήκευση Draft'}
        </button>
        <button onClick={() => setShowPreview(true)} disabled={lines.length === 0}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#00CFFF]/10 border border-[#00CFFF]/30 rounded-xl text-[#00CFFF] text-sm hover:bg-[#00CFFF]/20 transition-colors disabled:opacity-40">
          <Eye size={15} /> Preview
        </button>
        <button onClick={() => { handleSave('draft'); setShowEmail(true); }} disabled={!savedOffer && lines.length === 0}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#131840] border border-[#2A3580] rounded-xl text-white text-sm hover:border-[#00CFFF]/40 transition-colors disabled:opacity-40">
          <Mail size={15} /> Αποστολή Email
        </button>
        <button onClick={handleClear}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#131840] border border-red-500/20 rounded-xl text-red-400/70 text-sm hover:border-red-400/50 transition-colors">
          <RotateCcw size={15} /> Καθαρισμός
        </button>
      </div>

      {showEmail && (
        <EmailModal offer={savedOffer} customer={customer} defaultSettings={settings} onClose={() => setShowEmail(false)} />
      )}
      {showPreview && (
        <OfferPreviewModal
          customer={customer} lines={lines}
          totals={{ subtotalBefore, subtotalAfter, totalDiscount, vatRate, vatAmount, finalTotal }}
          settings={settings} refNumber={editOffer?.reference_number || savedOffer?.reference_number}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

function ItemCard({ item, onAdd, fmt, dragHandleProps }) {
  return (
    <div className="w-full flex items-center bg-[#0E1235] border border-[#2A3580] rounded-lg hover:border-[#00CFFF]/40 hover:bg-[#00CFFF]/5 transition-all group">
      {/* Drag handle */}
      <div {...dragHandleProps} className="flex-shrink-0 px-2 py-3 cursor-grab active:cursor-grabbing text-white/20 hover:text-white/50 transition-colors">
        <GripVertical size={14} />
      </div>
      {/* Clickable area */}
      <button onClick={() => onAdd(item)} className="flex items-center justify-between flex-1 pr-4 py-3 text-left min-w-0">
        <div className="min-w-0 flex-1">
          <div className="text-white text-sm group-hover:text-[#00CFFF]">{item.name}</div>
          {item.description && <div className="text-white/30 text-xs mt-0.5">{item.description}</div>}
        </div>
        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
          <span className="text-[#00CFFF] font-mono text-sm">€{fmt(item.unit_price)}</span>
          <div className="w-6 h-6 flex items-center justify-center rounded border border-[#2A3580] group-hover:border-[#00CFFF]/60 group-hover:bg-[#00CFFF]/10 transition-all">
            <Plus size={13} className="text-white/40 group-hover:text-[#00CFFF]" />
          </div>
        </div>
      </button>
    </div>
  );
}