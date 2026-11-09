import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { Shot, S, Intro } from "../../../components/tutorial/SecureShot";

export default function Users() {
  return (
    <SecureTutorialLayout title="Χρήστες" subtitle="Οι λογαριασμοί των υπαλλήλων στην εφαρμογή">

      <Intro>
        Κάθε υπάλληλος που δουλεύει στην εφαρμογή έχει δικό του <strong>χρήστη</strong>, με όνομα χρήστη, κωδικό και ρόλο. Οι χρήστες οργανώνονται ανά <S to="/tutorial/secure/i-roles">ρόλο</S> (π.χ. Σερβιτόρος, Ταμείας).
      </Intro>

      <StepCard number="1" title="Άνοιξε τους Χρήστες">
        <p>Από το μενού αριστερά, πάτα <strong>Χρήστες</strong>. Αριστερά, στη στήλη <strong>Ρόλοι</strong>, βλέπεις «Όλοι οι Ρόλοι» ή έναν ρόλο (π.χ. Σερβιτόρος). Πάνω έχεις <strong>Αναζήτηση</strong>, φίλτρο <strong>Ετικέτες Χρηστών</strong>, φίλτρο <strong>Ενεργοί</strong> και το κουμπί <strong>Προσθήκη Χρήστη</strong>.</p>
        <p>Στήλες: <strong>Πλήρες Όνομα</strong>, <strong>Όνομα Χρήστη</strong>, <strong>Ρόλος</strong>, <strong>Ετικέτα Χρήστη</strong>. Δεξιά σε κάθε γραμμή: 👁 απενεργοποίηση και 🗑 διαγραφή.</p>
      </StepCard>

      <SectionTitle>Νέος χρήστης</SectionTitle>

      <StepCard number="2" title="Πάτα Προσθήκη Χρήστη">
        <p>Ανοίγει η φόρμα <strong>Προσθήκη Χρήστη</strong>. Συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Ρόλος*</strong>: διάλεξε από τη λίστα (π.χ. Σερβιτόρος).</li>
          <li><strong>Πλήρες Όνομα*</strong>, <strong>Όνομα Χρήστη*</strong>, <strong>Κωδικός*</strong>.</li>
          <li><strong>Κωδικός Διαχειριστή</strong> (προαιρετικό). Μόλις τον γράψεις, εμφανίζονται από κάτω τα <S to="/tutorial/secure/i-admin-code-rights">Δικαιώματα Διαχειριστικού Κωδικού</S>.</li>
          <li><strong>Εκπαιδευόμενος</strong>, <strong>Ετικέτα Χρήστη</strong>.</li>
          <li><strong>Ενεργός: ON.</strong></li>
        </ul>
        <p>Πάτα <strong>Δημιουργία</strong>.</p>
      </StepCard>

      <Shot src="611919d35_user-new.webp" alt="Φόρμα Προσθήκη Χρήστη με Δικαιώματα Διαχειριστικού Κωδικού" caption="Προσθήκη Χρήστη: με Κωδικό Διαχειριστή εμφανίζονται και τα Δικαιώματα" max="max-w-sm" />

      <InfoBox icon="⚠️" title="Άνοιξε το «Ενεργός»" variant="warning">
        <p>Στη φόρμα, το <strong>Ενεργός</strong> είναι από προεπιλογή <strong>OFF</strong>. Αν δεν το ανοίξεις, ο νέος χρήστης δεν θα μπορεί να δουλέψει.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Μετά: Συγχρονισμός" variant="info">
        <p>Για να μπορεί ο νέος χρήστης να συνδεθεί στην εφαρμογή, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

      <SectionTitle>Επεξεργασία Χρήστη</SectionTitle>

      <StepCard number="3" title="Άνοιξε έναν χρήστη">
        <p>Πάτα το όνομα του χρήστη στη λίστα. Ανοίγει η σελίδα <strong>Επεξεργασία Χρήστη</strong>, με τα ίδια πεδία και επιπλέον:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Με το <strong>Όνομα Χρήστη</strong> και τον <strong>Κωδικό</strong> συνδέεται ο υπάλληλος στην εφαρμογή.</li>
          <li><strong>Κωδικός Διαχειριστή:</strong> ο κωδικός που δίνει ο χρήστης για να εγκρίνει ενέργειες όπως εκπτώσεις ή ακυρώσεις. Τι επιτρέπεται ορίζεται στα <S to="/tutorial/secure/i-admin-code-rights">Δικαιώματα Διαχειριστικού Κωδικού</S>.</li>
          <li><strong>Manager Access:</strong> πρόσβαση στο διαχειριστικό περιβάλλον από την εφαρμογή (μόνο σε iPad).</li>
        </ul>
        <p>Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <StepCard number="4" title="QR Code Σύνδεσης">
        <p>Στην ίδια σελίδα βρίσκεται το προσωπικό <strong>QR Code Σύνδεσης</strong> του χρήστη. Με το <strong>Αποστολή στο email</strong> του το στέλνεις («Spotlight POS - [όνομα] QR code»).</p>
        <p>Με αυτό το QR ο υπάλληλος <S to="/tutorial/login">συνδέεται στην εφαρμογή</S> χωρίς κωδικό. Το ίδιο QR χρησιμοποιείται και στην Ιδιοκατανάλωση.</p>
      </StepCard>

      <StepCard number="5" title="Ρυθμίσεις Χρήστη">
        <p>Πάνω δεξιά, το κουμπί <strong>Ρυθμίσεις Χρήστη</strong> ανοίγει τις ρυθμίσεις της εφαρμογής για αυτόν τον χρήστη. Τις ορίζεις εσύ από πριν και ο υπάλληλος τις βρίσκει έτοιμες. Δες το <S to="/tutorial/secure/i-user-settings">17.3 Ρυθμίσεις Χρήστη</S>.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Απενεργοποίηση χρήστη που είναι συνδεδεμένος" variant="warning">
        <p>Αν απενεργοποιήσεις (Ενεργός: off) χρήστη ενώ είναι συνδεδεμένος, η συσκευή του σταματά να συγχρονίζει και ο χρήστης βλέπει <strong>«Sync failed»</strong>. Για να συγχρονίσει ξανά, ο χρήστης πρέπει να είναι Ενεργός.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Άλλα πεδία" variant="info">
        <p><strong>Εκπαιδευόμενος</strong>, <strong>Ετικέτα Χρήστη</strong> (δες <S to="/tutorial/secure/i-user-tags">Ετικέτες Χρηστών</S>) και, στην Επεξεργασία, <strong>Παρουσιολόγιο</strong> (QR, email και αποστολή· δες <S to="/tutorial/secure/i-attendance">Παρουσιολόγιο</S>).</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
