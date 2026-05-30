import { Wrench, Camera, Wifi, BarChart3, Shield, Network, Zap, Package, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: Network,
    title: 'Δικτύωση & WiFi Επαγγελματικού Επιπέδου',
    code: 'SVC-004',
    subtitle: 'Σταθερό, γρήγορο και οργανωμένο δίκτυο — χτισμένο για τις πραγματικές ανάγκες της επιχείρησής σας.',
    description: '',
    bullets: [
      'Ξεχωριστά δίκτυα για προσωπικό, πελάτες & συστήματα (VLAN) — ασφάλεια & τάξη σε ένα',
      'Τοποθέτηση Access Points για πλήρη κάλυψη σε κάθε γωνιά του χώρου',
      'QoS ρυθμίσεις ώστε ταμεία, κάμερες και κρίσιμες συσκευές να έχουν πάντα προτεραιότητα',
      'Αναβάθμιση σε WiFi 6 / 6E — περισσότερες συσκευές, μεγαλύτερη ταχύτητα, λιγότερα προβλήματα',
    ],
  },
  {
    icon: Wrench,
    title: 'Official SpotlightPOS Support',
    link: 'https://www.spotlightpos.com/',
    code: 'SVC-001',
    subtitle: 'Επίσημοι συνεργάτες OXINUS HELLAS — εξειδικευμένη υποστήριξη για εστίαση-καφέ',
    description: '',
    bullets: [
      'Εγκατάσταση & παραμετροποίηση νέου εξοπλισμού',
      'On-site επέμβαση όταν κάτι δεν πάει καλά — γρήγορα και αποτελεσματικά',
      'Εκπαίδευση προσωπικού για σωστή χρήση του συστήματος',
      'Απομακρυσμένη υποστήριξη για άμεση επίλυση',
      'Συμβουλευτική για αναβαθμίσεις, επεκτάσεις και νέες λύσεις',
    ],
  },
  {
    icon: Camera,
    title: 'Κάμερες & Συστήματα Παρακολούθησης',
    code: 'SVC-002',
    subtitle: 'Δείτε ό,τι συμβαίνει στον χώρο σας — οποιαδήποτε στιγμή, από οπουδήποτε.',
    description: '',
    bullets: [
      'Εγκατάσταση IP καμερών υψηλής ανάλυσης & καταγραφικού (NVR/DVR)',
      'Ασφαλής πρόσβαση σε live feed & recordings απευθείας από το κινητό σας',
      'Στρατηγική κάλυψη χώρου — με έμφαση στο ταμείο, στην είσοδο & αποθήκη',
    ],
  },
  {
    icon: Wifi,
    title: 'Starlink & 4G/5G — Πάντα Συνδεδεμένοι',
    link: 'https://starlink.com/gr/business?referral=RC-481067-34312-6&utm_source=google&utm_medium=paid&utm_campaign=sls_gr_src_ggl_brd_var-pe&utm_content=sls_gr_src_ggl_brd_var-pe_res_gsa_v4m_txt_el-gr_egn&utm_term=var-pe_starlink',
    code: 'SVC-003',
    subtitle: 'Η επιχείρησή σας δεν σταματά — ούτε η σύνδεσή σας. Λύσεις για κύρια σύνδεση ή αυτόματο backup.',
    description: '',
    bullets: [
      'Εγκατάσταση & ρύθμιση Starlink για υψηλή ταχύτητα',
      'Ίδανικό για απομακρυσμένες τοποθεσίες',
      'Αυτόματη εναλλαγή (failover) με multi-WAN router σε περίπτωση βλάβης της γραμμής',
    ],
  },
  {
    icon: Shield,
    title: 'Firewall & Ασφάλεια Δικτύου',
    code: 'SVC-005',
    subtitle: 'Η επιχείρησή σας αξίζει ίδιο επίπεδο προστασίας με μεγάλες εταιρείες — τώρα αυτό είναι εφικτό.',
    description: '',
    bullets: [
      'Εγκατάσταση & διαχείριση επαγγελματικού firewall (Fortinet, pfSense, Mikrotik κ.ά.)',
      'Παρακολούθηση δικτυακής κίνησης σε πραγματικό χρόνο — ανίχνευση απειλών πριν γίνουν πρόβλημα',
      'Προστασία από ransomware, phishing & κακόβουλο λογισμικό',
      'VPN για ασφαλή απομακρυσμένη πρόσβαση από οπουδήποτε',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Εκπαίδευση Security Awareness',
    code: 'SVC-009',
    subtitle: 'Ο πιο αδύναμος κρίκος σε κάθε σύστημα ασφαλείας είναι ο άνθρωπινος παράγοντασ— εμείς το αλλάζουμε αυτό.',
    description: '',
    bullets: [
      'Εκπαίδευση προσωπικού σε βασικές κυβερνοαπειλές — phishing, ύποπτα email & επικίνδυνες συνήθειες',
      'Απλές & πρακτικές συμβουλές για ασφαλή χρήση κωδικών, κινητών & υπολογιστών',
      'Κατανοητή γλώσσα χωρίς τεχνικούς όρους — κατάλληλο για κάθε επίπεδο γνώσης',
      'Ατομική ή ομαδική εκπαίδευση, on-site στον χώρο σας',
    ],
  },
  {
    icon: Package,
    title: 'Ενοικίαση Εξοπλισμού',
    code: 'SVC-008',
    subtitle: 'Αποφύγετε το κόστος αγοράς — αποκτήστε τον εξοπλισμό που χρειάζεστε, όποτε τον χρειάζεστε.',
    description: '',
    bullets: [
      '4G Routers — αξιόπιστη σύνδεση για pop-up, events & προσωρινές εγκαταστάσεις',
      'iPad & iPhone — έτοιμα για χρήση με SpotlightPOS ή οποιοδήποτε σύστημα',
      'Θερμικοί Εκτυπωτές παραγγελιών & αποδείξεων',
      'Παράδοση, ρύθμιση & τεχνική υποστήριξη καθ' όλη τη διάρκεια ενοικίασης',
    ],
  },
  {
    icon: Network,
    title: 'Τεχνική Υποστήριξη & Συντήρηση',
    code: 'SVC-006',
    subtitle: 'Ένας αξιόπιστος τεχνικός πάντα στο πλευρό σας',
    description: '',
    bullets: [
      'Γρήγορη on-site & απομακρυσμένη υποστήριξη για κάθε τεχνικό θέμα',
      'Προληπτική συντήρηση εξοπλισμού — εντοπίζουμε προβλήματα πριν εμφανιστούν',
      'Διαχείριση ενημερώσεων & αναβαθμίσεων χωρίς διακοπή λειτουργίας',
      'Προτεραιοποιημένη εξυπηρέτηση για πελάτες με σύμβαση — εγγυημένοι χρόνοι απόκρισης',
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
                <div className="font-mono-cyber text-xs text-[#00D4FF]/30 tracking-widest mb-4">
                  {service.code}
                </div>

                {/* Icon */}
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 border border-[#00D4FF]/30 bg-[#00D4FF]/5 group-hover:bg-[#00D4FF]/10 group-hover:border-[#00D4FF]/50 transition-all">
                  <Icon className="w-5 h-5 text-[#00D4FF]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                {service.link ? (
                  <a href={service.link} target="_blank" rel="noopener noreferrer" className="font-orbitron text-base font-bold text-white mb-2 tracking-wider hover:text-[#00D4FF] transition-colors leading-snug block">
                    {service.title} ↗
                  </a>
                ) : (
                  <h3 className="font-orbitron text-base font-bold text-white mb-2 tracking-wider group-hover:text-[#00D4FF] transition-colors leading-snug">
                    {service.title}
                  </h3>
                )}

                {/* Subtitle */}
                {service.subtitle && (
                  <p className="font-rajdhani text-base text-[#00D4FF]/60 mb-4 leading-snug">
                    {service.subtitle}
                  </p>
                )}

                {/* Bullets */}
                <ul className="flex flex-col gap-2 mt-auto">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00D4FF]/50 flex-shrink-0" />
                      <span className="font-rajdhani text-base text-white/60 leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>

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