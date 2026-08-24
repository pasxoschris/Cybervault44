import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchableStoreSelect({ value, onChange, stores, placeholder = "Αναζήτηση καταστήματος..." }) {
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

  const filtered = query.trim()
    ? stores.filter(s => {
        const q = query.toLowerCase();
        const name = (s.store_name || s.business_name || '').toLowerCase();
        const city = (s.city || '').toLowerCase();
        const vat = (s.vat_number || '').toLowerCase();
        return name.includes(q) || city.includes(q) || vat.includes(q);
      })
    : stores;

  const select = (store) => {
    onChange(store.id);
    setQuery('');
    setOpen(false);
  };

  const clear = () => {
    onChange('');
    setQuery('');
  };

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        {display ? (
          <div className="cyber-input !py-2 pr-16 flex items-center justify-between">
            <span className="text-sm truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{display}</span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => { setOpen(true); setQuery(''); }}
                className="text-[#00CFFF]/60 hover:text-[#00CFFF] p-0.5"
                title="Αλλαγή"
              >
                <Search size={13} />
              </button>
              <button
                type="button"
                onClick={clear}
                className="text-white/40 hover:text-white p-0.5"
                title="Καθαρισμός"
              >
                <X size={13} />
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
      </div>

      {open && !display && (
        <div className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto border border-[#00CFFF]/30 bg-[#131840] shadow-xl">
          {filtered.length === 0 ? (
            <div className="px-3 py-3 text-xs text-white/30" style={{ fontFamily: 'Inter, sans-serif' }}>Δεν βρέθηκαν καταστήματα</div>
          ) : (
            filtered.slice(0, 50).map(s => (
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
          {filtered.length > 50 && (
            <div className="px-3 py-2 text-[10px] text-white/30 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              Εμφάνιση 50 πρώτων — περιορισμός με αναζήτηση
            </div>
          )}
        </div>
      )}
    </div>
  );
}