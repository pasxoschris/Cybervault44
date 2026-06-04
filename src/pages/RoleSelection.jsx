import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/layout/Navbar';
import { ROLES } from '@/lib/roles';
import { getCompletedCount } from '@/lib/tutorialProgress';
import { ChevronRight } from 'lucide-react';
import AssistantFloatingButton from '@/components/academy/AssistantFloatingButton';

export default function RoleSelection() {
  const [allowed, setAllowed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }
      const u = await base44.auth.me();
      if (u.role === 'admin') {
        setAllowed(true);
      } else {
        const list = await base44.entities.AllowedUserGuide.filter({ email: u.email.toLowerCase() });
        setAllowed(list.length > 0);
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

  if (allowed === false) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="pt-24 pb-12 cyber-grid" style={{ background: "#0E1235" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 border font-mono-cyber text-[10px] tracking-widest uppercase animate-pulse-glow"
            style={{ borderColor: "rgba(0,207,255,0.3)", color: "rgba(0,207,255,0.7)", background: "rgba(0,207,255,0.05)" }}>
            ✦ CYBERVAULT ACADEMY · SPOTLIGHTPOS<span className="text-white/50">App</span>
          </div>
          <h1 className="font-orbitron font-black text-3xl md:text-4xl mb-3 text-white">
            ΕΠΙΛΕΞΕ <span className="glow-cyan" style={{ color: "#00CFFF" }}>ΡΟΛΟ</span>
          </h1>
          <p className="font-rajdhani text-base text-white/45 max-w-lg">
            Επίλεξε τον ρόλο σου για να δεις το εκπαιδευτικό υλικό που σε αφορά.
          </p>
        </div>
      </div>

      {/* Role Cards */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROLES.map((role) => {
            const paths = role.lessons.map(l => l.href);
            const completed = getCompletedCount(paths);
            const total = paths.length;
            const pct = Math.round((completed / total) * 100);

            return (
              <Link
                key={role.id}
                to={`/academy/${role.id}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-purple-200 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Emoji + color bar */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-2xl text-2xl flex-shrink-0"
                    style={{ background: role.colorLight, border: `1px solid ${role.colorBorder}` }}
                  >
                    {role.emoji}
                  </div>
                  {completed > 0 && (
                    <span className="text-xs font-medium text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {completed}/{total}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-purple-700 transition-colors leading-snug" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {role.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>{role.subtitle}</p>
                <p className="text-xs text-gray-400 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>{total} μαθήματα</p>

                {/* Progress bar */}
                {completed > 0 && (
                  <div className="mb-4">
                    <div className="w-full h-1 rounded-full bg-gray-100">
                      <div
                        className="h-1 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: role.color }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-purple-400 group-hover:text-purple-600 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {completed > 0 ? 'Συνέχεια' : 'Ξεκίνα'} <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <AssistantFloatingButton />
    </div>
  );
}