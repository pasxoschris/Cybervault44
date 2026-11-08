import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { markVisited } from "@/lib/tutorialProgress";
import { SECURE_LESSONS, SECURE_PARTS } from "@/lib/secureLessons";
import SpotlightBrand from "@/components/SpotlightBrand";
import AssistantFloatingButton from "@/components/academy/AssistantFloatingButton";

// Layout για τα μαθήματα του Secure (Διαχειριστικό).
// Αρίθμηση και σειρά από το SECURE_LESSONS (π.χ. «8.4»).
export default function SecureTutorialLayout({ children, title, subtitle }) {
  const location = useLocation();
  const index = SECURE_LESSONS.findIndex((l) => l.href === location.pathname);
  const lesson = SECURE_LESSONS[index];
  const part = lesson ? SECURE_PARTS.find((p) => p.id === lesson.part) : null;
  const prev = index > 0 ? SECURE_LESSONS[index - 1] : null;
  const next = index >= 0 && index < SECURE_LESSONS.length - 1 ? SECURE_LESSONS[index + 1] : null;

  useEffect(() => {
    if (location.pathname) markVisited(location.pathname);
    window.scrollTo(0, 0);
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
          <Link to="/spotlight-pos-guide" className="flex items-center gap-1 text-white/50 hover:text-white transition-colors text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Home size={12} />
            <span className="hidden sm:inline">Εκπαίδευση</span>
          </Link>
          <span className="text-white/25 text-xs">/</span>
          <Link to="/academy/secure" className="text-white/50 hover:text-white transition-colors text-xs truncate hidden sm:inline" style={{ fontFamily: 'Inter, sans-serif' }}>Secure (Διαχειριστικό)</Link>
          <span className="text-white/25 text-xs hidden sm:inline">/</span>
          <span className="text-white/80 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{title}</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="text-white" style={{ background: "linear-gradient(135deg, #6a2b9e 0%, #b32483 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 py-9">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-4">
              <SpotlightBrand size={24} />
            </div>
            {lesson && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "rgba(255,255,255,0.14)", fontFamily: 'Inter, sans-serif' }}>
                <span>{lesson.num}</span>
                {part && <span className="text-white/60 font-normal">· {part.title}</span>}
              </div>
            )}
            <h1 className="font-bold text-2xl md:text-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>{title}</h1>
            {subtitle && <p className="text-white/60 mt-1.5 text-base" style={{ fontFamily: 'Inter, sans-serif' }}>{subtitle}</p>}
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

      <div className="max-w-3xl mx-auto px-6 pt-2 pb-0">
        <Link
          to="/academy/secure"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <ArrowLeft size={14} /> Όλα τα μαθήματα του Secure
        </Link>
      </div>

      {/* Prev / Next */}
      <div className="max-w-3xl mx-auto px-6 pt-6 pb-12 relative z-10">
        <div className="flex justify-between gap-4">
          {prev ? (
            <Link to={prev.href} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-purple-300 hover:shadow-sm transition-all text-sm group" style={{ fontFamily: 'Inter, sans-serif' }}>
              <ChevronLeft size={15} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
              <span className="text-gray-500 group-hover:text-gray-800 transition-colors">{prev.num} {prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              to={next.href}
              className="flex items-center gap-2 rounded-xl px-5 py-3 hover:opacity-90 hover:shadow-md transition-all text-sm ml-auto text-white font-semibold"
              style={{ fontFamily: 'Inter, sans-serif', background: "linear-gradient(135deg, #5B21B6, #2D2B55)" }}
            >
              <span>{next.num} {next.title}</span>
              <ChevronRight size={15} />
            </Link>
          ) : (
            <Link
              to="/academy/secure"
              className="flex items-center gap-2 rounded-xl px-5 py-3 hover:opacity-90 transition-all text-sm ml-auto text-white font-semibold"
              style={{ fontFamily: 'Inter, sans-serif', background: "linear-gradient(135deg, #5B21B6, #2D2B55)" }}
            >
              <Home size={15} /> Secure
            </Link>
          )}
        </div>
      </div>

      <AssistantFloatingButton />
    </div>
  );
}
