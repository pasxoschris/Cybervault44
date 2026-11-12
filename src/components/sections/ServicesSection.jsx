import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Satellite, Tablet, Cctv, Phone } from 'lucide-react';

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

// Παράδειγμα εγκατάστασης: τρεις συνδέσεις → gateway → switch → συσκευές.
// Κάθε συσκευή οδηγεί στην ομάδα υπηρεσιών που τη στηρίζει.
// Φωτογραφίες: επίσημες εικόνες προϊόντων Ubiquiti (επίσημοι συνεργάτες).
const IMG = {
  gateway: 'https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/261460c5f_ucg-ultra.webp',
  u7lite: 'https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/591096a1c_u7-lite.webp',
  u7outdoor: 'https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/b6f8611b0_u7-outdoor.webp',
  unifi5g: 'https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/e6741206d_unifi-5g.webp',
  switch: 'https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/45e3dea5a_usw-lite-16-poe.webp',
};

const inputs = [
  { id: 'line', icon: Globe, label: 'Γραμμή', role: 'Κύρια', x: 90, kind: 'primary' },
  { id: 'sat', icon: Satellite, label: 'Starlink', role: 'Εφεδρική', x: 280, kind: 'backup' },
  {
    id: 'mobile', label: 'UniFi 5G', role: 'Προσωρινή', x: 470, kind: 'temp',
    photos: [{ href: IMG.unifi5g, w: 18, h: 86, dx: 0 }],
  },
];

const endpoints = [
  {
    id: 'wifi', label: 'WiFi', role: 'U7 Lite & U7 Outdoor', x: 70, group: 'syndesi',
    photos: [
      { href: IMG.u7lite, w: 45, h: 50, dx: -24 },
      { href: IMG.u7outdoor, w: 37, h: 50, dx: 24 },
    ],
  },
  { id: 'pos', icon: Tablet, label: 'Παραγγελιοληψία', role: 'POS & PDA', x: 210, group: 'tameio' },
  { id: 'cam', icon: Cctv, label: 'Κάμερες', role: 'UniFi Protect', x: 350, group: 'asfaleia' },
  { id: 'voip', icon: Phone, label: 'Τηλέφωνο', role: 'VoIP', x: 490, group: 'ypostirixi' },
];

const IN_Y = 52;
const GW = { y: 196 };
const SW = { y: 352 };
const END_Y = 540;
const CX = 280;

function Node({ x, y, icon: Icon, photos, label, role, href, dashed }) {
  return (
    <a href={href} className="svc-node">
      {photos ? (
        photos.map((p) => (
          <image key={p.href} href={p.href} x={x + p.dx - p.w / 2} y={y + 26 - p.h} width={p.w} height={p.h} />
        ))
      ) : (
        <>
          <circle cx={x} cy={y} r={24} className={dashed ? 'svc-node__dot svc-node__dot--temp' : 'svc-node__dot'} />
          <Icon x={x - 11} y={y - 11} width={22} height={22} className="svc-node__icon" strokeWidth={1.75} aria-hidden="true" />
        </>
      )}
      <text x={x} y={y + 50} textAnchor="middle" className="svc-node__label">{label}</text>
      <text x={x} y={y + 70} textAnchor="middle" className="svc-node__role">{role}</text>
    </a>
  );
}

function NetworkMap() {
  const curve = (x1, y1, x2, y2) => {
    const my = (y1 + y2) / 2;
    return `M${x1} ${y1} C${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
  };
  return (
    <svg
      viewBox="0 0 560 632"
      className="w-full h-auto max-w-[560px] mx-auto"
      role="img"
      aria-label="Παράδειγμα εγκατάστασης: κύρια γραμμή, Starlink ως εφεδρική και UniFi 5G ως προσωρινή σύνδεση καταλήγουν σε UniFi Cloud Gateway Ultra. Από εκεί ένα UniFi Switch Lite 16 PoE τροφοδοτεί WiFi (U7 Lite και U7 Outdoor), παραγγελιοληψία, κάμερες και τηλέφωνο."
    >
      {inputs.map((n) => (
        <path
          key={n.id}
          d={curve(n.x, IN_Y + 84, CX + (n.x - CX) * 0.3, GW.y + 8)}
          className={`svc-link svc-link--${n.kind}`}
          fill="none"
        />
      ))}
      <path d={`M${CX} ${GW.y + 118} V${SW.y}`} className="svc-link svc-link--down" fill="none" pathLength={1} />
      {endpoints.map((n) => (
        <path
          key={n.id}
          d={curve(CX + (n.x - CX) * 0.2, SW.y + 116, n.x, END_Y - 34)}
          className="svc-link svc-link--down"
          fill="none"
          pathLength={1}
        />
      ))}

      {inputs.map((n) => (
        <Node key={n.id} {...n} y={IN_Y} href="#syndesi" dashed={n.kind === 'temp'} />
      ))}

      <a href="#syndesi" className="svc-node">
        <image href={IMG.gateway} x={CX - 90} y={GW.y} width={180} height={60} />
        <text x={CX} y={GW.y + 90} textAnchor="middle" className="svc-node__label">UniFi Cloud Gateway Ultra</text>
        <text x={CX} y={GW.y + 110} textAnchor="middle" className="svc-node__role">Router, firewall, failover</text>
      </a>

      <a href="#syndesi" className="svc-node">
        <image href={IMG.switch} x={CX - 85} y={SW.y} width={170} height={58} />
        <text x={CX} y={SW.y + 86} textAnchor="middle" className="svc-node__label">UniFi Switch Lite 16 PoE</text>
        <text x={CX} y={SW.y + 106} textAnchor="middle" className="svc-node__role">Κεντρικό switch</text>
      </a>

      {endpoints.map((n) => (
        <Node key={n.id} {...n} y={END_Y} href={`#${n.group}`} />
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
              Παράδειγμα εγκατάστασης σε εστιατόριο. Πατήστε μια συσκευή για να δείτε πώς τη στηρίζουμε.
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
