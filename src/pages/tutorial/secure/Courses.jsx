import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function Courses() {
  return (
    <SecureTutorialLayout title="Σειρές Σερβιρίσματος" subtitle="Starters, Main Courses, Drinks και ποιες κατηγορίες ανήκουν σε καθεμία">

      <Intro>
        Οι <strong>Σειρές Σερβιρίσματος</strong> (π.χ. <strong>Starters</strong>, <strong>Main Courses</strong>, <strong>Drinks</strong>) δείχνουν σε ποια σειρά του γεύματος ανήκει κάθε προϊόν. Σε κάθε σειρά διαλέγεις τις κατηγορίες προϊόντων που ανήκουν σε αυτήν.
      </Intro>

      <SectionTitle>Η λίστα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τις Σειρές Σερβιρίσματος">
        <p>Από το μενού αριστερά πάτα <strong>Κατάλογος</strong> → <strong>Σειρές Σερβιρίσματος</strong>. Βλέπεις τις σειρές με το <strong>Όνομα</strong> τους. Η πράσινη τελεία σημαίνει ότι η σειρά είναι ενεργή.</p>
        <p className="mt-2">Πάνω υπάρχουν <strong>Αναζήτηση</strong>, φίλτρο (π.χ. <strong>Ενεργά</strong>) και το κουμπί <strong>Προσθήκη Σειράς Σερβιρίσματος</strong>. Πάτα μια σειρά για να ανοίξει η <strong>Επεξεργασία</strong>.</p>
      </StepCard>

      <SectionTitle>Νέα σειρά</SectionTitle>

      <StepCard number="2" title="Προσθήκη Σειράς Σερβιρίσματος">
        <p>Πάτα <strong>Προσθήκη Σειράς Σερβιρίσματος</strong> και συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Όνομα</strong>*: π.χ. Starters.</li>
          <li><strong>Ενεργή</strong>.</li>
          <li><strong>Κατηγορίες Προϊόντων</strong>: τσέκαρε τις κατηγορίες που ανήκουν σε αυτή τη σειρά. Υπάρχουν <strong>Επιλογή όλων</strong>, <strong>Καθ/σμός</strong> (καθαρισμός), <strong>Γρήγορη αναζήτηση στις Κατηγορίες</strong>, και το ▸ ανοίγει τις υποκατηγορίες.</li>
        </ul>
        <p className="mt-2">Πάτα <strong>Δημιουργία</strong>. Στην επεξεργασία μιας υπάρχουσας σειράς, πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Η Ενεργή είναι κλειστή" variant="warning">
        <p>Στη νέα σειρά η <strong>Ενεργή</strong> είναι από προεπιλογή <strong>OFF</strong>. Άνοιξέ την.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Και από το προϊόν" variant="info">
        <p>Η σειρά σερβιρίσματος ορίζεται και στο πεδίο <strong>Σειρά Σερβιρίσματος</strong> του προϊόντος ή της κατηγορίας. Δες το <S to="/tutorial/secure/e-products">μάθημα 5.1</S>.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
