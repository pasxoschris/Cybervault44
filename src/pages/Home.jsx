import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: '#0D0E2E', backgroundImage: 'url(https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/c4aa2d11e_image.jpg)', backgroundSize: 'cover', backgroundPosition: 'bottom right', backgroundAttachment: 'fixed' }}>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}