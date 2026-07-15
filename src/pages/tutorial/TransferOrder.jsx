import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function TransferOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Μεταφορά Παραγγελίας" subtitle="Μεταφορά παραγγελίας από σερβιτόρο σε σερβιτόρο">
      <SectionTitle>Μεταφορά Παραγγελίας (από σερβιτόρο σε σερβιτόρο)</SectionTitle>

      <StepCard number="1" title="Άνοιξε την παραγγελία">
        <p>Βρες την παραγγελία που θέλεις να μεταφέρεις και πάτα πάνω της για να δεις τα στοιχεία της.</p>
      </StepCard>

      <StepCard number="2" title="Πάτα «Μεταφορά»">
        <p>Από τα εργαλεία παραγγελίας, πάτα <strong>«Μεταφορά»</strong> (εικονίδιο με βέλη).</p>
      </StepCard>

      <StepCard number="3" title="Επίλεξε νέο σερβιτόρο">
        <p>Εμφανίζεται λίστα με τους ενεργούς σερβιτόρους της βάρδιας. Επίλεξε σε ποιον σερβιτόρο θα μεταφερθεί η παραγγελία.</p>
      </StepCard>

      <StepCard number="4" title="Επιβεβαίωση μεταφοράς">
        <p>Πάτα <strong>«Επιβεβαίωση»</strong>. Η παραγγελία αφαιρείται από τη λίστα σου και εμφανίζεται στη λίστα του νέου σερβιτόρου.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Σημαντικό!" variant="warning">
        <ul className="list-disc pl-5 mt-1 space-y-1.5">
          <li>Η μεταφορά <strong>δεν</strong> αλλάζει τα είδη της παραγγελίας — μόνο ποιος σερβιτόρος τη διαχειρίζεται.</li>
          <li>Αν η παραγγελία έχει ξεκινήσει η εκτύπωση στην κουζίνα, τα είδη παραμένουν ως έχουν.</li>
          <li>Δεν μπορείς να μεταφέρεις παραγγελία που έχει ήδη κλείσει.</li>
        </ul>
      </InfoBox>
    </TutorialLayout>
  );
}