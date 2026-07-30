import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Send, ChevronLeft, Bot, ChevronRight, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const CATEGORY_LABELS = {
  general: 'Γενικά',
  login: 'Σύνδεση',
  shift: 'Βάρδια',
  sync: 'Σύνδεση & Συγχρονισμός',
  order: 'Παραγγελία',
  payment: 'Πληρωμή',
  invoice: 'Τιμολόγιο',
  transfer: 'Μεταφορά Παραγγελίας',
  cashier: 'Cashier Mode',
  delivery: 'Delivery',
};

const FALLBACK_SUGGESTED = [
  { category: 'general', question: 'Πώς εγκαθιστώ την εφαρμογή Spotlight POS;' },
  { category: 'shift', question: 'Πώς ξεκινάω βάρδια;' },
  { category: 'sync', question: 'Τι σημαίνει η πράσινη ή κόκκινη κουκίδα σύνδεσης;' },
  { category: 'order', question: 'Πώς δημιουργώ νέα παραγγελία στο Service Mode;' },
  { category: 'order', question: 'Πώς βάζω έκπτωση σε προϊόν ή παραγγελία;' },
  { category: 'payment', question: 'Πώς κάνω πληρωμή στο Service Mode;' },
  { category: 'invoice', question: 'Πώς εκδίδω τιμολόγιο;' },
  { category: 'transfer', question: 'Πώς μεταφέρω παραγγελία σε άλλο σερβιτόρο;' },
  { category: 'transfer', question: 'Τι κάνω αν χαθεί μια μεταφορά παραγγελίας;' },
  { category: 'order', question: 'Πώς συγχωνεύω παραγγελίες;' },
  { category: 'cashier', question: 'Πώς κάνω split payment στο Cashier Mode;' },
  { category: 'delivery', question: 'Πώς δέχομαι παραγγελία delivery;' },
  { category: 'cashier', question: 'Πώς κλείνω βάρδια στο Cashier Mode;' },
  { category: 'cashier', question: 'Πώς προσθέτω συνοδευτικά σε προϊόν στο Cashier Mode;' },
];

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-4 h-4 text-[#8B5CF6]" />
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-white'
            : 'bg-[#2D2B55] border border-[#4A3B7A] text-white/90'
        }`}>
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown
              className="prose prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              components={{
                a: ({ children, href }) => {
                  const url = href || '#';
                  // Convert absolute URLs to relative for internal navigation
                  let to = url;
                  try {
                    const parsed = new URL(url);
                    if (parsed.origin === window.location.origin) {
                      to = parsed.pathname + parsed.search + parsed.hash;
                    }
                  } catch {}
                  const isRelative = to.startsWith('/');
                  return isRelative ? (
                    <Link to={to} className="text-[#8B5CF6] underline hover:text-[#8B5CF6]/80">
                      {children}
                    </Link>
                  ) : (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] underline hover:text-[#8B5CF6]/80">
                      {children}
                    </a>
                  );
                },
                p: ({ children }) => <p className="my-1">{children}</p>,
                ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
                ol: ({ children }) => <ol className="my-1 ml-4 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="my-0.5">{children}</li>,
                strong: ({ children }) => <strong className="text-[#8B5CF6]">{children}</strong>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        {message.tool_calls?.map((tc, i) => tc.status === 'running' && (
          <div key={i} className="mt-1 text-xs text-[#8B5CF6]/50 font-sans flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/50 animate-pulse" />
            Αναζήτηση στη βάση γνώσης...
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Assistant() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(true);
  const [suggested, setSuggested] = useState(FALLBACK_SUGGESTED);
  const bottomRef = useRef(null);

  useEffect(() => {
    const start = async () => {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) { base44.auth.redirectToLogin(window.location.href); return; }
      try {
        const list = await base44.entities.AssistantSuggestedQuestion.list('display_order', 200);
        const active = list
          .filter(q => q.is_active)
          .map(q => ({ category: q.category || 'general', question: q.question }));
        if (active.length > 0) setSuggested(active);
      } catch {}
      const conv = await base44.agents.createConversation({ agent_name: 'spotlight_pos_assistant', metadata: { name: 'Spotlight Assistant' } });
      setConversation(conv);
      setInit(false);
    };
    start();
  }, []);

  useEffect(() => {
    if (!conversation?.id) return;
    const unsub = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
      setLoading(false);
    });
    return unsub;
  }, [conversation?.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading || !conversation) return;
    setInput('');
    setLoading(true);
    await base44.agents.addMessage(conversation, { role: 'user', content: msg });
  };

  const resetToQuestions = async () => {
    setMessages([]);
    setInput('');
    setLoading(false);
    const conv = await base44.agents.createConversation({ agent_name: 'spotlight_pos_assistant', metadata: { name: 'Spotlight Assistant' } });
    setConversation(conv);
  };

  if (init) {
    return (
      <div className="min-h-screen bg-[#1E1B3A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#8B5CF6]/30 border-t-[#8B5CF6] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1B3A]  flex flex-col">
      {/* Header */}
      <div className="bg-[#15123A]/95 border-b border-[#8B5CF6]/10 px-4 py-3 flex items-center gap-4 flex-shrink-0">
        <Link to="/spotlight-pos-guide/roles" className="text-[#8B5CF6]/60 hover:text-[#8B5CF6] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        {messages.length > 0 && (
          <button
            onClick={resetToQuestions}
            disabled={loading}
            className="flex items-center gap-1.5 text-sm text-white/90 hover:text-white border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 px-3 py-1.5 rounded-lg transition-all disabled:opacity-40 flex-shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Επιστροφή στις Ερωτήσεις</span>
          </button>
        )}
        <div className="w-9 h-9 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center">
          <Bot className="w-5 h-5 text-[#8B5CF6]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-sans text-sm font-bold text-white tracking-wider truncate">Spotlight POS Assistant</div>
          <div className="text-[11px] text-[#8B5CF6]/60">Ρώτησέ με οτιδήποτε για το Spotlight POS</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.length === 0 && !loading && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-[#8B5CF6]" />
            </div>
            <h2 className="font-sans text-white text-lg mb-2">Spotlight POS Assistant</h2>
            <p className="font-sans text-white/50 text-sm mb-6">Επίλεξε μια ερώτηση ή γράψε τη δική σου παρακάτω</p>
            <div className="max-w-3xl mx-auto w-full mb-8">
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ρώτησε οτιδήποτε για το Spotlight POS..."
                  className="spotlight-input flex-1 text-sm"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="spotlight-btn !py-0 !px-4 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-5 bg-[#8B5CF6] rounded-full" />
                <h3 className="font-sans text-sm font-semibold text-white/80 uppercase tracking-wider">Προτεινόμενες Ερωτήσεις</h3>
              </div>
              {Object.entries(
                suggested.reduce((acc, item) => {
                  const cat = item.category || 'general';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(item.question);
                  return acc;
                }, {})
              ).map(([cat, qs]) => (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-3 bg-[#8B5CF6]/60 rounded-full" />
                    <span className="font-sans text-xs font-semibold text-[#8B5CF6]/70 uppercase tracking-wider">
                      {CATEGORY_LABELS[cat] || cat}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {qs.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="flex items-start gap-2.5 p-3.5 rounded-lg border border-[#8B5CF6]/15 bg-[#2D2B55]/60 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 transition-all text-left group"
                      >
                        <ChevronRight className="w-4 h-4 text-[#8B5CF6]/40 group-hover:text-[#8B5CF6] transition-colors flex-shrink-0 mt-0.5" />
                        <span className="text-white/85 text-sm leading-snug">{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {messages.filter(m => m.role !== 'system').map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}

        {loading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div className="bg-[#2D2B55] border border-[#4A3B7A] rounded-2xl px-4 py-3 flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggested (when chatting) */}
      {messages.length > 0 && (
        <div className="px-4 pb-2 max-w-3xl mx-auto w-full">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {suggested.slice(0, 4).map((item) => (
              <button
                key={item.question}
                onClick={() => send(item.question)}
                disabled={loading}
                className="whitespace-nowrap px-3 py-1.5 border border-[#8B5CF6]/20 bg-[#2D2B55]/60 hover:border-[#8B5CF6]/40 text-white/60 hover:text-white/90 text-xs font-sans transition-all flex-shrink-0 disabled:opacity-40"
              >
                {item.question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input (when chatting) */}
      {messages.length > 0 && (
        <div className="px-4 pb-6 pt-2 max-w-3xl mx-auto w-full flex-shrink-0">
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ρώτησε οτιδήποτε για το Spotlight POS..."
              className="spotlight-input flex-1 text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="spotlight-btn !py-0 !px-4 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}