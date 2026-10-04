import React, { useState } from "react";
import { Copy, Check, Server } from "lucide-react";

export default function ServerUrlField({ url }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#00CFFF]/20 bg-[#131840]/40 p-5 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Server className="w-4 h-4 text-[#00CFFF]" strokeWidth={1.5} />
        <span className="font-orbitron text-sm font-semibold text-white/90 tracking-wide">
          MCP Server URL
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          readOnly
          value={url}
          onFocus={(e) => e.target.select()}
          className="cyber-input flex-1 font-mono-cyber !text-xs"
        />
        <button
          onClick={copy}
          className="cyber-btn !py-2 !px-4 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Αντιγράφηκε
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Αντιγραφή
            </>
          )}
        </button>
      </div>
      <p className="text-white/40 text-xs font-rajdhani mt-2.5">
        Αυτό είναι το URL που επικολλάς σε κάθε AI client παρακάτω.
      </p>
    </div>
  );
}