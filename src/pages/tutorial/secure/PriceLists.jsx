import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function PriceLists() {
  return (
    <SecureTutorialLayout title="Τιμοκατάλογοι" subtitle="Εναλλακτικές τιμές για τα ίδια προϊόντα">

      <Intro>
        Οι <strong>τιμοκατάλογοι</strong> είναι εναλλακτικές τιμές για τα ίδια προϊόντα, π.χ. <strong>TAKE AWAY</strong> ή <strong>HAPPY HOUR</strong>. Κάθε προϊόν έχει μία τιμή για κάθε τιμοκατάλογο.
      </Intro>

      <SectionTitle>Η λίστα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τους Τιμοκαταλόγους">
        <p>Από το μενού αριστερά πάτα <strong>Κατάλογος</strong> → <strong>Τιμοκατάλογοι</strong>. Για κάθε τιμοκατάλογο βλέπεις το <strong>Όνομα</strong> και τον διακόπτη <strong>Ενεργό</strong>.</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Με το <strong>↕</strong> αριστερά αλλάζεις τη σειρά τους.</li>
          <li>Το όνομα αλλάζει πάνω στο πεδίο του.</li>
          <li>Όσοι εμφανίζονται <strong>γκρι</strong> (π.χ. Wolt, Spotit app) δεν αλλάζουν από εδώ.</li>
        </ul>
      </StepCard>

      <SectionTitle>Νέος τιμοκατάλογος</SectionTitle>

      <StepCard number="2" title="Πρόσθεσε">
        <p>Στην τελευταία γραμμή γράψε το όνομα, άφησε το <strong>Ενεργό</strong> ON και πάτα <strong>Προσθήκη</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Αποθήκευση">
        <p>Πάτα <strong>Αποθήκευση</strong>. Το ίδιο κάνεις και μετά από κάθε αλλαγή στη λίστα (όνομα, σειρά, Ενεργό).</p>
      </StepCard>

      <StepCard number="4" title="Βάλε τις τιμές στα προϊόντα">
        <p>Για κάθε τιμοκατάλογο που φτιάχνεις, στη φόρμα κάθε προϊόντος εμφανίζεται πεδίο <strong>«Τιμή για [όνομα τιμοκαταλόγου]»</strong> (π.χ. Τιμή για TAKE AWAY). Βάλε εκεί την αντίστοιχη τιμή, με τελεία στα δεκαδικά. Δες το <S to="/tutorial/secure/e-products">μάθημα 5.1</S>.</p>
      </StepCard>

      <StepCard number="5" title="Συγχρονισμός 🔄">
        <p>Κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Στην εφαρμογή" variant="info">
        <p>Στις <S to="/tutorial/settings">Ρυθμίσεις Χρήστη</S> της εφαρμογής υπάρχουν οι επιλογές <strong>Τιμοκατάλογος</strong>, <strong>Επιλογή Τιμοκαταλόγου σε Νέα Παραγγελία</strong> και <strong>Απόκρυψη Τιμοκαταλόγου στην Εκτύπωση</strong>.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Ενεργοποίηση από τη Spotlight" variant="info">
        <p>Οι τιμοκατάλογοι εμφανίζονται όταν τους έχει ενεργοποιήσει η Spotlight για το κατάστημα. Αν δεν βλέπεις την ενότητα, ζήτησέ την από τη Spotlight.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
