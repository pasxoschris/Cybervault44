import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Edit, Trash2, Building2, Phone, Mail, MapPin, User, ShieldCheck, GraduationCap, Headphones, FileText, Hash } from "lucide-react";
import StoreAccessGuard from "@/components/stores/StoreAccessGuard";
import StoreBadge from "@/components/stores/StoreBadge";
import Navbar from "@/components/layout/Navbar";

const TABS = ["Γενικά Στοιχεία","Επικοινωνία","Spotlight","Academy","Support","Notes"];

function DetailRow({ label, value, mono }) {
  if (!value && value !== 0 && value !== false) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-[#2A3580]/40 last:border-0">
      <span className="text-white/40 text-xs uppercase tracking-wide sm:w-44 flex-shrink-0" style={{ fontFamily: 'Inter, sans-serif' }}>{label}</span>
      <span className={`text-white/90 text-sm ${mono ? "font-mono" : ""}`} style={{ fontFamily: 'Inter, sans-serif' }}>
        {typeof value === "boolean" ? (value ? "Ναι" : "Όχι") : value}
      </span>
    </div>
  );
}

export default function StoreDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    base44.entities.Store.filter({ id })
      .then(res => setStore(res[0] || null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Διαγραφή καταστήματος; Αυτή η ενέργεια δεν αναιρείται.")) return;
    await base44.entities.Store.delete(id);
    navigate("/stores");
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0E1235] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
    </div>
  );

  if (!store) return (
    <div className="min-h-screen bg-[#0E1235] flex items-center justify-center text-white/50">Το κατάστημα δεν βρέθηκε.</div>
  );

  return (
    <StoreAccessGuard>
      <div className="min-h-screen bg-[#0E1235]">
        <Navbar />
        <div className="pt-20 max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Link to="/stores" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            <ArrowLeft size={14} /> Καταστήματα
          </Link>

          {/* Header Card */}
          <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                {/* VAT - prominent */}
                <div className="flex items-center gap-2 mb-3">
                  <Hash size={14} className="text-[#00CFFF]" />
                  <span className="font-mono text-2xl font-bold text-[#00CFFF] tracking-widest">{store.vat_number}</span>
                  <StoreBadge value={store.status} />
                </div>
                <h1 className="font-orbitron text-xl font-bold text-white mb-1">{store.business_name}</h1>
                {store.trade_name && <p className="text-white/50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{store.trade_name}</p>}
                {store.store_name && <p className="text-white/40 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{store.store_name}</p>}

                {/* Quick badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <StoreBadge value={store.academy_access} customLabel={store.academy_access ? "Academy ✓" : "Academy ✗"} />
                  <StoreBadge value={store.training_status} />
                  <StoreBadge value={store.support_level} />
                  <StoreBadge value={store.support_status} />
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link to={`/stores/${id}/edit`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-colors text-sm">
                  <Edit size={14} /> Επεξεργασία
                </Link>
                <button onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors text-sm">
                  <Trash2 size={14} /> Διαγραφή
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
            {TABS.map((t, i) => (
              <button key={t} onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeTab === i ? "bg-[#00CFFF]/15 text-[#00CFFF] border border-[#00CFFF]/30" : "text-white/50 hover:text-white/80"}`}
                style={{ fontFamily: 'Inter, sans-serif' }}>
                {t}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-[#131840] border border-[#2A3580] rounded-2xl p-6">
            {activeTab === 0 && (
              <div>
                <SectionHead icon={<Building2 size={16} />} title="Βασικά Στοιχεία" />
                <DetailRow label="ΑΦΜ" value={store.vat_number} mono />
                <DetailRow label="Επωνυμία" value={store.business_name} />
                <DetailRow label="Διακριτικός Τίτλος" value={store.trade_name} />
                <DetailRow label="Όνομα Καταστήματος" value={store.store_name} />
                <DetailRow label="Κατάσταση" value={<StoreBadge value={store.status} />} />
                {store.updated_at && <DetailRow label="Τελ. Ενημέρωση" value={new Date(store.updated_at).toLocaleString("el-GR")} />}
                {store.updated_by && <DetailRow label="Ενημερώθηκε από" value={store.updated_by} />}
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <SectionHead icon={<Phone size={16} />} title="Επικοινωνία" />
                <DetailRow label="Email" value={store.email} />
                <DetailRow label="Τηλέφωνο" value={store.phone} />
                <DetailRow label="Κινητό" value={store.mobile_phone} />
                <DetailRow label="Διεύθυνση" value={store.address} />
                <DetailRow label="Πόλη" value={store.city} />
                <DetailRow label="ΤΚ" value={store.postal_code} />
                <div className="mt-6">
                  <SectionHead icon={<User size={16} />} title="Υπεύθυνος Επικοινωνίας" />
                  <DetailRow label="Ονοματεπώνυμο" value={store.contact_person} />
                  <DetailRow label="Θέση" value={store.contact_position} />
                  <DetailRow label="Email" value={store.contact_email} />
                  <DetailRow label="Κινητό" value={store.contact_mobile} />
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div>
                <SectionHead icon={<ShieldCheck size={16} />} title="Spotlight POS" />
                <DetailRow label="Spotlight Store ID" value={store.spotlight_store_id} mono />
                <DetailRow label="Κατάσταση" value={store.spotlight_status ? <StoreBadge value={store.spotlight_status} /> : null} />
                <DetailRow label="Ενεργές Άδειες" value={store.active_licenses} />
                <DetailRow label="Ημ/νία Εγκατάστασης" value={store.installation_date} />
              </div>
            )}
            {activeTab === 3 && (
              <div>
                <SectionHead icon={<GraduationCap size={16} />} title="CyberVault Academy" />
                <DetailRow label="Πρόσβαση Academy" value={<StoreBadge value={store.academy_access} />} />
                <DetailRow label="Κατάσταση Εκπαίδευσης" value={<StoreBadge value={store.training_status} />} />
                <DetailRow label="Ολοκλήρωση" value={store.training_completed_at} />
                {store.training_notes && (
                  <div className="mt-4">
                    <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Σημειώσεις</p>
                    <p className="text-white/80 text-sm bg-[#0E1235] rounded-xl p-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{store.training_notes}</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 4 && (
              <div>
                <SectionHead icon={<Headphones size={16} />} title="Support / Ticketing" />
                <DetailRow label="Σύμβαση Υποστήριξης" value={<StoreBadge value={store.support_contract} />} />
                <DetailRow label="Επίπεδο Υποστήριξης" value={<StoreBadge value={store.support_level} />} />
                <DetailRow label="Κατάσταση Support" value={<StoreBadge value={store.support_status} />} />
                {store.support_notes && (
                  <div className="mt-4">
                    <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Σημειώσεις</p>
                    <p className="text-white/80 text-sm bg-[#0E1235] rounded-xl p-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{store.support_notes}</p>
                  </div>
                )}
                {/* Future ticketing hint */}
                <div className="mt-6 p-4 border border-[#2A3580]/50 rounded-xl bg-[#0E1235]/50">
                  <p className="text-white/30 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                    💡 Σύνδεση με Ticket History — προβλέπεται στο επόμενο module.
                  </p>
                </div>
              </div>
            )}
            {activeTab === 5 && (
              <div>
                <SectionHead icon={<FileText size={16} />} title="Εσωτερικές Σημειώσεις" />
                {store.notes ? (
                  <p className="text-white/80 text-sm bg-[#0E1235] rounded-xl p-4 leading-relaxed mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>{store.notes}</p>
                ) : <p className="text-white/30 text-sm mt-2">Δεν υπάρχουν σημειώσεις.</p>}
                {store.tags && (
                  <div className="mt-4">
                    <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {store.tags.split(",").map(t => t.trim()).filter(Boolean).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#2A3580]/50 text-white/70 rounded-full text-xs border border-[#2A3580]">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreAccessGuard>
  );
}

function SectionHead({ icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="text-[#00CFFF]">{icon}</span>
      <h3 className="font-orbitron text-sm font-bold text-[#00CFFF] uppercase tracking-wider">{title}</h3>
    </div>
  );
}