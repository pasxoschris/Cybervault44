import { Network, Shield, Eye, Lock, Radio, Server } from 'lucide-react';

const services = [
  {
    icon: Network,
    title: 'Network Defense',
    code: 'SVC-001',
    description:
      'Comprehensive perimeter protection and network segmentation strategies. We design and deploy multi-layered defense architectures to keep threats out of your infrastructure.',
    tags: ['Firewall Management', 'IDS/IPS', 'DMZ Architecture'],
  },
  {
    icon: Eye,
    title: 'Threat Intelligence',
    code: 'SVC-002',
    description:
      'Real-time threat monitoring and intelligence feeds tailored to your industry. Proactive identification of emerging threats before they impact your systems.',
    tags: ['Dark Web Monitoring', 'IOC Feeds', 'Threat Hunting'],
  },
  {
    icon: Lock,
    title: 'Zero Trust Security',
    code: 'SVC-003',
    description:
      'Implement a "never trust, always verify" security model across your entire network. Identity-based access controls and micro-segmentation for modern enterprises.',
    tags: ['IAM', 'Micro-segmentation', 'MFA'],
  },
  {
    icon: Radio,
    title: 'Incident Response',
    code: 'SVC-004',
    description:
      'Rapid incident response and forensic investigation services. Our team is available 24/7 to contain breaches, recover systems, and prevent recurrence.',
    tags: ['24/7 Response', 'Digital Forensics', 'Recovery'],
  },
  {
    icon: Server,
    title: 'Infrastructure Hardening',
    code: 'SVC-005',
    description:
      'Systematic security assessments and hardening of servers, endpoints, and network devices. Vulnerability scanning, patching management, and configuration reviews.',
    tags: ['Pen Testing', 'Patch Management', 'Config Audit'],
  },
  {
    icon: Shield,
    title: 'Compliance & Audit',
    code: 'SVC-006',
    description:
      'Navigate complex regulatory requirements with confidence. We help organizations achieve and maintain compliance with ISO 27001, GDPR, NIS2, and more.',
    tags: ['ISO 27001', 'GDPR', 'NIS2'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-[#0A0E1A] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A] via-transparent to-[#0A0E1A] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="font-mono-cyber text-xs text-[#00D4FF]/60 tracking-[0.4em] uppercase mb-4">
            // SERVICES.CATALOG //
          </div>
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
            NETWORK <span className="text-[#00D4FF] glow-cyan">SECURITY</span> SOLUTIONS
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent mx-auto mb-6" />
          <p className="font-rajdhani text-lg text-white/50 max-w-2xl mx-auto">
            Enterprise-grade cybersecurity services designed to protect, detect, and respond to modern network threats.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.code} className="service-card p-6 group cursor-default relative">
                {/* Code label */}
                <div className="font-mono-cyber text-[10px] text-[#00D4FF]/30 tracking-widest mb-4">
                  {service.code}
                </div>

                {/* Icon */}
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 border border-[#00D4FF]/30 bg-[#00D4FF]/5 group-hover:bg-[#00D4FF]/10 group-hover:border-[#00D4FF]/50 transition-all">
                  <Icon className="w-5 h-5 text-[#00D4FF]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-orbitron text-sm font-bold text-white mb-3 tracking-wider group-hover:text-[#00D4FF] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-rajdhani text-sm text-white/50 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-cyber text-[10px] text-[#00D4FF]/50 border border-[#00D4FF]/15 px-2 py-1 tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00D4FF]/30 group-hover:border-[#00D4FF]/60 transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#00D4FF]/30 group-hover:border-[#00D4FF]/60 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}