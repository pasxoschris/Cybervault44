import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SeoHead from '@/components/SeoHead';

const pillars = [
  {
    code: 'GUIDE',
    title: 'Οδηγοί Spotlight POS',
    text: 'Βήμα-βήμα οδηγοί για παραγγελίες, πληρωμές, βάρδιες και ρυθμίσεις, ξεχωριστά για κάθε ρόλο.',
  },
  {
    code: 'DESK',
    title: 'Service Desk',
    text: 'Καταγραφή, παρακολούθηση και επίλυση τεχνικών ζητημάτων με πλήρες ιστορικό ανά κατάστημα.',
  },
  {
    code: 'STORES',
    title: 'Μητρώο Καταστημάτων',
    text: 'Στοιχεία επικοινωνίας, ενεργές άδειες και κατάσταση εκπαίδευσης κάθε εγκατάστασης.',
  },
  {
    code: 'RESELLER',
    title: 'Reseller Console',
    text: 'Σύνταξη, αποστολή και ηλεκτρονική αποδοχή προσφορών εξοπλισμού και υπηρεσιών.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: '#0D0E2E' }}>
      <SeoHead
        title="Σχετικά με το CyberVault | Πλατφόρμα Υποστήριξης Spotlight POS"
        description="Το CyberVault είναι η πλατφόρμα τεχνικής υποστήριξης και εκπαίδευσης της CyberVault E.E. για επιχειρήσεις με Spotlight POS (SpotlightPOS): οδηγοί, Service Desk, μητρώο καταστημάτων και προσφορές."
        path="/about"
      />
      <Navbar />

      <div className="pt-20">
        <section className="relative py-24 bg-[#0b0f30] overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c18] to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="mb-12">
              <div className="font-mono-cyber text-xs text-[#00D4FF]/60 tracking-[0.4em] uppercase mb-4">
                // ΣΧΕΤΙΚΑ.CYBERVAULT //
              </div>
              <h1 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-tight mb-6">
                ΣΧΕΤΙΚΑ ΜΕ ΤΟ <span className="text-[#00D4FF] glow-cyan">CYBERVAULT</span>
              </h1>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent" />
            </div>

            <div className="space-y-6 text-base md:text-lg text-white/60 leading-relaxed">
              <p>
                Το CyberVault είναι η κεντρική πλατφόρμα τεχνικής υποστήριξης και εκπαίδευσης που
                δημιούργησε η CyberVault E.E. για επιχειρήσεις που λειτουργούν με το Spotlight POS
                (SpotlightPOS). Συγκεντρώνει σε ένα σημείο όλα τα εργαλεία που χρειάζεται ένα
                κατάστημα εστίασης ή λιανεμπορίου για να λειτουργεί απρόσκοπτα: αναλυτικούς οδηγούς
                χρήσης, το Service Desk για την καταγραφή και παρακολούθηση τεχνικών ζητημάτων, το
                μητρώο καταστημάτων και το Reseller Console για τη σύνταξη και αποστολή προσφορών.
              </p>
              <p>
                Η πλατφόρμα απευθύνεται σε χειριστές ταμείου, σερβιτόρους, υπεύθυνους βάρδιας και
                διαχειριστές καταστημάτων, καθώς και στους τεχνικούς συνεργάτες που τα υποστηρίζουν.
                Κάθε χρήστης βλέπει το περιεχόμενο που του αντιστοιχεί: οι εκπαιδευόμενοι οδηγούνται
                στα μαθήματα της δικής τους ειδικότητας, ενώ οι διαχειριστές έχουν πρόσβαση στη
                διαχείριση χρηστών, καταστημάτων και ροών υποστήριξης.
              </p>
              <p>
                Το CyberVault σχεδιάζεται και συντηρείται από την τεχνική ομάδα της CyberVault E.E.,
                επίσημο συνεργάτη της OXINUS HELLAS για το Spotlight POS. Η ομάδα αναλαμβάνει την
                εγκατάσταση, την παραμετροποίηση και την υποστήριξη των συστημάτων POS, τη δικτύωση
                και την ασφάλεια των καταστημάτων, και μεταφέρει αυτή την εμπειρία πεδίου μέσα στους
                οδηγούς και στο υλικό εκπαίδευσης της πλατφόρμας.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-14">
              {pillars.map((p) => (
                <div key={p.code} className="relative p-6 border border-[#00D4FF]/15 bg-[#0D1526]/80 hover:border-[#00D4FF]/35 transition-all">
                  <div className="font-mono-cyber text-[9px] text-[#00D4FF]/40 tracking-widest uppercase mb-2">
                    {p.code}
                  </div>
                  <div className="font-orbitron text-xs font-bold text-white mb-2 tracking-wider">
                    {p.title}
                  </div>
                  <div className="text-sm text-white/45 leading-snug">
                    {p.text}
                  </div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00D4FF]/25" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}