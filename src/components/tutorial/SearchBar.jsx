import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { searchItems } from "../../lib/searchIndex";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setResults(searchItems(query));
  }, [query]);

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showDropdown = focused && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div
        className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all"
        style={{
          background: "rgba(255,255,255,0.12)",
          border: focused ? "1px solid rgba(255,255,255,0.45)" : "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Search size={16} className="text-white/60 flex-shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Αναζήτηση... π.χ. 'split bill', 'ακύρωση τιμολογίου'"
          className="flex-1 bg-transparent text-white text-sm placeholder-white/40 outline-none font-rajdhani"
        />
        {query && (
          <button onClick={() => { setQuery(""); inputRef.current?.focus(); }}>
            <X size={14} className="text-white/50 hover:text-white/80 transition-colors" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden shadow-2xl z-50"
            style={{ background: "#1E1B3A", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            {results.length === 0 ? (
              <div className="px-5 py-4 text-sm text-white/40 text-center font-rajdhani">
                Δεν βρέθηκαν αποτελέσματα για «{query}»
              </div>
            ) : (
              <ul>
                {results.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.path}
                      onClick={() => { setQuery(""); setFocused(false); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                      style={{ borderBottom: i < results.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(139,92,246,0.25)" }}>
                        <Search size={13} className="text-[#A78BFA]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate font-rajdhani">{item.title}</p>
                        <p className="text-white/45 text-xs truncate mt-0.5 font-rajdhani">{item.context}</p>
                      </div>
                      <ArrowRight size={13} className="text-white/25 group-hover:text-white/60 transition-colors flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}