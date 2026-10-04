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
      <StepCard number="1" title="Εντόπισε την παραγγελία">
        <p>Εντόπισε την <strong>ανοιχτή παραγγελία</strong> που θέλεις να ακυρώσεις.</p>
      </StepCard>
      <StepCard number="2" title="Slide προς τα αριστερά">
        <p>Κάνοντας <strong>slide προς τα αριστερά</strong> πάνω στην παραγγελία, εμφανίζεται η επιλογή <strong>«Ακύρωση»</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Κωδικός διαχειριστή">
        <p>Απαιτείται <strong>κωδικός διαχειριστή</strong>.</p>
      </StepCard>
      <StepCard number="4" title="Αιτία Ακύρωσης">
        <p>Επίλεξε <strong>Αιτία Ακύρωσης</strong>.</p>
      </StepCard>
      <StepCard number="5" title="Επιβεβαίωση">
        <p>Επιβεβαίωσε την ακύρωση της παραγγελίας.</p>
      </StepCard>
    </TutorialLayout>
  );
}