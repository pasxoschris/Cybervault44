import { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    await base44.integrations.Core.SendEmail({
      to: 'info@cybervault.gr',
      subject: `Quote Request from ${form.name} — ${form.company}`,
      body: `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nMessage:\n${form.message}`,
    });
    setStatus('success');
    setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-24 bg-[#080c18] overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080c18] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="font-mono-cyber text-xs text-[#00D4FF]/60 tracking-[0.4em] uppercase mb-4">
            // INITIATE.CONTACT //
          </div>
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
            REQUEST A <span className="text-[#00D4FF] glow-cyan">SECURITY QUOTE</span>
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: info */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="font-orbitron text-xs text-white/40 tracking-widest uppercase mb-6">Contact Channels</div>
              <div className="flex flex-col gap-5">
                {[
                  { icon: Phone, label: '+30 210 XXX XXXX', sublabel: 'Mon–Fri, 09:00–18:00 EET' },
                  { icon: Mail, label: 'info@cybervault.gr', sublabel: 'Response within 4 hours' },
                  { icon: MapPin, label: 'Athens, Greece', sublabel: 'Serving clients across the EU' },
                ].map(({ icon: Icon, label, sublabel }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-[#00D4FF]/20 bg-[#00D4FF]/5 mt-0.5">
                      <Icon className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-rajdhani text-sm font-semibold text-white/80">{label}</div>
                      <div className="font-rajdhani text-xs text-white/35 mt-0.5">{sublabel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response SLA */}
            <div className="border border-[#00D4FF]/20 bg-[#0D1526]/60 p-5">
              <div className="font-mono-cyber text-[10px] text-[#00D4FF]/40 tracking-widest uppercase mb-3">Response SLA</div>
              {[
                { label: 'Critical Incidents', value: '< 1 hour' },
                { label: 'General Inquiries', value: '< 4 hours' },
                { label: 'Quote Requests', value: '< 24 hours' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-[#00D4FF]/10 last:border-0">
                  <span className="font-rajdhani text-xs text-white/45">{label}</span>
                  <span className="font-mono-cyber text-xs text-[#00D4FF]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="border border-[#00D4FF]/30 bg-[#0D1526]/80 p-12 flex flex-col items-center justify-center text-center h-full gap-5">
                <CheckCircle className="w-12 h-12 text-[#00D4FF] animate-pulse-glow" strokeWidth={1.5} />
                <div className="font-orbitron text-sm font-bold text-[#00D4FF] tracking-widest">TRANSMISSION SUCCESSFUL</div>
                <div className="font-rajdhani text-base text-white/55">
                  Your request has been received. A security advisor will contact you within 24 hours.
                </div>
                <button onClick={() => setStatus('idle')} className="cyber-btn mt-4 text-xs py-3 px-6">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-[#00D4FF]/15 bg-[#0D1526]/60 p-8">
                <div className="font-mono-cyber text-[10px] text-[#00D4FF]/40 tracking-widest uppercase mb-6">
                  SECURE_FORM :: SSL ENCRYPTED
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  {[
                    { name: 'name', placeholder: 'Full Name *', required: true },
                    { name: 'company', placeholder: 'Company Name *', required: true },
                    { name: 'email', placeholder: 'Business Email *', required: true, type: 'email' },
                    { name: 'phone', placeholder: 'Phone Number', required: false },
                  ].map((field) => (
                    <div key={field.name}>
                      <input
                        name={field.name}
                        type={field.type || 'text'}
                        required={field.required}
                        placeholder={field.placeholder}
                        value={form[field.name]}
                        onChange={handleChange}
                        className="cyber-input"
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="cyber-input"
                    required
                  >
                    <option value="" disabled>Select Service *</option>
                    <option value="network-defense">Network Defense</option>
                    <option value="threat-intelligence">Threat Intelligence</option>
                    <option value="zero-trust">Zero Trust Security</option>
                    <option value="incident-response">Incident Response</option>
                    <option value="infrastructure-hardening">Infrastructure Hardening</option>
                    <option value="compliance">Compliance & Audit</option>
                    <option value="other">Other / General Inquiry</option>
                  </select>
                </div>

                <div className="mb-7">
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your security needs or current challenges... *"
                    value={form.message}
                    onChange={handleChange}
                    className="cyber-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="cyber-btn w-full flex items-center justify-center gap-3"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#00D4FF]/30 border-t-[#00D4FF] rounded-full animate-spin" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      SEND SECURE REQUEST
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}