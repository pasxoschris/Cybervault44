import React, { useEffect } from "react";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function PaymentCard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Πληρωμή με Κάρτα" subtitle="Χρέωση μέσω POS terminal">
      <SectionTitle>Πληρωμή με Κάρτα</SectionTitle>
      <StepCard number="1" title="Επίλεξε «Πληρωμή με Κάρτα»">
        <p>Στο μενού πληρωμής, επίλεξε <strong>«Πληρωμή με Κάρτα (POS που έχεις επιλέξει)»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Χρέωσε στο POS terminal">
        <p>Το ποσό θα σταλεί αυτόματα στο τερματικό POS. Ζήτα από τον πελάτη να πληρώσει στο τερματικό.</p>
      </StepCard>
      <StepCard number="3" title="Αναμονή επιβεβαίωσης">
        <p>Μόλις η συναλλαγή εγκριθεί, η παραγγελία κλείνει αυτόματα και η απόδειξη εκτυπώνεται.</p>
      </StepCard>
      <InfoBox icon="⚠️" title="Αν παγώσει η παραγγελία" variant="warning">
        <p>Αν πληρωθείς με κάρτα αλλά η παραγγελία παγώσει, ακολούθησε τα εξής βήματα:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li><strong>Κράτα τα κέρματα πατημένα για 10 δευτερόλεπτα</strong>.</li>
          <li>Θα εμφανιστεί το μήνυμα: <strong>«Αφαίρεση ελέγχου εκκρεμών συναλλαγών και ξεκλείδωμα παραγγελίας;»</strong>.</li>
          <li>Πάτα <strong>«Ναι»</strong> για να ξεκλειδώσει η παραγγελία.</li>
        </ul>
      </InfoBox>

      <InfoBox icon="📍" title="Αδυναμία εκκίνησης πληρωμής" variant="warning">
        <p>Αν εμφανιστεί το μήνυμα <strong>«Αδυναμία εκκίνησης πληρωμής»</strong>, πήγαινε στις <strong>Ρυθμίσεις της συσκευής (iOS)</strong> και ενεργοποίησε:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li><strong>Πρόσβαση στην Τοποθεσία</strong> (Location) για την εφαρμογή Spotlight POS.</li>
          <li><strong>Αυτόματη Ζώνη Ώρας</strong> (Settings → General → Date &amp; Time → Automatic Time Zone = ON).</li>
        </ul>
        <p className="mt-2">Χωρίς αυτά, το POS terminal δεν μπορεί να ξεκινήσει τη συναλλαγή.</p>
      </InfoBox>
    </TutorialLayout>
  );
}