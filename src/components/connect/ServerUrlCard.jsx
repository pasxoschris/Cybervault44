import { useState } from 'react';
import { Copy, Check, Server } from 'lucide-react';

export default function ServerUrlCard() {
  const [copied, setCopied] = useState(false);
  const url = new URL('/api/mcp', window.location.origin).toString();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the URL stays visible to copy manually */
    }
  };

  return (
    <div className="border border-[#00CFFF]/25 bg-[#131840]/80 p-6">
      <div className="flex items-center gap-2 mb-3">
        <Server size={16} className="text-[#00CFFF]" />
        <span className="font-orbitron text-xs tracking-widest text-[#00CFFF]">MCP SERVER URL</span>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <code className="flex-1 text-sm font-mono-cyber text-white/85 bg-[#0E1235] border border-[#00CFFF]/15 px-4 py-3 break-all">
          {url}
        </code>
        <button onClick={copy} className="cyber-btn !py-3 !px-5 inline-flex items-center justify-center gap-2">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Αντιγράφηκε' : 'Αντιγραφή'}
        </button>
      </div>
      <p className="text-white/50 text-sm mt-3">
        Αυτό το URL δίνει σε έναν AI client (Claude, ChatGPT, Cursor κ.λπ.) πρόσβαση στον οδηγό SpotlightPOS.
      </p>
    </div>
  );
}