import React, { useEffect } from "react";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function DiscountOther() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Άλλες Εκπτώσεις" subtitle="Ειδικές κατηγορίες εκπτώσεων">
      <SectionTitle>Άλλες Εκπτώσεις</SectionTitle>
      <InfoBox icon="🏷️" title="Τι είναι οι Άλλες Εκπτώσεις;" variant="info">
        Είναι κατηγορίες εκπτώσεων που έχεις φτιάξει εσύ στο διαχειριστικό, για ειδικές περιπτώσεις (π.χ. εργαζόμενοι, τακτικοί πελάτες, προσωπικές εκπτώσεις).
      </InfoBox>
      <StepCard number="1" title="Άνοιξε έκπτωση">
        <p>Μπες στο εικονίδιο έκπτωσης και δώσε κωδικό διαχειριστή.</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε «Άλλες Εκπτώσεις»">
        <p>Από το μενού <strong>«Είδος έκπτωσης»</strong> επίλεξε <strong>«Άλλες Εκπτώσεις»</strong> και βρες την κατηγορία που έχεις δημιουργήσει.</p>
      </StepCard>
      <StepCard number="3" title="Επίλεξε προϊόντα και επιβεβαίωσε">
        <p>Επίλεξε τα προϊόντα που θέλεις να εκπτώσεις, ρύθμισε το ποσοστό αν χρειάζεται και πάτα <strong>✓</strong>.</p>
      </StepCard>
      <InfoBox icon="💡" variant="info">
        Οι κατηγορίες δημιουργούνται από το διαχειριστικό. Αν δεν βλέπεις αυτή που χρειάζεσαι, ζήτα από τον διαχειριστή να τη φτιάξει.
      </InfoBox>
    </TutorialLayout>
  );
}