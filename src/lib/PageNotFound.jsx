import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col items-center justify-center overflow-hidden relative font-rajdhani">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid" />

      {/* Glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-[#00D4FF]/5 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <Shield className="w-8 h-8 text-[#00D4FF]" strokeWidth={1.5} />
          <span className="font-orbitron text-base font-bold text-white tracking-widest">
            CYBER<span className="text-[#00D4FF]">VAULT</span>
          </span>
        </div>

        {/* 404 */}
        <h1 className="font-orbitron font-black text-[120px] md:text-[180px] leading-none text-[#00D4FF] glow-cyan mb-0 select-none"
          style={{ textShadow: '0 0 40px rgba(0,212,255,0.8), 0 0 80px rgba(0,212,255,0.4)' }}>
          404
        </h1>

        <div className="font-orbitron font-bold text-xl md:text-3xl text-white tracking-widest mb-4 uppercase">
          Critical System Error
        </div>

        <p className="font-rajdhani text-base text-white/50 max-w-md mx-auto mb-10">
          The requested page was not found on the secure network.<br />
          Return to established connections.
        </p>

        <button
          onClick={() => navigate('/')}
          className="cyber-btn"
        >
          Restore Connection
        </button>

        {/* Fake terminal log */}
        <div className="mt-14 mx-auto max-w-xl border border-[#00D4FF]/15 bg-[#0D1526]/80 p-4 text-left">
          <div className="font-mono-cyber text-[10px] text-[#00D4FF]/30 leading-relaxed">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                {`0000${i.toString(16).padStart(4, '0').toUpperCase()}: 85 28 00 00 05 08 00 00 `}
                &nbsp;&nbsp; EVENT_ID: 404_PAGE_NOT_FOUND
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}