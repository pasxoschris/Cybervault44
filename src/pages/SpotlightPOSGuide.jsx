import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronRight, Smartphone, BookOpen, Users, Monitor, CreditCard, FileText, Settings, LogIn, Package, Tag, Edit3, Receipt, Clock, Layers, Download, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import SearchBar from '@/components/tutorial/SearchBar';
import { getCompletedCount, isVisited } from '@/lib/tutorialProgress';

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

  useEffect(() => {
    const update = () => {
      const obj = {};
      topics.forEach(t => { obj[t.href] = isVisited(t.href); });
      setVisited(obj);
    };
    update();
  }, []);

  const completedCount = topics.filter(t => visited[t.href]).length;
  const progressPct = Math.round((completedCount / topics.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d1b69] via-[#3d2080] to-[#1a0a40] pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-rajdhani tracking-widest uppercase">
            SpotlightPOS · Εκπαίδευση Συστήματος
          </div>

          {/* Logo + Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border border-purple-400/40 bg-white/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="20" x2="18" y2="8" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="12" y1="20" x2="12" y2="3" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="6" y1="20" x2="6" y2="13" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="font-rajdhani text-xs text-purple-300/60 tracking-widest uppercase mb-0.5">SpotlightPOS</p>
              <h1 className="font-orbitron font-bold text-2xl md:text-3xl text-white tracking-tight">
                Οδηγός <span className="text-[#A78BFA]">Εκπαίδευσης</span>
              </h1>
            </div>
          </div>

          <p className="font-rajdhani text-base text-white/50 max-w-lg mb-6">
            Βήμα-βήμα οδηγοί για χρήστες της εφαρμογής.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { icon: <Smartphone className="w-3 h-3" />, label: 'Μόνο για iOS' },
              { icon: <BookOpen className="w-3 h-3" />, label: '12 Ενότητες' },
              { icon: <Users className="w-3 h-3" />, label: 'Σερβιτόροι & Ιδιοκτήτες' },
            ].map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 font-rajdhani text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/70">
                {b.icon} {b.label}
              </span>
            ))}
          </div>

          {/* Progress */}
          {completedCount > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-rajdhani text-xs text-white/50 tracking-widest uppercase">Πρόοδος Εκπαίδευσης</span>
                <span className="font-rajdhani text-xs text-white/70 font-semibold">{completedCount}/{topics.length} ενότητες</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #A78BFA, #7C3AED)" }}
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
        <h2 className="font-orbitron text-base font-bold text-gray-900 mb-6">Επέλεξε από πού να ξεκινήσεις</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link
                key={topic.id}
                to={topic.href}
                className={`group relative bg-white rounded-2xl border shadow-sm p-5 hover:border-purple-300 hover:shadow-md transition-all duration-200 flex flex-col ${visited[topic.href] ? 'border-green-200' : 'border-gray-100'}`}
              >
                {/* Completed badge */}
                {visited[topic.href] && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                )}

                {/* Number */}
                <div className="font-rajdhani text-[10px] text-gray-400 tracking-widest mb-3">#{String(topic.id).padStart(2, '0')}</div>

                {/* Icon */}
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-colors mb-4 ${visited[topic.href] ? 'bg-green-50 border-green-100 group-hover:bg-green-100' : 'bg-purple-50 border-purple-100 group-hover:bg-purple-100'}`}>
                  <Icon className={`w-5 h-5 ${visited[topic.href] ? 'text-green-600' : 'text-purple-600'}`} strokeWidth={1.5} />
                </div>

                {/* Text */}
                <h3 className="font-orbitron text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-colors leading-snug mb-1">
                  {topic.title}
                </h3>
                <p className="font-rajdhani text-sm text-gray-400 flex-1">{topic.desc}</p>

                {/* Arrow */}
                <div className="flex items-center gap-1 mt-4 font-rajdhani text-xs text-purple-400 group-hover:text-purple-600 transition-colors font-semibold">
                  {visited[topic.href] ? 'Επανάληψη' : 'Δες οδηγό'} <ChevronRight className="w-3 h-3" />
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
          <p className="font-rajdhani text-base text-gray-600">
            <span className="text-purple-700 font-semibold">Συμβουλή:</span> Ξεκίνα από την εγκατάσταση αν είναι η πρώτη φορά. Αν είσαι ήδη εξοικειωμένος, πήγαινε κατευθείαν στην ενότητα που χρειάζεσαι.
          </p>
        </div>
      </div>
    </div>
  );
}