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
      <StepCard number="1" title="Άνοιξε το μενού πληρωμής">
        <p>Από τα στοιχεία παραγγελίας, πάτα το εικονίδιο <strong>Κέρματα</strong> στο κάτω μενού.</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε «Split Payments»">
        <p>Στο μενού πληρωμής, πάτα <strong>«Split Payments»</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Ορισμός αριθμού πληρωμών">
        <p>Με τα κουμπιά <strong>«+»</strong> και <strong>«-»</strong> ρύθμισε τον αριθμό πληρωμών (π.χ. 3). Το σύστημα προτείνει αυτόματα ισόποσα ποσά, αλλά το ποσό κάθε πληρωμής το αλλάζεις ελεύθερα.</p>
      </StepCard>
      <StepCard number="4" title="Ορισμός τρόπου πληρωμής και ποσού">
        <p>Σε κάθε πληρωμή μπορείς να ορίσεις <strong>και τον τρόπο πληρωμής και το ποσό</strong>:</p>
        <p>• Πάτα <strong>«Τρόπος πληρωμής»</strong> δίπλα στη γραμμή και επίλεξε: Μετρητά, Κάρτα, Ηλεκτρονική Πληρωμή ή IRIS.</p>
        <p>• Στο πεδίο του ποσού γράψε το ποσό που θέλεις να χρεώσεις.</p>
        <p>Αυτόματα η εφαρμογή υπολογίζει το υπόλοιπο και το μοιράζει στις πληρωμές που απομένουν (προεπιλογή: ισόποσα) — το ποσό κάθε πληρωμής το αλλάζεις ελεύθερα.</p>
      </StepCard>
      <StepCard number="5" title="Χρέωση μία-μία">
        <p>Πάτα <strong>«Χρέωση»</strong> για κάθε πληρωμή ξεχωριστά. Ολοκλήρωσε την πρώτη πριν πας στη δεύτερη.</p>
      </StepCard>
      <InfoBox icon="⚠️" title="Αν κολλήσει μια πληρωμή" variant="warning">
        <p>Αν μια χρέωση κολλήσει (π.χ. με κάρτα), <strong>κράτα πατημένο για 10 δευτερόλεπτα το κουμπί αυτής της πληρωμής</strong>, δεξιά από το ποσό της.</p>
        <p className="mt-2">Θα εμφανιστεί το μήνυμα <strong>«Αφαίρεση ελέγχου εκκρεμών συναλλαγών και ξεκλείδωμα παραγγελίας;»</strong>. Πάτα <strong>«Ναι»</strong>.</p>
        <p className="mt-2">Δεν κρατάς τα κέρματα, όπως στην απλή <Link to="/tutorial/payment-card" className="underline font-semibold">Πληρωμή με Κάρτα</Link>.</p>
      </InfoBox>
      <InfoBox icon="⚠️" title="Σημαντικό!" variant="warning">
        <strong>Πρέπει να ολοκληρώνεται η μία πληρωμή πριν πας στη 2η.</strong> Μην αλλάζεις τρόπο πληρωμής ενώ εκκρεμεί χρέωση. Το υπόλοιπο υπολογίζεται αυτόματα και μοιράζεται στις πληρωμές που απομένουν, αλλά κάθε ποσό αλλάζει ελεύθερα.
      </InfoBox>
      <InfoBox icon="💡" title="Προσοχή — μην το μπερδέψεις" variant="info">
        Το Split Payment <strong>δεν</strong> είναι η πληρωμή συγκεκριμένου είδους (πληρωμή μεμονωμένων προϊόντων), η οποία γίνεται στα <Link to="/tutorial/order-details" className="underline font-semibold">Στοιχεία Παραγγελίας</Link> → <Link to="/tutorial/edit-order" className="underline font-semibold">Επεξεργασία Παραγγελίας</Link>.
      </InfoBox>
      <InfoBox icon="🧮" title="Παράδειγμα" variant="purple">
        Παραγγελία <strong>100€</strong> σε <strong>3 πληρωμές</strong>: πληρώνεις την πρώτη <strong>50€ με μετρητά</strong>. Αυτόματα οι άλλες 2 γίνονται από <strong>25€</strong> — τη δεύτερη μπορείς να την πληρώσεις με <strong>IRIS</strong> και την τρίτη με <strong>κάρτα</strong>.
        <br /><br />
        Δεν απαιτούνται ίσα ποσά: παραγγελία <strong>120€</strong> σε <strong>3 πληρωμές</strong> — γράφεις <strong>50€</strong> στην πρώτη και το υπόλοιπο <strong>70€</strong> μοιράζεται αυτόματα σε <strong>35€ + 35€</strong>, τα οποία μπορείς κι αυτά να αλλάξεις.
      </InfoBox>
    </TutorialLayout>
  );
}