import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/layout/Navbar';

export default function Faults() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(setUser)
      .catch(() => base44.auth.redirectToLogin())
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0E1235]">
        <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border font-mono-cyber text-[10px] tracking-widest uppercase"
            style={{ borderColor: "rgba(0,207,255,0.3)", color: "rgba(0,207,255,0.7)", background: "rgba(0,207,255,0.05)" }}>
            ✦ ΤΕΧΝΙΚΟ PORTAL
          </div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
            ΚΑΤΑΓΡΑΦΗ <span className="text-[#00CFFF]">ΒΛΑΒΩΝ</span>
          </h1>
          <p className="font-rajdhani text-white/50 text-lg">
            Καλωσήρθες, <span className="text-[#00CFFF]">{user.full_name}</span>
          </p>
        </div>

        {/* Placeholder content */}
        <div className="border border-[#00CFFF]/20 bg-[#131840]/80 rounded-sm p-12 text-center">
          <p className="font-orbitron text-white/30 text-sm tracking-widest">
            Η φόρμα καταγραφής βλαβών θα εμφανιστεί εδώ
          </p>
        </div>
      </div>
    </div>
  );
}