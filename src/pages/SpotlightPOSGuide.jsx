import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SeoHead from '@/components/SeoHead';
import SpotlightBrand from '@/components/SpotlightBrand';
import { Utensils, Calculator, MonitorCog, ShieldCheck, Smartphone, GraduationCap, LogIn, ArrowRight, CheckCircle2, ConciergeBell, Users } from 'lucide-react';

const MODULES = [
  {
    icon: Utensils,
    title: 'Service Mode',
    desc: 'Εκπαίδευση σερβιτόρων: δημιουργία παραγγελιών, στοιχεία παραγγελίας, ακυρώσεις, εκπτώσεις, πληρωμές, έκδοση τιμολογίου, μεταφορά & συγχώνευση παραγγελιών, διαχείριση βάρδιας.',
    points: ['Νέα & επεξεργασία παραγγελίας', 'Ακύρωση προϊόντος / παραγγελίας / απόδειξης', 'Έκδοση τιμολογίου (ΑΑΔΕ)', 'Παραγγελίες & ανάλυση βάρδιας'],
  },
  {
    icon: Calculator,
    title: 'Cashier Mode',
    desc: 'Εκπαίδευση ταμιά: αρχική οθόνη ταμείου, συνοδευτικά προϊόντα, swipe actions, πληρωμές & split payments, έκδοση τιμολογίου, παραγγελία delivery, κλείσιμο βάρδιας.',
    points: ['Πληρωμές & split payments', 'Παραγγελία delivery', 'Δείκτης σύνδεσης & συγχρονισμού', 'Κλείσιμο βάρδιας'],
  },
  {
    icon: ConciergeBell,
    title: 'Maitre Service',
    desc: 'Εκπαίδευση maitre service: διαχείριση τραπεζιών, κατανομή σερβιτόρων, οργάνωση αίθουσας, υποδοχή πελατών, ροή παραγγελιών ανά σερβιτόρο.',
    points: ['Διαχείριση τραπεζιών', 'Κατανομή σερβιτόρων', 'Υποδοχή & οργάνωση αίθουσας'],
  },
  {
    icon: Users,
    title: 'Maitre Mode',
    desc: 'Εκπαίδευση maitre mode: εποπτεία λειτουργίας, μετακίνηση/συγχώνευση τραπεζιών, ελέγχος ροής, συνολική εικόνα παραγγελιών & βάρδιας.',
    points: ['Εποπτεία παραγγελιών', 'Μετακίνηση & συγχώνευση τραπεζιών', 'Έλεγχος ροής αίθουσας'],
  },
  {
    icon: MonitorCog,
    title: 'Διαχειριστικό / Secure',
    desc: 'Διαχειριστικό υλικό: ρυθμίσεις καταστήματος, δημιουργία χρηστών, σημεία πώλησης (POS), δικαιώματα διαχειριστικού κωδικού, ενεργοποίηση λειτουργιών ανά συσκευή.',
    points: ['Δημιουργία χρηστών & POS', 'Δικαιώματα & ενεργοποίηση λειτουργιών', 'Ρυθμίσεις καταστήματος'],
  },
];

