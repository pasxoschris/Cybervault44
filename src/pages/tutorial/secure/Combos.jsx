import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function Combos() {
  return (
    <SecureTutorialLayout title="Συνδυασμοί Προϊόντων" subtitle="Τα combo που έρχονται από το efood και το Wolt">

      <Intro>
        Οι <strong>Συνδυασμοί Προϊόντων</strong> είναι τα <strong>combo που έρχονται από τις πλατφόρμες delivery</strong> (efood, Wolt), π.χ. «1 Καφές της επιλογής σας &amp; 1 σφολιάτα» ή «Με 1 καφέ της επιλογής σας, δώρο ακόμη 1». Κάθε συνδυασμός έχει σταθερά προϊόντα ή/και <strong>μενού επιλογών</strong>, από τα οποία ο πελάτης διαλέγει στην πλατφόρμα.
      </Intro>

      <SectionTitle>Η λίστα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τους Συνδυασμούς Προϊόντων">
        <p>Από το μενού αριστερά πάτα <strong>Κατάλογος</strong> → <strong>Συνδυασμοί Προϊόντων</strong>. Βλέπεις τους συνδυασμούς με στήλες <strong>Όνομα</strong>, <strong>Τιμή</strong> και <strong>Ποσοστό Έκπτωσης</strong>. Η πράσινη τελεία σημαίνει ενεργός.</p>
        <p className="mt-2">Πάνω υπάρχουν φίλτρο (π.χ. <strong>Ενεργοί</strong>) και το κουμπί <strong>Προσθήκη Συνδυασμού</strong>. Σε κάθε γραμμή υπάρχουν 👁 (απενεργοποίηση) και 🗑 (διαγραφή). Πάτα έναν συνδυασμό για να ανοίξει η <strong>Επεξεργασία Συνδυασμού</strong>.</p>
      </StepCard>

      <SectionTitle>Στοιχεία συνδυασμού</SectionTitle>

      <StepCard number="2" title="Βασικά πεδία">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Όνομα</strong>*: π.χ. «1 Καφές της επιλογής σας &amp; 1 σφολιάτα».</li>
          <li><strong>Ενεργό</strong>, <strong>Χρώμα</strong>, <strong>Περιγραφή</strong>.</li>
          <li><strong>Φωτογραφία</strong>: με το <strong>Ανεβάστε μια εικόνα</strong>.</li>
          <li><strong>Τιμή</strong> (€).</li>
          <li><strong>Προϊόν</strong>: το προϊόν του καταλόγου με το οποίο συνδέεται ο συνδυασμός.</li>
          <li><strong>Wolt Combo</strong>, <strong>Efood Combo</strong>, <strong>Delivery Manager Combo</strong>: το combo της πλατφόρμας με το οποίο αντιστοιχίζεται ο συνδυασμός. Πληκτρολογείς το όνομα όπως είναι περασμένο στην πλατφόρμα και το διαλέγεις.</li>
        </ul>
      </StepCard>

      <InfoBox icon="⚠️" title="Το Ενεργό είναι κλειστό" variant="warning">
        <p>Στον νέο συνδυασμό το <strong>Ενεργό</strong> είναι από προεπιλογή <strong>OFF</strong>. Άνοιξέ το.</p>
      </InfoBox>

      <InfoBox icon="⚠️" title="Η Τιμή αφορά μόνο το delivery" variant="warning">
        <p>Η <strong>Τιμή</strong> του συνδυασμού χρησιμοποιείται <strong>μόνο στις υπηρεσίες delivery</strong>, όπως γράφει και η σημείωση κάτω από το πεδίο.</p>
      </InfoBox>

      <SectionTitle>Προϊόντα και επιλογές</SectionTitle>

      <StepCard number="3" title="Προϊόντα">
        <p>Στην ενότητα <strong>Προϊόντα</strong>, με το <strong>+ Προσθήκη προϊόντος</strong> βάζεις τα σταθερά προϊόντα του συνδυασμού. Στήλες: <strong>Προϊόν</strong>, <strong>Προϊόν Wolt</strong>, <strong>Efood Product</strong>, <strong>Delivery Manager Product</strong>, <strong>Τιμή</strong>.</p>
      </StepCard>

      <StepCard number="4" title="Επιλογές Προϊόντων (μενού)">
        <p>Στην ενότητα <strong>Επιλογές Προϊόντων</strong>, πάτα <strong>Προσθήκη</strong> για να φτιάξεις ένα μενού επιλογών, π.χ. «Επιλογή καφέ» και «Επιλογή σφολιάτας». Σε κάθε μενού:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Όνομα Menu Επιλογών</strong>*, <strong>Min Επιλογές</strong> και <strong>Max Επιλογές</strong>.</li>
          <li>Με τα <strong>↑ ↓</strong> αλλάζεις τη σειρά των μενού. Το <strong>Αφαίρεση Menu</strong> σβήνει το μενού.</li>
          <li>Στο <strong>Menu Επιλογών</strong>, κάθε γραμμή είναι μία επιλογή: <strong>Τύπος</strong>, <strong>Product / Category</strong>, <strong>Προϊόν Wolt</strong>, <strong>Efood Product</strong> και <strong>Τιμή</strong>.</li>
          <li><strong>Τύπος</strong>: <strong>Product</strong> για ένα συγκεκριμένο προϊόν ή <strong>Category</strong> για ολόκληρη κατηγορία (π.χ. ΣΑΛΑΤΕΣ).</li>
          <li><strong>Τιμή</strong>: το πεδίο είναι γκρι και δείχνει την τιμή του προϊόντος στον κατάλογο. Στον συνδυασμό ισχύει η τιμή της προσφοράς.</li>
          <li>Με το <strong>+ Add another option</strong> προσθέτεις επιλογή, με τα ↑ ↓ αλλάζεις τη σειρά της και με το ⊖ τη βγάζεις.</li>
        </ul>
      </StepCard>

      <StepCard number="5" title="Αποθήκευση">
        <p>Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <InfoBox icon="💡" title="Παράδειγμα: «1 καφές + δώρο ακόμη 1»" variant="info">
        <p>Ο συνδυασμός «Με 1 καφέ της επιλογής σας, δώρο ακόμη 1» έχει δύο μενού επιλογών, «Επίλεξε καφέ» και «Καφέ 2», με τους ίδιους καφέδες (Espresso, Freddo Espresso, Freddo Cappuccino κ.λπ.). Ο πελάτης διαλέγει έναν καφέ από κάθε μενού.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Η γέφυρα με Wolt και efood" variant="info">
        <p>Οι παραγγελίες από Wolt και efood περνούν στη Spotlight μέσω <strong>γέφυρας</strong>. Κάθε γέφυρα απαιτεί <strong>άδεια</strong>. Τη γέφυρα και την άδεια τις ενεργοποιεί η Spotlight· αν τις χρειάζεσαι, ζήτησέ τες από τη Spotlight. Με την αντιστοίχιση (<strong>Wolt Combo</strong>, <strong>Efood Combo</strong>) τα combo της πλατφόρμας περνούν ως συνδυασμοί.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Ενεργοποίηση από τη Spotlight" variant="info">
        <p>Οι Συνδυασμοί Προϊόντων εμφανίζονται όταν τους έχει ενεργοποιήσει η Spotlight για το κατάστημα. Αν δεν βλέπεις την ενότητα, ζήτησέ την από τη Spotlight.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
