import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const channels = [
  {
    icon: Phone,
    tag: 'Κινητό',
    label: '(+30) 693 1326 616',
    sublabel: 'Πάντα διαθέσιμο',
    href: 'tel:+306931326616',
    live: true,
  },
  {
    icon: Phone,
    tag: 'Σταθερό',
    label: '(+30) 210 4449 000',
    sublabel: '24/7 διαθέσιμο',
    href: 'tel:+302104449000',
    live: true,
  },
  {
    icon: Mail,
    tag: 'Email',
    label: 'info@cyber-vault.gr',
    sublabel: '',
    href: 'mailto:info@cyber-vault.gr',
    live: false,
  },
  {
    icon: MessageCircle,
    tag: 'Viber',
    label: '(+30) 693 1326 616',
    sublabel: 'Μήνυμα άμεσα',
    href: 'viber://chat?number=%2B306931326616',
    live: false,
  },
  {
    icon: MapPin,
    tag: 'Διεύθυνση',
    label: 'Πανεπιστημίου 64',
    sublabel: '105 64 Αθήνα',
    href: 'https://maps.google.com/?q=Πανεπιστημίου+64,+10564+Αθήνα',
    external: true,
    live: false,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 bg-[#0b0f30] overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080c18] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="font-mono-cyber text-xs text-[#00D4FF]/60 tracking-[0.4em] uppercase mb-4">
            // ΕΚΚΙΝΗΣΗ.ΕΠΙΚΟΙΝΩΝΙΑΣ //
          </div>
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
            ΕΠΙΚΟΙΝΩΝΗΣΤΕ <span className="text-[#00D4FF] glow-cyan">ΜΑΖΙ ΜΑΣ</span>
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent mx-auto mb-4" />
          <p className="font-rajdhani text-base text-white/45 max-w-xl mx-auto">
            Είμαστε διαθέσιμοι για οποιαδήποτε ερώτηση ή αίτημα υποστήριξης.
          </p>
        </div>

        {/* Channels grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {channels.map(({ icon: Icon, tag, label, sublabel, href, live, external }) => (
            <a
              key={tag}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-5 border border-[#00D4FF]/15 bg-[#0D1526]/70 p-5 hover:border-[#00D4FF]/50 hover:bg-[#00D4FF]/5 transition-all duration-200"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-[#00D4FF]/30 bg-[#00D4FF]/10 group-hover:bg-[#00D4FF]/20 transition-colors">
                <Icon className="w-5 h-5 text-[#00D4FF]" strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="font-mono-cyber text-[9px] text-[#00D4FF]/40 tracking-widest uppercase mb-1">{tag}</div>
                <div className="font-rajdhani text-base font-semibold text-white/85 group-hover:text-white transition-colors truncate">{label}</div>
                {sublabel && <div className="font-rajdhani text-xs text-white/35 mt-0.5">{sublabel}</div>}
              </div>

              {/* Live indicator */}
              {live && (
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono-cyber text-[9px] text-green-400/70 tracking-widest uppercase hidden sm:block">Live</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}