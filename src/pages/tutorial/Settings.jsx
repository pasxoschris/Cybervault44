import React from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";
import { Grid3X3, Printer, CreditCard, FileText, UtensilsCrossed, Zap, MessageSquare, QrCode } from "lucide-react";

const settings = [
  { label: "Ομάδες Τραπεζιών", desc: "Επιλογή ομάδας τραπεζιών που θα βλέπεις", icon: Grid3X3 },
  { label: "Ομάδα Εκτυπωτών", desc: "Επιλογή ομάδας εκτυπωτών", icon: Printer },
  { label: "Εκτυπωτής Αποδείξεων", desc: "Επιλογή Εκτυπωτή Αποδείξεων", icon: Printer },
  { label: "Εκτυπωτής Δελτίων Παραγγελίας", desc: "Επιλογή Εκτυπωτή Δελτίων Παραγγελίας", icon: Printer },
  { label: "Τερματικά POS", desc: "Επιλογή Τερματικού Πληρωμής (POS)", icon: CreditCard },
  { label: "Τρόπος Έκδοσης παραστατικών", desc: "Επιλογή Τρόπου Έκδοσης Παραστατικών", icon: FileText },
  { label: "Τιμοκατάλογος", desc: "Επιλογή Τιμοκαταλόγου (Βασικός, Take away κτλ)", icon: UtensilsCrossed },
  { label: "Ηλεκτρονική Πληρωμή", desc: "Ενεργοποίηση Ηλεκτρονικής Πληρωμής", icon: Zap },
  { label: "Αποστολή Μηνύματος", desc: "Αποστολή μηνύματος σε εκτυπωτή", icon: MessageSquare },
  { label: "QR Code Καταστήματος", desc: "Εμφάνιση QR για σύνδεση νέας συσκευής", icon: QrCode },
];

export default function Settings() {
  return (
    <TutorialLayout title="Ρυθμίσεις Χρήστη" subtitle="Παραμετροποίηση της εφαρμογής για κάθε χρήστη">

      <InfoBox icon="⚙️" title="Πού βρίσκονται οι ρυθμίσεις;" variant="info">
        Οι ρυθμίσεις χρήστη βρίσκονται <strong>πάνω αριστερά</strong> στις τρεις γραμμές <strong>☰</strong>. Πάτα το και επίλεξε <strong>«Ρυθμίσεις (όνομα χρήστη)»</strong> από το μενού που εμφανίζεται.
      </InfoBox>

      <ScreenshotGallery
        images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/6981cd00c_image.png"]}
        caption="Οθόνη Ρυθμίσεων"
      />

      <SectionTitle>Διαθέσιμες Ρυθμίσεις</SectionTitle>

      <div className="border border-[#00D4FF]/10 bg-[#0D1526]/70 overflow-hidden">
        {settings.map((s, i) => {
          const IconComponent = s.icon;
          return (
            <div key={i} className="flex items-start gap-4 px-5 py-4 border-b border-[#00D4FF]/10 last:border-0 hover:bg-[#00D4FF]/5 transition-colors">
              <IconComponent size={18} className="text-[#00D4FF] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-rajdhani text-sm font-semibold text-white/90">{s.label}</p>
                <p className="font-rajdhani text-xs text-white/40 mt-0.5">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </TutorialLayout>
  );
}