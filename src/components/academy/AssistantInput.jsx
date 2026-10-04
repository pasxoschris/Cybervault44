import { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import VoiceInputButton from './VoiceInputButton';

const MAX_HEIGHT = 160;

export default function AssistantInput({ value, onValueChange, onSend, disabled }) {
  const textareaRef = useRef(null);

  const handleTranscript = (text) => {
    onValueChange(value ? `${value} ${text}` : text);
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  }, [value]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSend(); }} className="flex gap-2 items-end">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        placeholder="Ρώτησε οτιδήποτε για το SpotlightPOS..."
        className="flex-1 min-w-0 text-sm text-gray-900 placeholder-gray-500 font-medium rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 resize-none break-words"
        style={{ fontFamily: 'Inter, sans-serif', maxHeight: MAX_HEIGHT }}
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