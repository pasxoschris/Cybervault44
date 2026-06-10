import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ResellerAccessGuard from '@/components/reseller/ResellerAccessGuard';
import OfferForm from '@/components/reseller/OfferForm';
import OffersHistory from '@/components/reseller/OffersHistory';
import PricingTable from '@/components/reseller/PricingTable';
import ResellerSettingsTab from '@/components/reseller/ResellerSettingsTab';

const TABS = [
  { key: 'offer', label: 'Νέα Προσφορά' },
  { key: 'history', label: 'Ιστορικό' },
  { key: 'pricing', label: 'Τιμοκατάλογος' },
  { key: 'settings', label: 'Ρυθμίσεις' },
];

export default function ResellerConsole() {
  const [tab, setTab] = useState('offer');
  const [editOffer, setEditOffer] = useState(null);

  const handleEdit = (offer) => {
    setEditOffer(offer);
    setTab('offer');
  };

  const handleSaved = () => {
    setEditOffer(null);
  };

  return (
    <ResellerAccessGuard>
      <div className="min-h-screen bg-[#0E1235] cyber-grid">
        <Navbar />
        <div className="max-w-[1400px] mx-auto px-4 pt-24 pb-16">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border font-mono-cyber text-[10px] tracking-widest uppercase"
              style={{ borderColor:'rgba(0,207,255,0.3)', color:'rgba(0,207,255,0.7)', background:'rgba(0,207,255,0.05)' }}>
              ✦ RESELLER PORTAL
            </div>
            <h1 className="font-orbitron text-3xl font-bold text-white mb-1">
              RESELLER <span className="text-[#00CFFF]">CONSOLE</span>
            </h1>
            <p className="font-rajdhani text-white/40 text-base">Spotlight POS · Διαχείριση Προσφορών & Τιμοκαταλόγου</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map(t => (
              <button key={t.key} onClick={() => { setTab(t.key); if (t.key === 'offer') setEditOffer(null); }}
                className={`px-6 py-2 font-orbitron text-xs tracking-widest uppercase border transition-all ${
                  tab === t.key
                    ? 'bg-[#00CFFF] text-[#0E1235] border-[#00CFFF]'
                    : 'text-[#00CFFF] border-[#00CFFF]/30 hover:border-[#00CFFF]/60'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {tab === 'offer' && (
            <OfferForm editOffer={editOffer} onSaved={handleSaved} />
          )}
          {tab === 'history' && (
            <OffersHistory onEdit={handleEdit} />
          )}
          {tab === 'pricing' && (
            <PricingTable />
          )}
          {tab === 'settings' && (
            <ResellerSettingsTab />
          )}
        </div>
      </div>
    </ResellerAccessGuard>
  );
}