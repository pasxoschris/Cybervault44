import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function TimeZonesStats() {
  return (
    <SecureTutorialLayout title="Ζώνες Ώρας" subtitle="Έσοδα, παραγγελίες και εκπτώσεις ανά ζώνη και ανά ώρα">

      <Intro>
        Στις <strong>Ζώνες Ώρας</strong> βλέπεις πώς μοιράζονται τα έσοδα μέσα στη μέρα: ανά ζώνη που έχεις ορίσει (π.χ. Dinner) και ανά ώρα. Τις ζώνες τις ορίζεις στις <S to="/tutorial/secure/i-settings">Ρυθμίσεις</S>.
      </Intro>

      <SectionTitle>Άνοιγμα και φίλτρα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τις Ζώνες Ώρας">
        <p>Από το μενού αριστερά πάτα <strong>Στατιστικά</strong> → <strong>Ζώνες Ώρας</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Διάλεξε περίοδο">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Μάρκες:</strong> όλες ή μία συγκεκριμένη.</li>
          <li><strong>Από</strong> και <strong>Έως:</strong> οι ημερομηνίες που θέλεις.</li>
          <li>Πάτα <strong>Εφαρμογή</strong>.</li>
        </ul>
      </StepCard>

      <SectionTitle>Οι δύο πίνακες</SectionTitle>

      <StepCard number="3" title="Revenue per Hour Zone">
        <p>Μία γραμμή για κάθε ζώνη ώρας, με:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Σύνολο Εσόδων</strong> και <strong>Μέσος όρος Εσόδων</strong></li>
          <li><strong>Σύνολο Παραγγελιών</strong> και <strong>Μέσος όρος Παραγγελιών</strong></li>
          <li><strong>Συνολική Έκπτωση</strong> και <strong>Μέσος όρος Εκπτώσεων</strong></li>
        </ul>
        <p className="mt-2">Στο τέλος υπάρχει η γραμμή <strong>Total</strong>.</p>
      </StepCard>

      <StepCard number="4" title="Revenue per Hour">
        <p>Τα ίδια ποσά για κάθε ώρα της μέρας (04:00 - 05:00, 05:00 - 06:00 κ.ο.κ.), με γραμμή <strong>Total</strong> στο τέλος.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Η μέρα ξεκινά στις 04:00" variant="info">
        <p>Στα στατιστικά η μέρα μετράει από τις <strong>04:00</strong> έως τις 04:00 της επόμενης. Μια παραγγελία στις 02:00 μετράει στην προηγούμενη μέρα.</p>
      </InfoBox>

      <StepCard number="5" title="Εξαγωγή σε Excel">
        <p>Κάθε πίνακας έχει δικό του κουμπί <strong>Excel</strong> πάνω δεξιά.</p>
      </StepCard>

    </SecureTutorialLayout>
  );
}
