import React, { useEffect } from "react";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function PaymentCredit() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Πληρωμή Επί Πιστώσει" subtitle="Η παραγγελία καταχωρείται ως οφειλή του πελάτη">
      <InfoBox icon="ℹ️" title="Τι είναι" variant="info">
        Με το <strong>«Επί Πιστώσει»</strong> η παραγγελία καταχωρείται ως <strong>οφειλή του πελάτη</strong>, για να πληρωθεί αργότερα.
      </InfoBox>

      <SectionTitle>Πληρωμή Επί Πιστώσει</SectionTitle>

      <StepCard number="1" title="Άνοιξε το μενού πληρωμής">
        <p>Από τα στοιχεία παραγγελίας, πάτα το εικονίδιο <strong>Κέρματα</strong> στο κάτω μενού.</p>
      </StepCard>

      <StepCard number="2" title="Επίλεξε «Επί Πιστώσει»">
        <p>Στο μενού πληρωμής, πάτα <strong>«Επί Πιστώσει»</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Επίλεξε ενέργεια">
        <p>Εμφανίζεται το παράθυρο <strong>«Επιλέξτε ενέργεια»</strong>:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li><strong>Εκτύπωση Απόδειξης και Κλείσιμο</strong> — εκτυπώνει απόδειξη και κλείνει την παραγγελία.</li>
          <li><strong>Ακύρωση</strong> — ακυρώνει την ενέργεια.</li>
        </ul>
      </StepCard>

      <InfoBox icon="ℹ️" title="Πότε εμφανίζεται" variant="info">
        Το «Επί Πιστώσει» εμφανίζεται μόνο σε <strong>Ανοιχτή</strong> παραγγελία, όχι σε Νέα.
      </InfoBox>
    </TutorialLayout>
  );
}
