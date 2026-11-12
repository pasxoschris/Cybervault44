import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { Shot, S, Intro } from "../../../components/tutorial/SecureShot";

export default function Modifiers() {
  return (
    <SecureTutorialLayout title="Συνοδευτικά" subtitle="Ομάδες συνοδευτικών, συνοδευτικά και ανάθεση σε κατηγορίες">

      <Intro>
        Τα <strong>συνοδευτικά</strong> είναι οι επιλογές που συνοδεύουν ένα προϊόν, π.χ. η ζάχαρη ενός καφέ (Σκέτο, Μέτριο, Γλυκό). Οργανώνονται σε <strong>ομάδες συνοδευτικών</strong> (π.χ. Ζάχαρη, Γάλα, Πάγος) και η ομάδα ανατίθεται στα προϊόντα.
      </Intro>

      <SectionTitle>Η σελίδα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τα Συνοδευτικά">
        <p>Από το μενού αριστερά πάτα <strong>Κατάλογος</strong> → <strong>Συνοδευτικά</strong>.</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Αριστερά, στη στήλη <strong>Ομάδες</strong>: οι ομάδες συνοδευτικών. Το <strong>+</strong> φτιάχνει νέα ομάδα και το ✏️ ανοίγει την επεξεργασία της.</li>
          <li>Δεξιά: τα συνοδευτικά της ομάδας που επέλεξες, με στήλες <strong>Όνομα</strong>, <strong>Ομάδα</strong>, <strong>Τιμή</strong> και <strong>Τύπος Μονάδας</strong>. Πάνω υπάρχουν <strong>Αναζήτηση</strong>, φίλτρο (π.χ. <strong>Ενεργά</strong>) και το κουμπί <strong>Προσθήκη</strong>.</li>
          <li>Η τιμή αλλάζει γρήγορα με το ✏️ δίπλα της. Στο τέλος κάθε γραμμής υπάρχουν τα 👁 (απενεργοποίηση) και 🗑 (διαγραφή).</li>
        </ul>
      </StepCard>

      <SectionTitle>Νέα ομάδα συνοδευτικών</SectionTitle>

      <StepCard number="2" title="Φτιάξε την ομάδα">
        <p>Πάτα <strong>+</strong> (Νέα Ομάδα Συνοδευτικών) και συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Όνομα</strong>*: π.χ. Ζάχαρη.</li>
          <li><strong>Περιγραφή</strong>.</li>
          <li><strong>Πολλαπλή Επιλογή</strong>: όταν είναι ON, στην εφαρμογή ο σερβιτόρος μπορεί να τσεκάρει <strong>περισσότερα από ένα</strong> συνοδευτικά της ομάδας (π.χ. Άσπρη ζάχαρη και Λίγη ζάχαρη μαζί, με ✓). Όταν είναι ON, εμφανίζονται και τα <strong>Multiple selection Min</strong> και <strong>Max</strong>. Το <strong>Min</strong> είναι πόσα συνοδευτικά πρέπει να τσεκάρει τουλάχιστον: με 0 δεν υπάρχει ελάχιστο, με οποιονδήποτε άλλο αριθμό τόσες επιλογές πρέπει να γίνουν. Το <strong>Max</strong> είναι πόσα συνοδευτικά μπορεί να τσεκάρει το πολύ: π.χ. με Max 2, στην εφαρμογή γράφει «Μέγιστο: 2». Με 0 δεν υπάρχει όριο.</li>
          <li><strong>Ποσοτική επιλογή</strong>.</li>
          <li><strong>Group Type</strong>: Καμία, Φαγητά, Ποτά ή Άλλο.</li>
          <li><strong>Ενεργή</strong>.</li>
        </ul>
        <p className="mt-2">Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Η Ενεργή είναι κλειστή" variant="warning">
        <p>Στη νέα ομάδα η <strong>Ενεργή</strong> είναι από προεπιλογή <strong>OFF</strong>. Άνοιξέ την.</p>
      </InfoBox>

      <InfoBox icon="⚠️" title="Modifier Group Type" variant="warning">
        <p>Στην επεξεργασία της ομάδας υπάρχει και το <strong>Modifier Group Type</strong> (Καμία, Φαγητά, Ποτά, Άλλο). Ο τύπος που θα διαλέξεις εφαρμόζεται σε <strong>όλα τα συνοδευτικά της ομάδας</strong>.</p>
      </InfoBox>

      <SectionTitle>Νέο συνοδευτικό</SectionTitle>

      <StepCard number="3" title="Πάτα Προσθήκη">
        <p>Διάλεξε την ομάδα αριστερά και πάτα <strong>Προσθήκη</strong>. Ανοίγει η φόρμα <strong>Προσθήκη Συνοδευτικού</strong>.</p>
      </StepCard>

      <Shot src="763b5820e_addon-new.webp" alt="Φόρμα Προσθήκη Συνοδευτικού" caption="Προσθήκη Συνοδευτικού: τα υποχρεωτικά πεδία έχουν κόκκινο πλαίσιο" max="max-w-sm" />

      <StepCard number="4" title="Συμπλήρωσε τα στοιχεία">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Όνομα</strong>*: π.χ. Μέτριο.</li>
          <li><strong>Περιγραφή</strong>.</li>
          <li><strong>Τιμή</strong> (€): η χρέωση του συνοδευτικού, με <strong>τελεία</strong> για τα δεκαδικά (π.χ. 0.50). Αν είναι δωρεάν, άφησε 0. Στην εφαρμογή, όσα έχουν χρέωση δείχνουν την τιμή κάτω από το όνομα.</li>
          <li><strong>Ομάδα</strong>*: έρχεται συμπληρωμένη με την ομάδα που είχες επιλέξει.</li>
          <li><strong>Τύπος Φ.Π.Α.</strong>*: Μηδενικός Συντελεστής ΦΠΑ 0%, ΦΠΑ 13% ή ΦΠΑ 24%.</li>
          <li><strong>Τύπος Μονάδας</strong>*: Τεμάχια ή Κιλά.</li>
          <li><strong>Φορολογικό Είδος</strong>*: Εμπόρευμα, Προϊόν, Υπηρεσία ή Λοιπά Στοιχεία Εσόδων.</li>
          <li><strong>Χρόνος Προετοιμασίας</strong> (λεπτά), <strong>Τύποι Φαγητού</strong> και <strong>Τύπος</strong> (Καμία, Φαγητά, Ποτά, Άλλο).</li>
          <li><strong>Κόστος Συνοδευτικού</strong> (€).</li>
          <li><strong>Wolt</strong>, <strong>Delivery Manager</strong> και <strong>Efood Modifier</strong>: η αντιστοίχιση με τις πλατφόρμες, αν το κατάστημα τις έχει.</li>
          <li><strong>Ενεργό</strong>.</li>
        </ul>
      </StepCard>

      <InfoBox icon="⚠️" title="Το Ενεργό είναι κλειστό" variant="warning">
        <p>Στο νέο συνοδευτικό το <strong>Ενεργό</strong> είναι από προεπιλογή <strong>OFF</strong>. Άνοιξέ το, αλλιώς δεν θα εμφανίζεται στην εφαρμογή.</p>
      </InfoBox>

      <StepCard number="5" title="Συστατικά συνταγής και Δημιουργία">
        <p>Στο κάτω μέρος, στα <strong>Συστατικά συνταγής</strong>, μπορείς με το <strong>+ Προσθήκη</strong> να βάλεις προϊόν, ποσότητα και τύπο μονάδας.</p>
        <p className="mt-2">Πάτα <strong>Δημιουργία</strong> για να μείνεις στη φόρμα και να προσθέσεις κι άλλο, ή <strong>Δημιουργία &amp; Επιστροφή</strong> για να γυρίσεις στη λίστα.</p>
      </StepCard>

      <SectionTitle>Ανάθεση σε προϊόντα</SectionTitle>

      <StepCard number="6" title="Ανάθεση σε Κατηγορία Προϊόντων">
        <p>Στην επεξεργασία της ομάδας (✏️), στην ενότητα <strong>Ανάθεση σε Κατηγορία Προϊόντων</strong>, τσέκαρε τις κατηγορίες (π.χ. COFFEE) και πάτα <strong>Update Products</strong>. Η ομάδα μπαίνει σε <strong>όλα τα προϊόντα</strong> αυτών των κατηγοριών.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Δεν σβήνει τα υπάρχοντα" variant="info">
        <p>Η ανάθεση <strong>δεν διαγράφει</strong> τα συνοδευτικά που έχουν ήδη τα προϊόντα της κατηγορίας. Τα συμπληρώνει.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Ανάθεση από το προϊόν" variant="info">
        <p>Ομάδα συνοδευτικών μπαίνει και σε ένα μόνο προϊόν, από το πεδίο <strong>Ομάδες Συνοδευτικών</strong> στη φόρμα του προϊόντος. Δες το <S to="/tutorial/secure/e-products">μάθημα 5.1</S>.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
