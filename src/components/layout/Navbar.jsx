import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    base44.auth.me().then(u => { if (u?.role === 'admin') setIsAdmin(true); }).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Αρχική', to: '/', scrollTop: true },
    { label: 'Υπηρεσίες', to: '/services' },
    { label: 'SpotlightPOS Guide', to: '/spotlight-pos-guide' },
    { label: 'Service Desk', to: '/service-desk' },
  ];

  const contactLink = { label: 'Επικοινωνία', to: '/contact' };
  const adminLink = { label: 'Whitelist', to: '/admin/whitelist' };
  const storesLink = { label: 'Καταστήματα', to: '/stores' };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 relative bg-[#0a0e2e]/95 backdrop-blur-md border-b border-[#00CFFF]/10`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group">
          <div className="relative">
            <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/71e29efae_web-app-manifest-512x512.png" alt="CyberVault Logo" className="w-9 h-9 object-contain" />
            <div className="absolute inset-0 bg-[#00D4FF]/10 rounded-full blur-md group-hover:bg-[#00D4FF]/20 transition-all" />
          </div>
          <span className="font-orbitron text-base font-bold tracking-widest">
            <span className="text-[#00D4FF]">CYBER</span><span className="text-white">VAULT</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={link.scrollTop ? scrollToTop : undefined}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to={storesLink.to} className="nav-link">
              {storesLink.label}
            </Link>
          )}
          {isAdmin && (
            <Link to={adminLink.to} className="nav-link">
              {adminLink.label}
            </Link>
          )}
          <Link to={contactLink.to} className="cyber-btn !py-2 !px-5 text-xs">
            {contactLink.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#00D4FF] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0E1235] border-t border-[#00D4FF]/20 px-6 py-6 flex flex-col gap-5 items-end" style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100 }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => { setMobileOpen(false); if (link.scrollTop) scrollToTop(); }}
              className="nav-link text-left text-sm"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to={storesLink.to}
              onClick={() => setMobileOpen(false)}
              className="nav-link text-left text-sm"
            >
              {storesLink.label}
            </Link>
          )}
          {isAdmin && (
            <Link
              to={adminLink.to}
              onClick={() => setMobileOpen(false)}
              className="nav-link text-left text-sm"
            >
              {adminLink.label}
            </Link>
          )}
          <Link
            to={contactLink.to}
            onClick={() => setMobileOpen(false)}
            className="nav-link text-left text-sm"
          >
            {contactLink.label}
          </Link>
        </div>
      )}
    </nav>
  );
}