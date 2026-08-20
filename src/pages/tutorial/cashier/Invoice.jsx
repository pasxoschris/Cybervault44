import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function Invoice() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Έκδοση Τιμολογίου" subtitle="Εκτύπωση τιμολογίου από το μενού του Cashier">
      <InfoBox icon="⚙️" title="Προαπαιτούμενο — Ενεργοποίηση από Διαχειριστή" variant="warning">
        <p>Για να εμφανιστεί η επιλογή <strong>«Έκδοση Τιμολογίου»</strong>, πρέπει να την έχει <strong>ενεργοποιήσει ο διαχειριστής</strong> (από το <strong>Secure / Back Office</strong>) για το συγκεκριμένο <strong>Point of Sale (iPad)</strong>. Αν δεν είναι ενεργοποιημένη, η επιλογή δεν εμφανίζεται στο μενού.</p>
      </InfoBox>

      <InfoBox icon="📄" title="Τι θα μάθεις" variant="purple">
        <p>Στο Cashier Mode η <strong>Έκδοση Τιμολογίου</strong> βρίσκεται στο <strong>μενού</strong> (τρεις γραμμές πάνω αριστερά). Εμφανίζεται <strong>μόνο αφού φτιάξεις παραγγελία</strong> και <strong>μόνο αν είναι ενεργοποιημένη</strong> για το συγκεκριμένο iPad.</p>
      </InfoBox>

      <SectionTitle>Το Μενού</SectionTitle>

      <div className="flex justify-center">
        <img
          src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/0b3dcac34_image.png"
          alt="Μενού Cashier — Έκδοση Τιμολογίου"
          className="w-full max-w-md h-auto rounded-xl border border-gray-200 shadow-sm"
        />
      </div>

      <StepCard number="1" title="Άνοιξε το μενού">
        <p>Πάτα το <strong>μενού</strong> (τρεις οριζόντιες γραμμές) πάνω αριστερά. Ανοίγει η αναδυόμενη λίστα επιλογών.</p>
      </StepCard>

      <StepCard number="2" title="Βρες την «Έκδοση Τιμολογίου»">
        <p>Στη λίστα βλέπεις τις επιλογές: <strong>Διανομείς</strong>, <strong>Παραγγελίες Βάρδιας</strong>, <strong>Διαχείριση</strong>, <strong>Έκδοση Τιμολογίου</strong>, <strong>End of Day Report</strong>, <strong>Ρυθμίσεις</strong>. Πάτα <strong>«Έκδοση Τιμολογίου»</strong>.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Πότε εμφανίζεται;" variant="warning">
        <ul className="list-disc pl-5 mt-1 space-y-1.5">
          <li>Η επιλογή εμφανίζεται <strong>μόνο αν υπάρχει παραγγελία</strong> σε εξέλιξη. Αν το πάνελ «Προϊόντα» είναι άδειο, η επιλογή δεν είναι διαθέσιμη.</li>
          <li>Πρέπει να είναι <strong>ενεργοποιημένη για το συγκεκριμένο iPad</strong> — αλλιώς δεν εμφανίζεται καθόλου στη λίστα.</li>
        </ul>
      </InfoBox>

      <SectionTitle>Ενεργοποίηση ανά iPad</SectionTitle>

      <StepCard number="1" title="Από το Διαχειριστικό">
        <p>Η ενεργοποίηση της Έκδοσης Τιμολογίου γίνεται από το <strong>Διαχειριστικό (Secure / Back Office)</strong>, ανά <strong>συσκευή (iPad)</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Δικαιώματα συσκευής">
        <p>Ο διαχειριστής ορίζει ποια iPads θα έχουν τη δυνατότητα έκδοσης τιμολογίου. Αν η συσκευή δεν έχει το δικαίωμα, η επιλογή <strong>δεν εμφανίζεται</strong> στο μενού — ακόμα κι αν υπάρχει παραγγελία.</p>
      </StepCard>

      <StepCard number="3" title="Έκδοση">
        <p>Αφού φτιάξεις την παραγγελία και πατήσεις <strong>«Έκδοση Τιμολογίου»</strong>, συμπλήρωσε τα στοιχεία πελάτη (ΑΦΜ, επωνυμία κτλ) και εκτύπωσε το τιμολόγιο.</p>
      </StepCard>

      <InfoBox icon="💡" title="Συνοπτικά" variant="info">
        <p><strong>Μενού → Έκδοση Τιμολογίου</strong> (εμφανίζεται με παραγγελία + ενεργοποιημένο iPad). Η ενεργοποίηση γίνεται <strong>ανά iPad από το Διαχειριστικό</strong>.</p>
      </InfoBox>

      <InfoBox icon="🧾" title="Απόδειξη πριν Τιμολόγιο" variant="warning">
        <p>Αν έχεις εκδώσει <strong>απόδειξη</strong> και θέλεις να εκδώσεις <strong>τιμολόγιο</strong>, πρέπει πρώτα να <strong>ακυρώσεις την απόδειξη</strong> ώστε να μην αποδοθεί διπλό ΑΦΜ.</p>
      </InfoBox>
    </CashierTutorialLayout>
  );
}