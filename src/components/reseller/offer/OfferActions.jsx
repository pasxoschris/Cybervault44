import { Save, Eye, Mail, RotateCcw } from 'lucide-react';

export default function OfferActions({
  saving,
  linesCount,
  hasSavedOffer,
  onSaveDraft,
  onPreview,
  onSendEmail,
  onClear,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={onSaveDraft} disabled={saving}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#131840] border border-[#2A3580] rounded-xl text-white text-sm hover:border-[#00CFFF]/40 transition-colors disabled:opacity-40">
        <Save size={15} /> {saving ? 'Αποθήκευση...' : 'Αποθήκευση Draft'}
      </button>
      <button onClick={onPreview} disabled={linesCount === 0}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#00CFFF]/10 border border-[#00CFFF]/30 rounded-xl text-[#00CFFF] text-sm hover:bg-[#00CFFF]/20 transition-colors disabled:opacity-40">
        <Eye size={15} /> Preview
      </button>
      <button onClick={onSendEmail} disabled={!hasSavedOffer && linesCount === 0}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#131840] border border-[#2A3580] rounded-xl text-white text-sm hover:border-[#00CFFF]/40 transition-colors disabled:opacity-40">
        <Mail size={15} /> Αποστολή Email
      </button>
      <button onClick={onClear}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#131840] border border-red-500/20 rounded-xl text-red-400/70 text-sm hover:border-red-400/50 transition-colors">
        <RotateCcw size={15} /> Καθαρισμός
      </button>
    </div>
  );
}