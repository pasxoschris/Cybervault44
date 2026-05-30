import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/layout/Navbar';

export default function Whitelist() {
  const [user, setUser] = useState(null);
  const [allowed, setAllowed] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    base44.auth.me()
      .then(u => {
        if (!u || u.role !== 'admin') {
          window.location.href = '/';
          return;
        }
        setUser(u);
        return base44.asServiceRole.entities.AllowedUser.list();
      })
      .then(list => { if (list) setAllowed(list); })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSaving(true);
    const created = await base44.entities.AllowedUser.create({ email: email.trim().toLowerCase(), name: name.trim() });
    setAllowed(prev => [...prev, created]);
    setEmail('');
    setName('');
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await base44.entities.AllowedUser.delete(id);
    setAllowed(prev => prev.filter(a => a.id !== id));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0E1235]">
        <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
      </div>
    );
  }

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
            SERVICE DESK <span className="text-[#00CFFF]">ACCESS</span>
          </h1>
          <p className="font-rajdhani text-white/50">Διαχείριση πρόσβασης στο Service Desk</p>
        </div>

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
          <button type="submit" disabled={saving} className="cyber-btn !py-2 !px-6 disabled:opacity-50">
            {saving ? 'ΠΡΟΣΘΗΚΗ...' : '+ ΠΡΟΣΘΗΚΗ'}
          </button>
        </form>

        {/* List */}
        <div className="space-y-2">
          {allowed.length === 0 && (
            <div className="text-center py-8 font-mono-cyber text-white/20 text-sm tracking-widest">ΚΑΝΕΝΑ EMAIL</div>
          )}
          {allowed.map(a => (
            <div key={a.id} className="flex items-center justify-between border border-[#00CFFF]/15 bg-[#131840]/60 px-4 py-3">
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
          ))}
        </div>
      </div>
    </div>
  );
}