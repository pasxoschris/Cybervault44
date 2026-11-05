import React, { useEffect } from "react";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function PaymentIris() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Πληρωμή με IRIS" subtitle="Ο πελάτης σκανάρει QR στο τερματικό πληρωμών (POS)">
      <SectionTitle>Πληρωμή με IRIS</SectionTitle>
      <InfoBox icon="🔵" title="Τι είναι το IRIS;" variant="info">
        Το IRIS είναι υπηρεσία άμεσων πληρωμών μέσω του διατραπεζικού συστήματος ΔΙΑΣ. Ο πελάτης πραγματοποιεί την πληρωμή μέσω της τραπεζικής εφαρμογής του, σαρώνοντας το QR που εμφανίζεται στο τερματικό πληρωμών (POS).
      </InfoBox>
      <StepCard number="1" title="Άνοιξε το μενού πληρωμής">
        <p>Από τα στοιχεία παραγγελίας, πάτα το εικονίδιο <strong>Κέρματα</strong> στο κάτω μενού.</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε «Πληρωμή με IRIS»">
        <p>Στο μενού πληρωμής, πάτα <strong>«Πληρωμή με IRIS»</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Εμφάνιση QR στο τερματικό">
        <p>Το QR εμφανίζεται στο <strong>τερματικό πληρωμών (POS)</strong> που έχεις επιλέξει. Ο πελάτης το σκανάρει με την τραπεζική εφαρμογή του.</p>
      </StepCard>
      <StepCard number="4" title="Επιβεβαίωση πληρωμής">
        <p>Όταν η πληρωμή ολοκληρωθεί, η παραγγελία κλείνει αυτόματα και η απόδειξη εκτυπώνεται.</p>
      </StepCard>
    </TutorialLayout>
  );
}