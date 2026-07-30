import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, SectionTitle } from "../../components/tutorial/StepCard";

export default function CancelOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ακύρωση Παραγγελίας" subtitle="Ακύρωση ολόκληρης παραγγελίας">
      <SectionTitle>Ακύρωση Παραγγελίας</SectionTitle>
      <StepCard number="1" title="Άνοιξε την παραγγελία">
        <p>Πάτα στην παραγγελία που θέλεις να ακυρώσεις.</p>
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