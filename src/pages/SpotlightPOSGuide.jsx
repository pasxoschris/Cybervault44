import { Link } from 'react-router-dom';
import { ChevronRight, Smartphone, BookOpen, Users, Monitor, CreditCard, FileText, Settings, LogIn, Package, Tag, Edit3, Receipt, Clock, Layers, Download } from 'lucide-react';

const topics = [
  { id: 1, icon: Download, title: 'Εγκατάσταση Εφαρμογής', desc: 'Κατέβασμα από App Store', href: 'https://www.spotlightpos.com/' },
  { id: 2, icon: LogIn, title: 'Σύνδεση Χρήστη', desc: 'Πρώτη σύνδεση & επόμενες', href: 'https://www.spotlightpos.com/' },
  { id: 3, icon: Clock, title: 'Έναρξη Βάρδιας', desc: 'Άνοιγμα βάρδιας & ταμείου', href: 'https://www.spotlightpos.com/' },
  { id: 4, icon: Settings, title: 'Ρυθμίσεις Χρήστη', desc: 'Εκτυπωτές, POS, τιμοκατάλογος', href: 'https://www.spotlightpos.com/' },
  { id: 5, icon: Package, title: 'Δημιουργία Παραγγελίας', desc: 'Τραπέζι, προϊόντα & αποστολή', href: 'https://www.spotlightpos.com/' },
  { id: 6, icon: FileText, title: 'Στοιχεία Παραγγελίας', desc: 'Ακύρωση, μεταφορά, συγχώνευση', href: 'https://www.spotlightpos.com/' },
  { id: 7, icon: Tag, title: 'Έκπτωση', desc: 'Γενική, ιδιοκατανάλωση & άλλες', href: 'https://www.spotlightpos.com/' },
  { id: 8, icon: CreditCard, title: 'Πληρωμή', desc: 'Μετρητά, κάρτα, split payments', href: 'https://www.spotlightpos.com/' },
  { id: 9, icon: Edit3, title: 'Επεξεργασία Παραγγελίας', desc: 'Εργαλεία επεξεργασίας', href: 'https://www.spotlightpos.com/' },
  { id: 10, icon: Receipt, title: 'Έκδοση Τιμολογίου', desc: 'Στοιχεία & έκδοση παραστατικών', href: 'https://www.spotlightpos.com/' },
  { id: 11, icon: Layers, title: 'Παραγγελίες Βάρδιας', desc: 'Ανάλυση, εκτύπωση & κλείσιμο', href: 'https://www.spotlightpos.com/' },
  { id: 12, icon: Monitor, title: 'Σενάρια', desc: 'Πρακτικά παραδείγματα', href: 'https://www.spotlightpos.com/' },
];

export default function SpotlightPOSGuide() {
  return (
    <div className="min-h-screen bg-[#0E1235]">
      {/* Hero */}
      <div className="relative overflow-hidden pt-20 pb-16 border-b border-[#00D4FF]/10">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a40]/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-10 right-0 w-96 h-96 rounded-full blur-[120px] bg-purple-900/30 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-[#00D4FF]/30 bg-[#00D4FF]/5 font-mono-cyber text-[10px] text-[#00D4FF] tracking-widest uppercase">
            // ΕΚΠΑΙΔΕΥΣΗ.ΣΥΣΤΗΜΑΤΟΣ //
          </div>

          {/* Logo + Title */}
          <div className="flex items-center gap-5 mb-5">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/40 bg-gradient-to-br from-purple-900/60 to-purple-700/40">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="20" x2="18" y2="8" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="12" y1="20" x2="12" y2="3" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="6" y1="20" x2="6" y2="13" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="font-mono-cyber text-[10px] text-purple-400/60 tracking-widest uppercase mb-1">SpotlightPOS</p>
              <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white tracking-tight">
                ΟΔΗΓΟΣ <span className="text-[#A78BFA]">ΕΚΠΑΙΔΕΥΣΗΣ</span>
              </h1>
            </div>
          </div>

          <p className="font-rajdhani text-lg text-white/50 max-w-lg mb-6">
            Βήμα-βήμα οδηγοί για σερβιτόρους και ιδιοκτήτες εστιατορίων.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <Smartphone className="w-3 h-3" />, label: 'Μόνο για iOS' },
              { icon: <BookOpen className="w-3 h-3" />, label: '12 Ενότητες' },
              { icon: <Users className="w-3 h-3" />, label: 'Σερβιτόροι & Ιδιοκτήτες' },
            ].map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 font-rajdhani text-xs font-semibold px-3 py-1.5 border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF]/80">
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="font-mono-cyber text-xs text-[#00D4FF]/40 tracking-widest mb-2">// ΕΝΟΤΗΤΕΣ.ΕΚΠΑΙΔΕΥΣΗΣ //</div>
          <h2 className="font-orbitron text-xl font-bold text-white">Επέλεξε από πού να ξεκινήσεις</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <a
                key={topic.id}
                href={topic.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col border border-[#00D4FF]/10 bg-[#0D1526]/70 p-5 hover:border-purple-500/50 hover:bg-purple-900/10 transition-all duration-200"
              >
                {/* Number */}
                <div className="font-mono-cyber text-[9px] text-[#00D4FF]/30 tracking-widest mb-3">#{String(topic.id).padStart(2, '0')}</div>

                {/* Icon */}
                <div className="w-11 h-11 flex items-center justify-center border border-purple-500/30 bg-purple-900/20 group-hover:bg-purple-900/40 transition-colors mb-4">
                  <Icon className="w-5 h-5 text-[#A78BFA]" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <h3 className="font-orbitron text-sm font-bold text-white group-hover:text-[#A78BFA] transition-colors leading-snug mb-1">
                  {topic.title}
                </h3>
                <p className="font-rajdhani text-sm text-white/40 flex-1">{topic.desc}</p>

                {/* Arrow */}
                <div className="flex items-center gap-1 mt-4 font-mono-cyber text-[9px] text-purple-400/50 group-hover:text-purple-400 transition-colors tracking-widest uppercase">
                  Δες οδηγό <ChevronRight className="w-3 h-3" />
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-purple-500/20 group-hover:border-purple-500/50 transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-purple-500/20 group-hover:border-purple-500/50 transition-colors" />
              </a>
            );
          })}
        </div>

        {/* Tip */}
        <div className="mt-10 border border-purple-500/20 bg-purple-900/10 p-5 flex items-start gap-4">
          <div className="w-9 h-9 flex items-center justify-center border border-purple-500/30 bg-purple-900/30 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#A78BFA" strokeWidth="1.5"/>
              <path d="M12 8v4m0 4h.01" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="font-rajdhani text-base text-white/60">
            <span className="text-purple-400 font-semibold">Συμβουλή:</span> Ξεκίνα από την εγκατάσταση αν είναι η πρώτη φορά. Αν είσαι ήδη εξοικειωμένος, πήγαινε κατευθείαν στην ενότητα που χρειάζεσαι.
          </p>
        </div>
      </div>
    </div>
  );
}