import { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, MessageCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    await base44.integrations.Core.SendEmail({
      to: 'info@cyber-vault.gr',
      subject: `Quote Request from ${form.name} — ${form.company}`,
      body: `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nMessage:\n${form.message}`,
    });
    setStatus('success');
    setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0b0f30] overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080c18] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="font-mono-cyber text-xs text-[#00D4FF]/60 tracking-[0.4em] uppercase mb-4">
            // ΕΚΚΙΝΗΣΗ.ΕΠΙΚΟΙΝΩΝΙΑΣ //
          </div>
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
            ΦΟΡΜΑ <span className="text-[#00D4FF] glow-cyan">ΕΠΙΚΟΙΝΩΝΙΑΣ</span>
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: info */}
          <div className="flex flex-col gap-4">
            <div className="font-orbitron text-xs text-white/40 tracking-widest uppercase mb-2">Κανάλια Επικοινωνίας</div>

            {/* Phone 1 */}
            <a href="tel:+306931326616" className="group flex items-center gap-4 border border-[#00D4FF]/15 bg-[#0D1526]/60 p-4 hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/5 transition-all duration-200">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#00D4FF]/30 bg-[#00D4FF]/10">
                <Phone className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono-cyber text-[9px] text-[#00D4FF]/40 tracking-widest uppercase mb-0.5">Κινητό</div>
                <div className="font-rajdhani text-sm font-semibold text-white/85 group-hover:text-white transition-colors">(+30) 693 1326 616</div>
                <div className="font-rajdhani text-xs text-white/35">Πάντα διαθέσιμο</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            </a>

            {/* Phone 2 */}
            <a href="tel:+302104449000" className="group flex items-center gap-4 border border-[#00D4FF]/15 bg-[#0D1526]/60 p-4 hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/5 transition-all duration-200">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#00D4FF]/30 bg-[#00D4FF]/10">
                <Phone className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono-cyber text-[9px] text-[#00D4FF]/40 tracking-widest uppercase mb-0.5">Σταθερό</div>
                <div className="font-rajdhani text-sm font-semibold text-white/85 group-hover:text-white transition-colors">(+30) 210 4449 000</div>
                <div className="font-rajdhani text-xs text-white/35">24/7 διαθέσιμο</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            </a>

            {/* Email */}
            <a href="mailto:info@cyber-vault.gr" className="group flex items-center gap-4 border border-[#00D4FF]/15 bg-[#0D1526]/60 p-4 hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/5 transition-all duration-200">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#00D4FF]/30 bg-[#00D4FF]/10">
                <Mail className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono-cyber text-[9px] text-[#00D4FF]/40 tracking-widest uppercase mb-0.5">Email</div>
                <div className="font-rajdhani text-sm font-semibold text-white/85 group-hover:text-white transition-colors truncate">info@cyber-vault.gr</div>
                <div className="font-rajdhani text-xs text-white/35">Απόκριση εντός 4 ωρών</div>
              </div>
            </a>

            {/* Viber */}
            <a href="viber://chat?number=%2B306931326616" className="group flex items-center gap-4 border border-[#00D4FF]/15 bg-[#0D1526]/60 p-4 hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/5 transition-all duration-200">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#00D4FF]/30 bg-[#00D4FF]/10">
                <MessageCircle className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono-cyber text-[9px] text-[#00D4FF]/40 tracking-widest uppercase mb-0.5">Viber</div>
                <div className="font-rajdhani text-sm font-semibold text-white/85 group-hover:text-white transition-colors">(+30) 693 1326 616</div>
                <div className="font-rajdhani text-xs text-white/35">Μήνυμα άμεσα</div>
              </div>
            </a>

            {/* Address */}
            <a href="https://maps.google.com/?q=Πανεπιστημίου+64,+10564+Αθήνα" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 border border-[#00D4FF]/15 bg-[#0D1526]/60 p-4 hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/5 transition-all duration-200">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#00D4FF]/30 bg-[#00D4FF]/10">
                <MapPin className="w-4 h-4 text-[#00D4FF]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono-cyber text-[9px] text-[#00D4FF]/40 tracking-widest uppercase mb-0.5">Διεύθυνση</div>
                <div className="font-rajdhani text-sm font-semibold text-white/85 group-hover:text-white transition-colors">Πανεπιστημίου 64</div>
                <div className="font-rajdhani text-xs text-white/35">105 64 Αθήνα</div>
              </div>
            </a>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="border border-[#00D4FF]/30 bg-[#0D1526]/80 p-12 flex flex-col items-center justify-center text-center h-full gap-5">
                <CheckCircle className="w-12 h-12 text-[#00D4FF] animate-pulse-glow" strokeWidth={1.5} />
                <div className="font-orbitron text-sm font-bold text-[#00D4FF] tracking-widest">ΜΕΤΑΔΟΣΗ ΕΠΙΤΥΧΗΣ</div>
                <div className="font-rajdhani text-base text-white/55">
                  Το αίτημά σας ελήφθη. Ένας σύμβουλος ασφάλειας θα επικοινωνήσει μαζί σας εντός 24 ωρών.
                </div>
                <button onClick={() => setStatus('idle')} className="cyber-btn mt-4 text-xs py-3 px-6">
                  Νέο Αίτημα
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-[#00D4FF]/15 bg-[#0D1526]/60 p-8">
                <div className="font-mono-cyber text-[10px] text-[#00D4FF]/40 tracking-widest uppercase mb-6">
                  SECURE_FORM :: SSL ENCRYPTED
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  {[
                    { name: 'name', placeholder: 'Ονοματεπώνυμο *', required: true },
                    { name: 'company', placeholder: 'Επωνυμία Εταιρείας *', required: true },
                    { name: 'email', placeholder: 'Εταιρικό Email *', required: true, type: 'email' },
                    { name: 'phone', placeholder: 'Τηλέφωνο Επικοινωνίας', required: false },
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
                    <option value="" disabled>Επιλογή Υπηρεσίας *</option>
                    <option value="network-defense">Άμυνα Δικτύου</option>
                    <option value="threat-intelligence">Πληροφορίες Απειλών</option>
                    <option value="zero-trust">Zero Trust Ασφάλεια</option>
                    <option value="incident-response">Αντιμετώπιση Περιστατικών</option>
                    <option value="infrastructure-hardening">Ενίσχυση Υποδομής</option>
                    <option value="compliance">Συμμόρφωση & Έλεγχος</option>
                    <option value="other">Άλλο / Γενική Ερώτηση</option>
                  </select>
                </div>

                <div className="mb-7">
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Περιγράψτε τις ανάγκες ασφάλειας ή τις τρέχουσες προκλήσεις σας... *"
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
                      ΑΠΟΣΤΟΛΗ...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ
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