import React from "react";

export function StepCard({ number, title, children, variant = "default" }) {
  const variants = {
    default: "bg-white border-gray-100 shadow-sm",
    highlight: "bg-purple-50 border-purple-200",
    warning: "bg-orange-50 border-orange-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <div className={`border rounded-2xl p-6 ${variants[variant]}`}>
      <div className="flex items-start gap-5">
        {number && (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5 text-white shadow-md"
            style={{ background: "linear-gradient(135deg, #5B21B6, #2D2B55)" }}
          >
            {number}
          </div>
        )}
        <div className="flex-1">
          {title && <h3 className="font-orbitron font-bold text-gray-900 text-base mb-2">{title}</h3>}
          <div className="font-rajdhani text-gray-600 text-lg leading-relaxed space-y-2 [&_strong]:text-gray-800 [&_strong]:font-semibold">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InfoBox({ icon = "💡", title, children, variant = "info" }) {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-green-50 border-green-200 text-green-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
  };

  return (
    <div className={`border rounded-2xl p-6 ${variants[variant]}`}>
      <div className="flex items-start gap-4">
        <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
        <div className="font-rajdhani text-lg leading-relaxed">
          {title && <p className="font-orbitron text-sm font-bold mb-1.5 tracking-wide">{title}</p>}
          <div className="[&_strong]:font-semibold">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
      <h2 className="font-orbitron text-lg font-bold text-gray-900">{children}</h2>
    </div>
  );
}

export function FieldRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="font-rajdhani text-sm text-gray-500 font-medium">{label}</span>
      <span className="font-rajdhani text-sm text-gray-800 text-right">{value}</span>
    </div>
  );
}