export function StepCard({ number, title, children }) {
  return (
    <div className="relative border border-[#00D4FF]/10 bg-[#0D1526]/70 p-5 flex gap-4">
      {/* Number */}
      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center border border-purple-500/40 bg-purple-900/20">
        <span className="font-orbitron text-sm font-bold text-[#A78BFA]">{number}</span>
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-orbitron text-sm font-bold text-white mb-2 tracking-wide">{title}</h3>
        <div className="font-rajdhani text-base text-white/60 leading-relaxed [&_strong]:text-white/90 [&_strong]:font-semibold">
          {children}
        </div>
      </div>
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-500/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-500/20" />
    </div>
  );
}

export function InfoBox({ icon, title, children, variant = 'info' }) {
  const styles = {
    info: 'border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF]/70',
    success: 'border-green-500/20 bg-green-900/10 text-green-400/70',
    warning: 'border-yellow-500/20 bg-yellow-900/10 text-yellow-400/70',
  };

  return (
    <div className={`border p-4 flex gap-3 font-rajdhani text-base leading-relaxed ${styles[variant]}`}>
      {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
      <div className="[&_strong]:font-semibold [&_strong]:text-white/80">
        {title && <p className="font-orbitron text-xs font-bold text-white/70 mb-1 tracking-wide">{title}</p>}
        {children}
      </div>
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="w-1 h-5 bg-[#A78BFA]" />
      <h2 className="font-orbitron text-base font-bold text-white tracking-wide">{children}</h2>
    </div>
  );
}

export function FieldRow({ label, value }) {
  return (
    <div className="flex items-start gap-2 py-2 border-b border-[#00D4FF]/10 last:border-0 font-rajdhani text-sm">
      <span className="text-white/80 font-semibold min-w-[160px] flex-shrink-0">{label}</span>
      <span className="text-white/50">{value}</span>
    </div>
  );
}