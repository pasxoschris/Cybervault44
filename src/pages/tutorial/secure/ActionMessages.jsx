import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function ActionMessages() {
  return (
    <SecureTutorialLayout title="Μηνύματα Ενεργειών" subtitle="Έτοιμα μηνύματα που στέλνει ο σερβιτόρος στους εκτυπωτές">

      <Intro>
        Τα <strong>Μηνύματα Ενεργειών</strong> είναι έτοιμα μηνύματα (π.χ. «πάσο», «βγάλε 1», «βγάλε 2») που στέλνει ο σερβιτόρος από την εφαρμογή στους εκτυπωτές, π.χ. στην κουζίνα. Έτσι δεν χρειάζεται να τα πληκτρολογεί κάθε φορά.
      </Intro>

      <SectionTitle>Στο Secure</SectionTitle>

      <StepCard number="1" title="Άνοιξε τα Μηνύματα Ενεργειών">
        <p>Από το μενού αριστερά πάτα <strong>Κατάλογος</strong> → <strong>Μηνύματα Ενεργειών</strong>. Για κάθε μήνυμα βλέπεις:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Όνομα</strong>: το κείμενο του μηνύματος. Αλλάζει πάνω στο πεδίο.</li>
          <li><strong>Ενεργό</strong>.</li>
          <li><strong>Προεπιλεγμένοι Εκτυπωτές</strong>: σε ποιους εκτυπωτές πάει το μήνυμα (π.χ. All Printers ή συγκεκριμένοι).</li>
          <li>Με το <strong>↕</strong> αλλάζεις τη σειρά και με το <strong>⊗</strong> σβήνεις το μήνυμα.</li>
        </ul>
      </StepCard>

      <StepCard number="2" title="Νέο μήνυμα">
        <p>Στην τελευταία γραμμή γράψε το μήνυμα, άφησε το <strong>Ενεργό</strong> ON, διάλεξε <strong>Προεπιλεγμένους Εκτυπωτές</strong> και πάτα <strong>Προσθήκη</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Αποθήκευση">
        <p>Πάτα <strong>Αποθήκευση</strong>. Το ίδιο κάνεις και μετά από κάθε αλλαγή στη λίστα.</p>
      </StepCard>

      <StepCard number="4" title="Συγχρονισμός 🔄">
        <p>Κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </StepCard>

      <SectionTitle>Στην εφαρμογή</SectionTitle>

      <InfoBox icon="ℹ️" title="Πώς τα στέλνει ο σερβιτόρος" variant="info">
        <p>Στα <strong>Στοιχεία Παραγγελίας</strong> πατάει <strong>Αποστολή Μηνύματος</strong>. Μπορεί να πληκτρολογήσει δικό του μήνυμα ή να <strong>διαλέξει ένα από τα έτοιμα</strong>. Στην <strong>επιλογή εκτυπωτών</strong> διαλέγει πού θα πάει, και πατάει <strong>Αποστολή</strong>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
