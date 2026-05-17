import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TutorialLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d1b69] via-[#3d2080] to-[#1a0a40] pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-white/50 text-sm font-rajdhani">
            <Link to="/" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <span className="w-5 h-5 bg-purple-500/40 rounded flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <line x1="18" y1="20" x2="18" y2="8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="12" y1="20" x2="12" y2="3" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="6" y1="20" x2="6" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </span>
              Αρχική
            </Link>
            <span>/</span>
            <span className="text-white/80">{title}</span>
          </div>

          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="20" x2="18" y2="8" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="12" y1="20" x2="12" y2="3" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="6" y1="20" x2="6" y2="13" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>

          <h1 className="font-orbitron font-bold text-2xl md:text-3xl text-white mb-2">{title}</h1>
          {subtitle && <p className="font-rajdhani text-base text-white/60">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}