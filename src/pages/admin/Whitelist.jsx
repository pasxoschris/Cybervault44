import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/layout/Navbar';
import { ROLES } from '@/lib/roles';
import SearchableStoreSelect from '@/components/admin/SearchableStoreSelect';

const parseModes = (modes) => (modes ? modes.split(',').map(m => m.trim()).filter(Boolean) : []);

function WhitelistSection({ entityName, title, description, modeOptions, storeOptions }) {
  const [allowed, setAllowed] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [storeId, setStoreId] = useState('');
  const [selectedModes, setSelectedModes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    base44.entities[entityName].list()
      .then(setAllowed)
      .finally(() => setLoading(false));
  }, [entityName]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSaving(true);
    const payload = { email: email.trim().toLowerCase(), name: name.trim() };
    if (modeOptions) payload.modes = selectedModes.join(',');
    if (storeOptions) {
      payload.store_id = storeId || '';
      const store = storeOptions.find(s => s.id === storeId);
      payload.store_name = store ? (store.store_name || store.business_name || '') : '';
    }
    const created = await base44.entities[entityName].create(payload);
    setAllowed(prev => [...prev, created]);
    setEmail('');
    setName('');
    setStoreId('');
    setSelectedModes([]);
    setSaving(false);
  };

  const handleStoreChange = async (record, newStoreId) => {
    const store = storeOptions.find(s => s.id === newStoreId);
    const storeName = store ? (store.store_name || store.business_name || '') : '';
    const updated = await base44.entities[entityName].update(record.id, { store_id: newStoreId, store_name: storeName });
    setAllowed(prev => prev.map(a => a.id === record.id ? updated : a));
  };

  const handleDelete = async (id) => {
    await base44.entities[entityName].delete(id);
    setAllowed(prev => prev.filter(a => a.id !== id));
  };

  const handleToggleMode = async (record, modeId) => {
    const current = parseModes(record.modes);
    const next = current.includes(modeId)
      ? current.filter(m => m !== modeId)
      : [...current, modeId];
    const updated = await base44.entities[entityName].update(record.id, { modes: next.join(',') });
    setAllowed(prev => prev.map(a => a.id === record.id ? updated : a));
  };

  if (loading) {
    return <div className="text-center py-12 font-mono-cyber text-[#00CFFF]/40 text-sm tracking-widest">ΦΟΡΤΩΣΗ...</div>;
  }

  return (
    <div>
      <p className="font-rajdhani text-white/50 mb-6">{description}</p>

      {/* Add form */}
      <form onSubmit={handleAdd} className="border border-[#00CFFF]/20 bg-[#131840]/80 p-5 mb-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Email *</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="cyber-input"
              placeholder="user@example.com"
              required
            />
          </div>
          <div>
            <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Όνομα</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="cyber-input"
              placeholder="Προαιρετικό"
            />
          </div>
        </div>

        {storeOptions && (
          <div>
            <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-1.5 uppercase">Κατάστημα</label>
            <SearchableStoreSelect
              value={storeId}
              onChange={setStoreId}
              stores={storeOptions}
            />
          </div>
        )}

        {modeOptions && (
          <div>
            <label className="block font-mono-cyber text-[10px] tracking-widest text-[#00CFFF]/60 mb-2 uppercase">
              Εξουσιοδοτημένα Modes <span className="text-white/30 normal-case tracking-normal">(κενό = όλα)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {modeOptions.map(m => {
                const active = selectedModes.includes(m.id);
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setSelectedModes(prev => active ? prev.filter(x => x !== m.id) : [...prev, m.id])}
                    className={`px-3 py-1.5 text-xs border transition-all ${active ? 'bg-[#00CFFF] text-[#0E1235] border-[#00CFFF]' : 'text-[#00CFFF]/70 border-[#00CFFF]/25 hover:border-[#00CFFF]/50'}`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {m.emoji} {m.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button type="submit" disabled={saving} className="cyber-btn !py-2 !px-6 disabled:opacity-50">
          {saving ? 'ΠΡΟΣΘΗΚΗ...' : '+ ΠΡΟΣΘΗΚΗ'}
        </button>
      </form>

      {/* List */}
      <div className="space-y-2">
        {allowed.length === 0 && (
          <div className="text-center py-8 font-mono-cyber text-white/20 text-sm tracking-widest">ΚΑΝΕΝΑ EMAIL</div>
        )}
        {allowed.map(a => {
          const userModes = parseModes(a.modes);
          const hasAllModes = modeOptions && userModes.length === 0;
          return (
            <div key={a.id} className="border border-[#00CFFF]/15 bg-[#131840]/60 px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-rajdhani text-[#00CFFF] text-sm">{a.email}</div>
                  {a.name && <div className="font-rajdhani text-white/40 text-xs">{a.name}</div>}
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="font-mono-cyber text-[10px] text-red-400/70 hover:text-red-400 border border-red-400/20 hover:border-red-400/50 px-3 py-1 transition-all tracking-widest"
                >
                  ΔΙΑΓΡΑΦΗ
                </button>
              </div>

              {storeOptions && (
                <div className="mt-3 pt-3 border-t border-[#00CFFF]/10">
                  <div className="font-mono-cyber text-[9px] tracking-widest text-[#00CFFF]/40 mb-2 uppercase">Κατάστημα</div>
                  <SearchableStoreSelect
                    value={a.store_id || ''}
                    onChange={(id) => handleStoreChange(a, id)}
                    stores={storeOptions}
                  />
                </div>
              )}

              {modeOptions && (
                <div className="mt-3 pt-3 border-t border-[#00CFFF]/10">
                  <div className="font-mono-cyber text-[9px] tracking-widest text-[#00CFFF]/40 mb-2 uppercase">Modes</div>
                  {hasAllModes ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400/80" style={{ fontFamily: 'Inter, sans-serif' }}>Όλα τα modes (πλήρη πρόσβαση)</span>
                      <button
                        onClick={() => modeOptions.forEach(m => handleToggleMode(a, m.id))}
                        className="font-mono-cyber text-[9px] text-[#00CFFF]/60 hover:text-[#00CFFF] border border-[#00CFFF]/20 hover:border-[#00CFFF]/50 px-2 py-0.5 transition-all tracking-widest"
                      >
                        ΠΕΡΙΟΡΙΣΜΟΣ
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {modeOptions.map(m => {
                        const active = userModes.includes(m.id);
                        return (
                          <button
                            key={m.id}
                            onClick={() => handleToggleMode(a, m.id)}
                            className={`px-2.5 py-1 text-xs border transition-all ${active ? 'bg-[#00CFFF]/15 text-[#00CFFF] border-[#00CFFF]/50' : 'text-white/30 border-white/10 hover:border-white/25'}`}
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {m.emoji} {m.title}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TABS = [
  { key: 'AllowedUser', label: 'Service Desk', description: 'Διαχείριση πρόσβασης στο Service Desk' },
  { key: 'AllowedUserGuide', label: 'SpotlightPOS Guide', description: 'Διαχείριση πρόσβασης στον Οδηγό Εκπαίδευσης. Εξουσιοδότησε κάθε χρήστη για συγκεκριμένα modes (κενό = όλα).' },
  { key: 'AllowedUserReseller', label: 'Reseller Console', description: 'Διαχείριση πρόσβασης στο Reseller Console' },
];

export default function Whitelist() {
  const [activeTab, setActiveTab] = useState('AllowedUser');
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    base44.auth.me()
      .then(u => {
        if (!u || u.role !== 'admin') {
          window.location.href = '/';
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    base44.entities.Store.list()
      .then(setStores)
      .catch(() => {});
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0E1235]">
        <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
      </div>
    );
  }

  const activeTabData = TABS.find(t => t.key === activeTab);
  const modeOptions = activeTab === 'AllowedUserGuide' ? ROLES : null;
  const storeOptions = activeTab === 'AllowedUserGuide' ? stores : null;

  return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border font-mono-cyber text-[10px] tracking-widest uppercase"
            style={{ borderColor: "rgba(0,207,255,0.3)", color: "rgba(0,207,255,0.7)", background: "rgba(0,207,255,0.05)" }}>
            ✦ ADMIN
          </div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
            ACCESS <span className="text-[#00CFFF]">WHITELIST</span>
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 font-orbitron text-xs tracking-widest uppercase border transition-all ${
                activeTab === tab.key
                  ? 'bg-[#00CFFF] text-[#0E1235] border-[#00CFFF]'
                  : 'text-[#00CFFF] border-[#00CFFF]/30 hover:border-[#00CFFF]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <WhitelistSection
          key={activeTab}
          entityName={activeTabData.key}
          title={activeTabData.label}
          description={activeTabData.description}
          modeOptions={modeOptions}
          storeOptions={storeOptions}
        />
      </div>
    </div>
  );
}