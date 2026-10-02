import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function PaymentSplit() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Split Payments" subtitle="Διαίρεση πληρωμής σε πολλαπλές χρεώσεις">
      <SectionTitle>Split Payments — Διαίρεση Πληρωμής</SectionTitle>
      <StepCard number="1" title="Επίλεξε «Split Payments»">
        <p>Στο μενού πληρωμής, πάτα <strong>«Split Payments»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Ορισμός αριθμού πληρωμών">
        <p>Με τα κουμπιά <strong>«+»</strong> και <strong>«-»</strong> ρύθμισε τον αριθμό πληρωμών (π.χ. 3). Το σύστημα διαιρεί αυτόματα το σύνολο ισόποσα.</p>
      </StepCard>
      <StepCard number="3" title="Ορισμός τρόπου πληρωμής και ποσού">
        <p>Σε κάθε πληρωμή μπορείς να ορίσεις <strong>και τον τρόπο πληρωμής και το ποσό</strong>:</p>
        <p>• Πάτα <strong>«Τρόπος πληρωμής»</strong> δίπλα στη γραμμή και επίλεξε: Μετρητά, Κάρτα, Ηλεκτρονική Πληρωμή ή IRIS.</p>
        <p>• Στο πεδίο του ποσού γράψε το ποσό που θέλεις να χρεώσεις (π.χ. 50€ αντί για το ισόποσο).</p>
        <p>Αυτόματα η εφαρμογή υπολογίζει το υπόλοιπο και το διαιρεί ισόποσα σε όσες πληρωμές απομένουν.</p>
      </StepCard>
      <StepCard number="4" title="Χρέωση μία-μία">
        <p>Πάτα <strong>«Χρέωση»</strong> για κάθε πληρωμή ξεχωριστά. Ολοκλήρωσε την πρώτη πριν πας στη δεύτερη.</p>
      </StepCard>
      <InfoBox icon="⚠️" title="Σημαντικό!" variant="warning">
        <strong>Πρέπει να ολοκληρώνεται η μία πληρωμή πριν πας στη 2η.</strong> Μην αλλάζεις τρόπο πληρωμής ενώ εκκρεμεί χρέωση. Αυτόματα η εφαρμογή υπολογίζει το υπόλοιπο και το διαιρεί ισόποσα σε όσες πληρωμές απομένουν.
      </InfoBox>
      <InfoBox icon="💡" title="Προσοχή — μην το μπερδέψεις" variant="info">
        Το Split Payment <strong>δεν</strong> είναι η πληρωμή συγκεκριμένου είδους (πληρωμή μεμονωμένων προϊόντων), η οποία γίνεται στην <Link to="/tutorial/edit-order" className="underline font-semibold">Επεξεργασία Παραγγελίας</Link>.
      </InfoBox>
      <InfoBox icon="🧮" title="Παράδειγμα" variant="purple">
        Παραγγελία <strong>100€</strong> σε <strong>3 πληρωμές</strong>: πληρώνεις την πρώτη <strong>50€ με μετρητά</strong>. Αυτόματα οι άλλες 2 γίνονται από <strong>25€</strong> — τη δεύτερη μπορείς να την πληρώσεις με <strong>IRIS</strong> και την τρίτη με <strong>κάρτα</strong>.
      </InfoBox>
    </TutorialLayout>
  );
}