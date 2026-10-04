import React, { useState } from "react";
import { Bot, MessageSquare, Terminal, Plug } from "lucide-react";

const CLIENTS = [
  {
    id: "claude",
    label: "Claude",
    icon: Bot,
    steps: [
      "Άνοιξε το μενού του προφίλ σου και πήγαινε Settings → Connectors.",
      "Πάτα «Add custom connector».",
      "Δώσε ένα όνομα (π.χ. CyberVault) και επικόλλησε το URL του server.",
      "Πάτα Add.",
    ],
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    icon: MessageSquare,
    steps: [
      "Άνοιξε τα Apps και ενεργοποίησε το Developer mode. Το ChatGPT θα σου εμφανίσει προειδοποίηση κινδύνου — επιβεβαίωσέ την για να συνεχίσεις.",
      "Πάτα «Create app».",
      "Δώσε όνομα και επικόλλησε το URL του server.",
      "Πάτα Create.",
      "Ενεργοποίησε την εφαρμογή από τον composer της συνομιλίας πριν της ζητήσεις κάτι.",
    ],
  },
  {
    id: "cursor",
    label: "Cursor",
    icon: Terminal,
    steps: [
      "Πήγαινε Settings → Tools & Integrations.",
      "Πάτα «New MCP Server» — ανοίγει το αρχείο mcp.json.",
      "Πρόσθεσε μια καταχώρηση με url το URL του server και αποθήκευσε.",
      "Ενεργοποίησέ την με τον διακόπτη (toggle on).",
    ],
  },
  {
    id: "custom",
    label: "Άλλος client",
    icon: Plug,
    steps: [
      "Αντίγραψε το URL του server.",
      "Πρόσθεσέ το ως streamable HTTP MCP server — όνομα και URL αρκούν για τους περισσότερους clients.",
      "Κάνε reload τον client για να φορτώσει τα εργαλεία.",
    ],
  },
];

export default function AgentClientTabs() {
  const [active, setActive] = useState("claude");
  const client = CLIENTS.find((c) => c.id === active);

  return (
    <div className="rounded-2xl border border-[#00CFFF]/20 bg-[#131840]/40 overflow-hidden">
      <div className="flex flex-wrap gap-2 p-3 border-b border-[#00CFFF]/10 bg-[#131840]/60">
        {CLIENTS.map((c) => {
          const Icon = c.icon;
          const isActive = c.id === active;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#00CFFF] text-[#0E1235]"
                  : "text-white/60 hover:text-[#00CFFF] border border-[#00CFFF]/15"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Icon className="w-4 h-4" /> {c.label}
            </button>
          );
        })}
      </div>

      <div className="p-5 flex flex-col gap-4">
        {client.steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <div
              className="w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold text-[#0E1235]"
              style={{ background: "#00CFFF", fontFamily: "Inter, sans-serif" }}
            >
              {i + 1}
            </div>
            <p
              className="text-white/70 text-sm leading-relaxed pt-1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}