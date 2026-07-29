import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Construction } from 'lucide-react';
import { getRoleByPath } from '@/lib/roles';
import SyncStatusInfo from '@/components/tutorial/SyncStatusInfo';

export default function PlaceholderLesson() {
  const location = useLocation();
  const role = getRoleByPath(location.pathname);
  const lesson = role?.lessons.find(l => l.href === location.pathname);
  const isFirstLesson = role?.lessons[0]?.href === location.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-white/10" style={{ background: "#1E1B3A" }}>
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/69f588f4590b173a2970ddb4/c5b6c58e9_SpotlightPos_icon.png"
            alt="SpotlightPOS"
            className="w-7 h-7 rounded-lg flex-shrink-0"
          />
          <Link to="/spotlight-pos-guide" className="text-white/50 hover:text-white text-xs transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            Εκπαίδευση
          </Link>
          <span className="text-white/25 text-xs">/</span>
          {role && (
            <>
              <Link to={`/academy/${role.id}`} className="text-white/50 hover:text-white text-xs transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {role.title}
              </Link>
              <span className="text-white/25 text-xs">/</span>
            </>
          )}
          <span className="text-white/80 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
            {lesson?.title || 'Μάθημα'}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="text-white" style={{ background: "linear-gradient(135deg, #2D2B55 0%, #1E1B3A 50%, #3B1E6E 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 py-9">
          <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <Construction size={24} className="text-white" />
          </div>
          <h1 className="font-bold text-2xl md:text-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
            {lesson?.title || 'Μάθημα'}
          </h1>
          {role && (
            <p className="text-white/60 mt-1.5 text-base" style={{ fontFamily: 'Inter, sans-serif' }}>{role.title}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-amber-200 p-8 text-center shadow-sm">
          <div className="text-4xl mb-4">🚧</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Υπό Ανάπτυξη
          </h2>
          <p className="text-gray-500 text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
            Το εκπαιδευτικό υλικό βρίσκεται υπό ανάπτυξη.
          </p>
          <p className="text-gray-400 text-sm mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Θα είναι σύντομα διαθέσιμο.
          </p>
        </div>

        {isFirstLesson && (
          <div className="mt-6">
            <SyncStatusInfo />
          </div>
        )}

        {role && (
          <Link
            to={`/academy/${role.id}`}
            className="inline-flex items-center gap-2 mt-6 text-sm text-gray-500 hover:text-purple-600 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" /> Επιστροφή στους Ρόλους
          </Link>
        )}
      </div>
    </div>
  );
}