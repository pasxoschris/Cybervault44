import React from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { LayoutGrid, Printer, Receipt, ClipboardList, CreditCard, FileText, UtensilsCrossed, Coins, Smartphone, MessageSquare, QrCode } from "lucide-react";

const settingGroups = [
  {
    title: "Τραπέζια & Τιμοκατάλογος",
    items: [
      { label: "Ομάδες Τραπεζιών", desc: "Επιλογή ομάδας τραπεζιών που θα βλέπεις", icon: LayoutGrid },
      { label: "Τιμοκατάλογος", desc: "Επιλογή Τιμοκαταλόγου (Βασικός, Take away κτλ)", icon: UtensilsCrossed },
    ],
  },
  {
    title: "Εκτυπωτές",
    items: [
      { label: "Ομάδα Εκτυπωτών", desc: "Επιλογή ομάδας εκτυπωτών", icon: Printer },
      { label: "Εκτυπωτής Αποδείξεων", desc: "Επιλογή Εκτυπωτή Αποδείξεων", icon: Receipt },
      { label: "Εκτυπωτής Δελτίων Παραγγελίας", desc: "Επιλογή Εκτυπωτή Δελτίων Παραγγελίας", icon: ClipboardList },
      { label: "Αποστολή Μηνύματος", desc: "Αποστολή μηνύματος σε εκτυπωτή", icon: MessageSquare },
    ],
  },
  {
    title: "Πληρωμές & Παραστατικά",
    items: [
      { label: "Τερματικά POS", desc: "Επιλογή Τερματικού Πληρωμής (POS)", icon: CreditCard },
      { label: "Τρόπος Έκδοσης παραστατικών", desc: "Επιλογή Τρόπου Έκδοσης Παραστατικών", icon: FileText },
      { label: "Εργαλείο για ρέστα", desc: "Ενεργοποίηση Εργαλείου για ρέστα", icon: Coins },
      { label: "Ηλεκτρονική Πληρωμή", desc: "Ενεργοποίηση Ηλεκτρονικής Πληρωμής", icon: Smartphone },
    ],
  },
  {
    title: "Σύνδεση Συσκευής",
    items: [
      { label: "QR Code Καταστήματος", desc: "Εμφάνιση QR για σύνδεση νέας συσκευής", icon: QrCode },
    ],
  },
];

export default function Settings() {
  return (
    <TutorialLayout title="Ρυθμίσεις Χρήστη" subtitle="Παραμετροποίηση της εφαρμογής για κάθε χρήστη">

      <InfoBox icon="⚙️" title="Πού βρίσκονται οι ρυθμίσεις;" variant="info">
        Οι ρυθμίσεις χρήστη βρίσκονται <strong>πάνω αριστερά</strong> στις τρεις γραμμές <strong>☰</strong>. Πάτα το και επίλεξε <strong>«Ρυθμίσεις (όνομα χρήστη)»</strong> από το μενού που εμφανίζεται.
      </InfoBox>

      <div className="flex flex-col items-center">
        <img
          src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/507fb5774_settings-menu.webp"
          alt="Μενού ☰ — Ρυθμίσεις (όνομα χρήστη)"
          className="w-full max-w-sm h-auto rounded-2xl border border-gray-200"
        />
        <p className="text-center text-xs text-gray-500 mt-2">Πάτα ☰ (πάνω αριστερά) και επίλεξε «Ρυθμίσεις (όνομα_χρήστη)»</p>
      </div>

      <SectionTitle>Διαθέσιμες Ρυθμίσεις</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ fontFamily: 'Inter, sans-serif' }}>
        {settingGroups.map((group) => (
          <div key={group.title} className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-purple-50 border-b border-purple-100">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-purple-700">{group.title}</h3>
            </div>
            <ul>
              {group.items.map((s) => {
                const IconComponent = s.icon;
                return (
                  <li key={s.label} className="flex items-start gap-4 px-5 py-4 border-b border-gray-100 last:border-0">
                    <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <IconComponent size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{s.label}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{s.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

    </TutorialLayout>
  );
}