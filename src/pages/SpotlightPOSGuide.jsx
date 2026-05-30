import { Link } from 'react-router-dom';
import DotWaves from '@/components/ui/DotWaves.jsx';
import { useState, useEffect } from 'react';
import { ChevronRight, Smartphone, BookOpen, Users, Monitor, CreditCard, FileText, Settings, LogIn, Package, Tag, Edit3, Receipt, Clock, Layers, Download, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import SearchBar from '@/components/tutorial/SearchBar';
import { getCompletedCount, isVisited } from '@/lib/tutorialProgress';
import { base44 } from '@/api/base44Client';

const topics = [
  { id: 1, icon: Download, title: 'Εγκατάσταση Εφαρμογής', desc: 'Κατέβασμα από App Store', href: '/tutorial/installation' },
  { id: 2, icon: LogIn, title: 'Σύνδεση Χρήστη', desc: 'Πρώτη σύνδεση & επόμενες', href: '/tutorial/login' },
  { id: 3, icon: Clock, title: 'Έναρξη Βάρδιας', desc: 'Άνοιγμα βάρδιας & ταμείου', href: '/tutorial/start-shift' },
  { id: 4, icon: Settings, title: 'Ρυθμίσεις Χρήστη', desc: 'Εκτυπωτές, POS, τιμοκατάλογος', href: '/tutorial/settings' },
  { id: 5, icon: Package, title: 'Δημιουργία Παραγγελίας', desc: 'Τραπέζι, προϊόντα & αποστολή', href: '/tutorial/create-order' },
  { id: 6, icon: FileText, title: 'Στοιχεία Παραγγελίας', desc: 'Ακύρωση, μεταφορά, συγχώνευση', href: '/tutorial/order-details' },
  { id: 7, icon: Tag, title: 'Έκπτωση', desc: 'Γενική, ιδιοκατανάλωση & άλλες', href: '/tutorial/discount' },
  { id: 8, icon: CreditCard, title: 'Πληρωμή', desc: 'Μετρητά, κάρτα, split payments', href: '/tutorial/payment' },
  { id: 9, icon: Edit3, title: 'Επεξεργασία Παραγγελίας', desc: 'Εργαλεία επεξεργασίας', href: '/tutorial/edit-order' },
  { id: 10, icon: Receipt, title: 'Έκδοση Τιμολογίου', desc: 'Στοιχεία & έκδοση παραστατικών', href: '/tutorial/invoice' },
  { id: 11, icon: Layers, title: 'Παραγγελίες Βάρδιας', desc: 'Ανάλυση, εκτύπωση & κλείσιμο', href: '/tutorial/shift' },
  { id: 12, icon: Monitor, title: 'Σενάρια', desc: 'Πρακτικά παραδείγματα', href: '/tutorial/scenarios' },
];

export default function SpotlightPOSGuide() {
  const [visited, setVisited] = useState({});
  const [allowed, setAllowed] = useState(null); // null=loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(async u => {
        if (u.role === 'admin') { setAllowed(true); return; }
        const list = await base44.asServiceRole?.entities?.AllowedUser?.list?.() || await base44.entities.AllowedUser.list();
        const emails = list.map(a => a.email.toLowerCase());
        setAllowed(emails.includes(u.email.toLowerCase()));
      })
      .catch(() => base44.auth.redirectToLogin())
      .finally(() => setLoading(false));

    const update = () => {
      const obj = {};
      topics.forEach(t => { obj[t.href] = isVisited(t.href); });
      setVisited(obj);
    };
    update();
  }, []);

  const completedCount = topics.filter(t => visited[t.href]).length;
  const progressPct = Math.round((completedCount / topics.length) * 100);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0E1235]">
        <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
      </div>
    );
  }

  if (allowed === false) {
    return (
      <div className="min-h-screen bg-[#0E1235] cyber-grid flex items-center justify-center">
        <div className="text-center p-10 border border-red-500/30 bg-[#131840]/80 max-w-md">
          <div className="font-mono-cyber text-red-400 text-xs tracking-widest mb-3">ACCESS DENIED</div>
          <h2 className="font-orbitron text-white text-xl mb-2">Δεν έχεις πρόσβαση</h2>
          <p className="font-rajdhani text-white/40 text-sm">Το email σου δεν βρίσκεται στη λίστα εξουσιοδοτημένων χρηστών.</p>
          <p className="font-rajdhani text-white/50 text-sm mt-4">Για αίτημα πρόσβασης στείλε email στο:</p>
          <a href="mailto:support@cyber-vault.gr" className="text-[#00CFFF] hover:underline font-mono-cyber text-sm">support@cyber-vault.gr</a>
          <p className="font-rajdhani text-white/30 text-xs mt-3">Αναφέρετε ονοματεπώνυμο, Επωνυμία και ΑΦΜ καταστήματος.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="relative overflow-hidden pt-24 pb-14 cyber-grid" style={{ background: "#0E1235" }}>
        {/* Animated glow orb */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,207,255,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(100,60,255,0.07) 0%, transparent 70%)" }} />

        {/* Dot waves - bottom right */}
        <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden" style={{ width: 500, height: 500 }}>
          <DotWaves />
        </div>

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border font-mono-cyber text-[10px] tracking-widest uppercase animate-pulse-glow" style={{ borderColor: "rgba(0,207,255,0.3)", color: "rgba(0,207,255,0.7)", background: "rgba(0,207,255,0.05)" }}>
            ✦ SPOTLIGHT<span className="text-white/50">POS</span> · ΕΚΠΑΙΔΕΥΣΗ ΣΥΣΤΗΜΑΤΟΣ ✦
          </div>

          {/* Title */}
          <h1 className="font-orbitron font-black text-3xl md:text-5xl mb-3 tracking-tight" style={{ color: "#fff" }}>
            ΟΔΗΓΟΣ <span className="glow-cyan" style={{ color: "#00CFFF" }}>ΕΚΠΑΙΔΕΥΣΗΣ</span>
          </h1>
          <p className="font-rajdhani text-base md:text-lg mb-8 max-w-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
            Βήμα-βήμα οδηγοί για χρήστες της εφαρμογής SpotlightPOS.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: <Smartphone className="w-3 h-3" />, label: 'Μόνο για iOS' },
              { icon: <BookOpen className="w-3 h-3" />, label: '12 Ενότητες' },
              { icon: <Users className="w-3 h-3" />, label: 'Σερβιτόροι & Ιδιοκτήτες' },
            ].map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 font-rajdhani text-xs font-semibold px-3 py-1.5 border" style={{ borderColor: "rgba(0,207,255,0.2)", color: "rgba(0,207,255,0.6)", background: "rgba(0,207,255,0.04)" }}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>

          {/* Progress */}
          {completedCount > 0 && (
            <div className="mb-6 max-w-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-cyber text-[9px] tracking-widest uppercase" style={{ color: "rgba(0,207,255,0.5)" }}>ΠΡΟΟΔΟΣ ΕΚΠΑΙΔΕΥΣΗΣ</span>
                <span className="font-mono-cyber text-[9px]" style={{ color: "rgba(0,207,255,0.7)" }}>{completedCount}/{topics.length}</span>
              </div>
              <div className="w-full h-0.5 rounded-full" style={{ background: "rgba(0,207,255,0.1)" }}>
                <div
                  className="h-0.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #00CFFF, #6A3FFF)", boxShadow: "0 0 8px rgba(0,207,255,0.6)" }}
                />
              </div>
            </div>
          )}

          {/* Search */}
          <SearchBar />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-base font-bold text-gray-900 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>Επίλεξε από πού να ξεκινήσεις</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link
                key={topic.id}
                to={topic.href}
                className={`group relative bg-white rounded-2xl border shadow-sm p-6 hover:border-purple-300 hover:shadow-md transition-all duration-200 flex flex-col ${visited[topic.href] ? 'border-green-200' : 'border-gray-100'}`}
              >
                {/* Completed badge */}
                {visited[topic.href] && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                )}

                {/* Number */}
                <div className="text-xs text-gray-400 mb-3 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>#{String(topic.id).padStart(2, '0')}</div>

                {/* Icon */}
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-colors mb-4 ${visited[topic.href] ? 'bg-green-50 border-green-100 group-hover:bg-green-100' : 'bg-purple-50 border-purple-100 group-hover:bg-purple-100'}`}>
                  <Icon className={`w-6 h-6 ${visited[topic.href] ? 'text-green-600' : 'text-purple-600'}`} strokeWidth={1.5} />
                </div>

                {/* Text */}
                <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-700 transition-colors leading-snug mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-500 flex-1 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{topic.desc}</p>

                {/* Arrow */}
                <div className="flex items-center gap-1 mt-5 text-sm text-purple-400 group-hover:text-purple-600 transition-colors font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {visited[topic.href] ? 'Επανάληψη' : 'Δες οδηγό'} <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tip */}
        <div className="mt-8 bg-purple-50 border border-purple-100 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#7C3AED" strokeWidth="1.5"/>
              <path d="M12 8v4m0 4h.01" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-base text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="text-purple-700 font-semibold">Συμβουλή:</span> Ξεκίνα από την εγκατάσταση αν είναι η πρώτη φορά. Αν είσαι ήδη εξοικειωμένος, πήγαινε κατευθείαν στην ενότητα που χρειάζεσαι.
          </p>
        </div>
      </div>
    </div>
  );
}