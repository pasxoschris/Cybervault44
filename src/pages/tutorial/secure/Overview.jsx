import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { Shot, S, Intro } from "../../../components/tutorial/SecureShot";

export default function Overview() {
  return (
    <SecureTutorialLayout title="Επισκόπηση" subtitle="Τα βασικά νούμερα του καταστήματος για μια μέρα ή ένα διάστημα">

      <Intro>
        Η <strong>Επισκόπηση</strong> είναι η πρώτη σελίδα των Στατιστικών. Σου δείχνει με μια ματιά έσοδα, παραγγελίες, εκπτώσεις και άτομα, και πώς μοιράστηκαν τα έσοδα μέσα στη μέρα.
      </Intro>

      <SectionTitle>Φίλτρα</SectionTitle>

      <StepCard number="1" title="Άνοιξε την Επισκόπηση">
        <p>Από το μενού αριστερά, πάτα <strong>Στατιστικά</strong> → <strong>Επισκόπηση</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Διάλεξε διάστημα">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Μάρκες:</strong> «Όλες οι Μάρκες» ή μία συγκεκριμένη, αν το κατάστημα έχει μάρκες.</li>
          <li><strong>Επιλογή Ημερομηνίας:</strong> π.χ. <strong>Εύρος Ημερομηνίας</strong>.</li>
          <li><strong>Από / Έως:</strong> η πρώτη και η τελευταία μέρα.</li>
        </ul>
        <p>Πάτα <strong>Εφαρμογή</strong>.</p>
      </StepCard>

      <SectionTitle>Σύνολα</SectionTitle>

      <Shot src="205f6a9d0_overview-cards.webp" alt="Επισκόπηση: φίλτρα και 12 κάρτες Σύνολα" caption="Φίλτρα πάνω δεξιά και οι 12 κάρτες των Συνόλων" max="max-w-3xl" />

      <StepCard title="Οι 12 κάρτες">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Έσοδα</strong> (μπλε κάρτα): όλα τα έσοδα του διαστήματος.</li>
          <li><strong>Έσοδα Dine In / Take Away / Delivery:</strong> τα έσοδα ανά τρόπο εξυπηρέτησης.</li>
          <li><strong>Παραγγελίες</strong> και <strong>Παραγγελίες / Ημέρα</strong>.</li>
          <li><strong>Έσοδα / Παραγγελία</strong>, <strong>Έσοδα / Ημέρα</strong>, <strong>Έσοδα / Βάρδια</strong>: οι μέσοι όροι.</li>
          <li><strong>Χρέωση Δωματίου:</strong> για καταστήματα με δωμάτια.</li>
          <li><strong>Εκπτώσεις:</strong> το ποσό των εκπτώσεων.</li>
          <li><strong>Άτομα:</strong> πόσα άτομα δηλώθηκαν στις παραγγελίες.</li>
        </ul>
      </StepCard>

      <SectionTitle>Ωριαία Έσοδα</SectionTitle>

      <Shot src="b0f5285ac_overview-hourly.webp" alt="Γράφημα Ωριαία Έσοδα με tooltip" caption="Πέρνα τον δείκτη πάνω από ένα σημείο για να δεις τα στοιχεία της ώρας" max="max-w-3xl" />

      <StepCard title="Το γράφημα">
        <p>Δείχνει τα έσοδα ώρα προς ώρα. Αν περάσεις τον δείκτη πάνω από ένα σημείο, βλέπεις για εκείνη την ώρα: <strong>Έσοδα</strong>, <strong>Έκπτωση</strong> και <strong>Παραγγελίες</strong>.</p>
        <p>Από κάτω, το <strong>Ωριαία Έσοδα ανά Μάρκα</strong> δείχνει το ίδιο γράφημα με μία γραμμή για κάθε μάρκα.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Για μεμονωμένες παραγγελίες" variant="info">
        <p>Η Επισκόπηση δείχνει σύνολα. Για να δεις μία μία τις παραγγελίες, με τα παραστατικά τους, πήγαινε στη <S to="/tutorial/secure/c-order-flow">3.2 Ροή Παραγγελιών</S>. Για ό,τι γίνεται αυτή τη στιγμή, στο <S to="/tutorial/secure/c-now">3.1 Τώρα</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
