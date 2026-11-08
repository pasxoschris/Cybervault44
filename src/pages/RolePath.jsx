import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/layout/Navbar';
import { getRoleById, canAccessRole } from '@/lib/roles';
import { getCompletedCount, isVisited } from '@/lib/tutorialProgress';
import { ChevronRight, ChevronDown, ArrowLeft } from 'lucide-react';
import AssistantFloatingButton from '@/components/academy/AssistantFloatingButton';
import ManualDownloadButton from '@/components/academy/ManualDownloadButton';
import SpotlightBrand from '@/components/SpotlightBrand';
import { sections as serviceSections } from '@/components/tutorial/TutorialLayout';
import { cashierSections } from '@/components/tutorial/CashierTutorialLayout';

// Εικονίδιο κάθε μαθήματος (ίδιο με την κεφαλίδα του μαθήματος)
const lessonIcons = Object.fromEntries([...serviceSections, ...cashierSections].map((s) => [s.path, s.icon]));

export default function RolePath() {
  const { roleId } = useParams();
  const role = getRoleById(roleId);
  const [visited, setVisited] = useState({});
  const [access, setAccess] = useState(null); // null=loading, true=allowed, false=denied
  // Ανοιχτά μέρη (μόνο για ρόλους με parts, π.χ. Secure). Αποθηκεύεται ανά ρόλο στον browser.
  const openKey = `rolepath-open-${roleId}`;
  const [openParts, setOpenParts] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`rolepath-open-${roleId}`) || '[]'); } catch { return []; }
  });
  const togglePart = (id) => {
    setOpenParts((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      try { localStorage.setItem(openKey, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  useEffect(() => {
    const check = async () => {
      if (!role) { setAccess(true); return; }
      const u = await base44.auth.me().catch(() => null);
      if (!u) { setAccess(false); return; }
      if (u.role === 'admin') { setAccess(true); return; }
      const list = await base44.entities.AllowedUserGuide.filter({ email: u.email.toLowerCase() });
      if (list.length === 0) { setAccess(false); return; }
      setAccess(canAccessRole(role, list[0].modes || ''));
    };
    check();
  }, [role, roleId]);

  useEffect(() => {
    if (!role || access !== true) return;
    const obj = {};
    role.lessons.forEach((l) => {obj[l.href] = isVisited(l.href);});
    setVisited(obj);
  }, [role, access]);

  if (access === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0E1235]">
        <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
      </div>
    );
  }

  if (access === false) {
    return (
      <div className="min-h-screen bg-[#0E1235] cyber-grid flex items-center justify-center">
        <div className="text-center p-10 border border-red-500/30 bg-[#131840]/80 max-w-md">
          <div className="font-mono-cyber text-red-400 text-xs tracking-widest mb-3">ACCESS DENIED</div>
          <h2 className="font-orbitron text-white text-xl mb-2">Δεν έχεις πρόσβαση σε αυτό το mode</h2>
          <p className="font-rajdhani text-white/40 text-sm">Δεν έχεις εξουσιοδοτηθεί για αυτό το εκπαιδευτικό mode.</p>
          <Link to="/spotlight-pos-guide/roles" className="inline-block mt-5 text-[#00CFFF] hover:underline font-mono-cyber text-sm">← Επιστροφή στους Ρόλους</Link>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-[#0E1235] cyber-grid flex items-center justify-center">
        <div className="text-center">
          <p className="font-orbitron text-white mb-4">Ο ρόλος δεν βρέθηκε.</p>
          <Link to="/spotlight-pos-guide" className="text-[#00CFFF] hover:underline font-rajdhani">← Πίσω</Link>
        </div>
      </div>);

  }

  const paths = role.lessons.map((l) => l.href);
  const completed = getCompletedCount(paths);
  const total = paths.length;
  const pct = Math.round(completed / total * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="pt-24 pb-12" style={{ background: "linear-gradient(135deg, #6a2b9e 0%, #b32483 100%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-5">
            <SpotlightBrand size={24} />
          </div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5 text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Link to="/spotlight-pos-guide" className="hover:text-white transition-colors">Εκπαίδευση</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">{role.title}</span>
          </div>

          




          
          <h1 className="font-bold text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{role.title}</h1>
          <p className="text-white/70 text-base mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>{role.subtitle}</p>

          {/* Progress + Λήψη Manual */}
          <div className="flex flex-wrap items-end gap-4">
          <div className="max-w-xs flex-1 min-w-[180px]">
            <div className="flex justify-between mb-1.5">
              <span className="text-[10px] tracking-widest text-white/50 uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Πρόοδος</span>
              <span className="text-[10px] text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>{completed}/{total}</span>
            </div>
            <div className="w-full h-1 rounded-full bg-white/15">
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: "rgba(255,255,255,0.9)" }} />
              
            </div>
          </div>
          {role.id === 'service' && <ManualDownloadButton />}
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/spotlight-pos-guide" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 mb-6 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
          <ArrowLeft className="w-4 h-4" /> Επιστροφή στους Ρόλους
        </Link>

        {role.parts ? (
          <div className="flex flex-col gap-3">
            {role.parts.map((part) => {
              const partLessons = role.lessons.filter((l) => l.part === part.id);
              if (partLessons.length === 0) return null;
              const isOpen = openParts.includes(part.id);
              const partDone = partLessons.filter((l) => visited[l.href]).length;
              return (
                <section key={part.id}>
                  <button
                    type="button"
                    onClick={() => togglePart(part.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all text-left text-gray-900 font-bold text-base"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <span className="text-purple-600 min-w-[1.75rem]">{part.id}</span>
                    <span className="flex-1">{part.title}</span>
                    <span className="text-xs font-normal text-gray-400 whitespace-nowrap">
                      {partDone > 0 ? `${partDone}/${partLessons.length}` : `${partLessons.length} μαθήματα`}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                  <div className="flex flex-col gap-2 mt-2 pl-2">
                    {partLessons.map((lesson) => {
                      const done = visited[lesson.href];
                      return (
                        <Link
                          key={lesson.href}
                          to={lesson.href}
                          className={`group bg-white rounded-xl border px-4 py-3 flex items-center gap-3 hover:shadow-md transition-all duration-200 ${done ? 'border-green-200' : 'border-gray-100 hover:border-purple-200'}`}>
                          <span className={`min-w-[3rem] h-7 px-2 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'} transition-colors`} style={{ fontFamily: 'Inter, sans-serif' }}>
                            {lesson.num}
                          </span>
                          <span className={`flex-1 font-medium text-sm ${done ? 'text-gray-500' : 'text-gray-800 group-hover:text-purple-700'} transition-colors`} style={{ fontFamily: 'Inter, sans-serif' }}>
                            {lesson.title}
                          </span>
                          {lesson.mark && <span className="text-sm flex-shrink-0">{lesson.mark}</span>}
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors" />
                        </Link>);
                    })}
                  </div>
                  )}
                </section>);
            })}
            <p className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
              🔓 την ενεργοποιεί η Spotlight, τη ρυθμίζει ο Διαχειριστής · 🔒 τη ρυθμίζει μόνο η Spotlight · 🔄 θέλει Συγχρονισμό · ⚠️ προσοχή
            </p>
          </div>
        ) : (
        <div className="flex flex-col gap-3">
          {role.lessons.map((lesson, i) => {
            const done = visited[lesson.href];
            const LessonIcon = lessonIcons[lesson.href];
            return (
              <Link
                key={lesson.href}
                to={lesson.href}
                className={`group bg-white rounded-xl border px-5 py-4 flex items-center gap-4 hover:shadow-md transition-all duration-200 ${done ? 'border-green-200' : 'border-gray-100 hover:border-purple-200'}`}>
                
                {/* Αρίθμηση μαθήματος — πράσινος αριθμός όταν ολοκληρωθεί */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-600'} transition-colors`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  {i + 1}
                </div>
                {/* Εικονίδιο μαθήματος */}
                {LessonIcon && (
                  <LessonIcon className={`w-5 h-5 flex-shrink-0 ${done ? 'text-green-500' : 'text-purple-500'} transition-colors`} />
                )}
                <span className={`flex-1 font-medium text-sm ${done ? 'text-gray-500' : 'text-gray-800 group-hover:text-purple-700'} transition-colors`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  {lesson.title}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors" />
              </Link>);

          })}
        </div>
        )}
      </div>
      <AssistantFloatingButton />
    </div>);

}