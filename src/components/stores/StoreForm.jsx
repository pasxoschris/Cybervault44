import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { Save, X, AlertTriangle, AlertCircle } from "lucide-react";

const initialForm = {
  vat_number: "", business_name: "", trade_name: "", store_name: "", status: "active",
  email: "", phone: "", mobile_phone: "", address: "", city: "", postal_code: "",
  contact_person: "", contact_position: "", contact_email: "", contact_mobile: "",
  spotlight_store_id: "", spotlight_status: "", active_licenses: "", installation_date: "",
  academy_access: false, training_status: "not_started", training_completed_at: "", training_notes: "",
  support_contract: false, support_level: "none", support_status: "active", support_notes: "",
  notes: "", tags: "",
};

function Field({ label, children, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "bg-[#1a1f4e] border border-[#2A3580] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00CFFF]/60 transition-colors placeholder-white/20";
const selectCls = inputCls + " cursor-pointer";

export default function StoreForm({ store, onClose }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(store ? { ...initialForm, ...store } : initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [vatWarning, setVatWarning] = useState(null);
  const isEdit = !!store;

  const cleanVat = (v) => v.replace(/[\s.\-_,;:#+*]/g, "").replace(/[^0-9]/g, "");

  const handleVatChange = (raw) => {
    const cleaned = cleanVat(raw);
    setForm(f => ({ ...f, vat_number: cleaned }));
    if (cleaned && cleaned.length !== 9) {
      setVatWarning("Προσοχή: Το ΑΦΜ πρέπει να έχει ακριβώς 9 ψηφία.");
    } else {
      setVatWarning(null);
    }
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setError(null);
    const vat = cleanVat(form.vat_number);
    if (!vat) { setError("Το ΑΦΜ είναι υποχρεωτικό."); return; }
    if (!form.business_name.trim()) { setError("Η επωνυμία είναι υποχρεωτική."); return; }

    setSaving(true);
    try {
      // Duplicate VAT check
      const existing = await base44.entities.Store.filter({ vat_number: vat });
      const duplicate = existing.filter(s => s.id !== store?.id);
      if (duplicate.length > 0) {
        setError(`Υπάρχει ήδη κατάστημα με ΑΦΜ ${vat} (${duplicate[0].business_name}).`);
        setSaving(false);
        return;
      }

      const user = await base44.auth.me();
      const payload = {
        ...form,
        vat_number: vat,
        active_licenses: form.active_licenses ? Number(form.active_licenses) : null,
        updated_at: new Date().toISOString(),
        updated_by: user?.email || user?.full_name || "admin",
      };

      if (isEdit) {
        await base44.entities.Store.update(store.id, payload);
        navigate(`/stores/${store.id}`);
      } else {
        const created = await base44.entities.Store.create(payload);
        navigate(`/stores/${created.id}`);
      }
    } catch (e) {
      setError(e.message || "Σφάλμα αποθήκευσης.");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1235] pb-16">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0e2e]/95 backdrop-blur-md border-b border-[#00CFFF]/10 px-6 py-4 flex items-center justify-between">
        <h1 className="font-orbitron text-lg font-bold text-[#00CFFF]">
          {isEdit ? "Επεξεργασία Καταστήματος" : "Νέο Κατάστημα"}
        </h1>
        <div className="flex gap-3">
          <button onClick={onClose || (() => navigate("/stores"))}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors text-sm">
            <X size={15} /> Ακύρωση
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#00CFFF] text-[#0E1235] font-bold text-sm hover:bg-[#00CFFF]/80 disabled:opacity-50 transition-colors">
            <Save size={15} /> {saving ? "Αποθήκευση..." : "Αποθήκευση"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {error && (
          <div className="flex items-start gap-3 bg-red-900/30 border border-red-500/40 rounded-xl p-4 text-red-300 text-sm">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Primary Identification */}
        <Section title="Βασικά Στοιχεία">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="ΑΦΜ" required>
              <input className={inputCls} value={form.vat_number} onChange={e => handleVatChange(e.target.value)} placeholder="π.χ. 123456789" maxLength={9} />
              {vatWarning && (
                <div className="flex items-center gap-1.5 text-amber-400 text-xs mt-1">
                  <AlertTriangle size={12} /> {vatWarning}
                </div>
              )}
            </Field>
            <Field label="Κατάσταση">
              <select className={selectCls} value={form.status} onChange={e => set("status", e.target.value)}>
                <option value="active">Ενεργό</option>
                <option value="inactive">Ανενεργό</option>
                <option value="suspended">Αναστολή</option>
                <option value="prospect">Υποψήφιο</option>
              </select>
            </Field>
            <Field label="Επωνυμία" required>
              <input className={inputCls} value={form.business_name} onChange={e => set("business_name", e.target.value)} placeholder="Επωνυμία" />
            </Field>
            <Field label="Διακριτικός Τίτλος">
              <input className={inputCls} value={form.trade_name} onChange={e => set("trade_name", e.target.value)} placeholder="Διακριτικός τίτλος" />
            </Field>
            <Field label="Όνομα Καταστήματος">
              <input className={inputCls} value={form.store_name} onChange={e => set("store_name", e.target.value)} placeholder="Όνομα καταστήματος" />
            </Field>
          </div>
        </Section>

        {/* Contact */}
        <Section title="Στοιχεία Επικοινωνίας">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Email"><input className={inputCls} value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@example.com" /></Field>
            <Field label="Τηλέφωνο"><input className={inputCls} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="210..." /></Field>
            <Field label="Κινητό"><input className={inputCls} value={form.mobile_phone} onChange={e => set("mobile_phone", e.target.value)} placeholder="69..." /></Field>
            <Field label="Πόλη"><input className={inputCls} value={form.city} onChange={e => set("city", e.target.value)} placeholder="Αθήνα" /></Field>
            <Field label="Διεύθυνση"><input className={inputCls} value={form.address} onChange={e => set("address", e.target.value)} placeholder="Οδός αριθμός" /></Field>
            <Field label="ΤΚ"><input className={inputCls} value={form.postal_code} onChange={e => set("postal_code", e.target.value)} placeholder="10000" /></Field>
          </div>
        </Section>

        {/* Contact Person */}
        <Section title="Υπεύθυνος Επικοινωνίας">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Όνομα Υπευθύνου"><input className={inputCls} value={form.contact_person} onChange={e => set("contact_person", e.target.value)} placeholder="Ονοματεπώνυμο" /></Field>
            <Field label="Θέση"><input className={inputCls} value={form.contact_position} onChange={e => set("contact_position", e.target.value)} placeholder="π.χ. Διευθυντής" /></Field>
            <Field label="Email Υπευθύνου"><input className={inputCls} value={form.contact_email} onChange={e => set("contact_email", e.target.value)} placeholder="email@example.com" /></Field>
            <Field label="Κινητό Υπευθύνου"><input className={inputCls} value={form.contact_mobile} onChange={e => set("contact_mobile", e.target.value)} placeholder="69..." /></Field>
          </div>
        </Section>

        {/* Spotlight */}
        <Section title="SpotlightPOS">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Spotlight Store ID"><input className={inputCls} value={form.spotlight_store_id} onChange={e => set("spotlight_store_id", e.target.value)} placeholder="ID" /></Field>
            <Field label="Κατάσταση Spotlight">
              <select className={selectCls} value={form.spotlight_status} onChange={e => set("spotlight_status", e.target.value)}>
                <option value="">—</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="trial">Trial</option>
                <option value="expired">Expired</option>
              </select>
            </Field>
            <Field label="Ενεργές Άδειες"><input type="number" className={inputCls} value={form.active_licenses} onChange={e => set("active_licenses", e.target.value)} placeholder="0" /></Field>
            <Field label="Ημερομηνία Εγκατάστασης"><input type="date" className={inputCls} value={form.installation_date} onChange={e => set("installation_date", e.target.value)} /></Field>
          </div>
        </Section>

        {/* Academy */}
        <Section title="CyberVault Academy">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Πρόσβαση Academy">
              <div className="flex items-center gap-3 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.academy_access} onChange={e => set("academy_access", e.target.checked)} className="w-4 h-4 accent-[#00CFFF]" />
                  <span className="text-white/70 text-sm">Ενεργή πρόσβαση</span>
                </label>
              </div>
            </Field>
            <Field label="Κατάσταση Εκπαίδευσης">
              <select className={selectCls} value={form.training_status} onChange={e => set("training_status", e.target.value)}>
                <option value="not_started">Δεν ξεκίνησε</option>
                <option value="in_progress">Σε εξέλιξη</option>
                <option value="completed">Ολοκληρώθηκε</option>
                <option value="suspended">Αναστολή</option>
              </select>
            </Field>
            <Field label="Ημ/νία Ολοκλήρωσης"><input type="date" className={inputCls} value={form.training_completed_at} onChange={e => set("training_completed_at", e.target.value)} /></Field>
            <Field label="Σημειώσεις Εκπαίδευσης">
              <textarea className={inputCls + " h-20 resize-none"} value={form.training_notes} onChange={e => set("training_notes", e.target.value)} placeholder="Σημειώσεις..." />
            </Field>
          </div>
        </Section>

        {/* Support */}
        <Section title="Υποστήριξη / Support">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Σύμβαση Υποστήριξης">
              <div className="flex items-center gap-3 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.support_contract} onChange={e => set("support_contract", e.target.checked)} className="w-4 h-4 accent-[#00CFFF]" />
                  <span className="text-white/70 text-sm">Ενεργή σύμβαση</span>
                </label>
              </div>
            </Field>
            <Field label="Επίπεδο Υποστήριξης">
              <select className={selectCls} value={form.support_level} onChange={e => set("support_level", e.target.value)}>
                <option value="none">Χωρίς</option>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </Field>
            <Field label="Κατάσταση Support">
              <select className={selectCls} value={form.support_status} onChange={e => set("support_status", e.target.value)}>
                <option value="active">Ενεργό</option>
                <option value="suspended">Αναστολή</option>
                <option value="ended">Έληξε</option>
              </select>
            </Field>
            <Field label="Σημειώσεις Support">
              <textarea className={inputCls + " h-20 resize-none"} value={form.support_notes} onChange={e => set("support_notes", e.target.value)} placeholder="Σημειώσεις..." />
            </Field>
          </div>
        </Section>

        {/* Notes */}
        <Section title="Εσωτερικές Σημειώσεις">
          <div className="grid grid-cols-1 gap-4">
            <Field label="Σημειώσεις">
              <textarea className={inputCls + " h-28 resize-none"} value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Εσωτερικές σημειώσεις..." />
            </Field>
            <Field label="Tags (χωρισμένα με κόμμα)">
              <input className={inputCls} value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="π.χ. VIP, Αθήνα, Restaurant" />
            </Field>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-6">
      <h3 className="font-orbitron text-sm font-bold text-[#00CFFF] mb-5 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}