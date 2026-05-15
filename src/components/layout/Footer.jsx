import { Shield } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#060912] border-t border-[#00D4FF]/10 py-10 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#00D4FF]" strokeWidth={1.5} />
            <span className="font-orbitron text-sm font-bold text-white tracking-widest">
              CYBER<span className="text-[#00D4FF]">VAULT</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Security Policy', 'Terms of Service'].map((link) => (
              <span key={link} className="font-mono-cyber text-[10px] text-white/25 hover:text-[#00D4FF]/60 tracking-widest uppercase cursor-pointer transition-colors">
                {link}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono-cyber text-[10px] text-white/25 tracking-widest">
            © {year} CYBERVAULT. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[#00D4FF]/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-mono-cyber text-[10px] text-[#00D4FF]/25 tracking-widest">
            +30 210 XXX XXXX &nbsp;|&nbsp; www.cybervault.gr
          </div>
          <div className="flex gap-4">
            {['**SECURITY POLICY', '**REPORT BREACH', '**SYSTEM STATUS'].map((item) => (
              <span key={item} className="font-mono-cyber text-[10px] text-white/20 hover:text-[#00D4FF]/40 cursor-pointer transition-colors tracking-wider">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}