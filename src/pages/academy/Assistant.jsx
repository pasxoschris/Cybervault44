import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Send, ChevronLeft, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SUGGESTED = [
  'Πώς δημιουργώ νέα παραγγελία;',
  'Πώς κάνω πληρωμή;',
  'Πώς εκδίδω τιμολόγιο;',
  'Πώς μεταφέρω τραπέζι;',
  'Πώς κάνω split payment;',
  'Πώς βλέπω παραγγελίες βάρδιας;',
  'Πώς αλλάζω σερβιτόρο;',
  'Ποια είναι η διαφορά Service Mode και Maitre Mode;',
];

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
            ? 'bg-[#00CFFF]/15 border border-[#00CFFF]/30 text-white'
            : 'bg-[#131840] border border-[#2A3580] text-white/90'
        }`}>
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown
              className="prose prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              components={{
                a: ({ children, href }) => (
                  <Link to={href || '#'} className="text-[#00CFFF] underline hover:text-[#00CFFF]/80">
                    {children}
                  </Link>
                ),
                p: ({ children }) => <p className="my-1">{children}</p>,
                ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
                ol: ({ children }) => <ol className="my-1 ml-4 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="my-0.5">{children}</li>,
                strong: ({ children }) => <strong className="text-[#00CFFF]">{children}</strong>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        {message.tool_calls?.map((tc, i) => tc.status === 'running' && (
          <div key={i} className="mt-1 text-xs text-[#00CFFF]/50 font-mono-cyber flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00CFFF]/50 animate-pulse" />
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
  const bottomRef = useRef(null);

  useEffect(() => {
    const start = async () => {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) { base44.auth.redirectToLogin(window.location.href); return; }
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

  if (init) {
    return (
      <div className="min-h-screen bg-[#0E1235] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid flex flex-col">
      {/* Header */}
      <div className="bg-[#0a0e2e]/95 border-b border-[#00CFFF]/10 px-4 py-3 flex items-center gap-4 flex-shrink-0">
        <Link to="/spotlight-pos-guide/roles" className="text-[#00CFFF]/60 hover:text-[#00CFFF] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="w-9 h-9 rounded-full bg-[#00CFFF]/10 border border-[#00CFFF]/30 flex items-center justify-center">
          <Bot className="w-5 h-5 text-[#00CFFF]" />
        </div>
        <div>
          <div className="font-orbitron text-sm font-bold text-white tracking-wider">Spotlight POS Assistant</div>
          <div className="text-[10px] font-mono-cyber text-[#00CFFF]/50 tracking-widest">CyberVault Academy AI</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.length === 0 && !loading && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#00CFFF]/10 border border-[#00CFFF]/20 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-[#00CFFF]" />
            </div>
            <h2 className="font-orbitron text-white text-lg mb-2">Spotlight POS Assistant</h2>
            <p className="font-rajdhani text-white/50 text-sm mb-8">Ρώτησέ με οτιδήποτε για το Spotlight POS</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="p-3 border border-[#00CFFF]/15 bg-[#131840]/60 hover:border-[#00CFFF]/40 hover:bg-[#00CFFF]/5 transition-all text-left"
                >
                  <span className="font-rajdhani text-white/70 text-sm">{q}</span>
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
              <div className="w-1.5 h-1.5 rounded-full bg-[#00CFFF]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#00CFFF]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#00CFFF]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggested (when chatting) */}
      {messages.length > 0 && (
        <div className="px-4 pb-2 max-w-3xl mx-auto w-full">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SUGGESTED.slice(0, 4).map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={loading}
                className="whitespace-nowrap px-3 py-1.5 border border-[#00CFFF]/20 bg-[#131840]/60 hover:border-[#00CFFF]/40 text-white/60 hover:text-white/90 text-xs font-rajdhani transition-all flex-shrink-0 disabled:opacity-40"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-6 pt-2 max-w-3xl mx-auto w-full flex-shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ρώτησε οτιδήποτε για το Spotlight POS..."
            className="cyber-input flex-1 text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="cyber-btn !py-0 !px-4 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}