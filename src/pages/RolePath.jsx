import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
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
  const [access, setAccess] = useState(null); // null=loading, true=allowed, false=denied

  useEffect(() => {
    const check = async () => {
      if (!role) { setAccess(true); return; }
      const u = await base44.auth.me().catch(() => null);
      if (!u) { setAccess(false); return; }
      if (u.role === 'admin') { setAccess(true); return; }
      const list = await base44.entities.AllowedUserGuide.filter({ email: u.email.toLowerCase() });
      if (list.length === 0) { setAccess(false); return; }
      const modes = list[0].modes || '';
      if (!modes.trim()) { setAccess(true); return; }
      setAccess(modes.split(',').map(m => m.trim()).includes(roleId));
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

          {/* Progress */}
          <div className="max-w-xs">
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
                className={`group bg-white rounded-xl border px-5 py-4 flex items-center gap-4 hover:shadow-md transition-all duration-200 ${done ? 'border-green-200' : 'border-gray-100 hover:border-purple-200'}`}>
                
                {/* Step number / check */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-600'} transition-colors`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  {done ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : i + 1}
                </div>
                <span className={`flex-1 font-medium text-sm ${done ? 'text-gray-500' : 'text-gray-800 group-hover:text-purple-700'} transition-colors`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  {lesson.title}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors" />
              </Link>);

          })}
        </div>
      </div>
      <AssistantFloatingButton />
    </div>);

}