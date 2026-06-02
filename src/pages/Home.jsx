import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import Footer from '@/components/layout/Footer';
import SeoHead from '@/components/SeoHead';

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: '#0D0E2E', backgroundImage: 'url(https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/c4aa2d11e_image.jpg)', backgroundSize: 'cover', backgroundPosition: 'bottom right', backgroundAttachment: 'fixed' }}>
      <SeoHead
        title="CyberVault — Τεχνική Υποστήριξη & Ασφάλεια Δικτύων"
        description="CyberVault E.E.: επαγγελματικές υπηρεσίες δικτύων, ασφάλειας πληροφοριών & τεχνικής υποστήριξης για επιχειρήσεις στην Ελλάδα. Αξιόπιστοι τεχνολογικοί εταίροι."
        path="/"
      />
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
}