import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#080b25] border-t border-[#00CFFF]/10 py-14 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/71e29efae_web-app-manifest-512x512.png"
            alt="CyberVault Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="font-orbitron text-lg font-bold tracking-widest">
            <span className="text-[#00D4FF]">CYBER</span><span className="text-white">VAULT</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="font-rajdhani text-base text-[#00D4FF]/70 tracking-wide">
          Τεχνική Υποστήριξη για επιχειρήσεις
        </p>

        {/* Contact info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2 font-rajdhani text-sm text-white/60">
            <Mail className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
            <span>Email: </span>
            <a href="mailto:info@cyber-vault.gr" className="text-[#00D4FF] font-semibold hover:underline">
              info@cyber-vault.gr
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 font-rajdhani text-sm text-white/60">
            <Phone className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
            <span>Τηλέφωνο: </span>
            <a href="tel:+302104449000" className="text-[#00D4FF] font-semibold hover:underline">
              210 444-9000
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 font-rajdhani text-sm text-white/60">
            <MessageCircle className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
            <span>Μήνυμα μέσω </span>
            <a href="viber://chat?number=%2B306931326616" className="text-[#00D4FF] font-semibold hover:underline">
              Viber
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 font-rajdhani text-sm text-white/60">
            <MessageCircle className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
            <span>Μήνυμα μέσω </span>
            <a href="https://wa.me/306931326616" target="_blank" rel="noopener noreferrer" className="text-[#00D4FF] font-semibold hover:underline">
              WhatsApp
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 font-rajdhani text-sm text-white/60">
            <MapPin className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
            <a
              href="https://maps.google.com/?q=Πανεπιστημίου+64,+10564+Αθήνα"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00D4FF] font-semibold hover:underline"
            >
              Πανεπιστημίου 64, 10564 Αθήνα
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#00D4FF]/10 mt-2" />

        {/* Copyright */}
        <div className="font-mono-cyber text-[11px] text-white/25 tracking-widest">
          © {year} CYBERVAULT — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}