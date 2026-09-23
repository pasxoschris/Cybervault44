import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import ResellerAccessGuard from '@/components/reseller/ResellerAccessGuard';
import OfferForm from '@/components/reseller/OfferForm';
import OffersHistory from '@/components/reseller/OffersHistory';
import PricingTable from '@/components/reseller/PricingTable';
import ResellerSettingsTab from '@/components/reseller/ResellerSettingsTab';
import CategoryManager from '@/components/reseller/CategoryManager';
import PriceWatchTab from '@/components/reseller/PriceWatchTab';

const TABS = [
  { key: 'offer', label: 'Νέα Προσφορά' },
  { key: 'history', label: 'Ιστορικό' },
  { key: 'pricing', label: 'Τιμοκατάλογος' },
  { key: 'pricewatch', label: 'Έλεγχος Τιμών' },
  { key: 'categories', label: 'Κατηγορίες' },
  { key: 'settings', label: 'Ρυθμίσεις' },
];

export default function ResellerConsole() {
  const [tab, setTab] = useState('offer');
  const [editOffer, setEditOffer] = useState(null);

  const handleEdit = (offer) => {
    setEditOffer(offer);
    setTab('offer');
  };

  const handleSaved = (saved) => {
    if (saved) setEditOffer(saved);
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
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-orbitron text-3xl font-bold text-white mb-1">
                  RESELLER <span className="text-[#00CFFF]">CONSOLE</span>
                </h1>
                <p className="text-white/40 text-sm">Διαχείριση Προσφορών & Τιμοκαταλόγου</p>
              </div>
              <Link
                to="/reseller-console/price-agent"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#00CFFF]/30 bg-[#00CFFF]/5 text-[#00CFFF] hover:bg-[#00CFFF]/10 hover:border-[#00CFFF]/50 transition-all text-sm font-medium flex-shrink-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Bot size={16} />
                <span className="hidden sm:inline">Price Monitor Agent</span>
                <span className="sm:hidden">Agent</span>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map(t => (
              <button key={t.key} onClick={() => { setTab(t.key); if (t.key === 'offer') setEditOffer(null); }}
                className={`px-5 py-2 text-sm font-medium border rounded-lg transition-all ${
                  tab === t.key
                    ? 'bg-[#00CFFF] text-[#0E1235] border-[#00CFFF]'
                    : 'text-[#00CFFF] border-[#00CFFF]/30 hover:border-[#00CFFF]/60 hover:bg-[#00CFFF]/5'
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
          {tab === 'pricewatch' && (
            <PriceWatchTab />
          )}
          {tab === 'categories' && (
            <CategoryManager />
          )}
          {tab === 'settings' && (
            <ResellerSettingsTab />
          )}
        </div>
      </div>
    </ResellerAccessGuard>
  );
}