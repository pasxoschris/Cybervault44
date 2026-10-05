import React, { useEffect } from "react";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function PaymentIris() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Πληρωμή με IRIS" subtitle="Άμεση πληρωμή με κωδικό IRIS">
      <SectionTitle>Πληρωμή με IRIS</SectionTitle>
      <InfoBox icon="🔵" title="Τι είναι το IRIS;" variant="info">
        Το IRIS είναι υπηρεσία άμεσων πληρωμών μέσω του διατραπεζικού συστήματος ΔΙΑΣ. Ο πελάτης πραγματοποιεί την πληρωμή μέσω της τραπεζικής εφαρμογής του, σαρώνοντας το QR που εμφανίζεται στο POS
      </InfoBox>
      <StepCard number="1" title="Επίλεξε «Πληρωμή με IRIS»">
        <p>Στο μενού πληρωμής, πάτα <strong>«Πληρωμή με IRIS»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Εμφάνιση κωδικού">
        <p>Το σύστημα εμφανίζει στο POS το QR που ο πελάτης σκανάρει / εισάγει στην τραπεζική εφαρμογή του.</p>
      </StepCard>
      <StepCard number="3" title="Επιβεβαίωση πληρωμής">
        <p>Όταν η πληρωμή ολοκληρωθεί, η παραγγελία κλείνει αυτόματα και η απόδειξη εκτυπώνεται.</p>
      </StepCard>
    </TutorialLayout>
  );
}