import Navbar from '@/components/layout/Navbar';
import ServicesSection from '@/components/sections/ServicesSection';
import Footer from '@/components/layout/Footer';
import SeoHead from '@/components/SeoHead';

export default function Services() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: '#0D0E2E' }}>
      <SeoHead
        title="Υπηρεσίες IT & Ασφάλεια Δικτύων | CyberVault"
        description="Δίκτυα, ασφάλεια πληροφοριών, POS συστήματα, κάμερες ασφαλείας & τεχνική υποστήριξη. Ανακαλύψτε τις επαγγελματικές υπηρεσίες της CyberVault E.E."
        path="/services"
      />
      <Navbar />
      <div className="pt-20">
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
}