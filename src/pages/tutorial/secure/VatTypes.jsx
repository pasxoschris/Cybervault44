import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function VatTypes() {
  return (
    <SecureTutorialLayout title="Τύποι Φ.Π.Α." subtitle="Οι συντελεστές ΦΠΑ του καταστήματος">

      <Intro>
        Εδώ βλέπεις τους <strong>Τύπους Φ.Π.Α.</strong> που μπορείς να διαλέξεις στα <S to="/tutorial/secure/e-products">προϊόντα και τις κατηγορίες</S> και στα <S to="/tutorial/secure/e-modifiers">συνοδευτικά</S>.
      </Intro>

      <SectionTitle>Η λίστα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τους Τύπους Φ.Π.Α.">
        <p>Από το μενού αριστερά πάτα <strong>Κατάλογος</strong> → <strong>Τύποι Φ.Π.Α.</strong></p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Στήλες <strong>Όνομα</strong> και <strong>Ποσοστό</strong>, π.χ. Μηδενικός Συντελεστής ΦΠΑ 0%, ΦΠΑ 13%, ΦΠΑ 24%.</li>
          <li>Η <strong>πράσινη τελεία</strong> δίπλα στο όνομα σημαίνει ότι ο τύπος είναι ενεργός.</li>
          <li>Πάνω υπάρχουν <strong>Αναζήτηση</strong> και φίλτρο (π.χ. <strong>Ενεργοί</strong>).</li>
        </ul>
      </StepCard>

      <InfoBox icon="ℹ️" title="Χρειάζεσαι άλλον τύπο;" variant="info">
        <p>Τύπους Φ.Π.Α. δεν προσθέτεις από εδώ. Αν χρειάζεσαι κάποιον που δεν υπάρχει στη λίστα, ζήτησέ τον από τη <strong>Spotlight</strong>.</p>
      </InfoBox>

      <SectionTitle>Μηδενικός συντελεστής: άρθρα απαλλαγής</SectionTitle>

      <StepCard number="2" title="Tax Exemption Categories">
        <p>Στη γραμμή του <strong>Μηδενικού Συντελεστή ΦΠΑ 0%</strong>, το εικονίδιο δεξιά ανοίγει τα <strong>Tax Exemption Categories</strong>: τη λίστα με τα άρθρα απαλλαγής από τον ΦΠΑ (π.χ. Άρθρο 13, Άρθρο 22, Άρθρο 44).</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Πράσινη τελεία:</strong> το άρθρο είναι ενεργό. <strong>Κόκκινη:</strong> ανενεργό.</li>
          <li>Με το <strong>👁</strong> στη στήλη Actions ενεργοποιείς ή απενεργοποιείς ένα άρθρο.</li>
        </ul>
      </StepCard>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
