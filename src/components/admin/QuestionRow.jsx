import React, { useState } from 'react';
import { GripVertical, Trash2 } from 'lucide-react';

export default function QuestionRow({ q, index, categories, onCommitText, onCommitCategory, onToggleActive, onRemove, dragHandleProps, draggableProps, innerRef, isDragging }) {
  const [draft, setDraft] = useState(q.question);
  const [editing, setEditing] = useState(false);

  const commit = () => {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== q.question) {
      onCommitText(q.id, trimmed);
    } else if (!trimmed) {
      setDraft(q.question);
    }
  };

  return (
    <div
      ref={innerRef}
      {...draggableProps}
      className={`flex items-center gap-2 border rounded-lg p-2.5 transition-all ${
        q.is_active
          ? 'border-[#00CFFF]/20 bg-[#0E1235]/60'
          : 'border-white/10 bg-[#0E1235]/30 opacity-50'
      } ${isDragging ? 'shadow-lg ring-1 ring-[#00CFFF]/40 !border-[#00CFFF]/50' : ''}`}
    >
      <button
        {...dragHandleProps}
        className="text-white/30 hover:text-[#00CFFF] cursor-grab active:cursor-grabbing transition-colors touch-none"
        title="Σύρε για αλλαγή σειράς"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <span className="text-white/30 text-xs font-mono-cyber w-5 text-center">{index + 1}</span>
      <input
        value={editing ? draft : q.question}
        onChange={e => { setEditing(true); setDraft(e.target.value); }}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') e.target.blur(); }}
        className="flex-1 bg-transparent text-white/90 text-sm font-rajdhani outline-none border-b border-transparent focus:border-[#00CFFF]/40 px-1 py-0.5"
      />
      <select
        value={q.category || 'general'}
        onChange={e => onCommitCategory(q.id, e.target.value)}
        className="bg-[#0E1235] text-white/60 text-xs border border-white/10 rounded px-1 py-0.5 outline-none"
      >
        {categories.map(c => (
          <option key={c.id} value={c.id} className="bg-[#131840]">{c.icon} {c.label}</option>
        ))}
      </select>
      <button
        onClick={() => onToggleActive(q)}
        className={`px-2 py-1 rounded text-xs font-medium transition-all whitespace-nowrap ${
          q.is_active
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-white/10 text-white/40 border border-white/20'
        }`}
      >
        {q.is_active ? 'Ενεργή' : 'Ανενεργή'}
      </button>
      <button
        onClick={() => onRemove(q.id)}
        className="text-red-400/60 hover:text-red-400 transition-colors p-1"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}