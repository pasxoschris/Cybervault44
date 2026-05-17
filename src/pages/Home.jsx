import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: '#0D0E2E' }}>
      {/* Bottom-right dots decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0}}>
          <defs>
            <radialGradient id="dotFade" cx="100%" cy="100%" r="70%">
              <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.9"/>
              <stop offset="40%" stopColor="#4488FF" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#1a2060" stopOpacity="0"/>
            </radialGradient>
          </defs>
          {Array.from({length: 18}).map((_, row) =>
            Array.from({length: 22}).map((_, col) => {
              const x = 100 - (col * 4.5);
              const y = 100 - (row * 5.5);
              const distFromCorner = Math.sqrt(Math.pow(100 - x, 2) + Math.pow(100 - y, 2));
              if (distFromCorner > 65) return null;
              const opacity = Math.max(0, 1 - distFromCorner / 65);
              const r = 0.55 + opacity * 0.45;
              const curve = Math.pow(distFromCorner / 65, 0.5) * 8;
              return (
                <ellipse
                  key={`${row}-${col}`}
                  cx={`${x - curve}%`}
                  cy={`${y}%`}
                  rx={`${r}%`}
                  ry={`${r * 0.65}%`}
                  fill={`rgba(${Math.round(40 + opacity * 160)}, ${Math.round(120 + opacity * 100)}, 255, ${opacity * 0.85})`}
                />
              );
            })
          )}
        </svg>
      </div>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}