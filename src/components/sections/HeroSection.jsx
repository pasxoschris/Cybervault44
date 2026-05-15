import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Shield, Activity } from 'lucide-react';

const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function MatrixRain({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 14, 26, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.15)';
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
      drops.forEach((y, i) => {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, [canvasRef]);

  return null;
}

export default function HeroSection() {
  const canvasRef = useRef(null);
  const [typed, setTyped] = useState('');
  const fullText = 'SECURING NETWORK INFRASTRUCTURE';

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
      {/* Matrix canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
      <MatrixRain canvasRef={canvasRef} />

      {/* Grid overlay */}
      <div className="absolute inset-0 cyber-grid z-0" />

      {/* Radial glow center */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#00D4FF]/5 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-[#00D4FF]/30 bg-[#00D4FF]/5 font-mono-cyber text-xs text-[#00D4FF] tracking-widest">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>SYSTEM ONLINE — ALL NETWORKS SECURE</span>
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
        </div>

        {/* Main headline */}
        <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl text-[#00D4FF] glow-cyan mb-6 leading-none tracking-tight animate-flicker">
          CYBER<br />
          <span className="text-white">VAULT</span>
        </h1>

        {/* Typed subheading */}
        <div className="font-mono-cyber text-sm md:text-base text-[#00D4FF]/70 tracking-[0.4em] mb-4 h-6">
          {typed}<span className="animate-pulse">_</span>
        </div>

        <p className="font-rajdhani text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
          Advanced network security solutions for enterprises. Protecting your digital perimeter 
          with next-generation threat intelligence and real-time monitoring.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="cyber-btn"
          >
            Request Quote
          </button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-orbitron text-xs font-700 tracking-widest text-white/60 hover:text-[#00D4FF] transition-colors uppercase border border-white/10 px-8 py-3.5 hover:border-[#00D4FF]/30"
          >
            View Services →
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto border-t border-[#00D4FF]/10 pt-10">
          {[
            { value: '500+', label: 'Networks Protected' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '24/7', label: 'Monitoring' },
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