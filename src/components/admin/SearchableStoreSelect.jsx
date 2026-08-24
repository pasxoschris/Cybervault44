import { useState, useEffect } from 'react';
import { Check, Search } from 'lucide-react';

export default function SearchableStoreSelect({ value, onChange, stores, placeholder = "Πληκτρολογήστε όνομα καταστήματος..." }) {
  const selected = stores.find(s => s.id === value);
  const [text, setText] = useState(selected ? (selected.store_name || selected.business_name) : '');

  useEffect(() => {
    const sel = stores.find(s => s.id === value);
    setText(sel ? (sel.store_name || sel.business_name) : '');
  }, [value, stores]);

  const match = text.trim().length >= 2
    ? stores.filter(s => {
        const q = text.toLowerCase().trim();
        const name = (s.store_name || s.business_name || '').toLowerCase();
        return name.includes(q);
      })
    : [];
  const exactMatch = match.length === 1 ? match[0] : null;

  const handleBlur = () => {
    if (exactMatch) {
      onChange(exactMatch.id);
      setText(exactMatch.store_name || exactMatch.business_name);
    } else if (match.length === 0 && text.trim()) {
      // no match — keep text but clear id
      onChange('');
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        {exactMatch ? (
          <Check size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 pointer-events-none" />
        ) : (
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00CFFF]/40 pointer-events-none" />
        )}
        <input
          type="text"
          value={text}
          onChange={e => { setText(e.target.value); if (value) onChange(''); }}
          onBlur={handleBlur}
          className="cyber-input !pl-9"
          placeholder={placeholder}
        />
      </div>
      {text.trim().length >= 2 && !exactMatch && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/30" style={{ fontFamily: 'Inter, sans-serif' }}>
          {match.length === 0 ? 'Δεν βρέθηκε' : `${match.length} matches`}
        </div>
      )}
    </div>
  );
}