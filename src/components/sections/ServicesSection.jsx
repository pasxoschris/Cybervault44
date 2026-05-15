import { Network, Shield, Eye, Lock, Radio, Server } from 'lucide-react';

const services = [
  {
    icon: Network,
    title: 'Άμυνα Δικτύου',
    code: 'SVC-001',
    description:
      'Ολοκληρωμένη προστασία περιμέτρου και στρατηγικές τμηματοποίησης δικτύου. Σχεδιάζουμε και αναπτύσσουμε αρχιτεκτονικές πολυεπίπεδης άμυνας για να κρατάμε τις απειλές μακριά από την υποδομή σας.',
    tags: ['Διαχείριση Firewall', 'IDS/IPS', 'Αρχιτεκτονική DMZ'],
  },
  {
    icon: Eye,
    title: 'Πληροφορίες Απειλών',
    code: 'SVC-002',
    description:
      'Παρακολούθηση απειλών και ροές πληροφοριών σε πραγματικό χρόνο, προσαρμοσμένες στον κλάδο σας. Προληπτικός εντοπισμός αναδυόμενων απειλών πριν επηρεάσουν τα συστήματά σας.',
    tags: ['Παρακολούθηση Dark Web', 'IOC Feeds', 'Threat Hunting'],
  },
  {
    icon: Lock,
    title: 'Zero Trust Ασφάλεια',
    code: 'SVC-003',
    description:
      'Εφαρμογή μοντέλου ασφάλειας "μηδενικής εμπιστοσύνης" σε ολόκληρο το δίκτυό σας. Έλεγχος πρόσβασης βάσει ταυτότητας και micro-segmentation για σύγχρονες επιχειρήσεις.',
    tags: ['IAM', 'Micro-segmentation', 'MFA'],
  },
  {
    icon: Radio,
    title: 'Αντιμετώπιση Περιστατικών',
    code: 'SVC-004',
    description:
      'Άμεση αντιμετώπιση περιστατικών και υπηρεσίες ψηφιακής εγκληματολογίας. Η ομάδα μας είναι διαθέσιμη 24/7 για να περιορίσει παραβιάσεις, να ανακτήσει συστήματα και να αποτρέψει υποτροπές.',
    tags: ['Απόκριση 24/7', 'Ψηφιακή Εγκληματολογία', 'Ανάκτηση'],
  },
  {
    icon: Server,
    title: 'Ενίσχυση Υποδομής',
    code: 'SVC-005',
    description:
      'Συστηματικές αξιολογήσεις ασφάλειας και ενίσχυση διακομιστών, τερματικών και δικτυακών συσκευών. Σάρωση ευπαθειών, διαχείριση ενημερώσεων και έλεγχος διαμορφώσεων.',
    tags: ['Pen Testing', 'Διαχείριση Patches', 'Έλεγχος Ρυθμίσεων'],
  },
  {
    icon: Shield,
    title: 'Συμμόρφωση & Έλεγχος',
    code: 'SVC-006',
    description:
      'Πλοηγηθείτε σε σύνθετες κανονιστικές απαιτήσεις με σιγουριά. Βοηθάμε οργανισμούς να επιτύχουν και να διατηρήσουν συμμόρφωση με ISO 27001, GDPR, NIS2 και πολλά άλλα.',
    tags: ['ISO 27001', 'GDPR', 'NIS2'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-[#0A0E1A] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A] via-transparent to-[#0A0E1A] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="font-mono-cyber text-xs text-[#00D4FF]/60 tracking-[0.4em] uppercase mb-4">
            // ΚΑΤΑΛΟΓΟΣ.ΥΠΗΡΕΣΙΩΝ //
          </div>
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
            ΛΥΣΕΙΣ <span className="text-[#00D4FF] glow-cyan">ΑΣΦΑΛΕΙΑΣ</span> ΔΙΚΤΥΩΝ
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent mx-auto mb-6" />
          <p className="font-rajdhani text-lg text-white/50 max-w-2xl mx-auto">
            Υπηρεσίες κυβερνοασφάλειας επιχειρησιακής κλάσης, σχεδιασμένες για να προστατεύουν, εντοπίζουν και αντιμετωπίζουν σύγχρονες δικτυακές απειλές.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.code} className="service-card p-6 group cursor-default relative">
                {/* Code label */}
                <div className="font-mono-cyber text-[10px] text-[#00D4FF]/30 tracking-widest mb-4">
                  {service.code}
                </div>

                {/* Icon */}
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 border border-[#00D4FF]/30 bg-[#00D4FF]/5 group-hover:bg-[#00D4FF]/10 group-hover:border-[#00D4FF]/50 transition-all">
                  <Icon className="w-5 h-5 text-[#00D4FF]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-orbitron text-sm font-bold text-white mb-3 tracking-wider group-hover:text-[#00D4FF] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-rajdhani text-sm text-white/50 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-cyber text-[10px] text-[#00D4FF]/50 border border-[#00D4FF]/15 px-2 py-1 tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00D4FF]/30 group-hover:border-[#00D4FF]/60 transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#00D4FF]/30 group-hover:border-[#00D4FF]/60 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}