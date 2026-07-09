const EMPTY_CUSTOMER = { store_name: '', company_legal_name: '', vat_number: '', address: '', contact_person: '', email: '', phone: '', notes: '' };

export { EMPTY_CUSTOMER };

export default function CustomerForm({ customer, onChange }) {
  const inputCls = "w-full bg-[#0E1235] border border-[#2A3580] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00CFFF]/50 placeholder-white/20";
  const set = (k, v) => onChange(k, v);

  return (
    <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-5">
      <h3 className="text-xs font-semibold text-[#00CFFF] mb-4 uppercase tracking-widest">Στοιχεία Πελάτη</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          ['store_name', 'Κατάστημα', 'text'], ['company_legal_name', 'Επωνυμία', 'text'],
          ['vat_number', 'ΑΦΜ', 'text'], ['address', 'Διεύθυνση', 'text'],
          ['contact_person', 'Υπεύθυνος', 'text'], ['email', 'Email', 'email'],
          ['phone', 'Τηλέφωνο', 'tel']
        ].map(([key, label, type]) => (
          <div key={key}>
            <label className="block text-white/40 text-xs mb-1">{label}</label>
            <input type={type} value={customer[key]} onChange={e => set(key, e.target.value)} className={inputCls} />
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="block text-white/40 text-xs mb-1">Σημειώσεις</label>
          <textarea value={customer.notes} onChange={e => set('notes', e.target.value)} rows={2} className={inputCls} />
        </div>
      </div>
    </div>
  );
}