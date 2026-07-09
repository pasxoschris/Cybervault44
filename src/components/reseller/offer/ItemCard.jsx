import { useState } from 'react';
import { GripVertical, Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/resellerUtils';

export default function ItemCard({ item, onAdd, dragHandleProps }) {
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    onAdd(item, Math.max(1, parseInt(qty) || 1));
    setQty(1);
  };

  return (
    <div className="w-full flex items-center bg-[#0E1235] border border-[#2A3580] rounded-lg hover:border-[#00CFFF]/40 hover:bg-[#00CFFF]/5 transition-all group">
      <div {...dragHandleProps} className="flex-shrink-0 px-2 py-3 cursor-grab active:cursor-grabbing text-white/20 hover:text-white/50 transition-colors">
        <GripVertical size={14} />
      </div>
      <div className="flex items-center justify-between flex-1 pr-3 py-3 text-left min-w-0">
        <div className="min-w-0 flex-1">
          <div className="text-white text-sm group-hover:text-[#00CFFF]">{item.name}</div>
          {item.description && <div className="text-white/30 text-xs mt-0.5">{item.description}</div>}
        </div>
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <span className="text-[#00CFFF] font-mono text-sm">€{formatCurrency(item.unit_price)}</span>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={e => setQty(e.target.value)}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
            className="w-12 bg-[#0a0d28] border border-[#2A3580] rounded px-1.5 py-1 text-white text-xs text-center focus:outline-none focus:border-[#00CFFF]/50"
            title="Ποσότητα"
          />
          <button
            onClick={handleAdd}
            className="w-6 h-6 flex items-center justify-center rounded border border-[#2A3580] group-hover:border-[#00CFFF]/60 group-hover:bg-[#00CFFF]/10 transition-all"
          >
            <Plus size={13} className="text-white/40 group-hover:text-[#00CFFF]" />
          </button>
        </div>
      </div>
    </div>
  );
}