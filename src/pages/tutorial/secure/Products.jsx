import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function Products() {
  return (
    <SecureTutorialLayout title="Προϊόντα" subtitle="Η φόρμα του προϊόντος, ενότητα προς ενότητα">

      <Intro>
        Κάθε προϊόν που βλέπει ο σερβιτόρος στην εφαρμογή φτιάχνεται εδώ. Η φόρμα είναι μεγάλη, αλλά για να δουλέψει ένα προϊόν χρειάζονται μόνο τα πεδία με αστερίσκο (*). Τα υπόλοιπα τα συμπληρώνεις όταν τα χρειαστείς.
      </Intro>

      <StepCard number="1" title="Άνοιξε τα Προϊόντα">
        <p>Από το μενού αριστερά, πάτα <strong>Κατάλογος</strong> → <strong>Προϊόντα</strong>. Πάτα ένα προϊόν για να ανοίξει η <strong>Επεξεργασία Προϊόντος</strong>.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Πριν από τα προϊόντα" variant="warning">
        <p>Ο <strong>Εκτυπωτής</strong> είναι υποχρεωτικός σε κάθε προϊόν. Φτιάξε πρώτα τους <S to="/tutorial/secure/f-printers">Εκτυπωτές</S> (και τις <S to="/tutorial/secure/f-kitchen-displays">Οθόνες Κουζίνας</S>, αν υπάρχουν).</p>
      </InfoBox>

      <SectionTitle>Βασικά</SectionTitle>

      <StepCard title="Όνομα και κατηγορία">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Όνομα*</strong> και <strong>Κατηγορία*</strong> (π.χ. «- ΣΑΛΑΤΕΣ»). Η κατηγορία ορίζεται εδώ, στο προϊόν.</li>
          <li><strong>Ενεργό</strong>, <strong>Διαθέσιμο στον Online Κατάλογο</strong>, <strong>Λίστα Αγαπημένων</strong>, <strong>Use in Spotit app</strong>.</li>
        </ul>
      </StepCard>

      <SectionTitle>Τιμές</SectionTitle>

      <StepCard title="Τιμή και τιμοκατάλογοι">
        <p><strong>Τιμή*</strong>: η τιμή με ΦΠΑ. Από κάτω υπάρχει μία τιμή για κάθε <S to="/tutorial/secure/e-pricelists">τιμοκατάλογο</S> (π.χ. TAKE AWAY, HAPPY HOUR, Wolt). Οι τιμοκατάλογοι είναι εναλλακτικές τιμές του ίδιου προϊόντος.</p>
      </StepCard>

      <SectionTitle>Φορολογικά</SectionTitle>

      <StepCard title="Μονάδα, φορολογικό είδος, κόστος">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Τύπος Μονάδας*</strong>, <strong>Τύπος</strong>, <strong>Φορολογικό Είδος*</strong>.</li>
          <li><strong>Κόστος Αγαθού</strong> (€, με αριθμομηχανή): το κόστος του προϊόντος για το κατάστημα.</li>
        </ul>
      </StepCard>

      <InfoBox icon="⚠️" title="Μην αφήνεις κενό το Κόστος Αγαθού" variant="warning">
        <p>Στην <S to="/tutorial/discount-own">Ιδιοκατανάλωση</S> εκδίδεται Στοιχείο Αυτοπαράδοσης με το Κόστος Αγαθού. Αν το πεδίο είναι κενό, η Αυτοπαράδοση βγαίνει λάθος ή εμφανίζεται σφάλμα «Vat Amount».</p>
      </InfoBox>

      <SectionTitle>Λοιπά και εμφάνιση</SectionTitle>

      <StepCard title="Πεδία">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Περιγραφή</strong>, <strong>Διαθέσιμη Ποσότητα</strong>, <strong>Barcode</strong>, <strong>PLU</strong>.</li>
          <li><strong>Σειρά Σερβιρίσματος</strong> (π.χ. Starters): ορίζεται ανά προϊόν. Δες <S to="/tutorial/secure/e-courses">Σειρές Σερβιρίσματος</S>.</li>
          <li><strong>Χρώμα</strong> και <strong>Φωτογραφία</strong>.</li>
          <li><strong>Έκπτωση Ιδιοκατανάλωσης</strong> (ποσοστό ή ποσό).</li>
        </ul>
      </StepCard>

      <SectionTitle>Κουζίνα και εκτύπωση</SectionTitle>

      <StepCard title="Πού πάει η παραγγελία">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Εκτυπωτές*</strong> (υποχρεωτικό): σε ποιον εκτυπωτή βγαίνει το προϊόν.</li>
          <li><strong>Οθόνες Κουζίνας</strong> και <strong>Χρόνος Προετοιμασίας</strong>.</li>
        </ul>
      </StepCard>

      <SectionTitle>Συνοδευτικά και ετικέτες</SectionTitle>

      <StepCard title="Πεδία">
        <p><strong>Ομάδες Συνοδευτικών</strong> (π.χ. ΜΕ, ΧΩΡΙΣ, EXTRA· δες <S to="/tutorial/secure/e-modifiers">Συνοδευτικά</S>), <strong>Ετικέτες Προϊόντων</strong>, <strong>Τύποι Φαγητού</strong>, <strong>Enable Modifier Filtering</strong>.</p>
      </StepCard>

      <SectionTitle>Delivery</SectionTitle>

      <StepCard title="Αντιστοίχιση με τις πλατφόρμες">
        <p><strong>Προϊόν Wolt</strong>, <strong>Delivery Manager Product</strong>, <strong>Efood Product</strong>: εδώ αντιστοιχίζεις το προϊόν σου με το αντίστοιχο της πλατφόρμας.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Συστατικά συνταγής και Σύστημα Επιβράβευσης" variant="info">
        <p><strong>Συστατικά συνταγής</strong> (Προϊόν, Ποσότητα, Τύπος Μονάδας, Μεζούρα, Include Only at): η σύνδεση με την <S to="/tutorial/secure/g-inv-stocktake">Αποθήκη</S>.</p>
        <p><strong>Σύστημα Επιβράβευσης</strong>: κανόνες ανά προϊόν (Τύπος Πελάτη, Τύπος Έκπτωσης, Τιμή, Πρώτη Παραγγελία), με δικό τους κουμπί αποθήκευσης.</p>
      </InfoBox>

      <StepCard title="Αποθήκευση">
        <p>Κάτω: <strong>Ακύρωση</strong>, <strong>Αποθήκευση</strong> ή <strong>Αποθήκευση &amp; Επιστροφή</strong> (αποθηκεύει και γυρίζει στη λίστα).</p>
      </StepCard>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Για να δουν οι σερβιτόροι τα νέα προϊόντα ή τις νέες τιμές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
