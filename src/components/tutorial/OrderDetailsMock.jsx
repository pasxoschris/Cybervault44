import React from "react";
import { ArrowLeft, MoreHorizontal, Clock, Users, Palette, Printer, Wine, Plus, ArrowRight, Ticket, Lock } from "lucide-react";

// Αναπαράσταση της οθόνης «Στοιχεία Παραγγελίας» της εφαρμογής, με αριθμημένες επισημάνσεις.
// Οι αριθμοί αντιστοιχούν στη λίστα που εμφανίζεται κάτω από την εικόνα (Κεφ. 8).

const HEADER = "#2b2146";
const MARK = "#b32483";
const font = { fontFamily: "Inter, sans-serif" };

export function Marker({ n, className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white shadow ring-2 ring-white flex-shrink-0 ${className}`}
      style={{ background: MARK, ...font }}
    >
      {n}
    </span>
  );
}

function Cell({ children, marker }) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-1 py-3 border-r border-gray-200 last:border-r-0 bg-white">
      {marker && <Marker n={marker} className="absolute -top-2 left-1" />}
      {children}
    </div>
  );
}

function ProductRow({ name, price }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-gray-200">
      <span className="w-9 h-8 rounded-md border border-[#3a2f63] text-[12px] text-[#3a2f63] flex items-center justify-center">1×</span>
      <div className="flex-1 min-w-0 leading-tight">
        <p className="text-[9px] text-gray-500">Drinks</p>
        <p className="text-[13px] text-[#2b2146] truncate">{name}</p>
      </div>
      <span className="text-[12px] text-[#3a2f63]">{price}</span>
      <span className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
        <ArrowRight size={11} className="text-gray-500" />
      </span>
    </div>
  );
}

export default function OrderDetailsMock() {
  return (
    <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[26px] border border-gray-200 shadow-lg" style={font}>
      {/* Κεφαλίδα */}
      <div className="flex items-center px-3 py-3" style={{ background: HEADER }}>
        <span className="w-7 h-7 rounded-full border border-white/80 flex items-center justify-center">
          <ArrowLeft size={15} className="text-white" />
        </span>
        <span className="flex-1 text-center text-[14px] font-semibold text-white">Στοιχεία Παραγγελίας</span>
        <MoreHorizontal size={20} className="text-white/90" />
      </div>

      <div style={{ background: "#eef3f8" }}>
        {/* Κατάσταση & ώρα */}
        <div className="relative flex items-center justify-between px-4 pt-4 pb-6">
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#2b2146] tracking-wide">
            <Marker n={1} />
            ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-[#3a2f63]">
            <Clock size={13} className="text-gray-500" /> 00:04:35
            <Marker n={2} />
          </span>
        </div>

        {/* Άτομα / Τραπέζι / Δωμάτιο / Χρώμα */}
        <div className="grid grid-cols-4 border-y border-gray-200">
          <Cell marker={3}>
            <span className="flex items-center gap-1 text-[10px] text-gray-500"><Users size={11} /> Άτομα</span>
            <span className="text-[12px] text-transparent select-none">–</span>
          </Cell>
          <Cell marker={4}>
            <span className="text-[10px] text-gray-500">Τραπέζι</span>
            <span className="text-[13px] text-[#2b2146]">Όρθιοι</span>
          </Cell>
          <Cell>
            <span className="text-[10px] text-gray-500">Δωμάτιο</span>
            <span className="text-[12px] text-transparent select-none">–</span>
          </Cell>
          <Cell marker={5}>
            <span className="flex items-center gap-1 text-[10px] text-gray-500"><Palette size={11} /> Χρώμα</span>
            <span className="w-4 h-4 rounded-full border-2 border-[#3a2f63]" />
          </Cell>
        </div>

        {/* Σχόλιο */}
        <div className="relative px-4 py-3 bg-white border-b border-gray-200">
          <span className="text-[13px] text-gray-400">Εισάγετε σχόλιο</span>
          <Marker n={6} className="absolute top-1/2 -translate-y-1/2 right-3" />
        </div>

        {/* Προϊόντα */}
        <div className="relative flex items-center gap-1.5 px-4 pt-4 pb-2">
          <span className="text-[11px] font-semibold text-gray-600 tracking-wide">2 ΠΡΟΪΟΝΤΑ</span>
          <Marker n={7} />
        </div>
        <ProductRow name="Lungo" price="2,26" />
        <ProductRow name="HAVANA 7 (Φ)" price="70,00" />

        {/* Σύνολο */}
        <div className="relative flex items-center gap-3 px-4 py-3" style={{ background: "#d3d3e6" }}>
          <span className="relative w-9 h-7 rounded-md border border-red-500 bg-white flex items-center justify-center">
            <Ticket size={14} className="text-red-500" />
            <Lock size={9} className="absolute -top-1 -right-1 text-blue-600" />
          </span>
          <span className="flex-1 text-[15px] text-[#2b2146]">Σύνολο</span>
          <span className="text-[16px] text-[#2b2146]">72,26 €</span>
          <Marker n={8} className="absolute -top-2 right-3" />
        </div>

        <div className="h-16" />
      </div>

      {/* Κάτω μπάρα */}
      <div className="flex items-center justify-between px-5 py-3" style={{ background: HEADER }}>
        <Printer size={19} className="text-white/85" />
        <span className="relative">
          <Wine size={19} className="text-white/85" />
          <Plus size={10} className="absolute -bottom-1 -right-1 text-white/85" />
        </span>
      </div>
    </div>
  );
}