export default function SpotlightPOSGuide() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('checking'); // checking | guest | allowed | denied

  useEffect(() => {
    const init = async () => {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) { setStatus('guest'); return; }
      const u = await base44.auth.me();
      if (u.role === 'admin') { setStatus('allowed'); return; }
      const list = await base44.entities.AllowedUserGuide.filter({ email: u.email.toLowerCase() });
      setStatus(list.length > 0 ? 'allowed' : 'denied');
    };
    init();
  }, []);

  const handleStart = () => {
    if (status === 'guest') {
      base44.auth.redirectToLogin(window.location.href);
    } else if (status === 'allowed') {
      navigate('/spotlight-pos-guide/roles');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoHead
        title="SpotlightPOS Εκπαίδευση & Οδηγός Χρήσης | CyberVault Academy"
        description="Ολοκληρωμένη εκπαίδευση στο SpotlightPOS: Service Mode (σερβιτόρος), Cashier Mode (ταμίας) και Back Office. Οδηγός χρήσης POS εστιατορίου με βήματα, σενάρια και AI assistant. Αίτημα πρόσβασης από την CyberVault."
        path="/spotlight-pos-guide"
      />
      <Navbar />

      {/* Hero */}
      <div className="pt-24 pb-14 text-white" style={{ background: "linear-gradient(135deg, #6a2b9e 0%, #b32483 100%)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-5">
            <SpotlightBrand size={28} />
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/15 rounded-full px-3 py-1 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            <GraduationCap size={13} /> CyberVault Academy
          </span>
          <h1 className="font-bold text-3xl md:text-5xl mb-4 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            SpotlightPOS Εκπαίδευση & Οδηγός Χρήσης
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Ολοκληρωμένο εκπαιδευτικό υλικό για το SpotlightPOS — για iPhone &amp; iPad. Μαθήματα ανά ρόλο, βήματα, σενάρια και AI assistant.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {status === 'allowed' ? (
              <button onClick={handleStart} className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold rounded-xl px-6 py-3 hover:shadow-lg transition-all text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Έναρξη Εκπαίδευσης <ArrowRight size={16} />
              </button>
            ) : status === 'denied' ? (
              <a href="mailto:support@cyber-vault.gr" className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold rounded-xl px-6 py-3 hover:shadow-lg transition-all text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Αίτημα πρόσβασης <ArrowRight size={16} />
              </a>
            ) : (
              <button onClick={handleStart} className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold rounded-xl px-6 py-3 hover:shadow-lg transition-all text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                <LogIn size={16} /> Σύνδεση &amp; Έναρξη
              </button>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
              <Smartphone size={13} /> Διαθέσιμο για iOS (iPhone / iPad)
            </span>
          </div>
        </div>
      </div>

      {/* Access notice for denied users */}
      {status === 'denied' && (
        <div className="max-w-4xl mx-auto px-6 -mt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800" style={{ fontFamily: 'Inter, sans-serif' }}>
            Είστε συνδεδεμένος αλλά το email σας δεν βρίσκεται στη λίστα εξουσιοδοτημένων χρηστών. Για αίτημα πρόσβασης στείλτε email στο <a href="mailto:support@cyber-vault.gr" className="font-semibold underline">support@cyber-vault.gr</a>.
          </div>
        </div>
      )}

      {/* What is it */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Τι είναι το SpotlightPOS</h2>
        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          Το <strong>SpotlightPOS</strong> είναι σύστημα Point of Sale (POS) σχεδιασμένο για εστιατόρια, καφέ, μπαρ και ξενοδοχεία. Τρέχει αποκλειστικά σε iOS (iPhone &amp; iPad) και καλύπτει παραγγελιοληψία, ταμείο, έκδοση αποδείξεων &amp; τιμολογίων, διαχείριση βάρδιας και συγχρονισμό στο cloud. Η CyberVault, ως επίσημος συνεργάτης υποστήριξης, παρέχει οργανωμένο εκπαιδευτικό υλικό για κάθε ρόλο.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {[
            { icon: Smartphone, t: 'iOS App', d: 'iPhone & iPad' },
            { icon: ShieldCheck, t: 'Official Support', d: 'CyberVault συνεργάτης' },
            { icon: GraduationCap, t: 'Ανά ρόλο', d: 'Service · Cashier · Διαχειριστικό' },
          ].map(f => (
            <div key={f.t} className="bg-white border border-gray-100 rounded-2xl p-5">
              <f.icon size={20} className="text-purple-600 mb-2" />
              <p className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{f.t}</p>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>Εκπαιδευτικά Modules ανά Ρόλο</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
          {MODULES.map(m => (
            <div key={m.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(139,92,246,0.1)' }}>
                <m.icon size={20} className="text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{m.title}</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{m.desc}</p>
              <ul className="space-y-1.5">
                {m.points.map(p => (
                  <li key={p} className="flex items-start gap-2 text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <CheckCircle2 size={14} className="text-purple-500 flex-shrink-0 mt-0.5" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Σε ποιον απευθύνεται</h2>
          <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Η εκπαίδευση αφορά προσωπικό καταστημάτων που χρησιμοποιούν SpotlightPOS — σερβιτόρους, ταμίες, υπεύθυνους καταστήματος και ιδιοκτήτες (Διαχειριστικό/Secure). Πρόσβαση δίνεται σε εξουσιοδοτημένους χρήστες κατόπιν αιτήματος.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Σερβιτόρος', 'Ταμίας', 'Maitre', 'Διαχειριστής καταστήματος', 'Reseller'].map(t => (
              <span key={t} className="text-xs font-medium text-purple-700 bg-purple-50 border border-purple-100 rounded-full px-3 py-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="rounded-3xl p-8 text-white text-center" style={{ background: "linear-gradient(135deg, #5B21B6, #b32483)" }}>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Έτοιμοι να ξεκινήσετε;</h2>
          <p className="text-white/80 mb-5 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Συνδεθείτε για να αποκτήσετε πρόσβαση στο εκπαιδευτικό υλικό ανά ρόλο.</p>
          {status === 'allowed' ? (
            <button onClick={handleStart} className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold rounded-xl px-6 py-3 hover:shadow-lg transition-all text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Έναρξη Εκπαίδευσης <ArrowRight size={16} />
            </button>
          ) : status === 'denied' ? (
            <a href="mailto:support@cyber-vault.gr" className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold rounded-xl px-6 py-3 hover:shadow-lg transition-all text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Αίτημα πρόσβασης <ArrowRight size={16} />
            </a>
          ) : (
            <button onClick={handleStart} className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold rounded-xl px-6 py-3 hover:shadow-lg transition-all text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              <LogIn size={16} /> Σύνδεση &amp; Έναρξη
            </button>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}