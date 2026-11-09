import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function PrintNames() {
  return (
    <SecureTutorialLayout title="Ονόματα Φορ. Εκτύπωσης" subtitle="Το γενικό όνομα που τυπώνεται στο παραστατικό">

      <Intro>
        Το <strong>Όνομα Φορ. Εκτύπωσης</strong> είναι ένα γενικό όνομα που εμφανίζεται στο παραστατικό αντί για το όνομα του προϊόντος. Για παράδειγμα, οι «ΠΑΤΑΤΕΣ ΤΗΓΑΝΙΤΕΣ» μπορεί να τυπώνονται στην απόδειξη ως «ΦΑΓΗΤΟ».
      </Intro>

      <SectionTitle>Πώς το χρησιμοποιείς</SectionTitle>

      <StepCard number="1" title="Η λίστα με τα ονόματα">
        <p>Στη σελίδα <strong>Ονόματα Φορ. Εκτύπωσης</strong> (Κατάλογος &gt;) βλέπεις τα γενικά ονόματα που υπάρχουν για το κατάστημα.</p>
      </StepCard>

      <StepCard number="2" title="Σύνδεση με προϊόν ή κατηγορία">
        <p>Στο προϊόν ή στην κατηγορία, διάλεξε το όνομα στο πεδίο <strong>«Όνομα Φορ. Εκτύπωσης»</strong>. Δες το <S to="/tutorial/secure/e-products">μάθημα 5.1</S>.</p>
      </StepCard>

      <StepCard number="3" title="Ο ΦΠΑ">
        <p>Ο ΦΠΑ δεν αλλάζει: περνάει από το ίδιο το προϊόν.</p>
      </StepCard>

      <StepCard title="Συγχρονισμός 🔄">
        <p>Μετά από αλλαγές κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Τι γράφει το κάτω μέρος του παραστατικού" variant="info">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Τύπος παραστατικού</strong> (π.χ. 8.6).</li>
          <li><strong>ΜΑΡΚ</strong>: ο αριθμός καταχώρισης του παραστατικού στο myDATA.</li>
          <li><strong>UID</strong>: ο μοναδικός κωδικός του παραστατικού.</li>
          <li><strong>QR</strong>: με αυτό ελέγχεται το παραστατικό.</li>
          <li>Ο πάροχος είναι πάντα η <strong>ONESIGN</strong>.</li>
        </ul>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
