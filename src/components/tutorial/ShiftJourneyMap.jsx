import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { SHIFT_JOURNEY, journeyChapterRef } from '@/lib/shiftJourney';

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

      <div className="mt-4 flex flex-col gap-2">
        {SHIFT_JOURNEY.steps.map((step) => {
          const done = visited[step.lesson];
          return (
            <Link
              key={step.n}
              to={step.lesson}
              className={`group flex items-start gap-3 rounded-xl border px-3.5 py-3 transition-all ${done ? 'border-green-200 bg-green-50/40' : 'border-gray-100 bg-white hover:border-purple-200 hover:bg-purple-50/40'}`}
            >
              <span
                className="w-7 h-7 flex-shrink-0 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5"
                style={{ background: 'linear-gradient(135deg, #5B21B6, #2D2B55)', fontFamily: 'Inter, sans-serif' }}
              >
                {step.n}
              </span>
              <span className="flex-1 min-w-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="block text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  {step.title}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">{step.hint}</span>
                <span className="block text-[11px] font-semibold text-purple-600 mt-1">{journeyChapterRef(step)}</span>
                {step.extraRefs?.length ? (
                  <span className="block text-[11px] text-gray-400 mt-0.5">Επίσης: {step.extraRefs.join(' · ')}</span>
                ) : null}
              </span>
              {done
                ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-1.5" />
                : <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-400 flex-shrink-0 mt-1.5 transition-colors" />}
            </Link>
          );
        })}
      </div>
    </section>
  );
}