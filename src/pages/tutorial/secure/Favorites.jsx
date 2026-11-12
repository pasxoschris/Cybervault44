import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function Favorites() {
  return (
    <SecureTutorialLayout title="Αγαπημένα" subtitle="Λίστες με τα προϊόντα που χτυπιούνται πιο συχνά">

      <Intro>
        Οι <strong>Λίστες Αγαπημένων</strong> μαζεύουν τα προϊόντα που χτυπιούνται πιο συχνά (π.χ. Freddo Espresso, Freddo Cappuccino), για να τα βρίσκει γρήγορα ο σερβιτόρος στην εφαρμογή.
      </Intro>

      <SectionTitle>Η σελίδα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τα Αγαπημένα">
        <p>Από το μενού αριστερά πάτα <strong>Κατάλογος</strong> → <strong>Αγαπημένα</strong>.</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Αριστερά, στη στήλη <strong>Λίστες</strong>: οι λίστες αγαπημένων. Το <strong>+</strong> φτιάχνει νέα λίστα και το ✏️ ανοίγει την επεξεργασία της.</li>
          <li>Δεξιά: τα προϊόντα της λίστας που επέλεξες, με στήλες <strong>Όνομα</strong>, <strong>Κατηγορία</strong>, <strong>Ομάδα</strong> (η λίστα) και <strong>Τιμή</strong>. Πάνω υπάρχουν <strong>Αναζήτηση</strong> και φίλτρο (π.χ. <strong>Ενεργά</strong>).</li>
        </ul>
      </StepCard>

      <SectionTitle>Προσθήκη προϊόντος</SectionTitle>

      <StepCard number="2" title="Από τη σελίδα Αγαπημένα">
        <p>Πάτα <strong>Προσθήκη προϊόντος στα Αγαπημένα</strong>. Στο παράθυρο:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Προϊόν</strong>: γράψε λίγα γράμματα (π.χ. «fr») και διάλεξε το προϊόν.</li>
          <li><strong>Λίστες Αγαπημένων</strong>: διάλεξε τη λίστα.</li>
        </ul>
        <p className="mt-2">Πάτα <strong>OK</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Ή από το ίδιο το προϊόν">
        <p>Στη φόρμα του προϊόντος, στο πεδίο <strong>★ Λίστα Αγαπημένων</strong>, διάλεξε τη λίστα. Δες το <S to="/tutorial/secure/e-products">μάθημα 5.1</S>.</p>
      </StepCard>

      <StepCard number="4" title="Συγχρονισμός 🔄">
        <p>Κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Στην εφαρμογή" variant="info">
        <p>Ο χρήστης διαλέγει ποια λίστα βλέπει από τις <S to="/tutorial/settings">Ρυθμίσεις Χρήστη</S> → <strong>Λίστα Αγαπημένων</strong>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
