import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// Υπηρεσίες ομαδοποιημένες με βάση το τι κρατούν σε λειτουργία μέσα στην επιχείρηση.
const groups = [
  {
    id: 'syndesi',
    name: 'Σύνδεση',
    intro: 'Το δίκτυο είναι η βάση. Αν πέσει, σταματούν μαζί του παραγγελιοληψία, πληρωμές και κάμερες.',
    services: [
      {
        title: 'Δικτύωση & WiFi επαγγελματικού επιπέδου',
        subtitle: 'Επίσημοι συνεργάτες της Ubiquiti. Σταθερό, γρήγορο και οργανωμένο δίκτυο, χτισμένο για τις πραγματικές ανάγκες της επιχείρησής σας.',
        bullets: [
          'Δίκτυα αποκλειστικά με εξοπλισμό Ubiquiti UniFi: κεντρική διαχείριση, σταθερό WiFi και παρακολούθηση από απόσταση',
          'Ξεχωριστά δίκτυα για προσωπικό, πελάτες και συστήματα (VLAN), για ασφάλεια και τάξη',
          'Τοποθέτηση Access Points για πλήρη κάλυψη σε κάθε γωνιά του χώρου',
          'Ρυθμίσεις QoS ώστε παραγγελιοληψία, κάμερες και κρίσιμες συσκευές να έχουν πάντα προτεραιότητα',
          'Αναβάθμιση σε WiFi 6 / 6E: περισσότερες συσκευές, μεγαλύτερη ταχύτητα, λιγότερα προβλήματα',
        ],
      },
      {
        title: 'Starlink & 4G/5G',
        subtitle: 'Η επιχείρησή σας δεν σταματά, ούτε η σύνδεσή σας. Λύσεις για κύρια σύνδεση ή αυτόματο backup.',
        link: {
          label: 'Starlink για επιχειρήσεις',
          href: 'https://starlink.com/gr/business?referral=RC-481067-34312-6&utm_source=google&utm_medium=paid&utm_campaign=sls_gr_src_ggl_brd_var-pe&utm_content=sls_gr_src_ggl_brd_var-pe_res_gsa_v4m_txt_el-gr_egn&utm_term=var-pe_starlink',
        },
        bullets: [
          'Εγκατάσταση και ρύθμιση Starlink για υψηλή ταχύτητα',
          'Ιδανικό για απομακρυσμένες τοποθεσίες',
          'Αυτόματη εναλλαγή (failover) με multi-WAN router σε περίπτωση βλάβης της γραμμής',
        ],
      },
    ],
  },
  {
    id: 'tameio',
    name: 'Παραγγελιοληψία & πληρωμές',
    intro: 'Ό,τι χρειάζεται για να παίρνετε παραγγελίες και να πληρώνεστε χωρίς καθυστέρηση.',
    services: [
      {
        title: 'Official SpotlightPOS Support',
        subtitle: 'Επίσημοι συνεργάτες της OXINUS HELLAS.',
        link: { label: 'spotlightpos.com', href: 'https://www.spotlightpos.com/' },
        bullets: [
          'Εγκατάσταση και παραμετροποίηση εξοπλισμού',
          'Εκπαίδευση προσωπικού για σωστή χρήση του συστήματος',
          'Απομακρυσμένη υποστήριξη για άμεση επίλυση',
          'On-site επέμβαση 24/7 όταν κάτι δεν πάει καλά',
          'Συμβουλευτική για αναβαθμίσεις, επεκτάσεις και νέες λύσεις',
        ],
      },
      {
        title: 'Viva Wallet',
        subtitle: 'Εξουσιοδοτημένοι μεταπωλητές Viva Wallet.',
        link: {
          label: 'Άνοιγμα λογαριασμού Viva',
          href: 'https://www.viva.com/el-gr/onboarding?utm_source=partners&utm_medium=leadreferral&utm_campaign=gr_cybervault18022026&utm_content=cybervault',
        },
        bullets: [
          'Πώληση και ενεργοποίηση τερματικών Viva POS',
          'Πληρωμές με κάρτα για κάθε επιχείρηση',
          'Ρύθμιση και σύνδεση με το σύστημα POS σας',
        ],
      },
      {
        title: 'Ενοικίαση εξοπλισμού',
        subtitle: 'Αποφύγετε το κόστος αγοράς: αποκτήστε τον εξοπλισμό που χρειάζεστε, όποτε τον χρειάζεστε.',
        bullets: [
          '4G routers για pop-up, events και προσωρινές εγκαταστάσεις',
          'iPad & iPhone έτοιμα για χρήση με SpotlightPOS ή οποιοδήποτε σύστημα',
          'Θερμικοί εκτυπωτές παραγγελιών και αποδείξεων',
          "Παράδοση, ρύθμιση και τεχνική υποστήριξη καθ' όλη τη διάρκεια της ενοικίασης",
        ],
      },
    ],
  },
  {
    id: 'asfaleia',
    name: 'Ασφάλεια',
    intro: 'Προστασία του χώρου σας και των ανθρώπων που δουλεύουν σε αυτόν.',
    services: [
      {
        title: 'Κάμερες & συστήματα παρακολούθησης',
        subtitle: 'Δείτε τι συμβαίνει στον χώρο σας, οποιαδήποτε στιγμή, από οπουδήποτε.',
        bullets: [
          'Εγκατάσταση IP καμερών υψηλής ανάλυσης και καταγραφικού (NVR/DVR), Hikvision ή Ubiquiti UniFi',
          'Ασφαλής πρόσβαση σε ζωντανή εικόνα και καταγραφές από το κινητό σας, μέσω των εφαρμογών Hik-Connect ή UniFi Protect',
          'Κάλυψη με έμφαση στο ταμείο, στην είσοδο και στην αποθήκη',
        ],
      },
      {
        title: 'Εκπαίδευση Security Awareness',
        subtitle: 'Ο πιο αδύναμος κρίκος σε κάθε σύστημα ασφαλείας είναι ο ανθρώπινος παράγοντας. Εμείς το αλλάζουμε αυτό.',
        bullets: [
          'Εκπαίδευση προσωπικού σε βασικές κυβερνοαπειλές: phishing, ύποπτα email και επικίνδυνες συνήθειες',
          'Απλές, πρακτικές συμβουλές για ασφαλή χρήση κωδικών, κινητών και υπολογιστών',
          'Κατανοητή γλώσσα χωρίς τεχνικούς όρους, για κάθε επίπεδο γνώσης',
          'Ατομική ή ομαδική εκπαίδευση, στον χώρο σας',
        ],
      },
    ],
  },
  {
    id: 'ypostirixi',
    name: 'Τηλεφωνία & υποστήριξη',
    intro: 'Επαγγελματική τηλεφωνία και ένας τεχνικός που γνωρίζει την εγκατάστασή σας.',
    services: [
      {
        title: 'VoIP τηλεφωνία & Cloud PBX',
        subtitle: 'Σχεδιασμός ανάλογα με τον τρόπο που δουλεύει η επιχείρησή σας.',
        bullets: [
          'Πώληση και εγκατάσταση τηλεφωνικών κέντρων VoIP (PBX), cloud ή on-premise',
          'Παραμετροποίηση IVR, αυτόματου τηλεφωνητή και επαγγελματικού μενού',
          'Ρύθμιση εσωτερικών, ουρών κλήσεων και ομάδων',
          'Τηλεφωνικές συσκευές Grandstream και Yealink',
        ],
      },
      {
        title: 'Τεχνική υποστήριξη & συντήρηση',
        subtitle: 'Ένας αξιόπιστος τεχνικός, πάντα στο πλευρό σας.',
        bullets: [
          'Γρήγορη υποστήριξη στον χώρο σας ή απομακρυσμένα, για κάθε τεχνικό θέμα',
          'Προληπτική συντήρηση εξοπλισμού: εντοπίζουμε τα προβλήματα πριν εμφανιστούν',
          'Ενημερώσεις και αναβαθμίσεις χωρίς διακοπή λειτουργίας',
          'Προτεραιότητα και εγγυημένοι χρόνοι απόκρισης για πελάτες με σύμβαση',
        ],
      },
    ],
  },
];

