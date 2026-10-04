import React from "react";

export default function ConnectNote({ icon: Icon, title, children, variant = "info" }) {
  const styles = {
    info: "border-[#00CFFF]/20 bg-[#131840]/40",
    warning: "border-amber-400/30 bg-amber-400/5",
  };

  const iconColor = variant === "warning" ? "text-amber-400" : "text-[#00CFFF]";

  return (
    <div className={`rounded-2xl border p-5 ${styles[variant]}`}>
      <div className="flex items-start gap-3">
        {Icon && <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} strokeWidth={1.5} />}
        <div>
          {title && (
            <p
              className="font-orbitron text-sm font-semibold text-white/90 mb-1.5 tracking-wide"
            >
              {title}
            </p>
          )}
          <div
            className="text-white/60 text-sm leading-relaxed [&_strong]:text-white/90 [&_strong]:font-semibold"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}