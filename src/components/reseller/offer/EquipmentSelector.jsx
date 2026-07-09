import { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { sortItems } from '@/lib/resellerUtils';
import ItemCard from './ItemCard';

export default function EquipmentSelector({
  pricingItems,
  categories,
  openCategories,
  onToggleCategory,
  onAddItem,
  onReorderItems,
}) {
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();
  const filteredItems = q
    ? pricingItems.filter(i => i.name.toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q))
    : pricingItems;

  const grouped = categories.map(cat => ({
    cat,
    items: sortItems(filteredItems.filter(i => i.category_id === cat.id)),
  })).filter(g => g.items.length > 0);

  const uncategorized = sortItems(filteredItems.filter(i => !i.category_id || !categories.find(c => c.id === i.category_id)));

  if (pricingItems.length === 0) {
    return <p className="text-white/30 text-sm">Δεν υπάρχουν ενεργά προϊόντα. Προσθέστε τιμές στον Τιμοκατάλογο.</p>;
  }

  return (
    <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-[#00CFFF] uppercase tracking-widest">Επιλογή Εξοπλισμού / Υπηρεσιών</h3>
      </div>

      <div className="space-y-3">
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

        <DragDropContext onDragEnd={onReorderItems}>
          {grouped.map(({ cat, items }) => (
            <CategorySection
              key={cat.id}
              cat={cat}
              items={items}
              isOpen={openCategories[cat.id]}
              onToggle={() => onToggleCategory(cat.id)}
              onAddItem={onAddItem}
              droppableId={cat.id}
              isDropDisabled={!!q}
            />
          ))}

          {uncategorized.length > 0 && (
            <CategorySection
              cat={{ id: '__uncategorized__', name: 'Χωρίς κατηγορία' }}
              items={uncategorized}
              isOpen={openCategories['__uncategorized__']}
              onToggle={() => onToggleCategory('__uncategorized__')}
              onAddItem={onAddItem}
              droppableId="__uncategorized__"
              isDropDisabled={!!q}
              isUncategorized
            />
          )}
        </DragDropContext>
      </div>
    </div>
  );
}

function CategorySection({ cat, items, isOpen, onToggle, onAddItem, droppableId, isDropDisabled, isUncategorized }) {
  return (
    <div className="border border-[#2A3580] rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors ${isOpen ? 'bg-[#00CFFF]/10 border-l-2 border-[#00CFFF]' : 'bg-[#0E1235] hover:bg-[#131840]'}`}
      >
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronDown size={14} className="text-[#00CFFF]" /> : <ChevronRight size={14} className="text-white/40" />}
          <span className={`text-xs font-medium ${isUncategorized ? 'text-white/60' : 'text-white'}`}>{cat.name}</span>
          <span className="text-xs text-white/30 font-mono">({items.length})</span>
        </div>
      </button>
      {isOpen && (
        <Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col p-3 gap-1.5 bg-[#0a0d28]/40">
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={isDropDisabled}>
                  {(drag, snapshot) => (
                    <div ref={drag.innerRef} {...drag.draggableProps}
                      className={`${snapshot.isDragging ? 'opacity-80 shadow-lg shadow-[#00CFFF]/10' : ''}`}>
                      <ItemCard item={item} onAdd={onAddItem} dragHandleProps={drag.dragHandleProps} />
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
  );
}