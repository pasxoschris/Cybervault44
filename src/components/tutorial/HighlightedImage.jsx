import React from "react";

/**
 * Shows a screenshot with an absolutely-positioned highlight circle overlay.
 * coords = { x, y, r } as percentages of the image dimensions (0-100).
 */
export default function HighlightedImage({ src, alt, coords, caption }) {
  return (
    <div className="w-full">
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#00D4FF]/10">
        <img src={src} alt={alt} className="w-full h-auto block" />
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <ellipse
            cx={coords.x}
            cy={coords.y}
            rx={coords.r}
            ry={coords.r * (coords.ryRatio || 1)}
            fill="rgba(179, 36, 131, 0.12)"
            stroke="#b32483"
            strokeWidth="0.6"
            strokeDasharray="2 1.2"
            style={{ filter: "drop-shadow(0 0 4px rgba(179,36,131,0.5))" }}
          />
        </svg>
      </div>
      {caption && (
        <p className="text-center text-xs text-white/40 mt-2 font-rajdhani">{caption}</p>
      )}
    </div>
  );
}