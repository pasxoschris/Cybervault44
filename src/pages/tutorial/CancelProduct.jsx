import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function CancelProduct() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ακύρωση Προϊόντος" subtitle="Ακύρωση μεμονωμένου προϊόντος από παραγγελία">
      <SectionTitle>Ακύρωση Προϊόντος</SectionTitle>
      <StepCard number="1" title="Άνοιξε την παραγγελία">
        <p>Πάτα πάνω στην παραγγελία για να δεις τα στοιχεία της.</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε «Επεξεργασία Παραγγελίας»">
        <p>Πάτα το εικονίδιο επεξεργασίας (✏️) για να μπεις στη λίστα προϊόντων.</p>
      </StepCard>
      <StepCard number="3" title="Επίλεξε το προϊόν">
        <p>Τσεκάρε το προϊόν που θέλεις να ακυρώσεις και επίλεξε <strong>«Έκδοση Ακυρωτικού Δελτίου»</strong>.</p>
      </StepCard>
      <InfoBox icon="⚠️" variant="warning">
        Η ακύρωση προϊόντος στέλνει ακυρωτικό δελτίο στην κουζίνα/μπαρ. Βεβαιώσου ότι το προϊόν δεν έχει ήδη ετοιμαστεί.
      </InfoBox>
    </TutorialLayout>
  );
}