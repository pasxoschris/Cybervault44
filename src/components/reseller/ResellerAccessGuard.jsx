import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ShieldX } from 'lucide-react';

export default function ResellerAccessGuard({ children }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const check = async () => {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }
      const u = await base44.auth.me();
      if (u.role === 'admin') { setStatus('ok'); return; }
      try {
        const list = await base44.entities.AllowedUserReseller.filter({ email: u.email.toLowerCase() });
        setStatus(list.length > 0 ? 'ok' : 'denied');
      } catch {
        setStatus('denied');
      }
    };
    check();
  }, []);

  if (status === 'loading') return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0E1235]">
      <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
    </div>
  );

  if (status === 'denied') return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid flex items-center justify-center">
      <div className="text-center p-10 border border-red-500/30 bg-[#131840]/80 max-w-sm">
        <ShieldX className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <div className="font-mono-cyber text-red-400 text-xs tracking-widest mb-3">ACCESS DENIED</div>
        <h2 className="font-orbitron text-white text-xl mb-2">Δεν έχεις πρόσβαση</h2>
        <p className="font-rajdhani text-white/40 text-sm">Το email σου δεν βρίσκεται στη λίστα εξουσιοδοτημένων χρηστών.</p>
      </div>
    </div>
  );

  return children;
}