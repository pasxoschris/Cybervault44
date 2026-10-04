import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { SHIFT_JOURNEY, journeyChapterRef } from '@/lib/shiftJourney';
import { STEP_ICONS } from '@/lib/shiftJourneyIcons';

export default function ShiftJourneyMap({ visited = {} }) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 rounded-full" style={{ background: 'linear-gradient(135deg, #5B21B6, #b32483)' }} />
        <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
          {SHIFT_JOURNEY.title}
        </h2>
      </div>
      <p className="mt-1.5 text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
        {SHIFT_JOURNEY.subtitle}
      </p>

      {/* Κάθετη χρονογραμμή με εικονίδια */}
      <ol className="mt-5">
        {SHIFT_JOURNEY.steps.map((step, i) => {
          const Icon = STEP_ICONS[step.icon];
          const done = visited[step.lesson];
          const isLast = i === SHIFT_JOURNEY.steps.length - 1;
          return (
            <li key={step.n} className="flex gap-3">
              <div className="flex flex-col items-center flex-shrink-0">
                <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-sm ${done ? 'bg-green-500' : ''}`}
                  style={done ? undefined : { background: 'linear-gradient(135deg, #5B21B6, #b32483)' }}
                >
                  {Icon
                    ? <Icon size={20} strokeWidth={2} />
                    : <span className="text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{step.n}</span>}
                </span>
                {!isLast && <span className="w-px flex-1 my-1 bg-purple-200" />}
              </div>

              <Link
                to={step.lesson}
                className={`group flex-1 min-w-0 flex items-start gap-3 rounded-xl border px-3.5 py-3 mb-3 transition-all ${done ? 'border-green-200 bg-green-50/40' : 'border-gray-100 bg-white hover:border-purple-200 hover:bg-purple-50/40'}`}
              >
                <span className="flex-1 min-w-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="block text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                    <span className="text-purple-500">{step.n}.</span> {step.title}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">{step.hint}</span>
                  <span className="block text-[11px] font-semibold text-purple-600 mt-1">{journeyChapterRef(step)}</span>
                  {step.extraRefs?.length ? (
                    <span className="block text-[11px] text-gray-400 mt-0.5">Επίσης: {step.extraRefs.join(' · ')}</span>
                  ) : null}
                </span>
                {done
                  ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                  : <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-400 flex-shrink-0 mt-1 transition-colors" />}
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}