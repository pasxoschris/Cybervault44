import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function ShiftAnalysis() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ανάλυση Βάρδιας" subtitle="Αναλυτική αναφορά πωλήσεων και πληρωμών βάρδιας">

      <SectionTitle>Ανάλυση Βάρδιας</SectionTitle>
      <StepCard number="1" title="Άνοιξε Ανάλυση Βάρδιας">
        <p>Από τις Παραγγελίες Βάρδιας, επίλεξε <strong>«Ανάλυση Βάρδιας»</strong>.</p>
      </StepCard>
      <InfoBox icon="📊" title="Τι περιλαμβάνει η ανάλυση;" variant="info">
        <ul className="space-y-1">
          <li>• Σύνολο πωλήσεων ανά κατηγορία</li>
          <li>• Αριθμός παραγγελιών</li>
          <li>• Ανάλυση ανά τρόπο πληρωμής</li>
          <li>• Εκπτώσεις που δόθηκαν</li>
        </ul>
      </InfoBox>
      <StepCard number="2" title="Εκτύπωση Αναφοράς">
        <p>Πάτα <strong>«Εκτύπωση Αναφοράς Βάρδιας»</strong> για να εκτυπώσεις αναλυτική αναφορά.</p>
      </StepCard>
    </TutorialLayout>
  );
}