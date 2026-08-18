import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function CancelOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ακύρωση Παραγγελίας" subtitle="Ακύρωση ολόκληρης παραγγελίας">
      <InfoBox icon="🆚" title="Ακύρωση Παραγγελίας vs Ακύρωση Απόδειξης" variant="purple">
        <p><strong>Ακύρωση Παραγγελίας</strong> (αυτό το μάθημα): η παραγγελία είναι <strong>ανοιχτή / μη πληρωμένη</strong> — δεν έχει εκδοθεί απόδειξη.</p>
        <p className="mt-1"><strong>Ακύρωση Απόδειξης</strong>: η παραγγελία <strong>έχει πληρωθεί</strong> και έχει εκδοθεί <strong>απόδειξη</strong> (χρειάζεται πρώτα επαναφορά). Βλέπε μάθημα: Ακύρωση Απόδειξης.</p>
      </InfoBox>

      <SectionTitle>Ακύρωση Παραγγελίας</SectionTitle>
      <StepCard number="1" title="Άνοιξε την ανοιχτή παραγγελία">
        <p>Βρες την παραγγελία που είναι <strong>ανοιχτή / μη πληρωμένη</strong> (δεν έχει εκδοθεί απόδειξη) και πάτα πάνω της.</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε Επεξεργασία">
        <p>Πάτα ✏️ και στη συνέχεια επίλεξε <strong>όλα τα προϊόντα</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Έκδοση Ακυρωτικού">
        <p>Πάτα <strong>«Έκδοση Ακυρωτικού Δελτίου Παραγγελίας»</strong>. Η παραγγελία θα ακυρωθεί και το τραπέζι θα ελευθερωθεί.</p>
      </StepCard>
    </TutorialLayout>
  );
}