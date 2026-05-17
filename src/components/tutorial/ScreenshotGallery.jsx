import { useState } from 'react';

export function ScreenshotGallery({ images, caption }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="border border-[#00D4FF]/10 bg-[#0D1526]/70 p-4 flex flex-col gap-3">
      {/* Main image */}
      <div className="relative overflow-hidden bg-[#080c20] flex items-center justify-center min-h-48 rounded-sm">
        <img
          src={images[active]}
          alt={caption}
          className="max-h-80 w-auto object-contain rounded-sm"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-14 h-14 border overflow-hidden flex-shrink-0 transition-all ${
                i === active ? 'border-purple-500/70' : 'border-[#00D4FF]/10 opacity-50 hover:opacity-80'
              }`}
            >
              <img src={src} alt={`screenshot ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Caption */}
      {caption && (
        <p className="font-mono-cyber text-[9px] text-white/25 tracking-widest uppercase">{caption}</p>
      )}
    </div>
  );
}