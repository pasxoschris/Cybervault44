import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Αρχική', href: '#home' },
    { label: 'Υπηρεσίες', href: '#services' },
    { label: 'Σχετικά', href: '#about' },
    { label: 'Πελάτες', href: '#clients' },
    { label: 'Επικοινωνία', href: '#contact' },
  ];

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
    setActiveSection(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080c18]/95 backdrop-blur-md border-b border-[#00D4FF]/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 group">
          <div className="relative">
            <Shield className="w-8 h-8 text-[#00D4FF] animate-pulse-glow" strokeWidth={1.5} />
            <div className="absolute inset-0 bg-[#00D4FF]/20 rounded-full blur-md group-hover:bg-[#00D4FF]/30 transition-all" />
          </div>
          <span className="font-orbitron text-base font-bold text-white tracking-widest">
            CYBER<span className="text-[#00D4FF]">VAULT</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="cyber-btn text-xs py-2.5 px-5"
          >
            Αίτημα Προσφοράς
          </button>
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
        <div className="md:hidden bg-[#080c18]/98 border-t border-[#00D4FF]/20 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="nav-link text-left text-sm"
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#contact')} className="cyber-btn text-xs py-3 mt-2">
            Αίτημα Προσφοράς
          </button>
        </div>
      )}
    </nav>
  );
}