import Navbar from '@/components/layout/Navbar';
import ServicesSection from '@/components/sections/ServicesSection';
import Footer from '@/components/layout/Footer';

export default function Services() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: '#0D0E2E' }}>
      <Navbar />
      <div className="pt-20">
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
}