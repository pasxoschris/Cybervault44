import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/layout/Navbar';
import { Send, Bot, ChevronRight, RotateCcw, ArrowLeft, TrendingUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SUGGESTED = [
  'Τρέξε έλεγχο τιμών για όλο τον εξοπλισμό',
  'Ποιός εξοπλισμός έχει τη μεγαλύτερη διαφορά τιμής;',
  'Δείξε μου τα πιο πρόσφατα αποτελέσματα ελέγχου',
  'Ποιες τιμές μας είναι ανταγωνιστικές;',
];

function FunctionDisplay({ toolCall }) {
  const [expanded, setExpanded] = useState(false);
  const isRunning = ['pending', 'running', 'in_progress'].includes(toolCall.status);
  const isFailed = ['failed', 'error'].includes(toolCall.status);

  let label = 'Ολοκληρώθηκε';
  if (isRunning) label = 'Εκτέλεση...';
  else if (isFailed) label = 'Σφάλμα';

  let parsedResults = null;
  try {
    parsedResults = typeof toolCall.results === 'string' ? JSON.parse(toolCall.results) : toolCall.results;
  } catch {
    parsedResults = toolCall.results;
  }

  return (
    <div className="mt-1.5 text-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-[#00CFFF] hover:text-[#00CFFF]/80 transition-colors"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-[#00CFFF] animate-pulse' : isFailed ? 'bg-red-400' : 'bg-green-400'}`} />
        <span className="font-mono">{toolCall.name}</span>
        <span className="text-white/40">— {label}</span>
        <ChevronRight size={11} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>
      {expanded && (
        <div className="mt-1.5 ml-4 bg-[#0E1235] border border-[#2A3580] rounded-lg p-2.5 font-mono text-xs text-white/70 overflow-x-auto">
          {toolCall.arguments_string && (
            <div className="mb-1.5">
              <span className="text-white/40">Parameters: </span>
              <pre className="whitespace-pre-wrap break-all">{toolCall.arguments_string}</pre>
            </div>
          )}
          {parsedResults != null && (
            <div>
              <span className="text-white/40">Result: </span>
              <pre className="whitespace-pre-wrap break-all">{JSON.stringify(parsedResults, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#00CFFF]/10 border border-[#00CFFF]/30 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-4 h-4 text-[#00CFFF]" />
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-[#00CFFF] text-[#0E1235]'
            : 'bg-[#131840] border border-[#2A3580] text-white/90'
        }`} style={{ fontFamily: 'Inter, sans-serif' }}>
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown
              className="prose prose-sm max-w-none prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 prose-headings:text-white prose-strong:text-[#00CFFF] prose-code:text-[#00CFFF] prose-code:bg-[#0E1235] prose-code:px-1 prose-code:rounded prose-th:text-white/80 prose-td:text-white/70 prose-th:border-[#2A3580] prose-td:border-[#2A3580]"
              components={{
                a: ({ children, href }) => (
                  <a href={href || '#'} target="_blank" rel="noopener noreferrer" className="text-[#00CFFF] underline hover:text-[#00CFFF]/80">{children}</a>
                ),
                p: ({ children }) => <p className="my-1">{children}</p>,
                ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
                ol: ({ children }) => <ol className="my-1 ml-4 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="my-0.5">{children}</li>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        {message.tool_calls?.map((tc, i) => <FunctionDisplay key={i} toolCall={tc} />)}
      </div>
    </div>
  );
}

export default function PriceMonitorAgent() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    const start = async () => {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) { base44.auth.redirectToLogin(window.location.href); return; }
      const conv = await base44.agents.createConversation({ agent_name: 'price_monitor_agent', metadata: { name: 'Price Monitor Agent' } });
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

  const reset = async () => {
    setMessages([]);
    setInput('');
    setLoading(false);
    const conv = await base44.agents.createConversation({ agent_name: 'price_monitor_agent', metadata: { name: 'Price Monitor Agent' } });
    setConversation(conv);
  };

  if (init) {
    return (
      <div className="min-h-screen bg-[#0E1235] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2A3580] border-t-[#00CFFF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid">
      <Navbar />
      {/* Hero Header */}
      <div className="pt-24 pb-10" style={{ background: "linear-gradient(135deg, #0E1235 0%, #131840 100%)", borderBottom: "1px solid rgba(0,207,255,0.15)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00CFFF]/10 border border-[#00CFFF]/30 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#00CFFF]" />
            </div>
            <div>
              <h1 className="font-bold text-2xl md:text-3xl text-white glow-cyan" style={{ fontFamily: 'Inter, sans-serif' }}>
                Price Monitor Agent
              </h1>
              <p className="text-sm text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                AI παρακολούθηση & σύγκριση retail τιμών
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Sub-header: back + reset */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/reseller-console"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#00CFFF] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft size={14} /> Επιστροφή στο Reseller Console
          </Link>
          {messages.length > 0 && (
            <button
              onClick={reset}
              disabled={loading}
              className="flex items-center gap-1.5 text-sm text-white/50 hover:text-[#00CFFF] border border-[#2A3580] hover:border-[#00CFFF]/30 px-3 py-1.5 rounded-lg transition-all disabled:opacity-40"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Νέα Συζήτηση</span>
            </button>
          )}
        </div>

        {/* Messages / Empty state */}
        <div className="space-y-4">
          {messages.length === 0 && !loading && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#00CFFF]/10 border border-[#00CFFF]/30 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#00CFFF]" />
              </div>
              <h2 className="text-white text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Price Monitor Agent</h2>
              <p className="text-white/40 text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                Ζήτησε έλεγχο τιμών ή ανάλυση αγοράς
              </p>
              <div className="max-w-3xl mx-auto w-full mb-6">
                <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ρώτησε ή ζήτησε έλεγχο τιμών..."
                    className="flex-1 text-sm text-white placeholder-white/30 font-medium rounded-lg border border-[#2A3580] bg-[#131840] px-4 py-3 outline-none transition-all focus:border-[#00CFFF]/50 focus:ring-2 focus:ring-[#00CFFF]/10"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="rounded-lg px-4 py-3 text-[#0E1235] bg-[#00CFFF] disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 transition-all hover:bg-[#00CFFF]/80 font-semibold"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
              <div className="space-y-2.5 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-5 bg-[#00CFFF] rounded-full" />
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Προτεινόμενες Ενέργειες</h3>
                </div>
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="w-full flex items-start gap-2.5 p-3.5 rounded-xl border border-[#2A3580] bg-[#131840] hover:border-[#00CFFF]/30 hover:bg-[#00CFFF]/5 transition-all text-left group"
                  >
                    <ChevronRight className="w-4 h-4 text-[#00CFFF]/40 group-hover:text-[#00CFFF] transition-colors flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm leading-snug group-hover:text-white transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>{q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.filter(m => m.role !== 'system').map((m, i) => (
            <MessageBubble key={i} message={m} />
          ))}

          {loading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#00CFFF]/10 border border-[#00CFFF]/30 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[#00CFFF]" />
              </div>
              <div className="bg-[#131840] border border-[#2A3580] rounded-2xl px-4 py-3 flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00CFFF] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#00CFFF] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#00CFFF] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested (when chatting) */}
        {messages.length > 0 && (
          <div className="mt-4">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="whitespace-nowrap px-3 py-1.5 border border-[#2A3580] bg-[#131840] hover:border-[#00CFFF]/30 text-white/50 hover:text-[#00CFFF] text-xs transition-all flex-shrink-0 disabled:opacity-40 rounded-lg"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {q}
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
                placeholder="Ρώτησε ή ζήτησε έλεγχο τιμών..."
                className="flex-1 text-sm text-white placeholder-white/30 font-medium rounded-lg border border-[#2A3580] bg-[#131840] px-4 py-3 outline-none transition-all focus:border-[#00CFFF]/50 focus:ring-2 focus:ring-[#00CFFF]/10"
                style={{ fontFamily: 'Inter, sans-serif' }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="rounded-lg px-4 py-3 text-[#0E1235] bg-[#00CFFF] disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 transition-all hover:bg-[#00CFFF]/80 font-semibold"
                style={{ fontFamily: 'Inter, sans-serif' }}
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