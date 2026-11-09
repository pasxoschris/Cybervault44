import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { Shot, S, Intro } from "../../../components/tutorial/SecureShot";

export default function Navigation() {
  return (
    <SecureTutorialLayout title="Περιήγηση" subtitle="Πώς κινείσαι στο μενού του Secure">

      <Intro>
        Όλες οι σελίδες του Secure ανοίγουν από το <strong>μενού αριστερά</strong>. Ο οδηγός ακολουθεί την ίδια σειρά με το μενού, οπότε ό,τι βλέπεις εκεί το βρίσκεις και εδώ με τον ίδιο αριθμό ενότητας.
      </Intro>

      <SectionTitle>Το μενού αριστερά</SectionTitle>

      <StepCard number="1" title="Ομάδες με γραμμές">
        <p>Οι επιλογές του μενού είναι χωρισμένες σε ομάδες με λεπτές γραμμές (π.χ. παρακολούθηση παραγγελιών, στατιστικά, κατάλογος, συσκευές, τραπέζια, χρήστες, ρυθμίσεις).</p>
      </StepCard>

      <StepCard number="2" title="Υπομενού με το >">
        <p>Όσες επιλογές έχουν δίπλα το σύμβολο <strong>&gt;</strong> ανοίγουν υπομενού. Πάτα πάνω τους για να δεις τις σελίδες που περιέχουν. Για παράδειγμα, ο <strong>Κατάλογος</strong> ανοίγει τα Προϊόντα, τα Συνοδευτικά, τους Τύπους Φ.Π.Α. κ.λπ.</p>
        <Shot src="dbe0c130b_menu-left.webp" alt="Το αριστερό μενού του Secure με ανοιχτό τον Κατάλογο" caption="Το μενού αριστερά, με ανοιχτό το υπομενού «Κατάλογος»" max={340} />
      </StepCard>

      <StepCard number="3" title="Συγχρονισμός">
        <p>Στο μενού βρίσκεις και τον <strong>Συγχρονισμό</strong>, που στέλνει τις αλλαγές σου στις συσκευές. Δες το <S to="/tutorial/secure/a-sync">μάθημα 1.3</S>.</p>
      </StepCard>

      <SectionTitle>Φίλτρα στις σελίδες</SectionTitle>

      <StepCard title="Ημερομηνίες και Μάρκες">
        <p>Στις σελίδες με στατιστικά και λίστες, πάνω πάνω υπάρχουν φίλτρα, όπως το εύρος ημερομηνιών και, αν το κατάστημα έχει, οι <strong>Μάρκες</strong>. Άλλαξέ τα για να δεις τα στοιχεία που θέλεις.</p>
      </StepCard>

      <SectionTitle>Δεν βλέπεις κάποια ενότητα;</SectionTitle>

      <InfoBox icon="ℹ️" title="Ενότητες που ενεργοποιεί η Spotlight" variant="info">
        <p>Κάποιες ενότητες του μενού εμφανίζονται μόνο αν τις έχει ενεργοποιήσει η Spotlight για το κατάστημα, π.χ. Delivery, Οικονομικά Στοιχεία, Αποθήκη, Παρουσιολόγιο, Σύστημα Επιβράβευσης, Συνδυασμοί Προϊόντων, Μάρκες, Δωμάτια, Spotit και B2G Invoices. Στον οδηγό τις αναγνωρίζεις από το σήμα 🔓. Αν δεν βλέπεις μια ενότητα που χρειάζεσαι, ζήτησέ την από τη Spotlight.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
