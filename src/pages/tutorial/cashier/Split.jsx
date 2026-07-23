import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function Split() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Split Payments" subtitle="Διαίρεση πληρωμής σε πολλαπλά μέρη">
      <SectionTitle>Split Payments — Διαίρεση Πληρωμής</SectionTitle>

      <StepCard number="1" title="Επίλεξε «Split Payments»">
        <p>Στο μενού πληρωμής, πάτα <strong>«Split Payments»</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Ορισμός αριθμού πληρωμών">
        <p>Με τα κουμπιά <strong>«+»</strong> και <strong>«-»</strong> ρύθμισε τον αριθμό πληρωμών (π.χ. 2). Το σύστημα διαιρεί αυτόματα το σύνολο ισόποσα.</p>
      </StepCard>

      <StepCard number="3" title="Επίλεξε τρόπο πληρωμής για κάθε μέρος">
        <p>Πάτα <strong>«Τρόπος πληρωμής»</strong> δίπλα σε κάθε γραμμή και επίλεξε: Μετρητά, Κάρτα ή Ηλεκτρονική Πληρωμή.</p>
      </StepCard>

      <StepCard number="4" title="Χρέωση μία-μία">
        <p>Πάτα <strong>«Χρέωση»</strong> για κάθε πληρωμή ξεχωριστά. Ολοκλήρωσε την πρώτη πριν πας στη δεύτερη.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Σημαντικό!" variant="warning">
        <strong>Πρέπει να ολοκληρώνεται η μία πληρωμή πριν πας στη 2η.</strong> Μην αλλάζεις τρόπο πληρωμής ενώ εκκρεμεί χρέωση.
      </InfoBox>
    </CashierTutorialLayout>
  );
}