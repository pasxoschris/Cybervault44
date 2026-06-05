import React from "react";
import StoreAccessGuard from "@/components/stores/StoreAccessGuard";
import StoreForm from "@/components/stores/StoreForm";
import Navbar from "@/components/layout/Navbar";

export default function StoreNew() {
  return (
    <StoreAccessGuard>
      <div className="min-h-screen bg-[#0E1235]">
        <Navbar />
        <div className="pt-16">
          <StoreForm />
        </div>
      </div>
    </StoreAccessGuard>
  );
}