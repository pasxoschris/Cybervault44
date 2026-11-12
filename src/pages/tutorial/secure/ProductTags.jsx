import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function ProductTags() {
  return (
    <SecureTutorialLayout title="Ετικέτες Προϊόντων" subtitle="Ομαδοποίηση προϊόντων με ετικέτες, π.χ. SPIRITS SALES">

      <Intro>
        Οι <strong>Ετικέτες Προϊόντων</strong> ομαδοποιούν προϊόντα πέρα από την κατηγορία τους, π.χ. «SPIRITS SALES» ή «ΠΡΟΪΟΝΤΑ COCA COLA». Τις βάζεις στο πεδίο <strong>Ετικέτες Προϊόντων</strong> του <S to="/tutorial/secure/e-products">προϊόντος ή της κατηγορίας</S>.
      </Intro>

      <StepCard number="1" title="Η λίστα">
        <p>Από το μενού αριστερά πάτα <strong>Κατάλογος</strong> → <strong>Ετικέτες Προϊόντων</strong>. Βλέπεις τις ετικέτες με το <strong>Όνομα</strong> τους. Η πράσινη τελεία σημαίνει ότι η ετικέτα είναι ενεργή. Πάνω υπάρχουν <strong>Αναζήτηση</strong>, φίλτρο (π.χ. <strong>Ενεργά</strong>) και το κουμπί <strong>Add Product Tag</strong>. Με το 🗑 σβήνεις μια ετικέτα.</p>
      </StepCard>

      <StepCard number="2" title="Νέα ετικέτα">
        <p>Πάτα <strong>Add Product Tag</strong>, γράψε <strong>Όνομα</strong>*, άνοιξε την <strong>Ενεργή</strong> και πάτα <strong>Δημιουργία</strong>.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Η Ενεργή είναι κλειστή" variant="warning">
        <p>Στη νέα ετικέτα η <strong>Ενεργή</strong> είναι από προεπιλογή <strong>OFF</strong>. Άνοιξέ την.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Σε όλα τα προϊόντα μιας κατηγορίας" variant="info">
        <p>Αν βάλεις ετικέτα στα <strong>Product Creation Rules</strong> μιας κατηγορίας, μπαίνει σε όλα τα προϊόντα της κατηγορίας. Δες το <S to="/tutorial/secure/e-products">μάθημα 5.1</S>.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
