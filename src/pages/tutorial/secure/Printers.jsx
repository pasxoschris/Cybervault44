import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { Shot, S, Intro } from "../../../components/tutorial/SecureShot";

export default function Printers() {
  return (
    <SecureTutorialLayout title="Εκτυπωτές" subtitle="Πού τυπώνονται παραγγελίες, αποδείξεις και αναφορές">

      <Intro>
        Κάθε εκτυπωτής του καταστήματος (μπαρ, κουζίνα, ταμείο) δηλώνεται εδώ. Ο εκτυπωτής είναι <strong>υποχρεωτικός σε κάθε προϊόν</strong>, γι' αυτό τους εκτυπωτές τούς φτιάχνεις <strong>πριν</strong> από τα <S to="/tutorial/secure/e-products">Προϊόντα</S>.
      </Intro>

      <SectionTitle>Η λίστα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τους Εκτυπωτές">
        <p>Από το μενού αριστερά, πάτα <strong>Συσκευές</strong> → <strong>Εκτυπωτές</strong>.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Αριστερά, στη στήλη <strong>Ομάδες</strong>: «Όλες οι ομάδες» και οι ομάδες εκτυπωτών του καταστήματος (✏️ για επεξεργασία).</li>
          <li>Δεξιά: <strong>Αναζήτηση</strong>, το κουμπί <strong>Προσθήκη Εκτυπωτή</strong> και οι εκτυπωτές με στήλες <strong>Όνομα</strong>, <strong>Διεύθυνση IP</strong>, <strong>Port</strong> και <strong>Στοιχεία</strong> (π.χ. «Σε 1 Ομάδα», «Σε 89 Κατηγορίες Προϊόντων»).</li>
        </ul>
      </StepCard>

      <SectionTitle>Νέος εκτυπωτής</SectionTitle>

      <StepCard number="2" title="Πάτα Προσθήκη Εκτυπωτή">
        <p>Ανοίγει η φόρμα <strong>Προσθήκη Εκτυπωτή</strong>.</p>
      </StepCard>

      <Shot src="5e5ca104a_printer-new.webp" alt="Φόρμα Προσθήκη Εκτυπωτή" caption="Προσθήκη Εκτυπωτή: τα υποχρεωτικά πεδία έχουν κόκκινο πλαίσιο" max="max-w-sm" />

      <StepCard number="3" title="Στοιχεία σύνδεσης">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Όνομα*</strong>: π.χ. BAR, ΚΟΥΖΙΝΑ.</li>
          <li><strong>Διεύθυνση IP*</strong> και <strong>Port</strong> (π.χ. 9100): η διεύθυνση του εκτυπωτή στο δίκτυο του καταστήματος.</li>
          <li><strong>Κωδικοποίηση</strong> (π.χ. Greek (Windows)), <strong>CodeTable*</strong> (π.χ. 47), <strong>Manufacturer</strong> (π.χ. EPSON).</li>
          <li><strong>Εκτύπωση Πρόσθετων Γραμμών</strong> με τα − / +, και <strong>Skip Dynamic Codetable</strong>.</li>
        </ul>
      </StepCard>

      <StepCard number="4" title="Ομάδες">
        <p><strong>Ομάδες*</strong> (υποχρεωτικό): διάλεξε σε ποια ομάδα ή ομάδες εκτυπωτών ανήκει ο εκτυπωτής.</p>
      </StepCard>

      <StepCard number="5" title="Τι τυπώνει αυτός ο εκτυπωτής">
        <p>Άνοιξε (ON) ό,τι θέλεις να βγαίνει σε αυτόν τον εκτυπωτή:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Αναφορά Βάρδιας:</strong> εδώ τυπώνεται η αναφορά βάρδιας.</li>
          <li><strong>Εκτύπωση Συνολικής Παραγγελίας:</strong> εδώ βγαίνει ο προσωρινός λογαριασμός (pre-bill).</li>
          <li><strong>Εκτυπωτής Αποδείξεων:</strong> εδώ βγαίνουν οι αποδείξεις. Όταν είναι ON, εμφανίζεται και το <strong>Double Receipt</strong>, για να τυπώνονται δύο αντίγραφα.</li>
          <li><strong>Απόκρυψη Τιμών:</strong> το δελτίο βγαίνει χωρίς τιμές, π.χ. για την κουζίνα.</li>
        </ul>
      </StepCard>

      <StepCard number="6" title="Κατηγορίες Προϊόντων">
        <p>Τσέκαρε τις κατηγορίες που αφορούν αυτόν τον εκτυπωτή, π.χ. COFFEE και SOFT DRINKS για το BAR.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Επιλογή όλων</strong> και <strong>Καθ/σμός</strong> (καθαρισμός).</li>
          <li><strong>Γρήγορη αναζήτηση στις Κατηγορίες</strong>.</li>
          <li>Το ▸ δίπλα σε μια κατηγορία ανοίγει τις υποκατηγορίες της.</li>
        </ul>
      </StepCard>

      <StepCard number="7" title="Δημιουργία">
        <p>Συμπλήρωσε προαιρετικά την <strong>Περιγραφή</strong> και πάτα <strong>Δημιουργία</strong>. Για να αλλάξεις έναν εκτυπωτή, πάτα το όνομά του στη λίστα: ανοίγει η <strong>Επεξεργασία Εκτυπωτή</strong> με τα ίδια πεδία.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Το προειδοποιητικό τρίγωνο στην εφαρμογή" variant="info">
        <p>Αν ο εκτυπωτής δεν απαντά, ο σερβιτόρος βλέπει προειδοποιητικό τρίγωνο. Δες το <S to="/tutorial/printer-warning">Προειδοποιητικό Τρίγωνο Εκτυπωτή</S> στο Service.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
