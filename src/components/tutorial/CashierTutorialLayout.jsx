import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, ArrowLeft, Tablet, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import { markVisited } from "@/lib/tutorialProgress";
import { getRoleByPath } from "@/lib/roles";
import SpotlightBrand from "@/components/SpotlightBrand";
import Navbar from "@/components/layout/Navbar";

// Cashier-mode lessons (extended as new pages are added)
export const cashierSections = [
  { title: "Αρχική Οθόνη", path: "/tutorial/cashier/initial-screen", icon: Home },
  { title: "Συνοδευτικά Προϊόντος", path: "/tutorial/cashier/accompaniments", icon: Home },
  { title: "Προϊόντα Παραγγελίας", path: "/tutorial/cashier/order-items", icon: Home },
  { title: "Διαγραφή & Έκπτωση", path: "/tutorial/cashier/swipe-actions", icon: Home },
  { title: "Έναρξη Βάρδιας", path: "/tutorial/cashier/open", icon: Home },
  { title: "Δείκτης Σύνδεσης", path: "/tutorial/cashier/sync-status", icon: Cloud },
  { title: "Πληρωμές", path: "/tutorial/cashier/payments", icon: Home },
  { title: "Split Payments", path: "/tutorial/cashier/split", icon: Home },
  { title: "Έκδοση Τιμολογίου", path: "/tutorial/cashier/invoice", icon: Home },
  { title: "Ρυθμίσεις Χρήστη", path: "/tutorial/cashier/settings", icon: Home },
  { title: "Παραγγελία Delivery", path: "/tutorial/cashier/delivery", icon: Home },
  { title: "Κλείσιμο Βάρδιας", path: "/tutorial/cashier/close", icon: Home },
];

export default function CashierTutorialLayout({ children, title, subtitle }) {
  const location = useLocation();
  const currentIndex = cashierSections.findIndex(s => s.path === location.pathname);
  const prev = currentIndex > 0 ? cashierSections[currentIndex - 1] : null;
  const next = currentIndex < cashierSections.length - 1 ? cashierSections[currentIndex + 1] : null;
  const SectionIcon = cashierSections[currentIndex]?.icon;
  const role = getRoleByPath(location.pathname);

  useEffect(() => {
    if (location.pathname) markVisited(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      {/* Top Nav */}
      <div className="sticky top-16 z-10 border-b border-white/10" style={{ background: "#1E1B3A" }}>
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/69f588f4590b173a2970ddb4/c5b6c58e9_SpotlightPos_icon.png"
            alt="SpotlightPOS"
            className="w-7 h-7 rounded-lg flex-shrink-0"
          />
          <Link to="/academy/cashier" className="flex items-center gap-1 text-white/50 hover:text-white transition-colors text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Home size={12} />
            <span className="hidden sm:inline">Cashier</span>
          </Link>
          {role && (
            <>
              <span className="text-white/25 text-xs">/</span>
              <Link to={`/academy/${role.id}`} className="text-white/50 hover:text-white transition-colors text-xs truncate hidden sm:inline" style={{ fontFamily: 'Inter, sans-serif' }}>{role.title}</Link>
            </>
          )}
          <span className="text-white/25 text-xs">/</span>
          <span className="text-white/80 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{title}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Tablet size={11} /> iPad
          </span>
        </div>
        {/* Progress dots */}
        {cashierSections.length > 1 && (
          <div className="flex justify-center gap-1.5 pb-2.5">
            {cashierSections.map((s, i) => (
              <Link key={s.path} to={s.path} title={s.title}>
                <div className={`h-1 rounded-full transition-all duration-200 ${
                  i === currentIndex ? 'w-6 bg-[#D97706]' :
                  i < currentIndex ? 'w-1.5 bg-white/40' :
                  'w-1.5 bg-white/15 hover:bg-white/30'
                }`} />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Page Header */}
      <div className="text-white" style={{ background: "linear-gradient(135deg, #6a2b9e 0%, #b32483 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 py-9">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-4">
              <SpotlightBrand size={24} />
            </div>
            {SectionIcon && (
              <Link to="/academy/cashier" className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }} title="Cashier">
                <SectionIcon size={24} className="text-white" />
              </Link>
            )}
            <h1 className="font-bold text-2xl md:text-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>{title}</h1>
            {subtitle && <p className="text-white/60 mt-1.5 text-base" style={{ fontFamily: 'Inter, sans-serif' }}>{subtitle}</p>}
            {cashierSections.length > 1 && (
              <div className="mt-3 text-white/35 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                {currentIndex + 1} / {cashierSections.length}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-5"
      >
        {children}
      </motion.div>

      {/* Back to Roles */}
      {role && (
        <div className="max-w-3xl mx-auto px-6 pt-2 pb-0">
          <Link
            to={`/academy/${role.id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft size={14} /> Επιστροφή στους Ρόλους
          </Link>
        </div>
      )}

      {/* Prev / Next Navigation */}
      <div className="max-w-3xl mx-auto px-6 pb-12">
        <div className="flex justify-between gap-4">
          {prev ? (
            <Link to={prev.path} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-amber-300 hover:shadow-sm transition-all text-sm group" style={{ fontFamily: 'Inter, sans-serif' }}>
              <ChevronLeft size={15} className="text-gray-400 group-hover:text-amber-600 transition-colors" />
              <span className="text-gray-500 group-hover:text-gray-800 transition-colors">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              to={next.path}
              className="flex items-center gap-2 rounded-xl px-5 py-3 hover:opacity-90 hover:shadow-md transition-all text-sm ml-auto text-white font-semibold"
              style={{ fontFamily: 'Inter, sans-serif', background: "linear-gradient(135deg, #00CFFF, #0E1235)" }}
            >
              <span>{next.title}</span>
              <ChevronRight size={15} />
            </Link>
          ) : (
            <Link
              to="/academy/cashier"
              className="flex items-center gap-2 rounded-xl px-5 py-3 hover:opacity-90 transition-all text-sm ml-auto text-white font-semibold"
              style={{ fontFamily: 'Inter, sans-serif', background: "linear-gradient(135deg, #00CFFF, #0E1235)" }}
            >
              <Home size={15} /> Αρχική
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}