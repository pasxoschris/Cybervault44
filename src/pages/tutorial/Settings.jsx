import React from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import {
  LayoutGrid, Printer, Receipt, ClipboardList, CreditCard, History, FileText, ScanBarcode, Monitor,
  ListChecks, UtensilsCrossed, FilePlus, EyeOff, Star, Heart, Layers, Coins, Smartphone,
  MessageSquare, QrCode, Store, Tablet, User, LogOut, CalendarCheck, ChevronRight,
} from "lucide-react";

// Η σειρά και τα μπλοκ ακολουθούν την οθόνη «Ρυθμίσεις (όνομα χρήστη)» της εφαρμογής.
// type: "open" = ανοίγει επιλογή (βελάκι), "toggle" = διακόπτης on/off, "info" = μόνο προβολή
const settingBlocks = [
  [
    { label: "Ομάδες Τραπεζιών", desc: "Επιλογή ομάδας τραπεζιών που θα βλέπεις", icon: LayoutGrid, type: "open" },
    { label: "Ομάδα Εκτυπωτών", desc: "Επιλογή ομάδας εκτυπωτών", icon: Printer, type: "open" },
    { label: "Εκτυπωτής Αποδείξεων", desc: "Επιλογή Εκτυπωτή Αποδείξεων", icon: Receipt, type: "open" },
    { label: "Εκτυπωτής Δελτίων Παραγγελίας", desc: "Επιλογή Εκτυπωτή Δελτίων Παραγγελίας", icon: ClipboardList, type: "open" },
    { label: "Τερματικά POS", desc: "Επιλογή Τερματικού Πληρωμής (POS)", icon: CreditCard, type: "open" },
    { label: "Προφορτωμένες συναλλαγές", desc: "", icon: History, type: "toggle" },
    { label: "Τρόπος Έκδοσης παραστατικών", desc: "Επιλογή Τρόπου Έκδοσης Παραστατικών", icon: FileText, type: "open" },
    { label: "Zebra Scanners", desc: "", icon: ScanBarcode, type: "open" },
    { label: "Οθόνες Κουζίνας", desc: "", icon: Monitor, type: "open" },
    { label: "Κατηγορίες Μενού", desc: "", icon: ListChecks, type: "open" },
    { label: "Τιμοκατάλογος", desc: "Επιλογή Τιμοκαταλόγου (Βασικός, Take away κτλ)", icon: UtensilsCrossed, type: "open" },
    { label: "Επιλογή Τιμοκαταλόγου σ…", desc: "", icon: FilePlus, type: "toggle" },
    { label: "Απόκρυψη Τιμοκαταλόγου…", desc: "", icon: EyeOff, type: "toggle" },
    { label: "Show Best Selling Products", desc: "", icon: Star, type: "toggle" },
    { label: "Λίστα Αγαπημένων", desc: "", icon: Heart, type: "open" },
    { label: "Ομαδοποίηση παραγγελιών ανά τραπέζι", desc: "", icon: Layers, type: "toggle" },
    { label: "Εργαλείο για ρέστα", desc: "Ενεργοποίηση Εργαλείου για ρέστα", icon: Coins, type: "toggle" },
    { label: "Ηλεκτρονική Πληρωμή", desc: "Ενεργοποίηση Ηλεκτρονικής Πληρωμής", icon: Smartphone, type: "toggle" },
  ],
  [
    { label: "Αποστολή Μηνύματος", desc: "Αποστολή μηνύματος σε εκτυπωτή", icon: MessageSquare, type: "open" },
    { label: "QR Code Καταστήματος", desc: "Εμφάνιση QR για σύνδεση νέας συσκευής", icon: QrCode, type: "open" },
  ],
  [
    { label: "Κατάστημα", desc: "Επωνυμία Καταστήματος", icon: Store, type: "info" },
    { label: "Συσκευή POS", desc: "Θέση/Συσκευή Χρήστη", icon: Tablet, type: "info" },
    { label: "Χρήστης", desc: "Όνομα Χρήστη", icon: User, type: "info" },
  ],
];

const bottomButtons = [
  { label: "Αποσύνδεση", icon: LogOut, className: "bg-purple-700" },
  { label: "Ανάλυση Βάρδιας", icon: CalendarCheck, className: "bg-pink-600" },
];

function OpenMark() {
  return (
    <span className="w-7 h-7 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center flex-shrink-0" aria-label="Ανοίγει επιλογή">
      <ChevronRight size={16} />
    </span>
  );
}

function ToggleMark() {
  return (
    <span className="w-11 h-6 rounded-full bg-gray-200 border border-gray-300 relative flex-shrink-0" aria-label="Διακόπτης on/off">
      <span className="absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white shadow" />
    </span>
  );
}

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

      <InfoBox icon="🔒" title="Δεν βλέπεις κάποια ρύθμιση;" variant="warning">
        Αν κάποια ρύθμιση δεν εμφανίζεται στην εφαρμογή σου, πρέπει να την ενεργοποιήσει ο <strong>Διαχειριστής</strong> μέσα από το <strong>Secure (Διαχειριστικό)</strong>.
      </InfoBox>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
        <span className="flex items-center gap-2"><OpenMark /> Ανοίγει επιλογή</span>
        <span className="flex items-center gap-2"><ToggleMark /> Διακόπτης on/off</span>
      </div>

      <div className="max-w-2xl w-full mx-auto space-y-4" style={{ fontFamily: 'Inter, sans-serif' }}>
        {settingBlocks.map((block, b) => (
          <ul key={b} className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
            {block.map((s) => {
              const IconComponent = s.icon;
              return (
                <li key={s.label} className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-100 last:border-0">
                  <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                    <IconComponent size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">{s.label}</p>
                    {s.desc && <p className={`text-sm mt-0.5 ${s.type === "info" ? "text-gray-400" : "text-gray-600"}`}>{s.desc}</p>}
                  </div>
                  {s.type === "open" && <OpenMark />}
                  {s.type === "toggle" && <ToggleMark />}
                </li>
              );
            })}
          </ul>
        ))}

        <div className="space-y-3 pt-1">
          {bottomButtons.map((btn) => {
            const IconComponent = btn.icon;
            return (
              <div key={btn.label} className={`${btn.className} text-white rounded-xl py-3 px-5 flex items-center justify-center gap-3 font-semibold`}>
                <IconComponent size={20} />
                {btn.label}
              </div>
            );
          })}
        </div>
      </div>

    </TutorialLayout>
  );
}
