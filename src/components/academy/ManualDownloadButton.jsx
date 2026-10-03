import React, { useState } from 'react';
import { Download, Loader2, Smartphone } from 'lucide-react';
import { generateServiceManualPdf } from '@/lib/manual/generateServiceManual';

const OPTIONS = [
  { profile: 'print', label: 'Για εκτύπωση (A4)', icon: Download },
  { profile: 'phone', label: 'Για κινητό', icon: Smartphone },
];

export default function ManualDownloadButton() {
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState('');

  const handleClick = async (profile) => {
    if (active) return;
    setActive(profile);
    setError('');
    setProgress({ done: 0, total: 0 });
    try {
      await generateServiceManualPdf({
        profile,
        onProgress: (done, total) => setProgress({ done, total }),
      });
    } catch (e) {
      setError('Η δημιουργία του PDF απέτυχε. Ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.');
    } finally {
      setActive(null);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-[10px] tracking-widest text-white/50 uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
        Λήψη Manual (PDF)
      </span>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map(({ profile, label, icon: Icon }) => {
          const busy = active === profile;
          const text = busy
            ? (progress.total ? `Δημιουργία... ${progress.done}/${progress.total}` : 'Προετοιμασία...')
            : label;
          return (
            <button
              key={profile}
              type="button"
              onClick={() => handleClick(profile)}
              disabled={!!active}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white border border-white/25 bg-white/10 hover:bg-white/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
              <span>{text}</span>
            </button>
          );
        })}
      </div>
      {error && (
        <p
          className="max-w-xs text-xs text-white bg-red-500/25 border border-red-200/40 rounded-lg px-3 py-1.5"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {error}
        </p>
      )}
    </div>
  );
}