import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function StoreSettings() {
  return (
    <SecureTutorialLayout title="Ρυθμίσεις" subtitle="Απόδειξη, εκπτώσεις, ιδιοκατανάλωση, κάρτες, ζώνες ώρας, λόγοι ακύρωσης">

      <Intro>
        Στις <strong>Ρυθμίσεις</strong> ορίζεις λίστες και επιλογές που χρησιμοποιούν η εφαρμογή και τα στατιστικά του καταστήματος. Όλες οι ενότητες είναι στην ίδια σελίδα και σώζονται μαζί.
      </Intro>

      <StepCard number="1" title="Άνοιξε τις Ρυθμίσεις">
        <p>Από το μενού αριστερά πάτα <strong>Ρυθμίσεις</strong>.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Δεν βλέπεις κάποια ενότητα;" variant="info">
        <p>Ορισμένες ενότητες εμφανίζονται μόνο αν τις ενεργοποιήσει η Spotlight. Αν δεν βλέπεις κάποια, ζήτησέ τη από τη <strong>Spotlight</strong>.</p>
      </InfoBox>

      <SectionTitle>Στοιχεία Τιμολόγησης</SectionTitle>

      <StepCard number="2" title="Η κεφαλίδα της απόδειξης">
        <p>Οι γραμμές κειμένου που τυπώνονται στην απόδειξη, π.χ. επωνυμία, ΑΦΜ, ΔΟΥ, διεύθυνση, τηλέφωνο.</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Κείμενο:</strong> η γραμμή όπως θα τυπωθεί.</li>
          <li><strong>Κεντρικά:</strong> στο κέντρο της απόδειξης.</li>
          <li><strong>Bold:</strong> έντονα. <strong>Διπλό:</strong> σε διπλό μέγεθος, π.χ. για την επωνυμία.</li>
          <li><strong>Footer:</strong> η γραμμή μπαίνει στο κάτω μέρος της απόδειξης αντί για πάνω.</li>
          <li>Νέα γραμμή: γράψε στην κενή γραμμή στο τέλος και πάτα <strong>Προσθήκη</strong>. Με το <strong>⊖</strong> τη διαγράφεις.</li>
          <li>Με το <strong>👁</strong> πάνω δεξιά βλέπεις προεπισκόπηση.</li>
        </ul>
      </StepCard>

      <SectionTitle>Προσαρμοσμένος Τύπος Έκπτωσης</SectionTitle>

      <StepCard number="3" title="Έτοιμες εκπτώσεις για τον σερβιτόρο">
        <p>Εκπτώσεις με όνομα (π.χ. «Φίλοι», «Γειτονικά μαγαζιά») που διαλέγει ο σερβιτόρος στην εφαρμογή, όταν κάνει <S to="/tutorial/discount">έκπτωση</S>.</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Πάτα <strong>Προσθήκη</strong> και γράψε <strong>Όνομα</strong>.</li>
          <li><strong>Τύπος Έκπτωσης:</strong> π.χ. Ποσοστιαία Έκπτωση.</li>
          <li><strong>Τιμή Έκπτωσης:</strong> με τα <strong>−</strong> / <strong>+</strong> ή γράφοντας τον αριθμό, π.χ. 20.00 %.</li>
          <li><strong>Ορατό:</strong> ON για να εμφανίζεται στον σερβιτόρο.</li>
          <li>Με το <strong>⊗</strong> στα δεξιά τη διαγράφεις.</li>
        </ul>
      </StepCard>

      <StepCard number="4" title="Γενική Έκπτωση και Έκπτωση Ιδιοκατανάλωσης">
        <p>Κάτω από τους τύπους έκπτωσης υπάρχουν δύο διακόπτες:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Γενική Έκπτωση:</strong> ON για να εμφανίζεται η γενική έκπτωση στην εφαρμογή.</li>
          <li><strong>Έκπτωση Ιδιοκατανάλωσης:</strong> ON για να εμφανίζεται η ιδιοκατανάλωση στην εφαρμογή.</li>
        </ul>
      </StepCard>

      <SectionTitle>Self Consumption Rules</SectionTitle>

      <StepCard number="5" title="Κανόνες ιδιοκατανάλωσης">
        <p>Πόσα προϊόντα παίρνει δωρεάν ο εργαζόμενος από μια κατηγορία. Πάτα <strong>Προσθήκη</strong> και συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Τύπος Καταχώρησης:</strong> π.χ. Κατηγορία.</li>
          <li><strong>Καταχώρηση:</strong> τσεκάρεις ποιες κατηγορίες.</li>
          <li><strong>Free Items:</strong> πόσα προϊόντα δωρεάν, π.χ. 2.</li>
          <li><strong>Τύπος Έκπτωσης</strong> και <strong>Τιμή Έκπτωσης:</strong> π.χ. Ποσοστιαία Έκπτωση 100%.</li>
        </ul>
        <p className="mt-2">Π.χ. Free Items 2 με 100%: ο εργαζόμενος παίρνει 2 προϊόντα από τις κατηγορίες δωρεάν, και τα υπόλοιπα με την κανονική έκπτωση ιδιοκατανάλωσης.</p>
      </StepCard>

      <SectionTitle>Προσαρμοσμένοι Τύποι Καρτών 🔓</SectionTitle>

      <StepCard number="6" title="Τύποι καρτών">
        <ul className="list-disc pl-5 space-y-1">
          <li>Οι βασικοί τύποι (Visa, Mastercard, Union Pay, American Express, Diners Club) είναι <strong>γκρι</strong>: το όνομά τους δεν αλλάζει.</li>
          <li>Με τον διακόπτη <strong>Ενεργό</strong> ενεργοποιείς ή απενεργοποιείς έναν τύπο.</li>
          <li>Για δικό σου τύπο, γράψε το όνομα στην κενή γραμμή στο τέλος και πάτα <strong>Add Custom</strong>.</li>
        </ul>
      </StepCard>

      <InfoBox icon="⚠️" title="Μην αλλάζεις όνομα σε δικό σου τύπο κάρτας" variant="warning">
        <p>Αν αλλάξεις το όνομα ενός τύπου που έχεις προσθέσει εσύ, μπορεί να επηρεαστούν τα στατιστικά. Διάλεξε σωστό όνομα από την αρχή.</p>
      </InfoBox>

      <SectionTitle>Ζώνες Ώρας</SectionTitle>

      <StepCard number="7" title="Όρισε τις ζώνες της μέρας">
        <ul className="list-disc pl-5 space-y-1">
          <li>Πάτα <strong>Προσθήκη</strong>: εμφανίζεται νέα γραμμή.</li>
          <li>Γράψε <strong>Όνομα</strong> (π.χ. Dinner), <strong>Ώρα Έναρξης</strong> (π.χ. 16:00) και <strong>Ώρα Λήξης</strong> (π.χ. 00:00).</li>
          <li>Με το <strong>⊗</strong> στα δεξιά διαγράφεις μια ζώνη.</li>
        </ul>
        <p className="mt-2">Τα έσοδα ανά ζώνη τα βλέπεις στα <S to="/tutorial/secure/d-time-zones">Στατιστικά → Ζώνες Ώρας</S>.</p>
      </StepCard>

      <SectionTitle>Λόγοι Ακύρωσης και Φύρας</SectionTitle>

      <StepCard number="8" title="Οι λόγοι που διαλέγει ο σερβιτόρος">
        <p>Είναι οι λόγοι που εμφανίζονται στην εφαρμογή όταν ακυρώνεται ένα προϊόν, με τη σειρά που ορίζεις εδώ. Π.χ. Λάθος καταχώρηση, Δεν άρεσε, Καθυστέρηση, Έπεσε στον σερβιτόρο, Επιστροφή.</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Με τον διακόπτη <strong>Ενεργό</strong> εμφανίζεις ή κρύβεις έναν λόγο.</li>
          <li>Σύρε από το <strong>↕</strong> στα αριστερά για να αλλάξεις τη σειρά.</li>
          <li>Για δικό σου λόγο, γράψε τον στην κενή γραμμή στο τέλος και πάτα <strong>Add Custom</strong>.</li>
        </ul>
      </StepCard>

      <SectionTitle>Αποθήκευση</SectionTitle>

      <StepCard number="9" title="Πάτα Αποθήκευση">
        <p>Το κουμπί <strong>Αποθήκευση</strong> είναι στο κάτω μέρος της σελίδας και σώζει όλες τις ενότητες μαζί.</p>
      </StepCard>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S> για να περάσουν στις συσκευές.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
