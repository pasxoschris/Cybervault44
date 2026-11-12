import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function OtherDevices() {
  return (
    <SecureTutorialLayout title="Other Devices" subtitle="Τερματικά καρτών, Caller ID, οθόνη πελάτη και συρτάρι μετρητών">

      <Intro>
        Στα <strong>Other Devices</strong> δηλώνονται οι υπόλοιπες συσκευές του καταστήματος, εκτός από εκτυπωτές και οθόνες κουζίνας. Εδώ βρίσκονται και τα <strong>τερματικά POS της τράπεζας</strong> (EFTPOS).
      </Intro>

      <StepCard number="1" title="Άνοιξε τη λίστα">
        <p>Από το μενού αριστερά, πάτα <strong>Συσκευές</strong> → <strong>Other Devices</strong>. Αριστερά, στη στήλη <strong>Τύποι</strong>, φιλτράρεις ανά τύπο. Πάνω έχεις <strong>Αναζήτηση</strong>.</p>
      </StepCard>

      <StepCard title="Οι τύποι">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>EFTPOS:</strong> τα τερματικά καρτών της τράπεζας, π.χ. Cardlink, EDPS, Epay, Mellon, Mypay, Nexi, Viva, Worldline.</li>
          <li><strong>Caller ID:</strong> αναγνώριση κλήσεων για τηλεφωνικές παραγγελίες.</li>
          <li><strong>Customer Display:</strong> οθόνη πελάτη.</li>
          <li><strong>Cash Drawer:</strong> συρτάρι μετρητών.</li>
        </ul>
      </StepCard>

      <StepCard title="Οι στήλες">
        <p><strong>Όνομα</strong>, <strong>Τύπος</strong>, <strong>Διεύθυνση IP</strong> και <strong>Port</strong>. Σε κάποια τερματικά τα πεδία IP και Port είναι κενά.</p>
      </StepCard>

      <SectionTitle>Προσθήκη τερματικού POS τράπεζας (EFTPOS)</SectionTitle>

      <InfoBox icon="⚠️" title="Τι χρειάζεσαι από το τερματικό" variant="warning">
        <p>Για να συνδεθεί το τερματικό, χρειάζονται <strong>δύο στοιχεία</strong>, που τα βρίσκεις πάνω στο ίδιο το τερματικό:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Terminal ID</strong> (TID): ο αριθμός του τερματικού.</li>
          <li><strong>Registration ID</strong>: ο <strong>κωδικός WebECR</strong> του τερματικού.</li>
        </ul>
        <p className="mt-1">Πού βρίσκονται εξαρτάται από τον πάροχο. Δες παρακάτω, στο «Πού βρίσκεις το TID και τον κωδικό WebECR».</p>
      </InfoBox>

      <StepCard number="2" title="Νέα συσκευή">
        <p>Στα <strong>Other Devices</strong> πρόσθεσε νέα συσκευή και συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Όνομα</strong>*: π.χ. «POS Ταμείο».</li>
          <li><strong>Τύπος Συσκευής</strong>*: <strong>EFTPOS</strong>.</li>
          <li><strong>EFT POS Provider</strong>*: ο πάροχος του τερματικού (π.χ. Cardlink, Nexi, Epay, Viva).</li>
          <li><strong>Device Model</strong>: το μοντέλο του τερματικού.</li>
          <li><strong>Device Protocol</strong>: π.χ. <strong>WebECR</strong>.</li>
          <li><strong>Tips</strong>: διακόπτης για φιλοδωρήματα.</li>
        </ul>
        <p className="mt-2">Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Register Device">
        <p>Στο κάτω μέρος, στην ενότητα <strong>Register Device</strong>, συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Registration ID</strong>*: τον κωδικό WebECR.</li>
          <li><strong>Terminal ID</strong>*: το TID.</li>
        </ul>
      </StepCard>

      <StepCard number="4" title="Συγχρονισμός 🔄">
        <p>Κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Worldline" variant="info">
        <p>Τα τερματικά <strong>Worldline</strong> τα δηλώνεις ως <strong>Cardlink</strong>.</p>
      </InfoBox>

      <SectionTitle>Πού βρίσκεις το TID και τον κωδικό WebECR</SectionTitle>

      <StepCard title="Nexi">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Σύνδεσε το τερματικό σε <strong>WiFi</strong>.</li>
          <li>Από το μενού <strong>Εφαρμογές</strong> του τερματικού κατέβασε την εφαρμογή <strong>FinConnect</strong>.</li>
          <li>Άνοιξε το FinConnect. Το <strong>Terminal ID</strong> εμφανίζεται πάνω στην οθόνη.</li>
          <li>Πάτα <strong>Λειτουργίες</strong> → <strong>Κωδικός WebECR</strong>. Εμφανίζεται ο κωδικός (ECR ΚΩΔ).</li>
        </ol>
      </StepCard>

      <StepCard title="Epay">
        <p><strong>Τερματικό με οθόνη αφής:</strong></p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Πάτα <strong>ΑΑΔΕ ΜΕΝΟΥ</strong> → <strong>Ρυθμίσεις ECR</strong> → <strong>Ενεργοποίηση ΑΑΔΕ</strong> και διάλεξε <strong>WebECR</strong>.</li>
          <li>Πάτα <strong>Λήψη κωδικού WebECR</strong>.</li>
        </ol>
        <p className="mt-2"><strong>Τερματικό με πλήκτρα:</strong></p>
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>ΜΕΝΟΥ ΣΥΝΔΕΣΗΣ</strong> → <strong>ΜΕΝΟΥ ERP</strong> → <strong>ΕΝΕΡΓΟΠΟΙΗΣΗ</strong> → <strong>WebECR</strong>.</li>
          <li><strong>SERVICE MENU</strong> → <strong>ΑΑΔΕ</strong> → <strong>ΛΗΨΗ ΚΩΔ. WebECR</strong>.</li>
        </ol>
        <p className="mt-2">Το <strong>TID</strong> το βρίσκεις στην εκτύπωση παραμέτρων: <strong>Βασικές Επιλογές</strong> → <strong>Εκτ. Παραμέτρων</strong>.</p>
        <p className="mt-2">Για κινητά υπάρχουν το <strong>Epay SoftPOS</strong> και το <strong>epay connector</strong>.</p>
      </StepCard>

      <StepCard title="Viva">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Στο τερματικό πάτα τα <strong>δύο γράμματα κάτω δεξιά</strong> (τα αρχικά, π.χ. «ΕΩ») → <strong>Ρυθμίσεις</strong> → <strong>About</strong> (ή «Σχετικά»). Εκεί βρίσκεις το <strong>TID</strong>.</li>
          <li>Γύρνα στις <strong>Ρυθμίσεις</strong> → <strong>Διασυνδέσεις</strong> (Integration) και άνοιξε τον διακόπτη <strong>AADE</strong>.</li>
          <li>Σε κινητό, στο <strong>Τύπος ενοποίησης</strong> διάλεξε <strong>Cloud</strong>.</li>
        </ol>
        <p className="mt-2">Στο Secure, στο <strong>Device Protocol</strong> διαλέγεις <strong>Viva Rest API</strong>.</p>
      </StepCard>

      <StepCard title="Cardlink (και Worldline)">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Στο τερματικό πάτα <strong>ΑΑΔΕ</strong> → <strong>Διασύνδεση με ΑΑΔΕ</strong>.</li>
          <li>Στο <strong>Τύπος διασύνδεσης</strong> διάλεξε <strong>Cloud ERP</strong>.</li>
          <li>Πάτα <strong>Εγγραφή στον ενδιάμεσο κόμβο</strong>. Εμφανίζεται ένας κωδικός: αυτός είναι ο κωδικός WebECR. Καταχώρισέ τον στο Secure πριν λήξει (λήγει σε λίγα λεπτά).</li>
        </ol>
        <p className="mt-2">Το TID φαίνεται πάνω δεξιά στην οθόνη «ΑΑΔΕ» του τερματικού.</p>
      </StepCard>

      <InfoBox icon="💡" title="Πώς καταλαβαίνεις ότι πέτυχε" variant="info">
        <p>Όταν η διασύνδεση πετύχει, στο τερματικό <strong>δεν μπορείς πια να βάλεις ποσό με το χέρι</strong>: οι χρεώσεις έρχονται από την εφαρμογή.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Ενεργοποίηση από τη Spotlight" variant="info">
        <p>Η ενότητα εμφανίζεται όταν την έχει ενεργοποιήσει η Spotlight για το κατάστημα.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
