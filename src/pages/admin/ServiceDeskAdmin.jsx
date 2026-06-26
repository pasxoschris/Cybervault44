import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/layout/Navbar';
import TicketTypesManager from '@/components/admin/sdesk/TicketTypesManager';
import CategoriesManager from '@/components/admin/sdesk/CategoriesManager';
import SubcategoriesManager from '@/components/admin/sdesk/SubcategoriesManager';
import PrioritiesManager from '@/components/admin/sdesk/PrioritiesManager';
import SupportLevelsManager from '@/components/admin/sdesk/SupportLevelsManager';
import ResolutionStatusManager from '@/components/admin/sdesk/ResolutionStatusManager';
import RootCausesManager from '@/components/admin/sdesk/RootCausesManager';

const TABS = [
  { key: 'types', label: 'Ticket Types' },
  { key: 'categories', label: 'Κατηγορίες' },
  { key: 'subcategories', label: 'Υποκατηγορίες' },
  { key: 'priorities', label: 'Προτεραιότητες' },
  { key: 'support_levels', label: 'Support Levels' },
  { key: 'resolution', label: 'Resolution Status' },
  { key: 'root_causes', label: 'Root Causes' },
];

export default function ServiceDeskAdmin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('types');
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.me().then(u => {
      if (u.role !== 'admin') { navigate('/'); return; }
      setUser(u);
      setLoading(false);
    }).catch(() => navigate('/'));
  }, []);

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0E1235]">
      <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border font-mono-cyber text-[10px] tracking-widest uppercase"
            style={{ borderColor: 'rgba(0,207,255,0.3)', color: 'rgba(0,207,255,0.7)', background: 'rgba(0,207,255,0.05)' }}>
            ✦ ADMIN PANEL
          </div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
            SERVICE DESK <span className="text-[#00CFFF]">ADMINISTRATION</span>
          </h1>
          <p className="text-white/50">Διαχείριση master data του Service Desk</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-2 font-orbitron text-xs tracking-widest uppercase border transition-all ${
                tab === t.key
                  ? 'bg-[#00CFFF] text-[#0E1235] border-[#00CFFF]'
                  : 'text-[#00CFFF] border-[#00CFFF]/30 hover:border-[#00CFFF]/60'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {tab === 'types' && <TicketTypesManager />}
          {tab === 'categories' && <CategoriesManager />}
          {tab === 'subcategories' && <SubcategoriesManager />}
          {tab === 'priorities' && <PrioritiesManager />}
          {tab === 'support_levels' && <SupportLevelsManager />}
          {tab === 'resolution' && <ResolutionStatusManager />}
          {tab === 'root_causes' && <RootCausesManager />}
        </div>
      </div>
    </div>
  );
}