// Κόμβοι του διαγράμματος: κάθε συσκευή οδηγεί στην ομάδα υπηρεσιών που τη στηρίζει.
const nodes = [
  { id: 'line', label: 'Γραμμή', x: 70, y: 36, group: 'syndesi' },
  { id: 'sat', label: 'Starlink', x: 70, y: 124, group: 'syndesi' },
  { id: 'mobile', label: '4G / 5G', x: 70, y: 212, group: 'syndesi' },
  { id: 'router', label: 'Router', x: 230, y: 130, group: 'syndesi', core: true },
  { id: 'wifi', label: 'WiFi', x: 400, y: 34, group: 'syndesi' },
  { id: 'pos', label: 'Παραγγελιοληψία', x: 420, y: 102, group: 'tameio' },
  { id: 'cam', label: 'Κάμερες', x: 420, y: 170, group: 'asfaleia' },
  { id: 'voip', label: 'Τηλέφωνο', x: 400, y: 238, group: 'ypostirixi' },
];

const links = [
  ['line', 'router'],
  ['sat', 'router'],
  ['mobile', 'router'],
  ['router', 'wifi'],
  ['router', 'pos'],
  ['router', 'cam'],
  ['router', 'voip'],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

function NetworkMap() {
  return (
    <svg
      viewBox="0 0 580 272"
      className="w-full h-auto"
      role="img"
      aria-label="Διάγραμμα: γραμμή, Starlink και 4G/5G συνδέονται στο router, που τροφοδοτεί WiFi, παραγγελιοληψία, κάμερες και τηλέφωνο"
    >
      {links.map(([a, b, backup]) => {
        const p = byId[a];
        const q = byId[b];
        const mx = (p.x + q.x) / 2;
        return (
          <path
            key={a + b}
            d={`M${p.x} ${p.y} C${mx} ${p.y}, ${mx} ${q.y}, ${q.x} ${q.y}`}
            className={backup ? 'svc-link svc-link--backup' : 'svc-link'}
            fill="none"
            pathLength={backup ? undefined : 1}
          />
        );
      })}
      {nodes.map((n) => (
        <a key={n.id} href={`#${n.group}`} className="svc-node">
          <circle cx={n.x} cy={n.y} r={n.core ? 11 : 6} className={n.core ? 'svc-node__core' : 'svc-node__dot'} />
          <text
            x={n.x + (n.x > 300 ? 16 : 0)}
            y={n.x > 300 ? n.y + 5 : n.y + (n.core ? 32 : 26)}
            textAnchor={n.x > 300 ? 'start' : 'middle'}
            className="svc-node__label"
          >
            {n.label}
          </text>
        </a>
      ))}
    </svg>
  );
}

function ServiceRow({ service }) {
  return (
    <article className="py-8 border-t border-[#22305E] first:border-t-0 first:pt-0">
      <h3 className="text-[1.375rem] leading-snug font-semibold text-white">{service.title}</h3>
      <p className="mt-2 text-[1.0625rem] leading-relaxed text-[#9FB0D0] max-w-[62ch]">{service.subtitle}</p>
      <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
        {service.bullets.map((b) => (
          <li key={b} className="relative pl-5 text-[0.98rem] leading-relaxed text-[#D5DEEE]">
            <span aria-hidden="true" className="absolute left-0 top-[0.7em] w-2 h-px bg-[#00D4FF]" />
            {b}
          </li>
        ))}
      </ul>
      {service.link && (
        <a
          href={service.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-[#00D4FF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
        >
          {service.link.label}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

export default function ServicesSection() {
  return (
    <div id="services" className="svc font-plex bg-[#0A0E1A] text-white">
      {/* Hero: το δίκτυο μιας επιχείρησης, με κάθε συσκευή να οδηγεί στην υπηρεσία της */}
      <section className="relative border-b border-[#22305E]">
        <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14 md:pt-24 md:pb-20 grid gap-12 lg:grid-cols-[1fr_1.05fr] items-center">
          <div>
            <h1 className="text-[2.25rem] md:text-[3.25rem] leading-[1.08] font-bold tracking-[-0.02em] max-w-[16ch]">
              Τεχνολογία που κρατά την επιχείρησή σας σε λειτουργία
            </h1>
            <p className="mt-6 text-[1.125rem] leading-relaxed text-[#9FB0D0] max-w-[48ch]">
              Δίκτυα, παραγγελιοληψία, κάμερες και τηλεφωνία για εστιατόρια, καφέ, καταστήματα και ξενοδοχεία. Από την
              εγκατάσταση μέχρι την καθημερινή υποστήριξη.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-[#00D4FF] text-[#0A0E1A] font-semibold hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
              >
                Ζητήστε προσφορά
              </Link>
            </div>
          </div>
          <figure className="lg:pl-6">
            <NetworkMap />
            <figcaption className="mt-3 text-sm text-[#6F7FA3]">
              Πατήστε μια συσκευή για να δείτε πώς τη στηρίζουμε.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Ομάδες υπηρεσιών */}
      <div className="max-w-6xl mx-auto px-6">
        {groups.map((g) => (
          <section
            key={g.id}
            id={g.id}
            aria-labelledby={`${g.id}-title`}
            className="scroll-mt-28 py-16 md:py-20 border-b border-[#22305E] last:border-b-0 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]"
          >
            <header className="lg:sticky lg:top-28 self-start">
              <h2 id={`${g.id}-title`} className="text-[1.75rem] md:text-[2rem] font-bold leading-tight text-[#00D4FF]">
                {g.name}
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#9FB0D0] max-w-[34ch]">{g.intro}</p>
            </header>
            <div>
              {g.services.map((s) => (
                <ServiceRow key={s.title} service={s} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Κλείσιμο */}
      <section className="border-t border-[#22305E] bg-[#0F1530]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid gap-8 md:grid-cols-[1fr_auto] items-center">
          <div>
            <h2 className="text-[1.75rem] md:text-[2rem] font-bold leading-tight">Δεν είστε σίγουροι τι χρειάζεστε;</h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#9FB0D0] max-w-[52ch]">
              Περιγράψτε μας τον χώρο σας και τι σας δυσκολεύει σήμερα. Θα σας προτείνουμε τη λύση που ταιριάζει.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex justify-center items-center px-6 py-3 border border-[#00D4FF] text-[#00D4FF] font-semibold hover:bg-[#00D4FF] hover:text-[#0A0E1A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
          >
            Επικοινωνία
          </Link>
        </div>
      </section>
    </div>
  );
}
