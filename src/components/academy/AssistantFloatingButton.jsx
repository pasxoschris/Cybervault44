import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

export default function AssistantFloatingButton() {
  return (
    <Link
      to="/academy/assistant"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#0E1235] border border-[#00CFFF]/40 text-[#00CFFF] shadow-lg shadow-black/40 hover:border-[#00CFFF]/80 hover:bg-[#00CFFF]/10 transition-all group"
      style={{ boxShadow: '0 0 20px rgba(0,207,255,0.15)' }}
    >
      <Bot className="w-5 h-5 flex-shrink-0" />
      <span className="font-rajdhani text-sm font-semibold whitespace-nowrap">
        💬 Ρώτησε τον Spotlight Assistant
      </span>
    </Link>
  );
}