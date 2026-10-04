import React from "react";
import { ChevronLeft, MoreVertical, Clock, Users, Palette, Printer, Wine, Plus, Ticket, ChevronRight } from "lucide-react";

const OPTIONS = [
  { label: "Δελτίο Παραγγελίας", color: "#3e78e1" },
  { label: "Απόδειξη Λιανικής Πώλησης", color: "#3e78e1" },
  { label: "Αργότερα", color: "#de4a4a" },
  { label: "Ακύρωση", color: "#3e78e1" },
];

function MockStat({ icon: Icon, label, value, swatch }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="flex items-center gap-1 text-[10px] text-gray-500">
        {Icon ? <Icon size={12} className="text-gray-400" /> : null}
        {label}
      </span>
      {swatch
        ? <span className="w-4 h-4 rounded-full border border-gray-300 bg-gray-100" />
        : <span className="text-[10px] text-gray-700 max-w-full truncate">{value || "\u00A0"}</span>}
    </div>
  );
}

export default function ReceiptIssueMock() {
  return (
    <div className="mx-auto w-full max-w-[380px] overflow-hidden rounded-[26px] border border-gray-200 shadow-lg">
      <div className="relative bg-white">
        {/* Header */}
        <div className="flex items-center px-3 py-3" style={{ background: "#2d2d44" }}>
          <ChevronLeft size={20} className="text-white/90" />
          <span className="flex-1 text-center text-[13px] font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>Στοιχεία Παραγγελίας</span>
          <MoreVertical size={18} className="text-white/90" />
        </div>

        {/* Παραγγελία */}
        <div className="px-4 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-wide text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ</span>
            <span className="flex items-center gap-1 text-[10px] text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
              <Clock size={11} /> 08:18:02
            </span>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2 border-b border-gray-100 pb-3">
            <MockStat icon={Users} label="Άτομα" value="—" />
            <MockStat label="Τράπεζι" value="Όρθιοι" />
            <MockStat label="Δωμάτιο" value="" />
            <MockStat icon={Palette} label="Χρώμα" swatch />
          </div>

          <div className="mt-3 rounded-lg bg-gray-100 px-3 py-2 text-[11px] text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
            Εισάγετε σχόλιο
          </div>

          <p className="mt-4 text-[10px] font-semibold tracking-wide text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>1 ΠΡΟΪΟΝ</p>
          <div className="mt-2 flex items-center gap-2 border-b border-gray-100 pb-3">
            <span className="text-[11px] text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>1x</span>
            <span className="flex-1 truncate text-[11px] text-gray-800" style={{ fontFamily: "Inter, sans-serif" }}>Drinks | Lun…</span>
            <span className="text-[11px] font-semibold text-gray-800" style={{ fontFamily: "Inter, sans-serif" }}>2,26</span>
            <ChevronRight size={13} className="text-gray-300" />
          </div>

          <div className="mt-3 flex items-center gap-2 pb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded border border-gray-300">
              <Ticket size={12} className="text-gray-500" />
            </span>
            <span className="text-[12px] font-bold text-gray-900" style={{ fontFamily: "Inter, sans-serif" }}>Σύνολο: 2,26 €</span>
          </div>
        </div>

        {/* Κάτω μπάρα */}
        <div className="flex items-center justify-between px-5 py-3" style={{ background: "#2d2d44" }}>
          <Printer size={17} className="text-white/85" />
          <span className="relative">
            <Wine size={17} className="text-white/85" />
            <Plus size={9} className="absolute -bottom-1 -right-1 text-white/85" />
          </span>
        </div>

        {/* Αναδυόμενο παράθυρο «Έκδοση Παραστατικού» */}
        <div className="absolute inset-0 flex items-center justify-center px-7" style={{ background: "rgba(0,0,0,0.35)" }}>
          <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl">
            <p className="px-4 py-3.5 text-center text-[14px] font-bold text-black" style={{ fontFamily: "Inter, sans-serif" }}>
              Έκδοση Παραστατικού
            </p>
            {OPTIONS.map((opt) => (
              <p
                key={opt.label}
                className="border-t border-gray-200 px-4 py-3 text-center text-[13px]"
                style={{ color: opt.color, fontFamily: "Inter, sans-serif" }}
              >
                {opt.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}