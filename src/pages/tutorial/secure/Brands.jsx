import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function Brands() {
  return (
    <SecureTutorialLayout title="Μάρκες" subtitle="Πολλές μάρκες στο ίδιο κατάστημα">

      <Intro>
        Με τις <strong>Μάρκες</strong> ένα κατάστημα μπορεί να έχει περισσότερες από μία μάρκες (π.χ. ένα καφέ και ένα brand φαγητού). Σε κάθε μάρκα διαλέγεις τις κατηγορίες προϊόντων που ανήκουν σε αυτήν.
      </Intro>

      <SectionTitle>Η λίστα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τις Μάρκες">
        <p>Από το μενού αριστερά πάτα <strong>Κατάλογος</strong> → <strong>Μάρκες</strong>. Βλέπεις τις μάρκες με το <strong>Όνομα</strong> τους. Η πράσινη τελεία σημαίνει ότι η μάρκα είναι ενεργή.</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Πάνω υπάρχουν <strong>Αναζήτηση</strong>, φίλτρο (π.χ. <strong>Ενεργά</strong>) και το κουμπί <strong>Προσθήκη Μάρκας</strong>.</li>
          <li>Σε κάθε μάρκα υπάρχουν τα κουμπιά <strong>Sync Wolt</strong> και <strong>Sync efood</strong>, και το 🗑 για διαγραφή.</li>
        </ul>
      </StepCard>

      <SectionTitle>Νέα μάρκα</SectionTitle>

      <StepCard number="2" title="Προσθήκη Μάρκας">
        <p>Πάτα <strong>Προσθήκη Μάρκας</strong> και συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Όνομα</strong>*.</li>
          <li><strong>Brand Logo</strong>: το λογότυπο της μάρκας.</li>
          <li><strong>Ενεργοποίηση στο Spotit</strong>.</li>
          <li><strong>Ενεργό</strong>.</li>
          <li><strong>Κατηγορίες Προϊόντων</strong>: τσέκαρε τις κατηγορίες που ανήκουν στη μάρκα. Υπάρχουν <strong>Επιλογή όλων</strong>, <strong>Καθ/σμός</strong>, <strong>Γρήγορη αναζήτηση στις Κατηγορίες</strong>, και το ▸ ανοίγει τις υποκατηγορίες.</li>
        </ul>
        <p className="mt-2">Πάτα <strong>Δημιουργία</strong>.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Το Ενεργό είναι κλειστό" variant="warning">
        <p>Στη νέα μάρκα το <strong>Ενεργό</strong> είναι από προεπιλογή <strong>OFF</strong>. Άνοιξέ το.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Μάρκες στα Στατιστικά" variant="info">
        <p>Όταν το κατάστημα έχει μάρκες, στα Στατιστικά εμφανίζεται και φίλτρο <strong>Μάρκες</strong>. Δες την <S to="/tutorial/secure/a-navigation">Περιήγηση</S>.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Ενεργοποίηση από τη Spotlight" variant="info">
        <p>Οι Μάρκες εμφανίζονται όταν τις έχει ενεργοποιήσει η Spotlight για το κατάστημα. Αν δεν βλέπεις την ενότητα, ζήτησέ την από τη Spotlight.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
