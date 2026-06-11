import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Eye, Edit, Copy, Trash2, Mail, CheckCircle, XCircle, Search } from 'lucide-react';
import StoreBadge from '@/components/stores/StoreBadge';
import EmailModal from './EmailModal';

const STATUS_LABELS = { draft:'Draft', sent:'Sent', accepted:'Accepted', rejected:'Rejected', expired:'Expired' };
const STATUS_COLORS = {
  draft:'bg-gray-100 text-gray-600 border-gray-200',
  sent:'bg-blue-100 text-blue-700 border-blue-200',
  accepted:'bg-green-100 text-green-700 border-green-200',
  rejected:'bg-red-100 text-red-600 border-red-200',
  expired:'bg-amber-100 text-amber-700 border-amber-200'
};

export default function OffersHistory({ onEdit }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailOffer, setEmailOffer] = useState(null);
  const [search, setSearch] = useState('');

  const load = () => base44.entities.ResellerOffer.list('-created_date', 200).then(setOffers).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await base44.entities.ResellerOffer.update(id, { status });
    setOffers(o => o.map(x => x.id === id ? {...x, status} : x));
  };

  const duplicate = async (offer) => {
    const { id, reference_number, created_date, updated_date, ...rest } = offer;
    const d = new Date();
    const date = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
    const newRef = `CYV-SPOT-${date}-${String(Math.floor(Math.random()*900)+100)}`;
    const created = await base44.entities.ResellerOffer.create({ ...rest, reference_number: newRef, status: 'draft' });
    setOffers(o => [created, ...o]);
  };

  const remove = async (id) => {
    if (!window.confirm('Διαγραφή προσφοράς;')) return;
    await base44.entities.ResellerOffer.delete(id);
    setOffers(o => o.filter(x => x.id !== id));
  };

  const fmt = (n) => n ? `€${Number(n).toFixed(2)}` : '—';
  const fmtDate = (s) => s ? new Date(s).toLocaleDateString('el-GR') : '—';

  const filteredOffers = offers.filter(o => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (o.store_name || '').toLowerCase().includes(q) ||
      (o.company_legal_name || '').toLowerCase().includes(q) ||
      (o.contact_person || '').toLowerCase().includes(q) ||
      (o.reference_number || '').toLowerCase().includes(q) ||
      (o.email || '').toLowerCase().includes(q)
    );
  });

  if (loading) return <div className="text-center py-12 text-white/30 text-sm">Φόρτωση...</div>;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Αναζήτηση προσφοράς (κατάστημα, επωνυμία, υπεύθυνος, αρ. αναφοράς...)"
          className="w-full bg-[#0E1235] border border-[#2A3580] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 placeholder-white/20"
        />
      </div>
      {filteredOffers.length === 0 ? (
        <div className="text-center py-16 text-white/30 text-sm">{search ? 'Δεν βρέθηκαν αποτελέσματα.' : 'Δεν υπάρχουν προσφορές ακόμα.'}</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#2A3580]">
          <table className="w-full text-sm" style={{fontFamily:'Inter,sans-serif'}}>
            <thead>
              <tr className="bg-[#131840] border-b border-[#2A3580]">
                {['Αρ. Αναφοράς','Ημ/νία','Λήξη','Κατάστημα','Επωνυμία','Υπεύθυνος','Email','Σύνολο','Κατάσταση','Ενέργειες'].map(h=>(
                  <th key={h} className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((o,i) => (
                <tr key={o.id} className={`border-b border-[#2A3580]/50 hover:bg-[#131840]/70 transition-colors ${i%2===0?'bg-[#0E1235]':'bg-[#0f1339]/60'}`}>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <button onClick={() => onEdit(o)} className="font-mono text-[#00CFFF] text-xs hover:underline hover:text-white transition-colors cursor-pointer">
                      {o.reference_number||'—'}
                    </button>
                  </td>
                  <td className="px-3 py-3 text-white/60 whitespace-nowrap text-xs">{fmtDate(o.created_date)}</td>
                  <td className="px-3 py-3 text-white/60 whitespace-nowrap text-xs">{fmtDate(o.expires_at)}</td>
                  <td className="px-3 py-3 text-white whitespace-nowrap max-w-[130px] truncate">{o.store_name||'—'}</td>
                  <td className="px-3 py-3 text-white/70 whitespace-nowrap max-w-[140px] truncate">{o.company_legal_name||'—'}</td>
                  <td className="px-3 py-3 text-white/60 whitespace-nowrap max-w-[120px] truncate">{o.contact_person||'—'}</td>
                  <td className="px-3 py-3 text-white/50 whitespace-nowrap max-w-[150px] truncate">{o.email||'—'}</td>
                  <td className="px-3 py-3 font-mono text-[#00CFFF] whitespace-nowrap">{fmt(o.final_total)}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[o.status]||STATUS_COLORS.draft}`}>
                      {STATUS_LABELS[o.status]||o.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button title="Επεξεργασία" onClick={()=>onEdit(o)} className="p-1 rounded hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition-colors"><Edit size={13}/></button>
                      <button title="Αντιγραφή" onClick={()=>duplicate(o)} className="p-1 rounded hover:bg-[#00CFFF]/10 text-white/40 hover:text-[#00CFFF] transition-colors"><Copy size={13}/></button>
                      <button title="Αποστολή email" onClick={()=>setEmailOffer(o)} className="p-1 rounded hover:bg-purple-500/10 text-white/40 hover:text-purple-400 transition-colors"><Mail size={13}/></button>
                      <button title="Αποδοχή" onClick={()=>updateStatus(o.id,'accepted')} className="p-1 rounded hover:bg-green-500/10 text-white/40 hover:text-green-400 transition-colors"><CheckCircle size={13}/></button>
                      <button title="Απόρριψη" onClick={()=>updateStatus(o.id,'rejected')} className="p-1 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"><XCircle size={13}/></button>
                      <button title="Διαγραφή" onClick={()=>remove(o.id)} className="p-1 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {emailOffer && <EmailModal offer={emailOffer} customer={{email:emailOffer.email}} defaultSettings={{}} onClose={()=>setEmailOffer(null)} />}
    </div>
  );

}