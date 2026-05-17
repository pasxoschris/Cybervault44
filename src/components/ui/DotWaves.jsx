import React from "react";

export default function DotWaves() {
  const dots = [];

  const waves = [
    { startAngle: 200, endAngle: 320, radius: 420, cx: 105, cy: 105, dotCount: 22, color1: [255,255,255], color2: [0,180,255] },
    { startAngle: 200, endAngle: 320, radius: 370, cx: 105, cy: 105, dotCount: 20, color1: [200,220,255], color2: [0,160,255] },
    { startAngle: 200, endAngle: 320, radius: 320, cx: 105, cy: 105, dotCount: 18, color1: [150,180,255], color2: [0,140,220] },
    { startAngle: 200, endAngle: 320, radius: 270, cx: 105, cy: 105, dotCount: 16, color1: [120,150,220], color2: [0,120,200] },
    { startAngle: 200, endAngle: 320, radius: 220, cx: 105, cy: 105, dotCount: 14, color1: [100,130,200], color2: [0,100,180] },
  ];

  waves.forEach((wave, wi) => {
    const angleStep = (wave.endAngle - wave.startAngle) / (wave.dotCount - 1);
    for (let i = 0; i < wave.dotCount; i++) {
      const angle = (wave.startAngle + i * angleStep) * (Math.PI / 180);
      const x = wave.cx + wave.radius * Math.cos(angle);
      const y = wave.cy + wave.radius * Math.sin(angle);

      const t = i / (wave.dotCount - 1);
      const edgeFade = Math.sin(t * Math.PI);
      const opacity = Math.max(0, 0.15 + edgeFade * 0.75);
      const size = Math.max(3, 4 + edgeFade * 8);

      const [r1, g1, b1] = wave.color1;
      const [r2, g2, b2] = wave.color2;
      const r = Math.round(r1 + (r2 - r1) * (1 - edgeFade));
      const g = Math.round(g1 + (g2 - g1) * (1 - edgeFade));
      const b = Math.round(b1 + (b2 - b1) * (1 - edgeFade));

      dots.push(
        <ellipse
          key={`${wi}-${i}`}
          cx={x}
          cy={y}
          rx={size * 0.65}
          ry={size * 0.45}
          fill={`rgba(${r},${g},${b},${opacity})`}
          transform={`rotate(${wave.startAngle + i * angleStep - 90}, ${x}, ${y})`}
        />
      );
    }
  });

  return (
    <svg
      style={{ position: 'absolute', bottom: 0, right: 0, pointerEvents: 'none' }}
      viewBox="0 0 500 500"
      width="500"
      height="500"
      xmlns="http://www.w3.org/2000/svg"
    >
      {dots}
    </svg>
  );
}