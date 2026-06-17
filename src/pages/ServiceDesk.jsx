import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/layout/Navbar';
import TicketForm from '@/components/servicedesk/TicketForm';
import TicketList from '@/components/servicedesk/TicketList';

export default function ServiceDesk() {
  const [user, setUser] = useState(null);
  const [allowed, setAllowed] = useState(null); // null=loading, true/false
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('form'); // 'form' | 'list'

  useEffect(() => {
    const init = async () => {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }
      const u = await base44.auth.me();
      setUser(u);
      if (u.role === 'admin') {
        setAllowed(true);
      } else {
        try {
          const list = await base44.entities.AllowedUser.filter({ email: u.email.toLowerCase() });
          setAllowed(list.length > 0);
        } catch {
          setAllowed(false);
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0E1235]">
        <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  if (allowed === false) {
    return (
      <div className="min-h-screen bg-[#0E1235] cyber-grid flex items-center justify-center">
        <div className="text-center p-10 border border-red-500/30 bg-[#131840]/80 max-w-sm">
          <div className="font-mono-cyber text-red-400 text-xs tracking-widest mb-3">ACCESS DENIED</div>
          <h2 className="font-orbitron text-white text-xl mb-2">Δεν έχεις πρόσβαση</h2>
          <p className=" text-white/40 text-sm">Το email σου δεν βρίσκεται στη λίστα εξουσιοδοτημένων χρηστών.</p>
          <p className=" text-white/40 text-sm mt-3">Στείλτε αίτημα στο <a href="mailto:support@cyber-vault.gr" className="text-[#00CFFF] hover:underline">support@cyber-vault.gr</a></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border font-mono-cyber text-[10px] tracking-widest uppercase"
            style={{ borderColor: "rgba(0,207,255,0.3)", color: "rgba(0,207,255,0.7)", background: "rgba(0,207,255,0.05)" }}>
            ✦ ΤΕΧΝΙΚΟ PORTAL
          </div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
            SERVICE <span className="text-[#00CFFF]">DESK</span>
          </h1>
          <p className=" text-white/50 text-lg">
            Καλωσήρθες, <span className="text-[#00CFFF]">{user.full_name}</span>
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setView('form')}
            className={`px-6 py-2 font-orbitron text-xs tracking-widest uppercase border transition-all ${
              view === 'form'
                ? 'bg-[#00CFFF] text-[#0E1235] border-[#00CFFF]'
                : 'text-[#00CFFF] border-[#00CFFF]/30 hover:border-[#00CFFF]/60'
            }`}
          >
            Νέο Ticket
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-6 py-2 font-orbitron text-xs tracking-widest uppercase border transition-all ${
              view === 'list'
                ? 'bg-[#00CFFF] text-[#0E1235] border-[#00CFFF]'
                : 'text-[#00CFFF] border-[#00CFFF]/30 hover:border-[#00CFFF]/60'
            }`}
          >
            Ιστορικό
          </button>
        </div>

        {view === 'form' ? (
          <TicketForm user={user} onSaved={() => setView('list')} />
        ) : (
          <TicketList />
        )}
      </div>
    </div>
  );
}