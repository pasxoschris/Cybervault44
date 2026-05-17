export function StepCard({ number, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
      {/* Number */}
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-orbitron text-sm font-bold">
        {number}
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-orbitron text-sm font-bold text-gray-900 mb-2">{title}</h3>
        <div className="font-rajdhani text-base text-gray-500 leading-relaxed [&_strong]:text-gray-700 [&_strong]:font-semibold">
          {children}
        </div>
      </div>
    </div>
  );
}

export function InfoBox({ icon, title, children, variant = 'info' }) {
  const styles = {
    info: 'border-blue-100 bg-blue-50 text-blue-700',
    success: 'border-green-100 bg-green-50 text-green-700',
    warning: 'border-yellow-100 bg-yellow-50 text-yellow-700',
  };

  const iconStyles = {
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
  };

  return (
    <div className={`border rounded-2xl p-4 flex gap-3 font-rajdhani text-base leading-relaxed ${styles[variant]}`}>
      {icon && <span className={`text-lg flex-shrink-0 ${iconStyles[variant]}`}>{icon}</span>}
      <div className="[&_strong]:font-semibold">
        {title && <p className="font-orbitron text-xs font-bold mb-1 tracking-wide">{title}</p>}
        {children}
      </div>
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="w-1 h-5 bg-purple-600 rounded-full" />
      <h2 className="font-orbitron text-base font-bold text-gray-900">{children}</h2>
    </div>
  );
}

export function FieldRow({ label, value }) {
  return (
    <div className="flex items-start gap-2 py-2 border-b border-gray-100 last:border-0 font-rajdhani text-sm">
      <span className="text-gray-800 font-semibold min-w-[160px] flex-shrink-0">{label}</span>
      <span className="text-gray-500">{value}</span>
    </div>
  );
}