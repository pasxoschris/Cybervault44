import { Wrench, Camera, Wifi, BarChart3, Shield, Network, ExternalLink } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Official SpotlightPOS Support',
    code: 'SVC-001',
    subtitle: 'Επίσημοι συνεργάτες OXINUS HELLAS',
    description: 'Εξειδικευμένη υποστήριξη για επιχειρήσεις εστίασης και καφέ.',
    link: 'https://www.spotlightpos.com/',
    bullets: [
      'Εγκατάσταση νέου εξοπλισμού',
      'On-site υποστήριξη',
      'Εκπαίδευση χρηστών',
      'Απομακρυσμένη τεχνική υποστήριξη',
      'Παροχή συμβουλών για θέματα συστημάτων και λογισμικού',
    ],
  },
  {
    icon: Camera,
    title: 'Συστήματα Παρακολούθησης & Κάμερες',
    code: 'SVC-002',
    subtitle: 'Καθαρή εικόνα, ασφάλεια και πρόσβαση από οπουδήποτε.',
    description: '',
    bullets: [
      'Εγκατάσταση IP καμερών & καταγραφικού',
      'Ρύθμιση ασφαλούς πρόσβασης από κινητό',
      'Πολλαπλή κάλυψη ειδικά στο χώρο του ταμείου',
    ],
  },
  {
    icon: Wifi,
    title: 'Εγκατάσταση Starlink & 4G/5G',
    code: 'SVC-003',
    subtitle: 'Συνεχής λειτουργία με εναλλακτική σύνδεση όταν η κύρια γραμμή πέσει ή υποβαθμιστεί.',
    description: '',
    bullets: [
      'Εγκατάσταση Starlink',
      'Εγκατάσταση 4G/5G modem routers (κύρια ή εφεδρική σύνδεση)',
      'Αυτόματη εναλλαγή γραμμών (failover) με multi-WAN router',
    ],
  },
  {
    icon: BarChart3,
    title: 'Δικτύωση & WiFi Υποδομές',
    code: 'SVC-004',
    subtitle: 'Σταθερά δίκτυα, σωστή κάλυψη και διαχωρισμός κατηγοριών χρηστών.',
    description: '',
    bullets: [
      'VLAN και QoS για: προσωπικό / πελάτες / συστήματα',
      'Access Points και extender για ομοιόμορφη κάλυψη',
      'Έλεγχος & βελτιστοποίηση ασύρματου δικτύου με WiFi 6e & 7 εξοπλισμό',
    ],
  },
  {
    icon: Shield,
    title: 'Ασφάλεια Δικτύου & Firewall',
    code: 'SVC-005',
    subtitle: 'Προστασία της επιχείρησής σας από εξωτερικές και εσωτερικές απειλές.',
    description: '',
    bullets: [
      'Εγκατάσταση & διαχείριση επαγγελματικού firewall',
      'Παρακολούθηση κίνησης δικτύου σε πραγματικό χρόνο',
      'Προστασία από κακόβουλο λογισμικό & phishing',
      'VPN για ασφαλή απομακρυσμένη πρόσβαση',
    ],
  },
  {
    icon: Network,
    title: 'Τεχνική Υποστήριξη & Συντήρηση',
    code: 'SVC-006',
    subtitle: 'Αξιόπιστη τεχνική υποστήριξη για ομαλή λειτουργία της επιχείρησής σας.',
    description: '',
    bullets: [
      'On-site & απομακρυσμένη υποστήριξη',
      'Προληπτική συντήρηση εξοπλισμού',
      'Διαχείριση αναβαθμίσεων & ενημερώσεων',
      'Προτεραιοποιημένη εξυπηρέτηση για συμβόλαια',
    ],
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
            ΛΥΣΕΙΣ <span className="text-[#00D4FF] glow-cyan">ΤΕΧΝΟΛΟΓΙΑΣ</span> & ΑΣΦΑΛΕΙΑΣ
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent mx-auto mb-6" />
          <p className="font-rajdhani text-lg text-white/50 max-w-2xl mx-auto">
            Ολοκληρωμένες λύσεις δικτύωσης, ασφάλειας και τεχνολογίας για επιχειρήσεις κάθε μεγέθους.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.code} className="service-card p-6 group cursor-default relative flex flex-col">
                {/* Code label */}
                <div className="font-mono-cyber text-[10px] text-[#00D4FF]/30 tracking-widest mb-4">
                  {service.code}
                </div>

                {/* Icon */}
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 border border-[#00D4FF]/30 bg-[#00D4FF]/5 group-hover:bg-[#00D4FF]/10 group-hover:border-[#00D4FF]/50 transition-all">
                  <Icon className="w-5 h-5 text-[#00D4FF]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-orbitron text-sm font-bold text-white mb-2 tracking-wider group-hover:text-[#00D4FF] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Subtitle */}
                {service.subtitle && (
                  <p className="font-rajdhani text-sm text-[#00D4FF]/50 mb-4 leading-snug">
                    {service.subtitle}
                  </p>
                )}

                {/* Bullets */}
                <ul className="flex flex-col gap-2 mt-auto">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00D4FF]/50 flex-shrink-0" />
                      <span className="font-rajdhani text-sm text-white/50 leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Link */}
                {service.link && (
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono-cyber text-[10px] text-[#00D4FF]/60 hover:text-[#00D4FF] tracking-widest transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    spotlightpos.com
                  </a>
                )}

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