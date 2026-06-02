import Navbar from '@/components/layout/Navbar';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import SeoHead from '@/components/SeoHead';

export default function Contact() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: '#0D0E2E' }}>
      <SeoHead
        title="Επικοινωνία | CyberVault E.E."
        description="Επικοινωνήστε με την CyberVault E.E. για τεχνική υποστήριξη, εγκατάσταση δικτύων ή πληροφορίες για τις υπηρεσίες μας. Στείλτε μήνυμα ή καλέστε μας σήμερα."
        path="/contact"
      />
      <Navbar />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}