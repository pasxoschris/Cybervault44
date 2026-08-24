import { useState, useRef, useEffect } from 'react';
import { Search, Check } from 'lucide-react';

export default function SearchableStoreSelect({ value, onChange, stores, placeholder = "Πληκτρολογήστε όνομα καταστήματος..." }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = stores.find(s => s.id === value);
  const display = selected ? (selected.store_name || selected.business_name) : '';

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const q = query.toLowerCase().trim();
  const matches = q.length >= 1
    ? stores.filter(s => {
        const name = (s.store_name || s.business_name || '').toLowerCase();
        const city = (s.city || '').toLowerCase();
        const vat = (s.vat_number || '').toLowerCase();
        return name.includes(q) || city.includes(q) || vat.includes(q);
      })
    : [];

  const select = (store) => {
    onChange(store.id);
    setQuery('');
    setOpen(false);
  };

  const clear = () => {
    onChange('');
    setQuery('');
    setOpen(true);
  };

  return (
    <div className="relative" ref={ref}>
      {display ? (
        <div className="cyber-input !py-2 pr-20 flex items-center justify-between">
          <span className="text-sm truncate flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Check size={13} className="text-green-400 flex-shrink-0" />
            {display}
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={clear}
              className="text-[10px] text-[#00CFFF]/60 hover:text-[#00CFFF] font-mono-cyber tracking-widest uppercase"
            >
              ΑΛΛΑΓΗ
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00CFFF]/40 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            className="cyber-input !pl-9"
            placeholder={placeholder}
          />
        </div>
      )}

      {open && !display && q.length >= 1 && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto border border-[#00CFFF]/30 bg-[#131840] shadow-xl">
          {matches.length === 0 ? (
            <div className="px-3 py-3 text-xs text-white/30" style={{ fontFamily: 'Inter, sans-serif' }}>Δεν βρέθηκαν καταστήματα</div>
          ) : (
            matches.map(s => (
              <button
                type="button"
                key={s.id}
                onClick={() => select(s)}
                className="w-full text-left px-3 py-2 hover:bg-[#00CFFF]/10 transition-colors border-b border-[#00CFFF]/5 last:border-0"
              >
                <div className="text-sm text-white/90 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {s.store_name || s.business_name}
                </div>
                {(s.city || s.vat_number) && (
                  <div className="text-[10px] text-white/40 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {s.city && <span>{s.city}</span>}
                    {s.city && s.vat_number && <span> · </span>}
                    {s.vat_number && <span>ΑΦΜ {s.vat_number}</span>}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}