import { useState } from 'react';
import { Pencil, Trash2, Plus, Search, Eye, EyeOff, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function AdminTable({ title, items, columns, onAdd, onEdit, onDelete, onToggle, onReorder, loading }) {
  const [search, setSearch] = useState('');

  const filtered = items.filter(item =>
    columns.some(col => col.key && String(item[col.key] || '').toLowerCase().includes(search.toLowerCase()))
  );

  const handleDragEnd = (result) => {
    if (!result.destination || !onReorder) return;
    const reordered = Array.from(filtered);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onReorder(reordered);
  };

  return (
    <div className="border border-[#00CFFF]/20 bg-[#131840]/80">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 p-4 border-b border-[#00CFFF]/15">
        <div className="flex items-center gap-2 flex-1">
          <Search size={14} className="text-[#00CFFF]/50 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Αναζήτηση..."
            className="cyber-input text-sm flex-1"
          />
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#00CFFF] text-[#0E1235] font-orbitron text-xs tracking-widest hover:bg-[#00D4FF] transition-colors"
        >
          <Plus size={14} />
          ΠΡΟΣΘΗΚΗ
        </button>
      </div>

      {/* Count */}
      <div className="px-4 py-2 border-b border-[#00CFFF]/10">
        <span className="font-mono-cyber text-[10px] text-white/25 tracking-widest">{filtered.length} ΕΓΓΡΑΦΕΣ</span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 font-mono-cyber text-[#00CFFF]/40 text-xs tracking-widest">ΦΟΡΤΩΣΗ...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-white/30 text-sm">Δεν βρέθηκαν εγγραφές</div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="table">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {filtered.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center gap-3 px-4 py-3 border-b border-[#00CFFF]/10 transition-colors ${
                          snapshot.isDragging ? 'bg-[#00CFFF]/10' : 'hover:bg-[#00CFFF]/5'
                        } ${!item.is_active ? 'opacity-40' : ''}`}
                      >
                        {/* Drag handle */}
                        <div {...provided.dragHandleProps} className="text-white/20 hover:text-[#00CFFF]/60 cursor-grab flex-shrink-0">
                          <GripVertical size={14} />
                        </div>

                        {/* Columns */}
                        <div className="flex-1 grid gap-3" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
                          {columns.map(col => (
                            <div key={col.key}>
                              {col.render ? col.render(item) : (
                                <span className="text-white/80 text-sm">{item[col.key] || '—'}</span>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {onToggle && (
                            <button onClick={() => onToggle(item)}
                              className="text-white/30 hover:text-[#00CFFF] transition-colors" title={item.is_active ? 'Απενεργοποίηση' : 'Ενεργοποίηση'}>
                              {item.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                          )}
                          <button onClick={() => onEdit(item)}
                            className="text-white/30 hover:text-[#00CFFF] transition-colors" title="Επεξεργασία">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => onDelete(item)}
                            className="text-white/30 hover:text-red-400 transition-colors" title="Διαγραφή">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}