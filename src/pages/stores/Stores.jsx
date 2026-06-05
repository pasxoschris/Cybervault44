import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Search, Plus, Eye, Edit, Trash2, Filter, X } from "lucide-react";
import StoreAccessGuard from "@/components/stores/StoreAccessGuard";
import StoreBadge from "@/components/stores/StoreBadge";
import Navbar from "@/components/layout/Navbar";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const resetPage = () => setPage(1);
  const [filters, setFilters] = useState({ status: "", academy_access: "", training_status: "", support_contract: "", support_level: "", support_status: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null); // null | "asc" | "desc"
  const PAGE_SIZE = 50;

  useEffect(() => {
    const fetchAll = async () => {
      let all = [];
      let skip = 0;
      const limit = 200;
      while (true) {
        const batch = await base44.entities.Store.list("-created_date", limit, skip);
        all = [...all, ...batch];
        if (batch.length < limit) break;
        skip += limit;
      }
      setStores(all);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const filtered = stores.filter(s => {
    const q = search.trim().toLowerCase();
    if (q) {
      const vatMatch = s.vat_number?.includes(q);
      const nameMatch = s.business_name?.toLowerCase().includes(q) || s.trade_name?.toLowerCase().includes(q) || s.store_name?.toLowerCase().includes(q);
      if (!vatMatch && !nameMatch) return false;
    }
    if (filters.status && s.status !== filters.status) return false;
    if (filters.academy_access !== "") {
      const val = filters.academy_access === "true";
      if (s.academy_access !== val) return false;
    }
    if (filters.training_status && s.training_status !== filters.training_status) return false;
    if (filters.support_contract !== "") {
      const val = filters.support_contract === "true";
      if (s.support_contract !== val) return false;
    }
    if (filters.support_level && s.support_level !== filters.support_level) return false;
    if (filters.support_status && s.support_status !== filters.support_status) return false;
    return true;
  });

  // Sort: by business_name if sortOrder set, else exact VAT match first
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder) {
      const nameA = (a.business_name || "").toLowerCase();
      const nameB = (b.business_name || "").toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
    const q = search.trim();
    if (!q) return 0;
    if (a.vat_number === q) return -1;
    if (b.vat_number === q) return 1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const currentPage = Math.min(page, totalPages || 1);
  const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleDelete = async (id) => {
    if (!window.confirm("Διαγραφή καταστήματος; Αυτή η ενέργεια δεν αναιρείται.")) return;
    setDeleting(id);
    await base44.entities.Store.delete(id);
    setStores(s => s.filter(x => x.id !== id));
    setDeleting(null);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== "").length;

  return (
    <StoreAccessGuard>
      <div className="min-h-screen bg-[#0E1235]">
        <Navbar />
        <div className="pt-20 max-w-[1400px] mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-orbitron text-2xl font-bold text-white">Κατάστημα Registry</h1>
              <p className="text-white/40 text-sm mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                {stores.length} καταστήματα συνολικά
              </p>
            </div>
            <Link to="/stores/new"
              className="flex items-center gap-2 bg-[#00CFFF] text-[#0E1235] font-bold px-5 py-2.5 rounded-xl hover:bg-[#00CFFF]/80 transition-colors text-sm font-orbitron">
              <Plus size={16} /> Νέο Κατάστημα
            </Link>
          </div>

          {/* Search + Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
              <input
                value={search} onChange={e => { setSearch(e.target.value); resetPage(); }}
                placeholder="Αναζήτηση με ΑΦΜ, επωνυμία.."
                className="w-full bg-[#131840] border border-[#2A3580] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 placeholder-white/25"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${showFilters || activeFiltersCount > 0 ? "border-[#00CFFF]/60 text-[#00CFFF] bg-[#00CFFF]/10" : "border-[#2A3580] text-white/60 hover:border-[#00CFFF]/40"}`}>
              <Filter size={14} /> Φίλτρα {activeFiltersCount > 0 && <span className="bg-[#00CFFF] text-[#0E1235] text-xs rounded-full px-1.5 py-0.5 font-bold">{activeFiltersCount}</span>}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5 mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { key: "status", label: "Status", opts: [["active","Ενεργό"],["inactive","Ανενεργό"],["suspended","Αναστολή"],["prospect","Υποψήφιο"]] },
                { key: "academy_access", label: "Academy Access", opts: [["true","Ναι"],["false","Όχι"]] },
                { key: "training_status", label: "Training Status", opts: [["not_started","Δεν ξεκίνησε"],["in_progress","Σε εξέλιξη"],["completed","Ολοκλ/θηκε"],["suspended","Αναστολή"]] },
                { key: "support_contract", label: "Σύμβαση", opts: [["true","Ναι"],["false","Όχι"]] },
                { key: "support_level", label: "Support Level", opts: [["none","Χωρίς"],["basic","Basic"],["standard","Standard"],["premium","Premium"]] },
                { key: "support_status", label: "Support Status", opts: [["active","Ενεργό"],["suspended","Αναστολή"],["ended","Έληξε"]] },
              ].map(({ key, label, opts }) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-white/50 text-xs">{label}</label>
                  <select
                    value={filters[key]}
                    onChange={e => { setFilters(f => ({ ...f, [key]: e.target.value })); resetPage(); }}
                    className="bg-[#0E1235] border border-[#2A3580] rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-[#00CFFF]/50"
                  >
                    <option value="">Όλα</option>
                    {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
              ))}
              {activeFiltersCount > 0 && (
                <div className="flex items-end">
                  <button onClick={() => setFilters({ status: "", academy_access: "", training_status: "", support_contract: "", support_level: "", support_status: "" })}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                    <X size={12} /> Καθαρισμός
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Table */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-20 text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>
              {search || activeFiltersCount > 0 ? "Δεν βρέθηκαν αποτελέσματα." : "Δεν υπάρχουν καταστήματα ακόμα."}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-[#2A3580]">
              <table className="w-full text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                <thead>
                  <tr className="bg-[#131840] border-b border-[#2A3580]">
                     <th className="text-left px-4 py-3 text-white/50 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">ΑΦΜ</th>
                     <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                       <button
                         onClick={() => { setSortOrder(o => o === "asc" ? "desc" : o === "desc" ? null : "asc"); resetPage(); }}
                         className="flex items-center gap-1.5 text-white/50 hover:text-[#00CFFF] transition-colors cursor-pointer"
                       >
                         ΕΠΩΝΥΜΙΑ
                         {sortOrder === "asc" ? <ArrowUp size={13} className="text-[#00CFFF]" /> : sortOrder === "desc" ? <ArrowDown size={13} className="text-[#00CFFF]" /> : <ArrowUpDown size={13} className="text-white/30" />}
                       </button>
                     </th>
                     {["Διακριτικός","Κατάστημα","Email","Τηλέφωνο","Υπεύθυνος","Academy","Σύμβαση","Support",""].map(h => (
                       <th key={h} className="text-left px-4 py-3 text-white/50 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                     ))}
                   </tr>
                </thead>
                <tbody>
                  {paginated.map((s, i) => (
                    <tr key={s.id} className={`border-b border-[#2A3580]/50 hover:bg-[#131840]/70 transition-colors ${i % 2 === 0 ? "bg-[#0E1235]" : "bg-[#0f1339]/60"}`}>
                      <td className="px-4 py-3 font-mono text-[#00CFFF] font-semibold whitespace-nowrap">{s.vat_number}</td>
                      <td className="px-4 py-3 text-white font-medium whitespace-nowrap max-w-[180px] truncate">{s.business_name}</td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap max-w-[140px] truncate">{s.trade_name || "—"}</td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap max-w-[140px] truncate">{s.store_name || "—"}</td>
                      <td className="px-4 py-3 text-white/60 whitespace-nowrap max-w-[160px] truncate">{s.email || "—"}</td>
                      <td className="px-4 py-3 text-white/60 whitespace-nowrap">{s.phone || s.mobile_phone || "—"}</td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap max-w-[130px] truncate">{s.contact_person || "—"}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><StoreBadge value={s.academy_access} /></td>
                      <td className="px-4 py-3 whitespace-nowrap"><StoreBadge value={s.support_contract} /></td>
                      <td className="px-4 py-3 whitespace-nowrap"><StoreBadge value={s.support_status} /></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Link to={`/stores/${s.id}`} className="p-1.5 rounded-lg hover:bg-[#00CFFF]/10 text-white/40 hover:text-[#00CFFF] transition-colors"><Eye size={14} /></Link>
                          <Link to={`/stores/${s.id}/edit`} className="p-1.5 rounded-lg hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition-colors"><Edit size={14} /></Link>
                          <button onClick={() => handleDelete(s.id)} disabled={deleting === s.id} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors disabled:opacity-30"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-[#2A3580] text-white/60 hover:text-white hover:border-[#00CFFF]/50 disabled:opacity-30 text-sm transition-colors"
              >
                ← Προηγ.
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "..." ? (
                    <span key={`ellipsis-${i}`} className="text-white/30 px-1">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${currentPage === p ? "bg-[#00CFFF] text-[#0E1235] font-bold" : "border border-[#2A3580] text-white/60 hover:text-white hover:border-[#00CFFF]/50"}`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-[#2A3580] text-white/60 hover:text-white hover:border-[#00CFFF]/50 disabled:opacity-30 text-sm transition-colors"
              >
                Επόμ. →
              </button>
            </div>
          )}

          <p className="text-white/25 text-xs mt-4 text-right" style={{ fontFamily: 'Inter, sans-serif' }}>
            {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, sorted.length)} από {sorted.length} ({stores.length} συνολικά)
          </p>
        </div>
      </div>
    </StoreAccessGuard>
  );
}