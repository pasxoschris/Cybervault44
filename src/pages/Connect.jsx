import { ShieldCheck, RefreshCw, BookOpen } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SeoHead from '@/components/SeoHead';
import ServerUrlCard from '@/components/connect/ServerUrlCard';
import ClientTabs from '@/components/connect/ClientTabs';

export default function Connect() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0D0E2E' }}>
      <SeoHead
        title="Σύνδεση AI Assistant — SpotlightPOS Guide | CyberVault"
        description="Οδηγίες για τη σύνδεση του AI client σου (Claude, ChatGPT, Cursor ή custom) με τον οδηγό SpotlightPOS μέσω MCP."
        path="/connect"
      />
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-[#00CFFF]" />
            <span className="font-orbitron text-xs tracking-widest text-[#00CFFF]">SPOTLIGHTPOS GUIDE · MCP</span>
          </div>
          <h1 className="font-orbitron text-2xl md:text-3xl font-bold tracking-wide mb-3">
            Σύνδεσε τον AI Assistant σου
          </h1>
          <p className="text-white/60 leading-relaxed">
            Ο οδηγός SpotlightPOS εκθέτει τον εαυτό του μέσω MCP, ώστε ο AI client που χρησιμοποιείς να μπορεί να
            διαβάζει τα άρθρα του οδηγού και να απαντά σε ερωτήσεις για το Spotlight POS (SpotlightPOS) — πληρωμές,
            βάρδιες, ακυρώσεις, τιμολόγια, εκτυπωτή και τα υπόλοιπα modes.
          </p>
        </div>

        <ServerUrlCard />

        <section className="mt-10">
          <h2 className="font-orbitron text-lg font-bold tracking-wide mb-4">Οδηγίες ανά client</h2>
          <ClientTabs />
        </section>

        <section className="mt-8 border border-[#00CFFF]/20 bg-[#131840]/60 p-6">
          <div className="flex items-start gap-4">
            <ShieldCheck size={20} className="text-[#00CFFF] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white mb-2">Τελευταίο βήμα: έγκριση πρόσβασης</h3>
              <p className="text-white/65 text-sm leading-relaxed">
                Στη σύνδεση, ο client θα ανοίξει τη σελίδα έγκρισης της εφαρμογής. Συνδέσου με τον λογαριασμό σου και
                πάτα <strong className="text-white">Approve</strong>. Ο assistant ενεργεί πάντα ως εσύ, με τα
                δικαιώματα του δικού σου λογαριασμού.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 border border-[#00CFFF]/20 bg-[#131840]/60 p-6">
          <div className="flex items-start gap-4">
            <RefreshCw size={20} className="text-[#00CFFF] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white mb-2">Μετά από αλλαγές στον οδηγό</h3>
              <p className="text-white/65 text-sm leading-relaxed">
                Οι AI clients κρατούν cache τη λίστα εργαλείων. Όταν προστεθούν ή αλλάξουν άρθρα του οδηγού,
                χρειάζεται να κάνεις refresh/reconnect τον connector, και σε ορισμένες περιπτώσεις να ξαναεγκρίνεις
                την πρόσβαση.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}