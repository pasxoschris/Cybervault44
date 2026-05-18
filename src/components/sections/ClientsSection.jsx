import { ShieldCheck } from 'lucide-react';

const testimonials = [
  {
    quote: "Η CyberVault αναδιάρθρωσε ολόκληρη την αρχιτεκτονική ασφάλειας δικτύου μας. Μηδέν περιστατικά σε 3 χρόνια από την εγκατάσταση.",
    name: "Νικόλαος Π.",
    title: "CTO, Εθνικός Όμιλος Logistics",
    sector: "Logistics",
  },
];

const clientSectors = [
  'ΤΡΑΠΕΖΙΚΟΣ & ΧΡΗΜΑΤΟΟΙΚΟΝΟΜΙΚΟΣ ΤΟΜΕΑΣ',
  'ΥΓΕΙΑ',
  'LOGISTICS',
  'ΤΗΛΕΠΙΚΟΙΝΩΝΙΕΣ',
  'ΕΝΕΡΓΕΙΑ',
];

export default function ClientsSection() {
  return (
    <section id="clients" className="relative py-24 bg-[#0A0E1A] overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D4FF]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="font-mono-cyber text-xs text-[#00D4FF]/60 tracking-[0.4em] uppercase mb-4">
            // ΔΙΚΤΥΟ.ΠΕΛΑΤΩΝ //
          </div>
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
            ΕΜΠΙΣΤΕΥΟΝΤΑΙ <span className="text-[#00D4FF] glow-cyan">ΗΓΕΤΕΣ ΑΓΟΡΑΣ</span>
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent mx-auto" />
        </div>

        {/* Sector tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {clientSectors.map((sector) => (
            <div
              key={sector}
              className="font-mono-cyber text-[10px] text-[#00D4FF]/50 border border-[#00D4FF]/15 px-4 py-2 tracking-widest hover:border-[#00D4FF]/35 hover:text-[#00D4FF]/70 transition-all cursor-default"
            >
              {sector}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="service-card p-7 group">
              <div className="mb-5">
                <ShieldCheck className="w-5 h-5 text-[#00D4FF]/50 group-hover:text-[#00D4FF] transition-colors" strokeWidth={1.5} />
              </div>
              <p className="font-rajdhani text-base text-white/65 leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="border-t border-[#00D4FF]/10 pt-5">
                <div className="font-orbitron text-xs font-bold text-[#00D4FF] tracking-wider">{t.name}</div>
                <div className="font-rajdhani text-xs text-white/40 mt-1">{t.title}</div>
                <div className="font-mono-cyber text-[10px] text-[#00D4FF]/30 tracking-widest mt-2 uppercase">{t.sector}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}