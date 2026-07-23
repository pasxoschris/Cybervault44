import React from "react";

export function SpotlightBarsIcon({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="11" width="5" height="11" rx="2.5" fill="currentColor" />
      <rect x="9.5" y="3" width="5" height="19" rx="2.5" fill="currentColor" />
      <rect x="17" y="7" width="5" height="15" rx="2.5" fill="currentColor" />
    </svg>
  );
}

export default function SpotlightBrand({ size = 22 }) {
  return (
    <div className="inline-flex items-center gap-2 text-white">
      <SpotlightBarsIcon size={size} />
      <span
        className="font-bold lowercase tracking-tight leading-none"
        style={{ fontFamily: 'Inter, sans-serif', fontSize: `${size * 0.8}px` }}
      >
        spotlight
      </span>
    </div>
  );
}