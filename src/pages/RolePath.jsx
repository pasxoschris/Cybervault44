import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { getRoleById } from '@/lib/roles';
import { getCompletedCount, isVisited } from '@/lib/tutorialProgress';
import { ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import AssistantFloatingButton from '@/components/academy/AssistantFloatingButton';
import SpotlightBrand from '@/components/SpotlightBrand';

export default function RolePath() {
  const { roleId } = useParams();
  const role = getRoleById(roleId);
  const [visited, setVisited] = useState({});

  useEffect(() => {
    if (!role) return;
    const obj = {};
    role.lessons.forEach(l => { obj[l.href] = isVisited(l.href); });
    setVisited(obj);
  }, [role]);

  if (!role) {
    return (
      <div className="min-h-screen bg-[#0E1235] cyber-grid flex items-center justify-center">
        <div className="text-center">
          <p className="font-orbitron text-white mb-4">Ο ρόλος δεν βρέθηκε.</p>
          <Link to="/spotlight-pos-guide" className="text-[#00CFFF] hover:underline font-rajdhani">← Πίσω</Link>
        </div>
      </div>
    );
  }

  const paths = role.lessons.map(l => l.href);
  const completed = getCompletedCount(paths);
  const total = paths.length;
  const pct = Math.round((completed / total) * 100);

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

          <div
            className="w-16 h-16 flex items-center justify-center rounded-2xl text-3xl mb-5"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            {role.emoji}
          </div>
          <h1 className="font-bold text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{role.title}</h1>
          <p className="text-white/70 text-base mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>{role.subtitle}</p>

          {/* Progress */}
          <div className="max-w-xs">
            <div className="flex justify-between mb-1.5">
              <span className="text-[10px] tracking-widest text-white/50 uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Πρόοδος</span>
              <span className="text-[10px] text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>{completed}/{total}</span>
            </div>
            <div className="w-full h-1 rounded-full bg-white/15">
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: "rgba(255,255,255,0.9)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/spotlight-pos-guide" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 mb-6 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
          <ArrowLeft className="w-4 h-4" /> Επιστροφή στους Ρόλους
        </Link>

        <div className="flex flex-col gap-3">
          {role.lessons.map((lesson, i) => {
            const done = visited[lesson.href];
            return (
              <Link
                key={lesson.href}
                to={lesson.href}
                className={`group bg-white rounded-xl border px-5 py-4 flex items-center gap-4 hover:shadow-md transition-all duration-200 ${done ? 'border-green-200' : 'border-gray-100 hover:border-purple-200'}`}
              >
                {/* Step number / check */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-600'} transition-colors`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  {done ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : i + 1}
                </div>
                <span className={`flex-1 font-medium text-sm ${done ? 'text-gray-500' : 'text-gray-800 group-hover:text-purple-700'} transition-colors`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  {lesson.title}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
      <AssistantFloatingButton />
    </div>
  );
}