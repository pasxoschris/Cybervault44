import { Send } from 'lucide-react';
import VoiceInputButton from './VoiceInputButton';

export default function AssistantInput({ value, onValueChange, onSend, disabled }) {
  const handleTranscript = (text) => {
    onValueChange(value ? `${value} ${text}` : text);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSend(); }} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="Ρώτησε οτιδήποτε για το SpotlightPOS..."
        className="flex-1 min-w-0 text-sm text-gray-900 placeholder-gray-500 font-medium rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
        style={{ fontFamily: 'Inter, sans-serif' }}
        disabled={disabled}
      />
      <VoiceInputButton onTranscript={handleTranscript} disabled={disabled} />
      <button
        type="submit"
        disabled={!value.trim() || disabled}
        className="rounded-lg px-4 py-3 text-white disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 transition-all hover:opacity-90"
        style={{ fontFamily: 'Inter, sans-serif', background: "linear-gradient(135deg, #5B21B6, #b32483)" }}
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}