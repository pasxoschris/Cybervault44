import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useResellerSettings, useSaveSettings } from '@/hooks/useResellerSettings';

const DEFAULTS = {
  company_name: 'CyberVault', company_address: '', company_vat_number: '',
  public_email: '', public_phone: '', offer_validity_days: 30,
  default_vat_rate: 24, default_email_subject: 'Προσφορά Spotlight POS – CyberVault',
  default_email_body: 'Αγαπητέ/ή,\n\nΣας αποστέλλουμε την προσφορά μας.\n\nΜε εκτίμηση,\nΗ ομάδα CyberVault',
  default_terms: ''
};

export default function ResellerSettingsTab() {
  const { data: existing } = useResellerSettings();
  const saveSettings = useSaveSettings();

  const [form, setForm] = useState(DEFAULTS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (existing) setForm({ ...DEFAULTS, ...existing });
  }, [existing]);

  const handleSave = async () => {
    await saveSettings.mutateAsync(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls = "w-full bg-[#0E1235] border border-[#2A3580] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 placeholder-white/20";
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5">
        <h3 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">Στοιχεία Εταιρείας</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className="text-white/40 text-xs block mb-1">Επωνυμία</label><input value={form.company_name} onChange={e => set('company_name', e.target.value)} className={inputCls} /></div>
          <div><label className="text-white/40 text-xs block mb-1">ΑΦΜ</label><input value={form.company_vat_number} onChange={e => set('company_vat_number', e.target.value)} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="text-white/40 text-xs block mb-1">Διεύθυνση</label><input value={form.company_address} onChange={e => set('company_address', e.target.value)} className={inputCls} /></div>
          <div><label className="text-white/40 text-xs block mb-1">Email Επικοινωνίας</label><input value={form.public_email} onChange={e => set('public_email', e.target.value)} className={inputCls} /></div>
          <div><label className="text-white/40 text-xs block mb-1">Τηλέφωνο</label><input value={form.public_phone} onChange={e => set('public_phone', e.target.value)} className={inputCls} /></div>
        </div>
      </div>

      <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5">
        <h3 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">Ρυθμίσεις Προσφορών</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className="text-white/40 text-xs block mb-1">Ισχύς Προσφοράς (ημέρες)</label><input type="number" min={1} value={form.offer_validity_days} onChange={e => set('offer_validity_days', parseInt(e.target.value) || 30)} className={inputCls} /></div>
          <div><label className="text-white/40 text-xs block mb-1">Προεπιλεγμένο ΦΠΑ %</label><input type="number" min={0} max={100} value={form.default_vat_rate} onChange={e => set('default_vat_rate', parseFloat(e.target.value) || 24)} className={inputCls} /></div>
        </div>
      </div>

      <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5">
        <h3 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">Προεπιλογές Email</h3>
        <div className="space-y-3">
          <div><label className="text-white/40 text-xs block mb-1">Θέμα Email</label><input value={form.default_email_subject} onChange={e => set('default_email_subject', e.target.value)} className={inputCls} /></div>
          <div><label className="text-white/40 text-xs block mb-1">Σώμα Email</label><textarea value={form.default_email_body} onChange={e => set('default_email_body', e.target.value)} rows={4} className={inputCls} /></div>
        </div>
      </div>

      <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5">
        <h3 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">Όροι & Προϋποθέσεις</h3>
        <textarea value={form.default_terms} onChange={e => set('default_terms', e.target.value)} rows={5} className={inputCls} placeholder="Εισάγετε τους προεπιλεγμένους όρους προσφοράς..." />
      </div>

      <button onClick={handleSave} disabled={saveSettings.isPending}
        className="flex items-center gap-2 px-6 py-2.5 bg-[#00CFFF] text-[#0E1235] rounded-xl font-bold text-sm hover:bg-[#00CFFF]/80 transition-colors disabled:opacity-50">
        <Save size={15} /> {saveSettings.isPending ? 'Αποθήκευση...' : saved ? '✓ Αποθηκεύτηκε!' : 'Αποθήκευση'}
      </button>
    </div>
  );
}