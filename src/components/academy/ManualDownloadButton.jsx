import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { generateServiceManualPdf } from '@/lib/manual/generateServiceManual';

export default function ManualDownloadButton() {
  const [working, setWorking] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState('');

  const handleClick = async () => {
    if (working) return;
    setWorking(true);
    setError('');
    setProgress({ done: 0, total: 0 });
    try {
      await generateServiceManualPdf({
        onProgress: (done, total) => setProgress({ done, total }),
      });
    } catch (e) {
      setError('Η δημιουργία του PDF απέτυχε. Ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.');
    } finally {
      setWorking(false);
    }
  };

  const label = working
    ? (progress.total ? `Δημιουργία... ${progress.done}/${progress.total}` : 'Προετοιμασία...')
    : 'Λήψη Manual (PDF)';

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={working}
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white border border-white/25 bg-white/10 hover:bg-white/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {working ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        <span>{label}</span>
      </button>
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