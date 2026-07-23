import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Ρυθμίσεις Χρήστη" subtitle="Παραμετροποίηση της εφαρμογής για κάθε χρήστη">
      <InfoBox icon="⚙️" title="Πού βρίσκονται οι ρυθμίσεις;" variant="purple">
        <p>Οι ρυθμίσεις βρίσκονται <strong>πάνω αριστερά</strong> στο <strong>μενού</strong> (το εικονίδιο με τις <strong>τρεις οριζόντιες γραμμές</strong>). Πάτα το και επίλεξε <strong>«Ρυθμίσεις (όνομα χρήστη)»</strong> από το μενού που εμφανίζεται.</p>
      </InfoBox>

      <SectionTitle>Το Μενού</SectionTitle>

      <div className="flex justify-center">
        <img
          src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/71a846f19_image.png"
          alt="Μενού Cashier Mode"
          className="w-full max-w-md h-auto rounded-xl border border-gray-200 shadow-sm"
        />
      </div>

      <StepCard number="1" title="Άνοιξε το μενού">
        <p>Πάτα το <strong>μενού</strong> (τρεις οριζόντιες γραμμές) πάνω αριστερά. Ανοίγει μια λευκή αναδυόμενη λίστα με επιλογές.</p>
      </StepCard>

      <StepCard number="2" title="Επιλογές μενού">
        <p>Το μενού περιλαμβάνει:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li><strong>Διανομείς</strong> — διαχείριση προσωπικού παράδοσης.</li>
          <li><strong>Παραγγελίες Βάρδιας</strong> — οι παραγγελίες της τρέχουσας βάρδιας.</li>
          <li><strong>Διαχείριση</strong> — λειτουργίες διαχειριστή.</li>
          <li><strong>End of Day Report</strong> — αναφορά λήξης ημέρας.</li>
          <li><strong>Ρυθμίσεις (όνομα χρήστη)</strong> — οι ρυθμίσεις χρήστη.</li>
        </ul>
      </StepCard>

      <StepCard number="3" title="Πάτα «Ρυθμίσεις»">
        <p>Επίλεξε <strong>«Ρυθμίσεις (όνομα χρήστη)»</strong> — η τελευταία επιλογή. Ανοίγει η οθόνη ρυθμίσεων χρήστη.</p>
      </StepCard>

      <SectionTitle>Διαθέσιμες Ρυθμίσεις</SectionTitle>

      <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
        Οι ρυθμίσεις είναι <strong>ίδιες με αυτές του σερβιτόρου</strong>. Κάθε χρήστης παραμετροποιεί τη δική του εφαρμογή:
      </p>

      <div className="border border-gray-200 bg-white overflow-hidden rounded-2xl">
        {settings.map((s, i) => {
          const IconComponent = s.icon;
          return (
            <div key={i} className="flex items-start gap-4 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-amber-50/50 transition-colors">
              <IconComponent size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>{s.label}</p>
                <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <InfoBox icon="💡" title="Συνοπτικά" variant="info">
        <p><strong>Μενού (τρεις γραμμές) → Ρυθμίσεις (όνομα χρήστη)</strong>. Οι ρυθμίσεις είναι προσωπικές ανά χρήστη και ταυτίζονται με αυτές του σερβιτόρου.</p>
      </InfoBox>
    </CashierTutorialLayout>
  );
}