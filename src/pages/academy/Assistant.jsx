import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/layout/Navbar';
import SpotlightBrand from '@/components/SpotlightBrand';
import { Send, ChevronLeft, Bot, ChevronRight, RotateCcw, ArrowLeft } from 'lucide-react';
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
        <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-4 h-4 text-purple-600" />
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-purple-600 text-white'
            : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
        }`}>
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown
              className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              components={{
                a: ({ children, href }) => {
                  const url = href || '#';
                  let to = url;
                  try {
                    const parsed = new URL(url);
                    if (parsed.origin === window.location.origin) {
                      to = parsed.pathname + parsed.search + parsed.hash;
                    }
                  } catch {}
                  const isRelative = to.startsWith('/');
                  return isRelative ? (
                    <Link to={to} className="text-purple-600 underline hover:text-purple-800">
                      {children}
                    </Link>
                  ) : (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-purple-600 underline hover:text-purple-800">
                      {children}
                    </a>
                  );
                },
                p: ({ children }) => <p className="my-1">{children}</p>,
                ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
                ol: ({ children }) => <ol className="my-1 ml-4 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="my-0.5">{children}</li>,
                strong: ({ children }) => <strong className="text-purple-700">{children}</strong>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        {message.tool_calls?.map((tc, i) => tc.status === 'running' && (
          <div key={i} className="mt-1 text-xs text-purple-500 flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Header */}
      <div className="pt-24 pb-10" style={{ background: "linear-gradient(135deg, #6a2b9e 0%, #b32483 100%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-4">
            <SpotlightBrand size={26} />
          </div>
          <h1 className="font-bold text-3xl md:text-4xl mb-2 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
            SpotlightPOS Assistant
          </h1>
          <p className="text-base text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
            Ρώτησέ με οτιδήποτε για το Spotlight POS
          </p>
        </div>
      </div>

      {/* Chat Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Sub-header: back + reset */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/spotlight-pos-guide/roles"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft size={14} /> Επιστροφή στους Ρόλους
          </Link>
          {messages.length > 0 && (
            <button
              onClick={resetToQuestions}
              disabled={loading}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-600 border border-gray-200 hover:border-purple-300 px-3 py-1.5 rounded-lg transition-all disabled:opacity-40"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Επιστροφή στις Ερωτήσεις</span>
            </button>
          )}
        </div>

        {/* Messages / Empty state */}
        <div className="space-y-4">
          {messages.length === 0 && !loading && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-gray-900 text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>SpotlightPOS Assistant</h2>
              <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>Επίλεξε μια ερώτηση ή γράψε τη δική σου παρακάτω</p>
              <div className="max-w-3xl mx-auto w-full mb-8">
                <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ρώτησε οτιδήποτε για το Spotlight POS..."
                    className="flex-1 text-sm text-gray-900 placeholder-gray-500 font-medium rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="rounded-lg px-4 py-3 text-white disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 transition-all hover:opacity-90"
                    style={{ fontFamily: 'Inter, sans-serif', background: "linear-gradient(135deg, #5B21B6, #b32483)" }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-5 bg-purple-600 rounded-full" />
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Προτεινόμενες Ερωτήσεις</h3>
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
                      <div className="w-1 h-3 bg-purple-400 rounded-full" />
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {CATEGORY_LABELS[cat] || cat}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {qs.map((q) => (
                        <button
                          key={q}
                          onClick={() => send(q)}
                          className="flex items-start gap-2.5 p-3.5 rounded-xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm transition-all text-left group"
                        >
                          <ChevronRight className="w-4 h-4 text-purple-300 group-hover:text-purple-600 transition-colors flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm leading-snug" style={{ fontFamily: 'Inter, sans-serif' }}>{q}</span>
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
              <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-purple-600" />
              </div>
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-4 py-3 flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested (when chatting) */}
        {messages.length > 0 && (
          <div className="mt-4">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {suggested.slice(0, 4).map((item) => (
                <button
                  key={item.question}
                  onClick={() => send(item.question)}
                  disabled={loading}
                  className="whitespace-nowrap px-3 py-1.5 border border-gray-200 bg-white hover:border-purple-300 text-gray-600 hover:text-purple-600 text-xs transition-all flex-shrink-0 disabled:opacity-40 rounded-lg"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input (when chatting) */}
        {messages.length > 0 && (
          <div className="mt-4">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ρώτησε οτιδήποτε για το Spotlight POS..."
                className="flex-1 text-sm text-gray-900 placeholder-gray-500 font-medium rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                style={{ fontFamily: 'Inter, sans-serif' }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="rounded-lg px-4 py-3 text-white disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 transition-all hover:opacity-90"
                style={{ fontFamily: 'Inter, sans-serif', background: "linear-gradient(135deg, #5B21B6, #b32483)" }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}