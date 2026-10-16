import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

export default function AssistantFloatingButton() {
  return (
    <Link
      to="/academy/assistant"
      aria-label="Ask SpotlightPOS Assistant"
      className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-3 bg-[#0E1235] border border-[#00CFFF]/40 text-[#00CFFF] rounded-full sm:rounded-none shadow-lg shadow-black/40 hover:border-[#00CFFF]/80 hover:bg-[#00CFFF]/10 transition-all group"
      style={{ boxShadow: '0 0 20px rgba(0,207,255,0.15)' }}
    >
      <Bot className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
      <span className="font-rajdhani text-xs sm:text-sm font-semibold whitespace-nowrap">
        Ask SpotlightPOS Assistant
      </span>
    </Link>
  );
}