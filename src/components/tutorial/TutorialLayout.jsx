import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TutorialLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#0E1235]">
      {/* Header */}
      <div className="relative border-b border-[#00D4FF]/10 bg-[#0A0E1A]/80 pt-20 pb-10">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Link
            to="/spotlight-pos-guide"
            className="inline-flex items-center gap-2 font-mono-cyber text-[10px] text-[#00D4FF]/50 hover:text-[#00D4FF] tracking-widest uppercase transition-colors mb-6"
          >
            <ArrowLeft className="w-3 h-3" /> Πίσω στον Οδηγό
          </Link>
          <div className="inline-block mb-3 px-2 py-1 border border-purple-500/30 bg-purple-900/10">
            <span className="font-mono-cyber text-[9px] text-purple-400/60 tracking-widest uppercase">SpotlightPOS Tutorial</span>
          </div>
          <h1 className="font-orbitron font-bold text-2xl md:text-3xl text-white tracking-tight mb-2">{title}</h1>
          {subtitle && <p className="font-rajdhani text-base text-white/50">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
}