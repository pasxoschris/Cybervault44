import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Download, LogIn, Clock, Settings, Package, FileText, Tag, CreditCard, Edit3, Receipt, Layers, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { markVisited } from "@/lib/tutorialProgress";

const sections = [
  { title: "Εγκατάσταση", path: "/tutorial/installation", icon: Download },
  { title: "Σύνδεση", path: "/tutorial/login", icon: LogIn },
  { title: "Έναρξη Βάρδιας", path: "/tutorial/start-shift", icon: Clock },
  { title: "Ρυθμίσεις", path: "/tutorial/settings", icon: Settings },
  { title: "Νέα Παραγγελία", path: "/tutorial/create-order", icon: Package },
  { title: "Στοιχεία Παραγγελίας", path: "/tutorial/order-details", icon: FileText },
  { title: "Έκπτωση", path: "/tutorial/discount", icon: Tag },
  { title: "Πληρωμή", path: "/tutorial/payment", icon: CreditCard },
  { title: "Επεξεργασία", path: "/tutorial/edit-order", icon: Edit3 },
  { title: "Τιμολόγιο", path: "/tutorial/invoice", icon: Receipt },
  { title: "Βάρδια", path: "/tutorial/shift", icon: Layers },
  { title: "Σενάρια", path: "/tutorial/scenarios", icon: Monitor },
];

export default function TutorialLayout({ children, title, subtitle }) {
  const location = useLocation();
  const currentIndex = sections.findIndex(s => s.path === location.pathname);
  const prev = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const next = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  const SectionIcon = sections[currentIndex]?.icon;

  useEffect(() => {
    if (location.pathname) markVisited(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <div className="sticky top-0 z-10 border-b border-white/10" style={{ background: "#1E1B3A" }}>
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/69f588f4590b173a2970ddb4/c5b6c58e9_SpotlightPos_icon.png"
            alt="SpotlightPOS"
            className="w-7 h-7 rounded-lg flex-shrink-0"
          />
          <Link to="/spotlight-pos-guide" className="flex items-center gap-1 text-white/50 hover:text-white transition-colors text-xs font-rajdhani">
            <Home size={12} />
            <span className="hidden sm:inline">Αρχική</span>
          </Link>
          <span className="text-white/25 text-xs">/</span>
          <span className="text-white/80 text-xs font-rajdhani truncate">{title}</span>
        </div>
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 pb-2.5">
          {sections.map((s, i) => (
            <Link key={s.path} to={s.path} title={s.title}>
              <div className={`h-1 rounded-full transition-all duration-200 ${
                i === currentIndex ? 'w-6 bg-[#8B5CF6]' :
                i < currentIndex ? 'w-1.5 bg-white/40' :
                'w-1.5 bg-white/15 hover:bg-white/30'
              }`} />
            </Link>
          ))}
        </div>
      </div>

      {/* Page Header */}
      <div className="text-white" style={{ background: "linear-gradient(135deg, #2D2B55 0%, #1E1B3A 50%, #3B1E6E 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 py-9">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {SectionIcon && (
              <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <SectionIcon size={24} className="text-white" />
              </div>
            )}
            <h1 className="font-orbitron font-bold text-2xl md:text-3xl">{title}</h1>
            {subtitle && <p className="text-white/60 mt-1.5 font-rajdhani text-sm">{subtitle}</p>}
            <div className="mt-3 text-white/35 font-rajdhani text-xs">
              {currentIndex + 1} / {sections.length}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-4"
      >
        {children}
      </motion.div>

      {/* Prev / Next Navigation */}
      <div className="max-w-3xl mx-auto px-6 pb-12">
        <div className="flex justify-between gap-4">
          {prev ? (
            <Link to={prev.path} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-purple-300 hover:shadow-sm transition-all text-sm group font-rajdhani">
              <ChevronLeft size={15} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
              <span className="text-gray-500 group-hover:text-gray-800 transition-colors">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              to={next.path}
              className="flex items-center gap-2 rounded-xl px-5 py-3 hover:opacity-90 hover:shadow-md transition-all text-sm ml-auto text-white font-rajdhani font-semibold"
              style={{ background: "linear-gradient(135deg, #5B21B6, #2D2B55)" }}
            >
              <span>{next.title}</span>
              <ChevronRight size={15} />
            </Link>
          ) : (
            <Link
              to="/spotlight-pos-guide"
              className="flex items-center gap-2 rounded-xl px-5 py-3 hover:opacity-90 transition-all text-sm ml-auto text-white font-rajdhani font-semibold"
              style={{ background: "linear-gradient(135deg, #5B21B6, #2D2B55)" }}
            >
              <Home size={15} /> Αρχική
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}