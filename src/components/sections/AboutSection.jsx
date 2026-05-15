import { CheckCircle, Award, Users, Globe } from 'lucide-react';

const highlights = [
  { icon: Award, label: 'ISO 27001 Certified', desc: 'Internationally recognized security management' },
  { icon: Users, label: 'Expert Team', desc: '50+ certified security professionals' },
  { icon: Globe, label: 'Pan-European Reach', desc: 'Serving enterprises across Greece & EU' },
  { icon: CheckCircle, label: 'Proven Track Record', desc: '10+ years of incident-free operations' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-[#080c18] overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Glowing accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="font-mono-cyber text-xs text-[#00D4FF]/60 tracking-[0.4em] uppercase mb-4">
              // ABOUT.CYBERVAULT //
            </div>
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white tracking-tight mb-6">
              DEFENDING THE <br />
              <span className="text-[#00D4FF] glow-cyan">DIGITAL FRONTIER</span>
            </h2>
            <div className="w-20 h-px bg-[#00D4FF]/40 mb-8" />

            <p className="font-rajdhani text-lg text-white/60 leading-relaxed mb-6">
              CyberVault is a leading Greek cybersecurity firm specializing in network 
              security and infrastructure protection. Founded by ex-military and enterprise 
              security professionals, we bring battle-tested methodologies to the private sector.
            </p>
            <p className="font-rajdhani text-lg text-white/60 leading-relaxed mb-10">
              Our mission is to provide enterprises with the same level of network security 
              previously available only to government and military organizations — delivered 
              with the agility and responsiveness modern business demands.
            </p>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="cyber-btn"
            >
              Work With Us
            </button>
          </div>

          {/* Right: Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="relative p-6 border border-[#00D4FF]/15 bg-[#0D1526]/80 hover:border-[#00D4FF]/35 transition-all group"
              >
                <div className="mb-4 w-10 h-10 flex items-center justify-center border border-[#00D4FF]/25 bg-[#00D4FF]/5 group-hover:bg-[#00D4FF]/10 transition-all">
                  <Icon className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
                </div>
                <div className="font-orbitron text-xs font-bold text-white mb-2 tracking-wider">{label}</div>
                <div className="font-rajdhani text-sm text-white/45 leading-snug">{desc}</div>
                {/* corner accent */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00D4FF]/25 group-hover:border-[#00D4FF]/50 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}