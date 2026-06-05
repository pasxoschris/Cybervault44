import React, { useEffect, useState } from "react";
import { ShieldX } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function StoreAccessGuard({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    base44.auth.me()
      .then(u => setStatus(u?.role === "admin" ? "ok" : "denied"))
      .catch(() => setStatus("denied"));
  }, []);

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0E1235]">
        <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="min-h-screen bg-[#0E1235] flex items-center justify-center">
        <div className="text-center">
          <ShieldX className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white font-orbitron mb-2">Απαγορευμένη Πρόσβαση</h2>
          <p className="text-white/60">Δεν έχετε δικαίωμα πρόσβασης.</p>
        </div>
      </div>
    );
  }

  return children;
}