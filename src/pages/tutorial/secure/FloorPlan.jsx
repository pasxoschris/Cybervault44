import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { Shot, S, Intro } from "../../../components/tutorial/SecureShot";

export default function FloorPlan() {
  return (
    <SecureTutorialLayout title="Κάτοψη Τραπεζιών" subtitle="Πού βρίσκεται κάθε τραπέζι μέσα στον χώρο">

      <Intro>
        Στην Κάτοψη τοποθετείς τα τραπέζια κάθε ομάδας όπως είναι στον χώρο, μαζί με τα εμπόδια (π.χ. ένα δέντρο ή μια γλάστρα). Φτιάξε πρώτα τις ομάδες και τα τραπέζια στη <S to="/tutorial/secure/f-tables-list">8.1 Λίστα Τραπεζιών</S>.
      </Intro>

      <StepCard number="1" title="Άνοιξε την Κάτοψη">
        <p>Από το μενού αριστερά, πάτα <strong>Τραπέζια</strong> → <strong>Κάτοψη Τραπεζιών</strong>. Διάλεξε ομάδα από τη στήλη <strong>Ομάδες</strong> ή από το βελάκι δίπλα στον τίτλο (π.χ. «Κάτοψη › ΑΥΛΗ ▾»).</p>
      </StepCard>

      <Shot src="49e8e0e68_tables-floor.webp" alt="Κάτοψη της ομάδας ΑΥΛΗ με τραπέζια και εμπόδια" caption="Προβολή Χώρου: τα τραπέζια A1–A8 και δύο εμπόδια (γραμμοσκιασμένα)" max="max-w-3xl" />

      <StepCard number="2" title="Προβολή ή Επεξεργασία Χώρου">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Προβολή Χώρου:</strong> βλέπεις την κάτοψη όπως είναι.</li>
          <li><strong>Επεξεργασία Χώρου:</strong> εμφανίζεται πλέγμα. Εδώ <strong>σέρνεις</strong> κάθε τραπέζι ή εμπόδιο στη θέση του και αλλάζεις τα στοιχεία του.</li>
        </ul>
        <p>Πάνω από την κάτοψη υπάρχουν τα κουμπιά <strong>+ Προσθήκη Αντικειμένου</strong> και <strong>Επανατοποθέτηση</strong> (δες παρακάτω).</p>
      </StepCard>

      <SectionTitle>Επεξεργασία Τραπεζιού</SectionTitle>

      <StepCard number="3" title="Άνοιξε ένα τραπέζι">
        <p>Στην <strong>Επεξεργασία Χώρου</strong>, πάτα ένα τραπέζι. Ανοίγει το παράθυρο <strong>Επεξεργασία Τραπεζιού</strong>.</p>
      </StepCard>

      <Shot src="03ba926e1_tables-edit.webp" alt="Επεξεργασία Τραπεζιού: Όνομα, Σχήμα, Θέσεις Ατόμων, Ομάδα" caption="Επεξεργασία Τραπεζιού, καρτέλα Τραπέζι" max="max-w-sm" />

      <StepCard number="4" title="Τα πεδία">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Όνομα</strong> (υποχρεωτικό).</li>
          <li><strong>Σχήμα</strong> (υποχρεωτικό): ένα από τα έξι σχήματα (τετράγωνο, παραλληλόγραμμο οριζόντιο ή κάθετο, κύκλος, οβάλ οριζόντιο ή κάθετο).</li>
          <li><strong>Θέσεις Ατόμων</strong> με τα − / +.</li>
          <li><strong>Ομάδα Τραπεζιών/Πόστων</strong> (υποχρεωτικό).</li>
        </ul>
        <p>Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <StepCard title="Εμπόδια">
        <p>Στην καρτέλα <strong>Εμπόδιο</strong> προσθέτεις κάτι που δεν είναι τραπέζι, π.χ. <strong>ΔΕΝΤΡΟ</strong> ή <strong>ΓΛΑΣΤΡΑ</strong>. Στην κάτοψη τα εμπόδια φαίνονται γραμμοσκιασμένα, ώστε η εικόνα να μοιάζει με τον πραγματικό χώρο.</p>
      </StepCard>

      <SectionTitle>Επανατοποθέτηση</SectionTitle>

      <StepCard number="5" title="Τακτοποίησε όλα τα τραπέζια μαζί">
        <p>Πάτα <strong>Επανατοποθέτηση</strong>. Ανοίγει το παράθυρο «Επανατοποθετείστε [πλήθος] τραπέζια στο [ομάδα]», που αφορά <strong>όλα τα τραπέζια της ομάδας</strong>:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Σχήμα</strong> και <strong>Θέσεις Ατόμων</strong> για όλα τα τραπέζια.</li>
          <li><strong>Τοποθέτηση Τραπεζιών:</strong> <strong>Τραπέζια ανά σειρά</strong> και <strong>Σειρές</strong> με τα − / +, και <strong>Μέγεθος τραπεζιού</strong> με τη μπάρα.</li>
          <li>Από κάτω βλέπεις την προεπισκόπηση της διάταξης.</li>
        </ul>
        <p>Πάτα <strong>Αποθήκευση</strong>. Τα τραπέζια μπαίνουν σε κανονικές σειρές, π.χ. 3 × 3 για 9 τραπέζια.</p>
      </StepCard>

      <Shot src="670459052_tables-rearrange.webp" alt="Παράθυρο Επανατοποθέτησης τραπεζιών" caption="Επανατοποθέτηση 9 τραπεζιών της ομάδας ΑΥΛΗ σε 3 σειρές των 3" max="max-w-xs" />

      <InfoBox icon="💡" title="Πότε τη χρησιμοποιείς" variant="info">
        <p>Είναι ο γρήγορος τρόπος να στήσεις μια νέα ομάδα με πολλά ίδια τραπέζια. Μετά μπορείς να αλλάξεις όποιο τραπέζι θέλεις ένα ένα, από την <strong>Επεξεργασία Τραπεζιού</strong>.</p>
      </InfoBox>

      <InfoBox icon="💡" title="Δεν βλέπεις κάποιο τραπέζι;" variant="info">
        <p>Η κάτοψη μπορεί να είναι μεγαλύτερη από την οθόνη. Κάνε scroll προς τα κάτω ή δεξιά.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Για να περάσουν οι αλλαγές στις συσκευές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
