import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function SpotlightPOSGuide() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }
      const u = await base44.auth.me();
      let allowed = false;
      if (u.role === 'admin') {
        allowed = true;
      } else {
        const list = await base44.entities.AllowedUserGuide.filter({ email: u.email.toLowerCase() });
        allowed = list.length > 0;
      }
      if (allowed) {
        navigate('/spotlight-pos-guide/roles', { replace: true });
      } else {
        setLoading(false);
      }
    };
    init();
  }, [navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0E1235]">
        <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid flex items-center justify-center">
      <div className="text-center p-10 border border-red-500/30 bg-[#131840]/80 max-w-md">
        <div className="font-mono-cyber text-red-400 text-xs tracking-widest mb-3">ACCESS DENIED</div>
        <h2 className="font-orbitron text-white text-xl mb-2">Δεν έχεις πρόσβαση</h2>
        <p className="font-rajdhani text-white/40 text-sm">Το email σου δεν βρίσκεται στη λίστα εξουσιοδοτημένων χρηστών.</p>
        <p className="font-rajdhani text-white/50 text-sm mt-4">Για αίτημα πρόσβασης στείλε email στο:</p>
        <a href="mailto:support@cyber-vault.gr" className="text-[#00CFFF] hover:underline font-mono-cyber text-sm">support@cyber-vault.gr</a>
      </div>
    </div>
  );
}