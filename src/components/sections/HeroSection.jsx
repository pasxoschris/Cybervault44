import { useEffect, useState } from 'react';
import { ChevronDown, Activity } from 'lucide-react';

export default function HeroSection() {
  const [typed, setTyped] = useState('');
  const fullText = 'ΑΣΦΑΛΕΙΣ ΔΙΚΤΥΑΚΕΣ ΥΠΟΔΟΜΕΣ';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Radial glow center */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full bg-[#1a3a8f]/20 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-[#00D4FF]/30 bg-[#00D4FF]/5 font-mono-cyber text-xs text-[#00D4FF] tracking-widest">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>ΣΥΣΤΗΜΑ ΕΝΕΡΓΟ — ΟΛΑ ΤΑ ΔΙΚΤΥΑ ΑΣΦΑΛΗ</span>
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
        </div>

        {/* Main headline */}
        <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl text-[#00D4FF] glow-cyan mb-6 leading-none tracking-tight animate-flicker">
          CYBER<span className="text-white">VAULT</span>
        </h1>

        {/* Typed subheading */}
        <div className="font-mono-cyber text-sm md:text-base text-[#00D4FF]/70 tracking-[0.4em] mb-4 h-6">
          {typed}<span className="animate-pulse">_</span>
        </div>

        <p className="font-rajdhani text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
          Προηγμένες λύσεις ασφάλειας δικτύων για επιχειρήσεις. Προστατεύουμε την ψηφιακή σας περίμετρο 
          με τεχνολογία νέας γενιάς, ευφυΐα απειλών και παρακολούθηση σε πραγματικό χρόνο.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="cyber-btn"
          >
            Οι Υπηρεσίες μας →
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto border-t border-[#00D4FF]/10 pt-10">
          {[
            { value: '500+', label: 'ΔΙΚΤΥΑ' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '24/7', label: 'Παρακολούθηση' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-orbitron text-2xl md:text-3xl font-bold text-[#00D4FF] glow-cyan">{stat.value}</div>
              <div className="font-rajdhani text-xs text-white/40 tracking-widest uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#00D4FF]/40 hover:text-[#00D4FF] transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Horizontal scan line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent z-10" />
    </section>
  );
}