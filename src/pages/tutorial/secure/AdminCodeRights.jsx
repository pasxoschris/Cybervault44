import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function AdminCodeRights() {
  return (
    <SecureTutorialLayout title="Δικαιώματα Διαχειριστικού Κωδικού" subtitle="Ποιες ενέργειες επιτρέπονται σε κάθε χρήστη">

      <Intro>
        Κάποιες ενέργειες στην εφαρμογή χρειάζονται <strong>Κωδικό Διαχειριστή</strong>. Στα Δικαιώματα Διαχειριστικού Κωδικού ορίζεις, χρήστη προς χρήστη, ποιες από αυτές επιτρέπονται.
      </Intro>

      <StepCard number="1" title="Άνοιξε τον χρήστη">
        <p><strong>Χρήστες</strong> → ρόλος → χρήστης → <strong>Επεξεργασία Χρήστη</strong>. Τα δικαιώματα είναι διακόπτες στην ίδια σελίδα. Δες το <S to="/tutorial/secure/i-users">17.1 Χρήστες</S>.</p>
      </StepCard>

      <StepCard number="2" title="Άνοιξε ή κλείσε τους διακόπτες">
        <p>ON (πράσινο) για όσα θέλεις να επιτρέπονται:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Αναφορά Βάρδιας</strong> (<S to="/tutorial/shift-report">Αναφορά Βάρδιας</S>).</li>
          <li><strong>Εκπτώσεις</strong> (<S to="/tutorial/discount">Έκπτωση</S>).</li>
          <li><strong>Διαγραφή Παραγγελίας ή Προϊόντος</strong> (<S to="/tutorial/cancel-order">Ακύρωση Παραγγελίας</S>, <S to="/tutorial/cancel-product">Ακύρωση Προϊόντος</S>).</li>
          <li><strong>Μεταφορά Παραγγελιών</strong> (<S to="/tutorial/transfer-order">Μεταφορά Παραγγελίας</S>).</li>
          <li><strong>Επιβεβλημένη Σύνδεση:</strong> αποσυνδέει τον χρήστη από μια συσκευή ακόμα κι αν είναι συνδεδεμένος (force log off).</li>
          <li><strong>Επανεκτύπωση Προϊόντων:</strong> ξαναστέλνει την παραγγελία σε κουζίνα/μπαρ.</li>
          <li><strong>Εκτύπωση Συνολικής Παραγγελίας:</strong> ο προσωρινός λογαριασμός (pre-bill) για να δει ο πελάτης το σύνολο πριν πληρώσει.</li>
        </ul>
        <p>Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Ιδιοκατανάλωση" variant="info">
        <p>Η Ιδιοκατανάλωση εγκρίνεται με Κωδικό Διαχειριστή και δεν έχει δικό της διακόπτη εδώ.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
