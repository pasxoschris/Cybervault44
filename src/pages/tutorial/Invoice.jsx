import React from "react";
import { Link } from "react-router-dom";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

export default function Invoice() {
  return (
    <TutorialLayout title="Έκδοση Τιμολογίου" subtitle="Πώς να εκδώσεις τιμολόγιο από την εφαρμογή">

      <InfoBox icon="⚙️" title="Προαπαιτούμενο — Ενεργοποίηση από Διαχειριστή" variant="warning">
        <p>Για να εμφανιστεί η επιλογή «Έκδοση Τιμολογίου», πρέπει να έχει ενεργοποιήσει ο Διαχειριστής από το Secure (Διαχειριστικό) για τη συγκεκριμένη Θέση/Συσκευή Χρήστη (POS) τη δυνατότητα έκδοσης τιμολογίου.</p>
        <p>Αν δεν είναι ενεργοποιημένη, η επιλογή δεν εμφανίζεται καθόλου.</p>
      </InfoBox>

      <ScreenshotGallery
        images={[
        "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/1c2d5c355_17.JPG",
        "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/a151b64da_18.JPG",
        "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/d65d4c712_19.JPG"]
        }
        caption="Φόρμα έκδοσης τιμολογίου" />
      

      <SectionTitle>Διαδικασία Έκδοσης</SectionTitle>

      <StepCard number="1" title="Άνοιξε την παραγγελία">
        <p>Βρες την παραγγελία για την οποία θέλεις να εκδώσεις τιμολόγιο.</p>
      </StepCard>

      <StepCard number="2" title="Επίλεξε το εικονίδιο τιμολογίου">
        <p>Στις τρεις τελείες πάνω δεξιά, βρες και πάτα <strong>Έκδοση Τιμολογίου</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Αναζήτηση πελάτη για τον οποίο έχει ξαναεκδοθεί τιμολόγιο">
        <p>Αν ο πελάτης είναι ήδη αποθηκευμένος στο Spotlight, πάτα <strong>«Αναζήτηση σε Spotlight»</strong> και αναζήτησε με τηλέφωνο, email ή ΑΦΜ.</p>
        <p>Το μήνυμα <strong>«customer with the same data already exists»</strong> εμφανίζεται όταν προσπαθείς να καταχωρήσεις πελάτη με στοιχεία (ΑΦΜ, email ή τηλέφωνο) που υπάρχουν ήδη αποθηκευμένα στο Spotlight.</p>
      </StepCard>

      <StepCard number="4" title="Αναζήτηση στοιχείων πελάτη μέσω ΑΑΔΕ">
        <p>Για ελληνικά ΑΦΜ μπορείς να πατήσεις το βιβλιαράκι <strong>📖</strong> δίπλα στο πεδίο ΑΦΜ για αυτόματη αναζήτηση στην ΑΑΔΕ. Τα στοιχεία της εταιρείας θα συμπληρωθούν αυτόματα.</p>
      </StepCard>

      <InfoBox icon="🌍" title="Ξένα ΑΦΜ — Πρόθεμα Χώρας" variant="info">
        <p>Για <strong>μη ελληνικά ΑΦΜ</strong> (ξένες εταιρείες), η αυτόματη αναζήτηση στην ΑΑΔΕ δεν λειτουργεί. Πρέπει να καταχωρήσεις το ΑΦΜ <strong>μαζί με το πρόθεμα της χώρας</strong>:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>DE</strong>123456789 — Γερμανία</li>
          <li><strong>CY</strong>12345678X — Κύπρος</li>
          <li><strong>GB</strong>123456789 — Ηνωμένο Βασίλειο</li>
          <li><strong>IT</strong>12345678901 — Ιταλία</li>
          <li><strong>FR</strong>12345678901 — Γαλλία</li>
        </ul>
        <p className="mt-2">Συμπλήρωσε τα υπόλοιπα στοιχεία (Επωνυμία, Διεύθυνση, Δ.Ο.Υ., Δραστηριότητα) χειροκίνητα.</p>
      </InfoBox>

      <StepCard number="5" title="Επιλογή τρόπου πληρωμής">
        <p>Επίλεξε τον τρόπο πληρωμής του τιμολογίου:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Μετρητά</li>
          <li>Κάρτα</li>
          <li>Κατάθεση σε Τράπεζα</li>
          <li>Επί Πιστώσει</li>
          <li>IRIS</li>
        </ul>
      </StepCard>

      <StepCard number="6" title="Πάτα «Έκδοση»">
        <p>Μόλις συμπληρώσεις όλα τα υποχρεωτικά πεδία (*), πάτα <strong>«Έκδοση»</strong> και επιβεβαίωσε.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Δεν υποστηρίζεται το Split Payment" variant="info">
        <p>Στην έκδοση τιμολογίου <strong>δεν υποστηρίζεται</strong> το Split Payment.</p>
      </InfoBox>

      <InfoBox icon="⚠️" title="Σημαντικό — Ακύρωση Τιμολογίου" variant="warning">
        <p className="font-semibold">Το τιμολόγιο ακυρώνεται ΜΟΝΟ από το Secure (Διαχειριστικό).</p>
        <p className="mt-1">Αν θέλεις να ακυρώσεις τιμολόγιο <em>από την εφαρμογή</em>, θα πρέπει να <strong>ακυρώσεις ολόκληρη την παραγγελία</strong>. Η ακύρωση ολόκληρης της παραγγελίας <strong>ακυρώνει και το τιμολόγιο</strong>.</p>
        <p className="mt-1">Ακολούθησε το μάθημα <Link to="/tutorial/cancel-order" className="text-amber-900 underline hover:text-amber-950 font-semibold">Ακύρωση Παραγγελίας</Link>.</p>
      </InfoBox>

      <InfoBox icon="🧾" title="Αν εκδόθηκε ήδη Απόδειξη" variant="warning">
        <p>Αν έχεις εκδώσει απόδειξη και θέλεις να εκδώσεις τιμολόγιο, πρέπει πρώτα να ακυρώσεις την απόδειξη, εκδίδοντας <strong>Πιστωτικό Στοιχείο Λιανικής</strong> (μάθημα <Link to="/tutorial/cancel-receipt" className="text-amber-900 underline hover:text-amber-950 font-semibold">Ακύρωση Απόδειξης</Link>), ώστε να μην αποδοθεί διπλό ΦΠΑ.</p>
      </InfoBox>
    </TutorialLayout>);

}