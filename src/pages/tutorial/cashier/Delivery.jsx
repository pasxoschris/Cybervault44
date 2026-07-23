import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function Delivery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Παραγγελία Delivery" subtitle="Ανάθεση παραγγελίας σε delivery">
      <SectionTitle>Παραγγελία για Delivery</SectionTitle>

      <InfoBox icon="📞" title="Πότε χρησιμοποιείται" variant="info">
        Όταν πάρεις παραγγελία τηλεφωνικά, μπορείς να τη δημιουργήσεις στο Cashier mode και να την αναθέσεις σε κάποιον delivery που έχεις στο κατάστημα.
      </InfoBox>

      <StepCard number="1" title="Ενεργοποίηση Delivery mode">
        <p>Από την αρχική οθόνη, πάτα το κουμπί <strong>Delivery</strong> στο πάνω μενού για να μπεις σε λειτουργία delivery.</p>
      </StepCard>

      <StepCard number="2" title="Δημιουργία παραγγελίας">
        <p>Πρόσθεσε τα προϊόντα της παραγγελίας όπως σε κάθε παραγγελία. Σύμπληρωσε τα στοιχεία πελάτη (όνομα, τηλέφωνο, διεύθυνση).</p>
      </StepCard>

      <StepCard number="3" title="Ανάθεση σε delivery">
        <p>Στα στοιχεία παραγγελίας, πάτα <strong>«Ανάθεση σε delivery»</strong> και επίλεξε τον delivery person από τη λίστα του καταστήματος.</p>
      </StepCard>

      <StepCard number="4" title="Κλείσιμο παραγγελίας">
        <p>Ολοκλήρωσε την πληρωμή και η παραγγελία θα εμφανιστεί στη λίστα delivery του αντίστοιχου ατόμου.</p>
      </StepCard>

      <InfoBox icon="💡" title="Συμβουλή" variant="purple">
        Μπορείς να δεις όλες τις παραγγελίες ανά delivery από το μενού ιστορικού παραγγελιών.
      </InfoBox>
    </CashierTutorialLayout>
  );
}