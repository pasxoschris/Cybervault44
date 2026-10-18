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
      <StepCard number="1" title="Άνοιξε την Ανάλυση Βάρδιας">
        <p>Πάτα τις <strong>τρεις γραμμές (☰)</strong> πάνω αριστερά για να ανοίξει το μενού.</p>
        <p>Επίλεξε <strong>«Ρυθμίσεις (χρήστη)»</strong>.</p>
        <p>Στο <strong>κάτω μέρος</strong> της οθόνης πάτα το κουμπί <strong>«Ανάλυση Βάρδιας»</strong>.</p>
        <p><strong>Απαιτείται Κωδικός Διαχειριστή</strong> για να ανοίξει η Ανάλυση Βάρδιας.</p>
      </StepCard>
      <InfoBox icon="📊" title="Τι περιλαμβάνει η ανάλυση;" variant="info">
        <ul className="space-y-1">
          <li>• Συνολικό Ποσό</li>
          <li>• Πλήθος Παραγγελιών</li>
          <li>• Ανεξόφλητα</li>
          <li>• Ανάλυση ανά τρόπο πληρωμής</li>
          <li>• Εκπτώσεις</li>
          <li>• Ιδιοκατανάλωση</li>
        </ul>
      </InfoBox>
      <InfoBox icon="⚠️" title="Ανεξόφλητα — Προσοχή" variant="warning">
        <p><strong>Δεν μπορείς να προχωρήσεις στο Κλείσιμο Βάρδιας αν έχεις ανεξόφλητες παραγγελίες.</strong></p>
      </InfoBox>
      <StepCard number="2" title="Εκτύπωση Αναφοράς">
        <p>Πάτα το <strong>εικονίδιο του Εκτυπωτή</strong> (πάνω δεξιά) → <strong>«Εκτύπωση Αναφοράς Βάρδιας»</strong> για να εκτυπώσεις αναλυτική αναφορά.</p>
      </StepCard>
    </TutorialLayout>
  );
}