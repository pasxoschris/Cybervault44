import React from "react";
import { Link } from "react-router-dom";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { Shot } from "../../../components/tutorial/SecureShot";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";

export default function B2GInvoices() {
  return (
    <SecureTutorialLayout title="B2G Invoices" subtitle="Τιμολόγιο προς φορέα του Δημοσίου">

      <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
        Το τιμολόγιο B2G είναι το τιμολόγιο που εκδίδεις προς φορέα του Δημοσίου. Οι παραγγελίες χτυπιούνται και κλείνουν κανονικά στην εφαρμογή, και το τιμολόγιο εκδίδεται στο τέλος από το Secure.
      </p>

      <InfoBox icon="⚙️" title="Πριν ξεκινήσεις" variant="warning">
        <ul className="list-disc pl-5 space-y-1">
          <li>Η <strong>Spotlight</strong> πρέπει να έχει ενεργοποιήσει τα <strong>B2G Invoices</strong> για το κατάστημα. Αν δεν βλέπεις το πράσινο εικονίδιο <strong>Issue B2G Invoice</strong> στα Στοιχεία Παραγγελίας, ζήτησέ το από τη Spotlight.</li>
          <li>Φτιάξε στον <Link to="/tutorial/secure/e-products" className="underline">Κατάλογο</Link> ένα <strong>προϊόν που περιγράφει τι αφορά το τιμολόγιο</strong>. Αυτό το προϊόν θα μπει ως γραμμή στο τιμολόγιο B2G.</li>
        </ul>
      </InfoBox>

      <SectionTitle>Στην εφαρμογή</SectionTitle>

      <StepCard number="1" title="Χτύπα τις παραγγελίες">
        <p>Χτύπα κανονικά τις παραγγελίες στην εφαρμογή.</p>
        <p>Αν το τιμολόγιο αφορά <strong>πολλές παραγγελίες</strong>, πέρασέ τις <strong>όλες σε μία</strong> με <Link to="/tutorial/merge-orders" className="text-purple-700 underline">Συγχώνευση Παραγγελιών</Link>, πριν τις κλείσεις. Το B2G εκδίδεται από μία παραγγελία.</p>
      </StepCard>

      <StepCard number="2" title="Κλείσε τις παραγγελίες με απόδειξη">
        <p>Κλείσε τις παραγγελίες και έκδωσε <strong>απόδειξη</strong> (δες <Link to="/tutorial/issue-receipt" className="text-purple-700 underline">Έκδοση Παραστατικού</Link>).</p>
        <p>Οι παραγγελίες πρέπει να είναι <strong>κλειστές</strong> πριν προχωρήσεις.</p>
      </StepCard>

      <StepCard number="3" title="Ακύρωσε τις αποδείξεις">
        <p>Ακύρωσε τις αποδείξεις αυτών των παραγγελιών (δες <Link to="/tutorial/cancel-receipt" className="text-purple-700 underline">Ακύρωση Απόδειξης</Link>).</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Πρώτα ακύρωση, μετά B2G" variant="warning">
        <p>Ακύρωσε τις αποδείξεις <strong>πριν</strong> εκδώσεις το τιμολόγιο B2G. Αλλιώς η ίδια πώληση μετράει δύο φορές: μία στην απόδειξη και μία στο τιμολόγιο.</p>
      </InfoBox>

      <SectionTitle>Στο Secure</SectionTitle>

      <StepCard number="4" title="Άνοιξε την Έκδοση Τιμολογίου από τη Ροή Παραγγελιών">
        <p>Από το μενού αριστερά, πάτα <strong>Ροή Παραγγελιών</strong> και βρες την κλειστή παραγγελία. Πάτα την κάρτα της για να ανοίξουν τα <strong>Στοιχεία Παραγγελίας</strong> και πάτα το <strong>πράσινο εικονίδιο εγγράφου</strong> (Issue B2G Invoice). Ανοίγει η <strong>Έκδοση Τιμολογίου</strong>.</p>
        <p>Η έκδοση τιμολογίου B2G γίνεται <strong>μόνο από τη <Link to="/tutorial/secure/c-order-flow" className="text-purple-700 underline">Ροή Παραγγελιών</Link></strong>.</p>
        <p>Τα πεδία με <strong>*</strong> είναι υποχρεωτικά.</p>
      </StepCard>

      <Shot src="4d7a9611b_b2g-icon.webp" alt="Στοιχεία Παραγγελίας με το πράσινο εικονίδιο Issue B2G Invoice" caption="Στοιχεία Παραγγελίας: το πράσινο εικονίδιο εγγράφου είναι το Issue B2G Invoice" max="max-w-xs" />

      <StepCard number="5" title="Βρες ή συμπλήρωσε τον φορέα">
        <p>Αν έχεις ξανακόψει τιμολόγιο στον ίδιο φορέα, γράψε στην <strong>αναζήτηση</strong> πάνω αριστερά τα στοιχεία του και επίλεξέ τον. Τα στοιχεία συμπληρώνονται μόνα τους.</p>
        <p>Για νέο φορέα, γράψε τον <strong>ΑΦΜ Εταιρείας</strong> και πάτα το <strong>📖 βιβλίο</strong> δίπλα του. Φέρνει τα στοιχεία της εταιρείας.</p>
      </StepCard>

      <StepCard number="6" title="Στοιχεία Τιμολογίου">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Email</strong></li>
          <li><strong>Payment method</strong>: Μετρητά, Πιστωτική Κάρτα ή Πίστωση.</li>
          <li><strong>Τύπος Τιμολογίου</strong>: Τιμολόγιο Πώλησης ή Τιμολόγιο Παροχής Υπηρεσιών.</li>
          <li><strong>ΑΦΜ, Επωνυμία, Διεύθυνση, Εφορία, Δραστηριότητα, Πόλη, Ταχυδρομικός Κώδικας</strong> της εταιρείας. Το <strong>Τηλέφωνο</strong> είναι προαιρετικό.</li>
        </ul>
      </StepCard>

      <StepCard number="7" title="Στοιχεία Πελάτη">
        <p>Συμπλήρωσε <strong>Όνομα, Επώνυμο, Τύπο, Τ.Κ.</strong> και <strong>Πόλη</strong>. Το <strong>Email</strong> είναι προαιρετικό.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Τι είναι ο «Τύπος» πελάτη" variant="info">
        <p>Ο Τύπος είναι μία από τις κατηγορίες πελατών του καταστήματος. Τις βλέπεις και προσθέτεις νέες στο <Link to="/tutorial/secure/g-customers" className="underline">10.1 Λίστα Πελατών</Link>.</p>
      </InfoBox>

      <StepCard number="8" title="B2G Details">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Αριθμός αναφοράς B2G (BT-11)</strong>: ο αριθμός χρηματοδότησης. Ξεκινά με το είδος του προϋπολογισμού: <strong>1|</strong>, <strong>2|</strong> ή <strong>3|</strong>.</li>
          <li>
            <strong>Αριθμός Σύμβασης – ΑΔΑΜ (BT-12)</strong>: ο ΑΔΑΜ της σύμβασης από το ΚΗΜΔΗΣ.
            <ul className="list-[circle] pl-5 mt-1 space-y-1">
              <li>Χωρίς γραπτή σύμβαση (προμήθειες κάτω από 2.500 €): ο ΑΔΑΜ της <strong>Απόφασης Ανάθεσης</strong>.</li>
              <li>Χωρίς Απόφαση Ανάθεσης, ή ποσό κάτω από 1.000 €: γράψε <strong>0</strong>.</li>
              <li>Σύμβαση πάνω από 30.000 €: ο ΑΔΑΜ της <strong>Εντολής Αγοράς</strong>.</li>
            </ul>
          </li>
          <li><strong>Αριθμός Αναθέτουσας Αρχής (BT-46)</strong>: όπως είναι στο μητρώο. Πρέπει να αντιστοιχεί στον ΑΦΜ του φορέα.</li>
          <li><strong>Περιοχή Παράδοσης Προϊόντων (BT-70)</strong>: προαιρετικό. Είναι τα στοιχεία παράδοσης, δηλαδή ποιος παραλαμβάνει, όταν το τιμολόγιο αφορά προϊόντα.</li>
        </ul>
      </StepCard>

      <InfoBox icon="ℹ️" title="Από πού βρίσκεις τα στοιχεία B2G" variant="info">
        <p>Τα BT-11, BT-12, BT-46 και τα στοιχεία παράδοσης σού τα δίνει ο <strong>Δημόσιος φορέας</strong> που παραλαμβάνει το τιμολόγιο. Ζήτα τα από αυτόν πριν ξεκινήσεις.</p>
      </InfoBox>

      <StepCard number="9" title="Line Items">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Προϊόν</strong>: αναζήτησε το προϊόν που έφτιαξες για το τιμολόγιο.</li>
          <li><strong>Ποσότητα</strong> και <strong>Τύπος Μονάδας</strong>.</li>
          <li><strong>CPV Προϊόντος</strong>: ο κωδικός κατηγορίας αγαθού ή υπηρεσίας που χρησιμοποιείται στις δημόσιες συμβάσεις της ΕΕ. Όλους τους κωδικούς τούς βρίσκεις στη <a href="https://ted.europa.eu/el/simap/cpv" target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">λίστα CPV</a>.</li>
          <li><strong>Price (€)</strong>: η <strong>συνολική αξία μαζί με ΦΠΑ</strong>.</li>
          <li><strong>Vat %</strong> και <strong>Φορολογικό Είδος</strong>.</li>
        </ul>
        <p>Με <strong>+ Προσθήκη</strong> μπαίνει νέα γραμμή. Κάτω βλέπεις το <strong>Total</strong>.</p>
      </StepCard>

      <StepCard number="10" title="Πάτα «Έκδοση Τιμολογίου»">
        <p>Πάτα το μπλε κουμπί <strong>Έκδοση Τιμολογίου</strong> κάτω δεξιά.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Αποθήκευση Στοιχείων" variant="info">
        <p>Το πράσινο κουμπί <strong>Αποθήκευση Στοιχείων</strong> κρατά τα στοιχεία του φορέα. Την επόμενη φορά τον βρίσκεις από την αναζήτηση (βήμα 5).</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Η λίστα των B2G" variant="info">
        <p>Στο μενού <strong>Τιμολόγια → B2G Invoices</strong> βλέπεις τη λίστα με τα τιμολόγια B2G που έχουν εκδοθεί.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
