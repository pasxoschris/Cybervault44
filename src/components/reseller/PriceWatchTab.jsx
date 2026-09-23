import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Edit, Trash2, Save, X, RefreshCw, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const EMPTY = { name: '', search_query: '', linked_pricing_item_id: '', is_active: true, display_order: 0 };

export default function PriceWatchTab() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  // Load watch items
  const { data: watchItems = [], isLoading } = useQuery({
    queryKey: ['priceWatchItems'],
    queryFn: async () => {
      const res = await base44.entities.PriceWatchItem.list();
      return res.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    }
  });

  // Load pricing items for linking
  const { data: pricingItems = [] } = useQuery({
    queryKey: ['pricingItems'],
    queryFn: async () => await base44.entities.ResellerPricingItem.list('display_order', 500)
  });

  // Load recent results
  const { data: results = [] } = useQuery({
    queryKey: ['priceWatchResults'],
    queryFn: async () => {
      const res = await base44.entities.PriceWatchResult.list('-checked_at', 100);
      return res;
    }
  });

  const createItem = useMutation({
    mutationFn: async (data) => await base44.entities.PriceWatchItem.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['priceWatchItems'] }); }
  });
  const updateItem = useMutation({
    mutationFn: async ({ id, data }) => await base44.entities.PriceWatchItem.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['priceWatchItems'] }); }
  });
  const deleteItem = useMutation({
    mutationFn: async (id) => await base44.entities.PriceWatchItem.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['priceWatchItems'] }); }
  });

  const checkPrices = useMutation({
    mutationFn: async (itemIds) => {
      return await base44.functions.invoke('checkPrices', { item_ids: itemIds });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['priceWatchResults'] });
    }
  });

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ ...item });
    setError('');
  };
  const startNew = () => {
    setEditing('new');
    setForm({ ...EMPTY });
    setError('');
  };
  const cancel = () => setEditing(null);

  const save = async () => {
    setError('');
    if (!form.name?.trim()) { setError('Το όνομα είναι υποχρεωτικό'); return; }
    if (editing === 'new') {
      await createItem.mutateAsync(form);
    } else {
      await updateItem.mutateAsync({ id: editing, data: form });
    }
    setEditing(null);
  };

  const remove = async (id) => {
    if (!window.confirm('Διαγραφή εξοπλισμού από τον έλεγχο τιμών;')) return;
    await deleteItem.mutateAsync(id);
  };

  const runCheck = async () => {
    const activeIds = watchItems.filter(i => i.is_active !== false).map(i => i.id);
    if (activeIds.length === 0) return;
    await checkPrices.mutateAsync(activeIds);
  };

  const runSingleCheck = async (itemId) => {
    await checkPrices.mutateAsync([itemId]);
  };

  const getPricingPrice = (id) => pricingItems.find(p => p.id === id)?.unit_price ?? null;

  // Latest result per watch item
  const latestResults = new Map();
  results.forEach(r => {
    if (!latestResults.has(r.watch_item_id)) latestResults.set(r.watch_item_id, r);
  });

  const inputCls = "bg-[#0E1235] border border-[#2A3580] rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 w-full";

  const DiffBadge = ({ pct }) => {
    if (pct == null) return <span className="text-white/30 text-xs">—</span>;
    const isUp = pct > 0;
    const isFlat = pct === 0;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        isFlat ? 'bg-gray-500/10 text-gray-400 border border-gray-500/20' :
        isUp ? 'bg-red-500/10 text-red-300 border border-red-500/20' :
        'bg-green-500/10 text-green-300 border border-green-500/20'
      }`}>
        {isFlat ? <Minus size={10} /> : isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {isUp ? '+' : ''}{pct.toFixed(1)}%
      </span>
    );
  };

  const checkErr = checkPrices.error?.data?.error || checkPrices.error?.message || 'Άγνωστο σφάλμα';
  const checkCount = checkPrices.data?.data?.count || 0;

  return (
    <div className="space-y-5">
      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Έλεγχος Retail Τιμών</h3>
          <p className="text-white/40 text-sm mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
            Σύγκριση των τιμών σας με retail τιμές αγοράς
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={runCheck} disabled={checkPrices.isPending || watchItems.filter(i => i.is_active !== false).length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#00CFFF] text-[#0E1235] rounded-xl text-sm font-bold hover:bg-[#00CFFF]/80 transition-colors disabled:opacity-40">
            <RefreshCw size={14} className={checkPrices.isPending ? 'animate-spin' : ''} />
            {checkPrices.isPending ? 'Έλεγχος...' : 'Έλεγχος Όλων'}
          </button>
          <button onClick={startNew}
            className="flex items-center gap-2 px-4 py-2 border border-[#00CFFF]/30 text-[#00CFFF] rounded-xl text-sm font-medium hover:border-[#00CFFF]/60 hover:bg-[#00CFFF]/5 transition-colors">
            <Plus size={14} /> Νέος Εξοπλισμός
          </button>
        </div>
      </div>

      {checkPrices.isError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm">
          Σφάλμα ελέγχου τιμών: {checkErr}
        </div>
      )}
      {checkPrices.isSuccess && checkCount > 0 && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-green-300 text-sm">
          Βρέθηκαν {checkCount} αποτελέσματα τιμών.
        </div>
      )}

      {/* Edit form */}
      {editing && (
        <div className="bg-[#131840] border border-[#00CFFF]/30 rounded-2xl p-5">
          <h4 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">{editing === 'new' ? 'Νέος Εξοπλισμός' : 'Επεξεργασία'}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div><label className="text-white/40 text-xs block mb-1">Όνομα/Κωδικός</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="π.χ. POS Terminal, Thermal Printer" /></div>
            <div><label className="text-white/40 text-xs block mb-1">Keyword/URL Αναζήτησης</label><input value={form.search_query} onChange={e => setForm(f => ({ ...f, search_query: e.target.value }))} className={inputCls} placeholder="π.χ. RPP02N thermal printer τιμή" /></div>
            <div>
              <label className="text-white/40 text-xs block mb-1">Σύνδεση με Τιμοκατάλογο</label>
              <select value={form.linked_pricing_item_id} onChange={e => setForm(f => ({ ...f, linked_pricing_item_id: e.target.value }))} className={inputCls}>
                <option value="">— Χωρίς σύνδεση —</option>
                {pricingItems.map(p => <option key={p.id} value={p.id}>{p.name} (€{Number(p.unit_price).toFixed(2)})</option>)}
              </select>
            </div>
            <div><label className="text-white/40 text-xs block mb-1">Σειρά Εμφάνισης</label><input type="number" min={0} value={form.display_order ?? 0} onChange={e => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} className={inputCls} /></div>
          </div>
          {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
          <div className="flex gap-3 mt-4">
            <button onClick={save} disabled={createItem.isPending || updateItem.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-[#00CFFF] text-[#0E1235] rounded-lg text-sm font-bold disabled:opacity-40">
              <Save size={13} /> {(createItem.isPending || updateItem.isPending) ? 'Αποθήκευση...' : 'Αποθήκευση'}
            </button>
            <button onClick={cancel} className="flex items-center gap-2 px-4 py-2 border border-[#2A3580] rounded-lg text-white/60 text-sm hover:border-[#00CFFF]/30 transition-colors">
              <X size={13} /> Ακύρωση
            </button>
          </div>
        </div>
      )}

      {/* Watch items table */}
      <div className="overflow-x-auto rounded-2xl border border-[#2A3580]">
        <table className="w-full text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          <thead>
            <tr className="bg-[#131840] border-b border-[#2A3580]">
              <th className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Εξοπλισμός</th>
              <th className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Αναζήτηση</th>
              <th className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Τιμή Καταλόγου</th>
              <th className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Retail Τιμή</th>
              <th className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Διαφορά</th>
              <th className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Πηγή</th>
              <th className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Έλεγχος</th>
              <th className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide"></th>
            </tr>
          </thead>
          <tbody>
            {watchItems.map((item, i) => {
              const latest = latestResults.get(item.id);
              const resellerPrice = item.linked_pricing_item_id ? getPricingPrice(item.linked_pricing_item_id) : null;
              return (
                <tr key={item.id} className={`border-b border-[#2A3580]/50 hover:bg-[#131840]/70 transition-colors ${i % 2 === 0 ? 'bg-[#0E1235]' : 'bg-[#0f1339]/60'}`}>
                  <td className="px-3 py-3 text-white font-medium whitespace-nowrap">{item.name}</td>
                  <td className="px-3 py-3 text-white/50 max-w-[160px] truncate">{item.search_query || '—'}</td>
                  <td className="px-3 py-3 font-mono text-white/70 whitespace-nowrap">{resellerPrice != null ? `€${Number(resellerPrice).toFixed(2)}` : '—'}</td>
                  <td className="px-3 py-3 font-mono text-[#00CFFF] whitespace-nowrap">{latest?.retail_price != null ? `€${Number(latest.retail_price).toFixed(2)}` : <span className="text-white/30">—</span>}</td>
                  <td className="px-3 py-3"><DiffBadge pct={latest?.price_difference_pct} /></td>
                  <td className="px-3 py-3 max-w-[140px] truncate">
                    {latest?.source_url ? (
                      <a href={latest.source_url} target="_blank" rel="noopener noreferrer" className="text-[#00CFFF]/70 hover:text-[#00CFFF] inline-flex items-center gap-1 text-xs">
                        {latest.source_name || 'Πηγή'} <ExternalLink size={10} />
                      </a>
                    ) : <span className="text-white/30 text-xs">—</span>}
                  </td>
                  <td className="px-3 py-3 text-white/40 text-xs whitespace-nowrap">{latest?.checked_at ? new Date(latest.checked_at).toLocaleDateString('el-GR') : '—'}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button onClick={() => runSingleCheck(item.id)} disabled={checkPrices.isPending}
                        className="p-1 rounded hover:bg-[#00CFFF]/10 text-white/40 hover:text-[#00CFFF] transition-colors disabled:opacity-30" title="Έλεγχος τιμής">
                        <RefreshCw size={13} className={checkPrices.isPending ? 'animate-spin' : ''} />
                      </button>
                      <button onClick={() => startEdit(item)} className="p-1 rounded hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition-colors"><Edit size={13} /></button>
                      <button onClick={() => remove(item.id)} className="p-1 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isLoading && <div className="text-center py-12 text-white/30 text-sm">Φόρτωση...</div>}
        {watchItems.length === 0 && !isLoading && <div className="text-center py-12 text-white/30 text-sm">Δεν υπάρχει εξοπλισμός. Πατήστε «Νέος Εξοπλισμός» για να ξεκινήσετε.</div>}
      </div>

      {/* History */}
      {results.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Ιστορικό Ελέγχων ({results.length} τελευταία)</h4>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {results.map((r) => (
              <div key={r.id} className="flex items-center gap-3 bg-[#131840]/60 border border-[#2A3580]/50 rounded-xl px-4 py-2.5 text-sm">
                <span className="text-white font-medium flex-shrink-0">{r.watch_item_name}</span>
                <span className="font-mono text-[#00CFFF]">{r.retail_price != null ? `€${Number(r.retail_price).toFixed(2)}` : '—'}</span>
                <DiffBadge pct={r.price_difference_pct} />
                {r.source_url ? (
                  <a href={r.source_url} target="_blank" rel="noopener noreferrer" className="text-[#00CFFF]/60 hover:text-[#00CFFF] inline-flex items-center gap-1 text-xs truncate">
                    {r.source_name || 'Πηγή'} <ExternalLink size={10} />
                  </a>
                ) : <span className="text-white/30 text-xs truncate">{r.notes || '—'}</span>}
                <span className="ml-auto text-white/30 text-xs whitespace-nowrap flex-shrink-0">
                  {r.checked_at ? new Date(r.checked_at).toLocaleString('el-GR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}