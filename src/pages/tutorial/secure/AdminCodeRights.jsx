import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function AdminCodeRights() {
  return (
    <SecureTutorialLayout title="Δικαιώματα Διαχειριστικού Κωδικού" subtitle="Ποιες ενέργειες μπορεί να εγκρίνει ο κωδικός κάθε χρήστη">

      <Intro>
        Κάποιες ενέργειες στην εφαρμογή χρειάζονται <strong>Κωδικό Διαχειριστή</strong>. Όταν η εφαρμογή τον ζητήσει, κάποιος που έχει Κωδικό Διαχειριστή τον δίνει και εγκρίνει την ενέργεια. Στα Δικαιώματα Διαχειριστικού Κωδικού ορίζεις, για κάθε χρήστη με Κωδικό Διαχειριστή, <strong>ποιες ενέργειες μπορεί να εγκρίνει ο κωδικός του</strong>.
      </Intro>

      <StepCard number="1" title="Πού βρίσκονται">
        <p>Τα δικαιώματα είναι διακόπτες στη φόρμα του χρήστη: στην <strong>Προσθήκη Χρήστη</strong> για νέο χρήστη ή στην <strong>Επεξεργασία Χρήστη</strong> για υπάρχοντα. Δες το <S to="/tutorial/secure/i-users">17.1 Χρήστες</S>.</p>
        <p>Η ενότητα <strong>Δικαιώματα Διαχειριστικού Κωδικού</strong> εμφανίζεται μόλις συμπληρωθεί το πεδίο <strong>Κωδικός Διαχειριστή</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Άνοιξε ή κλείσε τους διακόπτες">
        <p>ON (πράσινο) για κάθε ενέργεια που θέλεις να εγκρίνει ο κωδικός αυτού του χρήστη:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Αναφορά Βάρδιας</strong>.</li>
          <li><strong>Εκπτώσεις</strong> (<S to="/tutorial/discount">Έκπτωση</S>).</li>
          <li><strong>Διαγραφή Παραγγελίας ή Προϊόντος</strong> (<S to="/tutorial/cancel-order">Ακύρωση Παραγγελίας</S>, <S to="/tutorial/cancel-product">Ακύρωση Προϊόντος</S>).</li>
          <li><strong>Μεταφορά Παραγγελιών</strong> (<S to="/tutorial/transfer-order">Μεταφορά Παραγγελίας</S>).</li>
          <li><strong>Επιβεβλημένη Σύνδεση:</strong> αποσυνδέει τον χρήστη από μια συσκευή ακόμα κι αν είναι συνδεδεμένος (force log off).</li>
          <li><strong>Επανεκτύπωση Προϊόντων:</strong> ξαναστέλνει την παραγγελία σε κουζίνα/μπαρ.</li>
          <li><strong>Εκτύπωση Συνολικής Παραγγελίας:</strong> ο προσωρινός λογαριασμός (pre-bill) για να δει ο πελάτης το σύνολο πριν πληρώσει.</li>
        </ul>
        <p>Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <InfoBox icon="💡" title="Παράδειγμα" variant="info">
        <p>Ο Υπεύθυνος Κώστας έχει Κωδικό Διαχειριστή και <strong>Εκπτώσεις: ON</strong>. Όταν ένας σερβιτόρος κάνει έκπτωση και η εφαρμογή ζητήσει Κωδικό Διαχειριστή, ο Κώστας δίνει τον κωδικό του και η έκπτωση περνάει. Αν ο διακόπτης ήταν OFF, ο κωδικός του Κώστα δεν θα ενέκρινε εκπτώσεις.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Ιδιοκατανάλωση" variant="info">
        <p>Η Ιδιοκατανάλωση εγκρίνεται με Κωδικό Διαχειριστή και δεν έχει δικό της διακόπτη εδώ.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
