import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function Delivery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Παραγγελία Delivery" subtitle="Delivery tag, στοιχεία πελάτη & διανομείς">
      <SectionTitle>Επισκόπηση Delivery</SectionTitle>

      <InfoBox icon="🛵" title="Πότε χρησιμοποιείται" variant="info">
        Όταν πάρεις παραγγελία τηλεφωνικά ή μέσω aggregator (E-Food, Wolt, Box), μπορείς να τη δημιουργήσεις στο Cashier mode, να καταχωρήσεις τον πελάτη με αναζήτηση τηλεφώνου, και να την αναθέσεις σε διανομέα με ενεργή βάρδια.
      </InfoBox>

      {/* Delivery Tag */}
      <SectionTitle>1. Delivery Tag — Επιλογή Aggregator</SectionTitle>

      <StepCard number="1" title="Πού βρίσκεται το Delivery Tag">
        <p>
          Στην πάνω δεξιά γωνία της οθόνης, δίπλα στα στοιχεία πελάτη, υπάρχει το εικονίδιο <strong>tag</strong> με το κουμπί <strong>«Delivery E-Food»</strong>.
          Αυτό υποδηλώνει τον τρέχοντα aggregator στον οποίο θα σταλεί η παραγγελία.
        </p>
      </StepCard>

      <StepCard number="2" title="Αλλαγή aggregator">
        <p>
          Πάτα πάνω στο κουμπί <strong>«Delivery E-Food»</strong> για να ανοίξει το dropdown με τις διαθέσιμες επιλογές:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>E-Food</strong> — προεπιλογμένο</li>
          <li><strong>E-Food Go</strong></li>
          <li><strong>Wolt</strong></li>
          <li><strong>Box Go</strong></li>
          <li><strong>Wolt Go</strong></li>
        </ul>
        <p className="mt-2">
          Επίλεξε τον aggregator που θέλεις. Το επιλεγμένο όνομα εμφανίζεται στο κουμπί με μπλε χρώμα και η παραγγελία θα σταλεί στο αντίστοιχο κανάλι.
        </p>
      </StepCard>

      <InfoBox icon="💡" title="Σημείωση" variant="purple">
        Το Delivery Tag καθορίζει πού θα καταχωρηθεί η παραγγελία. Αν πάρεις τηλεφωνική παραγγελία, μπορείς να αφήσεις το E-Food ή να επιλέξεις τον αντίστοιχο aggregator.
      </InfoBox>

      {/* Στοιχεία Πελάτη */}
      <SectionTitle>2. Στοιχεία Πελάτη — Αναζήτηση με Τηλέφωνο</SectionTitle>

      <StepCard number="1" title="Άνοιγμα παραθύρου πελάτη">
        <p>
          Πάτα στην περιοχή με τα στοιχεία πελάτη (πάνω-κεντρικό μέρος) ή στο εικονίδιο πελάτη για να ανοίξει το παράθυρο <strong>«Στοιχεία Πελάτη»</strong>.
        </p>
      </StepCard>

      <StepCard number="2" title="Αναζήτηση με τηλέφωνο">
        <p>
          Στο πεδίο αναζήτησης (με το εικονίδιο μεγεθυντικού φακού) πληκτρολόγησε τον αριθμό τηλεφώνου του πελάτη.
          Αν ο πελάτης υπάρχει ήδη, τα στοιχεία του συμπληρώνονται αυτόματα και εμφανίζονται:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Παραγγελίες:</strong> πλήθος παραγγελιών & συνολικό ποσό (π.χ. 24 παραγγελίες — 458,50 €)</li>
          <li><strong>Τελευταία παραγγελία:</strong> ημερομηνία τελευταίας παραγγελίας</li>
        </ul>
      </StepCard>

      <StepCard number="3" title="Συμπλήρωση στοιχείων">
        <p>Αν ο πελάτης είναι νέος, συμπλήρωσε τα πεδία της φόρμας:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Τηλέφωνο 1* (υποχρεωτικό):</strong> με πρόθεμα GR +30</li>
          <li><strong>Τηλέφωνο 2:</strong> προαιρετικό δεύτερο τηλέφωνο</li>
          <li><strong>Κουδούνι* (υποχρεωτικό):</strong> όνομα/επωνυμία κουδουνιού</li>
          <li><strong>Επώνυμο* (υποχρεωτικό):</strong> επώνυμο πελάτη</li>
          <li><strong>Όνομα:</strong> προαιρετικό</li>
          <li><strong>Διεύθυνση* (υποχρεωτική):</strong> διεύθυνση παράδοσης</li>
          <li><strong>Τ.Κ.:</strong> ταχυδρομικός κώδικας</li>
          <li><strong>Όροφος:</strong> όροφος/όροφος</li>
          <li><strong>Πόλη:</strong> πόλη</li>
          <li><strong>Σημείωση:</strong> σημειώσεις για τον διανομέα (π.χ. «κίτρινη πόρτα»)</li>
        </ul>
      </StepCard>

      <StepCard number="4" title="Αποθήκευση">
        <p>
          Πάτα το εικονίδιο <strong>checkmark</strong> (πάνω δεξιά) για να αποθηκεύσεις τα στοιχεία και να επιστρέψεις στην οθόνη παραγγελίας.
          Τα στοιχεία πελάτη εμφανίζονται στην πάνω μπάρα (όνομα, τηλέφωνο, διεύθυνση).
        </p>
      </StepCard>

      <InfoBox icon="⚠️" title="Υποχρεωτικά πεδία" variant="warning">
        Τα πεδία με αστερίσκο (*) είναι υποχρεωτικά: Τηλέφωνο 1, Κουδούνι, Επώνυμο, Διεύθυνση. Χωρίς αυτά δεν μπορεί να ολοκληρωθεί η παραγγελία delivery.
      </InfoBox>

      {/* Διανομείς */}
      <SectionTitle>3. Διανομείς — Άνοιγμα Βάρδιας</SectionTitle>

      <StepCard number="1" title="Ενεργοποίηση εικονιδίου Διανομείς">
        <p>
          Στην κάτω μπάρα εργαλείων (footer) βρίσκεται το εικονίδιο με το <strong>μηχανάκι</strong> (scooter).
          Πάτα πάνω του για να ανοίξει το παράθυρο <strong>«Διανομείς»</strong>.
        </p>
      </StepCard>

      <StepCard number="2" title="Λίστα διανομέων">
        <p>
          Το παράθυρο εμφανίζει τη λίστα με τους διανομείς του καταστήματος (π.χ. Stavros, george, ilias, kostask).
          Κάθε όνομα είναι μια καταχώρηση διανομέα.
        </p>
      </StepCard>

      <StepCard number="3" title="Άνοιγμα βάρδιας διανομέα">
        <p>
          Επίλεξε τον διανομέα που θα αναλάβει τις παραγγελίες και πάτα <strong>checkmark</strong> για να του ανοίξεις βάρδια.
          Από τη στιγμή που ο διανομέας έχει ενεργή βάρδια, μπορείς να του αναθέσεις παραγγελίες delivery.
        </p>
      </StepCard>

      <StepCard number="4" title="Ανάθεση παραγγελίας σε διανομέα">
        <p>
          Μετά την καταχώρηση της παραγγελίας και τα στοιχεία πελάτη, πάτα <strong>«Ανάθεση σε delivery»</strong> και επίλεξε τον διανομέα με ενεργή βάρδια.
          Η παραγγελία εμφανίζεται στη λίστα του αντίστοιχου διανομέα.
        </p>
      </StepCard>

      <InfoBox icon="💡" title="Συμβουλή" variant="purple">
        Μόνο διανομείς με ανοιχτή βάρδια μπορούν να αναλάβουν παραγγελίες. Αν δεν βλέπεις κάποιον στη λίστα ανάθεσης, πάτα πρώτα το εικονίδιο μηχανάκιου και άνοιξε του βάρδια.
      </InfoBox>

      {/* Ροή */}
      <SectionTitle>Συνοπτική Ροή</SectionTitle>

      <StepCard number="✓" title="Από παραγγελία σε παράδοση">
        <ol className="list-decimal list-inside space-y-1.5">
          <li>Επίλεξε <strong>Delivery Tag</strong> (E-Food / Wolt / Box)</li>
          <li>Άνοιξε <strong>Στοιχεία Πελάτη</strong> και ψάξε με τηλέφωνο</li>
          <li>Συμπλήρωσε/επιβεβαίωσε τα στοιχεία παράδοσης</li>
          <li>Πρόσθεσε τα προϊόντα της παραγγελίας</li>
          <li>Άνοιξε βάρδια στον διανομέα από το εικονίδιο <strong>μηχανάκιου</strong></li>
          <li>Ανάθεσε την παραγγελία στον διανομέα</li>
          <li>Ολοκλήρωσε την πληρωμή — η παραγγελία μπαίνει στη λίστα του διανομέα</li>
        </ol>
      </StepCard>
    </CashierTutorialLayout>
  );
}