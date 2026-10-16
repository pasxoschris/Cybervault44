import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

/**
 * Πλωτό κουμπί για τον SpotlightPOS Assistant.
 * Σε ηρεμία εμφανίζεται ως μικρό κυκλικό εικονίδιο (μικρό αποτύπωμα, δεν καλύπτει κείμενο)
 * και στο hover απλώνει την ετικέτα του. Ο κενός χώρος στο τέλος της σελίδας (spacer)
 * κρατά το τελευταίο περιεχόμενο πάνω από το κουμπί.
 */
export default function AssistantFloatingButton() {
  return (
    <>
      <Link
        to="/academy/assistant"
        aria-label="Ask SpotlightPOS Assistant"
        title="Ask SpotlightPOS Assistant"
        className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center h-12 rounded-full bg-[#0E1235] border border-[#00CFFF]/40 text-[#00CFFF] overflow-hidden transition-all hover:border-[#00CFFF]/80 hover:border hover:shadow-lg hover:shadow-black/40"
        style={{ boxShadow: '0 0 18px rgba(0,207,255,0.22)' }}
      >
        <span className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5" />
        </span>
        <span className="max-w-0 group-hover:max-w-[240px] group-focus-visible:max-w-[240px] transition-all duration-300 overflow-hidden">
          <span className="block pr-5 text-sm font-semibold whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
            Ask SpotlightPOS Assistant
          </span>
        </span>
      </Link>
      <div className="h-20" aria-hidden="true" />
    </>
  );
}