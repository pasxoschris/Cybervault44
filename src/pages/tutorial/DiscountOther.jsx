import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function DiscountOther() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Άλλες Εκπτώσεις" subtitle="Ειδικές κατηγορίες εκπτώσεων">
      <SectionTitle>Άλλες Εκπτώσεις</SectionTitle>
      <InfoBox icon="ℹ️" title="Τι είναι οι Άλλες Εκπτώσεις;" variant="info">
        Είναι κατηγορίες εκπτώσεων που έχει δημιουργήσει ο <strong>Διαχειριστής</strong>, για ειδικές περιπτώσεις.
        <span className="block mt-2">Οι κατηγορίες δημιουργούνται από τον <strong>Διαχειριστή</strong> στο <strong>Secure (Διαχειριστικό)</strong><br /><strong>Ρυθμίσεις → Προσαρμοσμένος Τύπος Έκπτωσης</strong>.</span>
      </InfoBox>
      <StepCard number="1" title="Άνοιξε την έκπτωση">
        <p>Ίδια βήματα με τη Γενική Έκπτωση (<strong>τρεις τελείες (···) → Έκπτωση → Κωδικός Διαχειριστή</strong>).</p>
        <p className="mt-2">Δες και <Link to="/tutorial/discount" className="underline font-semibold">«Από πού ανοίγει η έκπτωση»</Link> στο μάθημα Γενική Έκπτωση.</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε «Άλλες Εκπτώσεις»">
        <p>Επίλεξε <strong>«Άλλες Εκπτώσεις»</strong> στο <strong>«Είδος έκπτωσης»</strong>. Ανοίγει η οθόνη «Άλλες Εκπτώσεις» με τις κατηγορίες και το ποσοστό τους.</p>
      </StepCard>
      <StepCard number="3" title="Επίλεξε την κατηγορία">
        <p>Επίλεξε την κατηγορία. Το ποσοστό συμπληρώνεται αυτόματα και <strong>δεν μπορεί να αλλάξει</strong>. Πάτα <strong>✓</strong>.</p>
      </StepCard>
    </TutorialLayout>
  );
}