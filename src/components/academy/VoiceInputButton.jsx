import { useEffect, useRef, useState } from 'react';
import { Mic, Square, X, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const MAX_SECONDS = 120;

const GLOSSARY = 'SpotlightPOS, Service Mode, Cashier Mode, Maitre Mode, τιμολόγιο, απόδειξη, παραγγελία, βάρδια, ανάλυση βάρδιας, κλείσιμο βάρδιας, έναρξη βάρδιας, έκπτωση, ιδιοκατανάλωση, κεραστικό, συνοδευτικά, ακυρωτικό δελτίο, επαναφορά παραγγελίας, μεταφορά παραγγελίας, συγχώνευση παραγγελιών, προϊόν, τραπέζι, σερβιτόρος, ταμείο, πληρωμή, μετρητά, κάρτα, split payment, IRIS, delivery, διανομέας, πλατφόρμα, ΑΦΜ, ΑΑΔΕ, εκτυπωτής, συγχρονισμός, ρυθμίσεις, χρήστης, κωδικός διαχειριστή';

// Διορθώνει φωνητικά λάθη της μεταγραφής με βάση τους όρους του SpotlightPOS
const correctTranscript = async (raw) => {
  try {
    const fixed = await base44.integrations.Core.InvokeLLM({
      prompt: `Το παρακάτω κείμενο προέκυψε από αυτόματη φωνητική μεταγραφή στα ελληνικά και μπορεί να περιέχει φωνητικά λάθη.

Διόρθωσε τα φωνητικά/ορθογραφικά λάθη, ειδικά σε όρους του λογισμικού Spotlight POS (π.χ. «μολόγιο» → «τιμολόγιο», «προεπιλογμένο» → «προεπιλεγμένο»).
Λεξιλόγιο: ${GLOSSARY}.

ΚΑΝΟΝΕΣ:
- Μην αλλάξεις το νόημα της ερώτησης.
- Μην προσθέσεις και μην αφαιρέσεις τίποτα.
- ΜΗΝ απαντήσεις στην ερώτηση — διόρθωσε μόνο το κείμενο.
- Επέστρεψε ΜΟΝΟ το διορθωμένο κείμενο, χωρίς εισαγωγικά.

Κείμενο: ${raw}`,
    });
    const clean = (typeof fixed === 'string' ? fixed : '').trim().replace(/^["'«]|["'»]$/g, '').trim();
    return clean || raw;
  } catch {
    return raw;
  }
};

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const pickMime = () => {
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
  if (typeof MediaRecorder?.isTypeSupported !== 'function') return '';
  return candidates.find((m) => MediaRecorder.isTypeSupported(m)) || '';
};

const extensionFor = (type) => {
  if (type.includes('mp4')) return 'm4a';
  if (type.includes('ogg')) return 'ogg';
  return 'webm';
};

export default function VoiceInputButton({ onTranscript, disabled }) {
  const [status, setStatus] = useState('idle'); // idle | recording | transcribing
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState('');

  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const elapsedRef = useRef(0);
  const cancelledRef = useRef(false);

  const releaseMic = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  // Clear recorder + microphone on unmount
  useEffect(() => () => {
    cancelledRef.current = true;
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') {
      try { rec.stop(); } catch {}
    }
    releaseMic();
  }, []);

  const stopRecording = (cancel = false) => {
    cancelledRef.current = cancel;
    clearInterval(timerRef.current);
    timerRef.current = null;
    const rec = recorderRef.current;
    if (rec && rec.state === 'recording') rec.stop();
  };

  const transcribe = async (blob) => {
    setStatus('transcribing');
    try {
      const file = new File(
        [blob],
        `voice-${Date.now()}.${extensionFor(blob.type || '')}`,
        { type: blob.type || 'audio/webm' }
      );
      const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
      const { signed_url } = await base44.integrations.Core.CreateFileSignedUrl({ file_uri, expires_in: 300 });
      const result = await base44.integrations.Core.TranscribeAudio({ audio_url: signed_url });
      const raw = (typeof result === 'string' ? result : '').trim();
      if (!raw) {
        setError('Δεν ακούστηκε καθαρά. Δοκιμάστε ξανά ή γράψτε την ερώτηση.');
      } else {
        const text = await correctTranscript(raw);
        setError('');
        onTranscript(text);
      }
    } catch (e) {
      setError('Δεν ήταν δυνατή η μεταγραφή. Δοκιμάστε ξανά ή γράψτε την ερώτηση.');
    } finally {
      setStatus('idle');
      setSeconds(0);
      elapsedRef.current = 0;
    }
  };

  const startRecording = async () => {
    if (status !== 'idle' || disabled) return;
    setError('');
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('Η συσκευή δεν υποστηρίζει ηχογράφηση.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = pickMime();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];
      cancelledRef.current = false;

      recorder.ondataavailable = (e) => { if (e.data?.size) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        recorderRef.current = null;
        releaseMic();
        elapsedRef.current = 0;
        setSeconds(0);
        if (cancelledRef.current) { setStatus('idle'); return; }
        if (!blob.size) { setStatus('idle'); setError('Δεν καταγράφηκε ήχος. Δοκιμάστε ξανά.'); return; }
        transcribe(blob);
      };

      recorderRef.current = recorder;
      recorder.start();
      setSeconds(0);
      elapsedRef.current = 0;
      setStatus('recording');

      timerRef.current = setInterval(() => {
        elapsedRef.current += 1;
        setSeconds(elapsedRef.current);
        if (elapsedRef.current >= MAX_SECONDS) stopRecording();
      }, 1000);
    } catch (e) {
      releaseMic();
      recorderRef.current = null;
      setStatus('idle');
      setError('Δεν δόθηκε άδεια μικροφώνου. Επιτρέψτε την πρόσβαση και δοκιμάστε ξανά.');
    }
  };

  const base = 'rounded-lg px-4 py-3 flex items-center gap-2 flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="relative flex-shrink-0">
      {status === 'recording' && (
        <>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); stopRecording(); }}
              className={`${base} text-white bg-red-600 hover:bg-red-700 animate-pulse`}
              title="Διακοπή και μεταγραφή"
            >
              <Square className="w-4 h-4 fill-current" />
              <span className="text-xs font-semibold tabular-nums" style={{ fontFamily: 'Inter, sans-serif' }}>
                {formatTime(seconds)}
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); stopRecording(true); }}
              className="rounded-lg p-3 text-gray-400 hover:text-gray-700 border border-gray-200 bg-white flex-shrink-0 transition-all"
              title="Ακύρωση"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {status === 'transcribing' && (
        <div className={`${base} text-purple-700 bg-purple-50 border border-purple-200`}>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-xs font-semibold whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
            Μεταγραφή...
          </span>
        </div>
      )}

      {status === 'idle' && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); startRecording(); }}
          disabled={disabled}
          className={`${base} text-white hover:opacity-90`}
          style={{ fontFamily: 'Inter, sans-serif', background: 'linear-gradient(135deg, #5B21B6, #b32483)' }}
          title="Ηχογράφηση ερώτησης"
        >
          <Mic className="w-4 h-4" />
        </button>
      )}

      {error && (
        <p
          className="absolute right-0 top-full mt-2 w-64 text-right text-xs text-red-600 bg-white border border-red-200 rounded-lg px-3 py-2 shadow-sm z-10"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {error}
        </p>
      )}
    </div>
  );
}