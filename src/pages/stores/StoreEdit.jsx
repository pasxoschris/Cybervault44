import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import StoreAccessGuard from "@/components/stores/StoreAccessGuard";
import StoreForm from "@/components/stores/StoreForm";
import Navbar from "@/components/layout/Navbar";

export default function StoreEdit() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Store.filter({ id })
      .then(res => setStore(res[0] || null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0E1235] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
    </div>
  );

  return (
    <StoreAccessGuard>
      <div className="min-h-screen bg-[#0E1235]">
        <Navbar />
        <div className="pt-16">
          {store ? <StoreForm store={store} /> : <div className="text-center py-20 text-white/50">Το κατάστημα δεν βρέθηκε.</div>}
        </div>
      </div>
    </StoreAccessGuard>
  );
}