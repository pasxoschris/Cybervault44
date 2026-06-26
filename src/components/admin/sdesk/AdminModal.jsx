import { X } from 'lucide-react';

export default function AdminModal({ title, onClose, onSave, saving, error, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0E1235] border border-[#00CFFF]/30 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-[#00CFFF]/20 sticky top-0 bg-[#0E1235] z-10">
          <h3 className="font-orbitron text-white text-sm tracking-wide">{title}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="p-5 space-y-4">
          {children}
          {error && <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 px-3 py-2">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose}
              className="flex-1 py-2.5 border border-[#00CFFF]/30 text-white/50 font-orbitron text-xs tracking-widest hover:border-[#00CFFF]/60 hover:text-white/70 transition-all">
              ΑΚΥΡΟ
            </button>
            <button onClick={onSave} disabled={saving}
              className="flex-1 cyber-btn text-xs py-2.5 disabled:opacity-50">
              {saving ? 'ΑΠΟΘΗΚΕΥΣΗ...' : 'ΑΠΟΘΗΚΕΥΣΗ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}