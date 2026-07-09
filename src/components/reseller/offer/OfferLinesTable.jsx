import { Trash2, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { formatCurrency, lineTotal } from '@/lib/resellerUtils';

export default function OfferLinesTable({
  lines,
  onUpdateLine,
  onRemoveLine,
  onReorderLines,
  totals,
}) {
  const { subtotalBefore, subtotalAfter, totalDiscount, vatRate, vatAmount, finalTotal, exemptBase } = totals;
  const inputCls = "bg-[#0E1235] border border-[#2A3580] rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-[#00CFFF]/40";

  if (lines.length === 0) return null;

  return (
    <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5">
      <h3 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">Γραμμές Προσφοράς</h3>
      <DragDropContext onDragEnd={onReorderLines}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2A3580]">
                <th className="py-2 px-1 w-6"></th>
                {['Προϊόν/Υπηρεσία', 'Περιγραφή', 'Ποσότητα', 'Τιμή', 'Έκπτωση %', 'ΦΠΑ', 'Σύνολο', ''].map(h => (
                  <th key={h} className="text-left py-2 px-2 text-white/40 text-xs font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <Droppable droppableId="offer-lines">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {lines.map((l, index) => (
                    <Draggable key={l.id} draggableId={String(l.id)} index={index}>
                      {(drag) => (
                        <tr ref={drag.innerRef} {...drag.draggableProps} className="border-b border-[#2A3580]/40">
                          <td {...drag.dragHandleProps} className="py-2 px-1 cursor-grab active:cursor-grabbing text-white/20 hover:text-white/50 transition-colors align-middle">
                            <GripVertical size={14} />
                          </td>
                          <td className="py-2 px-2">
                            <input value={l.name} onChange={e => onUpdateLine(l.id, 'name', e.target.value)} className="bg-transparent text-white text-sm focus:outline-none w-32 border-b border-transparent focus:border-[#00CFFF]/30" />
                          </td>
                          <td className="py-2 px-2">
                            <input value={l.description} onChange={e => onUpdateLine(l.id, 'description', e.target.value)} className="bg-transparent text-white/50 text-xs focus:outline-none w-28 border-b border-transparent focus:border-[#00CFFF]/30" />
                          </td>
                          <td className="py-2 px-2">
                            <input type="number" min={1} value={l.quantity} onChange={e => onUpdateLine(l.id, 'quantity', parseFloat(e.target.value) || 1)}
                              className={`${inputCls} w-16`} />
                          </td>
                          <td className="py-2 px-2">
                            <input type="number" min={0} step={0.01} value={l.unit_price} onChange={e => onUpdateLine(l.id, 'unit_price', parseFloat(e.target.value) || 0)}
                              className={`${inputCls} w-24`} />
                          </td>
                          <td className="py-2 px-2">
                            <input type="number" min={0} max={100} step={0.5} value={l.discount_pct} onChange={e => onUpdateLine(l.id, 'discount_pct', parseFloat(e.target.value) || 0)}
                              className={`${inputCls} w-16`} />
                          </td>
                          <td className="py-2 px-2">
                            <button type="button" onClick={() => onUpdateLine(l.id, 'is_vat_exempt', !l.is_vat_exempt)}
                              className={`px-2 py-0.5 rounded text-xs border whitespace-nowrap transition-colors ${l.is_vat_exempt ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-[#0E1235] border-[#2A3580] text-white/50 hover:border-[#00CFFF]/40'}`}>
                              {l.is_vat_exempt ? 'Απαλλαγή' : `${vatRate}%`}
                            </button>
                          </td>
                          <td className="py-2 px-2 text-[#00CFFF] font-mono text-sm">€{formatCurrency(lineTotal(l))}</td>
                          <td className="py-2 px-2">
                            <button onClick={() => onRemoveLine(l.id)} className="text-white/30 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </div>
      </DragDropContext>

      {/* Totals */}
      <div className="mt-4 flex justify-end">
        <div className="w-64 space-y-1.5 text-sm">
          <div className="flex justify-between text-white/60"><span>Σύνολο πριν έκπτωση</span><span className="font-mono">€{formatCurrency(subtotalBefore)}</span></div>
          <div className="flex justify-between text-red-400"><span>Έκπτωση</span><span className="font-mono">-€{formatCurrency(totalDiscount)}</span></div>
          <div className="flex justify-between text-white/60"><span>Καθαρό ποσό</span><span className="font-mono">€{formatCurrency(subtotalAfter)}</span></div>
          {exemptBase > 0 && (
            <div className="flex justify-between text-amber-300/80"><span>Απαλλαγή ΦΠΑ (άρθρο 45)</span><span className="font-mono">€{formatCurrency(exemptBase)}</span></div>
          )}
          <div className="flex justify-between text-white/60"><span>ΦΠΑ {vatRate}%{exemptBase > 0 ? ' (επί φορολογητέου)' : ''}</span><span className="font-mono">€{formatCurrency(vatAmount)}</span></div>
          <div className="flex justify-between border-t border-[#2A3580] pt-2 text-[#00CFFF] font-bold text-base">
            <span>Σύνολο</span><span className="font-mono">€{formatCurrency(finalTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}