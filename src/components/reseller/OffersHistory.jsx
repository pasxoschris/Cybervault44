import { useState, lazy, Suspense } from 'react';
import { Eye, Edit, Copy, Trash2, Mail, CheckCircle, XCircle, Search, ExternalLink, Filter } from 'lucide-react';
import { useOffers, useUpdateOfferStatus, useDuplicateOffer, useDeleteOffer } from '@/hooks/useOffers';
import { useResellerSettings } from '@/hooks/useResellerSettings';
import { formatEuro, formatDate, formatDateTime, STATUS_LABELS, STATUS_COLORS, ALL_STATUSES } from '@/lib/resellerUtils';

const EmailModal = lazy(() => import('./EmailModal'));

export default function OffersHistory({ onEdit }) {
  const { data: offers = [], isLoading } = useOffers();
  const { data: settings } = useResellerSettings();
  const updateStatus = useUpdateOfferStatus();
  const duplicate = useDuplicateOffer();
  const remove = useDeleteOffer();

  const [emailOffer, setEmailOffer] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleUpdateStatus = (id, status) => updateStatus.mutateAsync({ id, status });
  const handleDuplicate = (offer) => duplicate.mutateAsync(offer);
  const handleRemove = (id) => {
    if (!window.confirm('Διαγραφή προσφοράς;')) return;
    remove.mutateAsync(id);
  };

  const filteredOffers = offers.filter(o => {
    const q = search.trim().toLowerCase();
    const matchSearch = !q || (
      (o.store_name || '').toLowerCase().includes(q) ||
      (o.company_legal_name || '').toLowerCase().includes(q) ||
      (o.contact_person || '').toLowerCase().includes(q) ||
      (o.reference_number || '').toLowerCase().includes(q) ||
      (o.email || '').toLowerCase().includes(q)
    );
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = ALL_STATUSES.reduce((acc, s) => {
    acc[s] = offers.filter(o => o.status === s).length;
    return acc;
  }, {});

  if (isLoading) return <div className="text-center py-12 text-white/30 text-sm">Φόρτωση...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Αναζήτηση..."
            className="w-full bg-[#0E1235] border border-[#2A3580] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 placeholder-white/20"
          />
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <Filter size={13} className="text-white/30 mr-1" />
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === 'all' ? 'bg-[#00CFFF] text-[#0E1235]' : 'bg-[#131840] border border-[#2A3580] text-white/50 hover:border-[#00CFFF]/30'}`}
          >
            Όλες ({offers.length})
          </button>
          {ALL_STATUSES.map(s => (
            <button key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-[#00CFFF] text-[#0E1235]' : 'bg-[#131840] border border-[#2A3580] text-white/50 hover:border-[#00CFFF]/30'}`}
            >
              {STATUS_LABELS[s]} {statusCounts[s] > 0 && `(${statusCounts[s]})`}
            </button>
          ))}
        </div>
      </div>

      {filteredOffers.length === 0 ? (
        <div className="text-center py-16 text-white/30 text-sm">{search || statusFilter !== 'all' ? 'Δεν βρέθηκαν αποτελέσματα.' : 'Δεν υπάρχουν προσφορές ακόμα.'}</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#2A3580]">
          <table className="w-full text-sm" style={{ fontFamily: 'Inter,sans-serif' }}>
            <thead>
              <tr className="bg-[#131840] border-b border-[#2A3580]">
                {['Αρ. Αναφοράς', 'Ημ/νία', 'Λήξη', 'Πελάτης', 'Email', 'Σύνολο', 'Κατάσταση', 'Εθεάθη', 'Αποδεκτή', 'Ενέργειες'].map(h => (
                  <th key={h} className="text-left px-3 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((o, i) => (
                <tr key={o.id} className={`border-b border-[#2A3580]/50 hover:bg-[#131840]/70 transition-colors ${i % 2 === 0 ? 'bg-[#0E1235]' : 'bg-[#0f1339]/60'}`}>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => onEdit(o)} className="font-mono text-[#00CFFF] text-xs hover:underline hover:text-white transition-colors cursor-pointer">
                        {o.reference_number || '—'}
                      </button>
                      {o.public_token && (
                        <a href={`/offers/${o.public_token}`} target="_blank" rel="noopener noreferrer"
                          title="Άνοιγμα Public Link"
                          className="text-white/20 hover:text-[#00CFFF] transition-colors">
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-white/60 whitespace-nowrap text-xs">{formatDate(o.created_date)}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs">
                    <span className={o.expires_at && new Date(o.expires_at) < new Date() ? 'text-red-400' : 'text-white/60'}>
                      {formatDate(o.expires_at)}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap max-w-[150px]">
                    <div className="text-white text-xs truncate">{o.company_legal_name || o.store_name || '—'}</div>
                    {o.contact_person && <div className="text-white/40 text-xs truncate">{o.contact_person}</div>}
                  </td>
                  <td className="px-3 py-3 text-white/50 whitespace-nowrap max-w-[150px] truncate text-xs">{o.email || '—'}</td>
                  <td className="px-3 py-3 font-mono text-[#00CFFF] whitespace-nowrap text-sm">{formatEuro(o.final_total)}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[o.status] || STATUS_COLORS.draft}`}>
                      {STATUS_LABELS[o.status] || o.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-white/40 whitespace-nowrap text-xs">{o.viewed_at ? formatDateTime(o.viewed_at) : '—'}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs">
                    {o.accepted_at ? (
                      <div>
                        <span className="text-green-400">{formatDateTime(o.accepted_at)}</span>
                        {(() => {
                          try {
                            const v = JSON.parse(o.verification_details || '{}');
                            return v.verified_email ? (
                              <div className="text-green-400/70 text-[11px] truncate max-w-[150px]" title={v.verified_email}>από {v.verified_email}</div>
                            ) : null;
                          } catch { return null; }
                        })()}
                      </div>
                    ) : <span className="text-white/20">—</span>}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button title="Επεξεργασία" onClick={() => onEdit(o)} className="p-1 rounded hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition-colors"><Edit size={13} /></button>
                      <button title="Αντιγραφή" onClick={() => handleDuplicate(o)} className="p-1 rounded hover:bg-[#00CFFF]/10 text-white/40 hover:text-[#00CFFF] transition-colors"><Copy size={13} /></button>
                      <button title="Αποστολή email" onClick={() => setEmailOffer(o)} className="p-1 rounded hover:bg-purple-500/10 text-white/40 hover:text-purple-400 transition-colors"><Mail size={13} /></button>
                      {o.public_token && (
                        <a href={`/offers/${o.public_token}`} target="_blank" rel="noopener noreferrer"
                          title="Public Offer Link" className="p-1 rounded hover:bg-[#00CFFF]/10 text-white/40 hover:text-[#00CFFF] transition-colors">
                          <ExternalLink size={13} />
                        </a>
                      )}
                      {!['accepted', 'rejected', 'expired'].includes(o.status) && (
                        <>
                          <button title="Αποδοχή" onClick={() => handleUpdateStatus(o.id, 'accepted')} className="p-1 rounded hover:bg-green-500/10 text-white/40 hover:text-green-400 transition-colors"><CheckCircle size={13} /></button>
                          <button title="Απόρριψη" onClick={() => handleUpdateStatus(o.id, 'rejected')} className="p-1 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"><XCircle size={13} /></button>
                        </>
                      )}
                      <button title="Διαγραφή" onClick={() => handleRemove(o.id)} className="p-1 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {emailOffer && (
        <Suspense fallback={<div className="text-center py-12 text-white/30 text-sm">Φόρτωση...</div>}>
          <EmailModal
            offer={emailOffer}
            customer={{ email: emailOffer.email, contact_person: emailOffer.contact_person, store_name: emailOffer.store_name, company_legal_name: emailOffer.company_legal_name, vat_number: emailOffer.vat_number, address: emailOffer.address, phone: emailOffer.phone }}
            defaultSettings={settings || {}}
            onClose={() => setEmailOffer(null)}
          />
        </Suspense>
      )}
    </div>
  );
}