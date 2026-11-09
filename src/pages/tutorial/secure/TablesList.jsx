import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { Shot, S, Intro } from "../../../components/tutorial/SecureShot";

export default function TablesList() {
  return (
    <SecureTutorialLayout title="Λίστα Τραπεζιών και ομάδες" subtitle="Οι χώροι του καταστήματος και τα τραπέζια τους">

      <Intro>
        Τα τραπέζια οργανώνονται σε <strong>ομάδες</strong>, μία για κάθε χώρο (π.χ. ΑΥΛΗ, ΣΑΛΑ, ΜΠΑΛΚΟΝΙ). Στη Λίστα φτιάχνεις πρώτα τις ομάδες και μετά τα τραπέζια τους. Τη θέση τους στον χώρο τη ρυθμίζεις μετά, στην <S to="/tutorial/secure/f-floor-plan">8.2 Κάτοψη Τραπεζιών</S>.
      </Intro>

      <StepCard number="1" title="Άνοιξε τη Λίστα">
        <p>Από το μενού αριστερά, πάτα <strong>Τραπέζια</strong> → <strong>Λίστα</strong>. Αριστερά βλέπεις τις <strong>Ομάδες</strong> και δεξιά τα <strong>Τραπέζια</strong> της ομάδας που έχεις επιλέξει.</p>
      </StepCard>

      <Shot src="38472ccfd_tables-list.webp" alt="Λίστα Τραπεζιών: ομάδες αριστερά, τραπέζια δεξιά" caption="Ομάδες αριστερά · τραπέζια της ομάδας ΑΥΛΗ δεξιά, με τα κουμπιά πάνω και τα εικονίδια σε κάθε γραμμή" max="max-w-3xl" />

      <SectionTitle>Ομάδες τραπεζιών</SectionTitle>

      <StepCard number="2" title="Νέα ομάδα">
        <p>Κάτω από τις ομάδες, πάτα <strong>+ Προσθήκη Νέας Ομάδας</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Συμπλήρωσε τα στοιχεία της">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Όνομα</strong> (υποχρεωτικό), π.χ. ΑΥΛΗ.</li>
          <li><strong>Χρώμα</strong> (προαιρετικό), π.χ. Pink.</li>
          <li><strong>Ενεργή:</strong> ON.</li>
        </ul>
        <p>Πάτα <strong>Αποθήκευση</strong>. Για να αλλάξεις μια υπάρχουσα ομάδα, πάτα το ✏️ δίπλα στο όνομά της. Με το 👁 την απενεργοποιείς.</p>
      </StepCard>

      <Shot src="7186242b5_tables-group.webp" alt="Επεξεργασία Ομάδας Τραπεζιών: Όνομα, Χρώμα, Ενεργή" caption="Επεξεργασία Ομάδας Τραπεζιών" max="max-w-xl" />

      <InfoBox icon="ℹ️" title="Πού φαίνεται το χρώμα της ομάδας" variant="info">
        <p>Στην εφαρμογή, το χρώμα της ομάδας φαίνεται στην επικεφαλίδα της ομάδας, όταν διαλέγεις τραπέζι, και στις κάρτες των <S to="/tutorial/shift">Παραγγελιών Βάρδιας</S>. Διάλεξε διαφορετικό χρώμα για κάθε χώρο, ώστε ο σερβιτόρος να τους ξεχωρίζει με μια ματιά.</p>
        <p>Τα χρώματα στη <S to="/tutorial/secure/c-order-flow">Ροή Παραγγελιών</S> του Secure είναι άλλο πράγμα: εκεί δείχνουν την κατάσταση της παραγγελίας.</p>
      </InfoBox>

      <SectionTitle>Τραπέζια</SectionTitle>

      <StepCard number="4" title="Νέο τραπέζι">
        <p>Διάλεξε την ομάδα αριστερά και πάτα <strong>Νέο Τραπέζι</strong> (κόκκινο κουμπί πάνω δεξιά). Δώσε <strong>Όνομα</strong> (π.χ. A1) και <strong>Θέσεις Ατόμων</strong>.</p>
      </StepCard>

      <StepCard title="Τι βλέπεις στη λίστα">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Αναζήτηση</strong>, φίλτρο <strong>Ενεργά</strong> και πόσα τραπέζια ανά σελίδα.</li>
          <li><strong>Λήψη των Spotit QR:</strong> τα QR των τραπεζιών για το Spotit.</li>
          <li>Σε κάθε γραμμή: το εικονίδιο <strong>QR</strong> του τραπεζιού, το 👁 <strong>Απενεργοποίηση</strong> και ο 🗑 κάδος για διαγραφή.</li>
        </ul>
      </StepCard>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Για να περάσουν οι αλλαγές στις συσκευές των σερβιτόρων, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
