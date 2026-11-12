import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function EftposTerminals() {
  return (
    <SecureTutorialLayout title="Τερματικά POS τράπεζας (EFTPOS)" subtitle="Προσθήκη τερματικού καρτών και πού βρίσκεις τα στοιχεία του ανά πάροχο">

      <Intro>
        Τα τερματικά καρτών της τράπεζας δηλώνονται στα <S to="/tutorial/secure/f-other-devices">Other Devices</S> ως συσκευές τύπου <strong>EFTPOS</strong>. Μετά τη σύνδεση, οι χρεώσεις στέλνονται στο τερματικό από την εφαρμογή.
      </Intro>

      <InfoBox icon="⚠️" title="Τι χρειάζεσαι από το τερματικό" variant="warning">
        <p>Χρειάζονται <strong>δύο στοιχεία</strong>, που τα βρίσκεις πάνω στο ίδιο το τερματικό:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Terminal ID</strong> (TID): ο αριθμός του τερματικού.</li>
          <li><strong>Registration ID</strong>: ο <strong>κωδικός WebECR</strong> του τερματικού.</li>
        </ul>
        <p className="mt-1">Πού βρίσκονται εξαρτάται από τον πάροχο. Δες την ενότητα του δικού σου POS παρακάτω.</p>
      </InfoBox>

      <SectionTitle>Προσθήκη τερματικού</SectionTitle>

      <StepCard number="1" title="Νέα συσκευή">
        <p>Από το μενού αριστερά πάτα <strong>Συσκευές</strong> → <strong>Other Devices</strong> και πρόσθεσε νέα συσκευή. Συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Όνομα</strong>*: π.χ. «POS Ταμείο».</li>
          <li><strong>Διεύθυνση IP</strong>*: συνήθως δεν βάζουμε IP. Γράψε <strong>-</strong>.</li>
          <li><strong>Τύπος Συσκευής</strong>*: <strong>EFTPOS</strong>.</li>
          <li><strong>EFT POS Provider</strong>*: ο πάροχος του τερματικού.</li>
          <li><strong>Device Model</strong>: το μοντέλο του τερματικού.</li>
          <li><strong>Device Protocol</strong>: π.χ. <strong>WebECR</strong>.</li>
          <li><strong>Tips</strong>: διακόπτης για φιλοδωρήματα.</li>
        </ul>
        <p className="mt-2">Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Register Device">
        <p>Στο κάτω μέρος, στην ενότητα <strong>Register Device</strong>, συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Registration ID</strong>*: τον κωδικό WebECR.</li>
          <li><strong>Terminal ID</strong>*: το TID.</li>
        </ul>
      </StepCard>

      <StepCard number="3" title="Συγχρονισμός 🔄">
        <p>Κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </StepCard>

      <StepCard number="4" title="Αντιστοίχιση στον χρήστη">
        <p>Στη συσκευή του χρήστη, από <strong>Ρυθμίσεις</strong> → <strong>Τερματικά POS</strong>, διάλεξε το τερματικό. Δες το <S to="/tutorial/settings">μάθημα του Service για τις Ρυθμίσεις Χρήστη</S>.</p>
      </StepCard>

      <InfoBox icon="💡" title="Πώς καταλαβαίνεις ότι πέτυχε" variant="info">
        <p>Όταν η διασύνδεση πετύχει, στο τερματικό <strong>δεν μπορείς πια να βάλεις ποσό με το χέρι</strong>: οι χρεώσεις έρχονται από την εφαρμογή.</p>
      </InfoBox>

      <SectionTitle>Nexi</SectionTitle>

      <StepCard title="TID και κωδικός WebECR">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Σύνδεσε το τερματικό σε <strong>WiFi</strong>.</li>
          <li>Από το μενού <strong>Εφαρμογές</strong> του τερματικού κατέβασε την εφαρμογή <strong>FinConnect</strong>.</li>
          <li>Άνοιξε το FinConnect. Το <strong>Terminal ID</strong> εμφανίζεται πάνω στην οθόνη.</li>
          <li>Πάτα <strong>Λειτουργίες</strong> → <strong>Κωδικός WebECR</strong>. Εμφανίζεται ο κωδικός (ECR ΚΩΔ).</li>
        </ol>
      </StepCard>

      <SectionTitle>Epay</SectionTitle>

      <StepCard title="Τερματικό με οθόνη αφής">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Πάτα <strong>ΑΑΔΕ ΜΕΝΟΥ</strong> → <strong>Ρυθμίσεις ECR</strong> → <strong>Ενεργοποίηση ΑΑΔΕ</strong> και διάλεξε <strong>WebECR</strong>.</li>
          <li>Πάτα <strong>Λήψη κωδικού WebECR</strong>.</li>
        </ol>
      </StepCard>

      <StepCard title="Τερματικό με πλήκτρα">
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>ΜΕΝΟΥ ΣΥΝΔΕΣΗΣ</strong> → <strong>ΜΕΝΟΥ ERP</strong> → <strong>ΕΝΕΡΓΟΠΟΙΗΣΗ</strong> → <strong>WebECR</strong>.</li>
          <li><strong>SERVICE MENU</strong> → <strong>ΑΑΔΕ</strong> → <strong>ΛΗΨΗ ΚΩΔ. WebECR</strong>.</li>
        </ol>
      </StepCard>

      <StepCard title="Πού βρίσκεις το TID">
        <p>Στην εκτύπωση παραμέτρων του τερματικού: <strong>Βασικές Επιλογές</strong> → <strong>Εκτ. Παραμέτρων</strong>.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Epay σε κινητό" variant="info">
        <p>Για κινητά υπάρχουν το <strong>Epay SoftPOS</strong> και το <strong>epay connector</strong>.</p>
      </InfoBox>

      <SectionTitle>Viva</SectionTitle>

      <InfoBox icon="⚠️" title="Πρώτα η Spotlight" variant="warning">
        <p>Για τη Viva, η <strong>Spotlight</strong> πρέπει πρώτα να ρυθμίσει τον λογαριασμό Viva του καταστήματος.</p>
      </InfoBox>

      <StepCard title="TID">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Στο τερματικό πάτα τα <strong>δύο γράμματα κάτω δεξιά</strong> (τα αρχικά, π.χ. «ΕΩ») → <strong>Ρυθμίσεις</strong> → <strong>About</strong> (ή «Σχετικά»). Εκεί βρίσκεις το <strong>TID</strong>.</li>
          <li>Γύρνα στις <strong>Ρυθμίσεις</strong> → <strong>Διασυνδέσεις</strong> (Integration) και άνοιξε τον διακόπτη <strong>AADE</strong>.</li>
          <li>Σε κινητό, στο <strong>Τύπος ενοποίησης</strong> διάλεξε <strong>Cloud</strong>.</li>
        </ol>
      </StepCard>

      <StepCard title="Στο Secure">
        <p>Η Viva θέλει <strong>μόνο το Terminal ID</strong>, χωρίς Registration ID. Στο <strong>Device Protocol</strong> διάλεξε <strong>Viva Rest API</strong>.</p>
      </StepCard>

      <SectionTitle>Cardlink</SectionTitle>

      <StepCard title="TID και κωδικός WebECR">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Στο τερματικό πάτα <strong>ΑΑΔΕ</strong> → <strong>Διασύνδεση με ΑΑΔΕ</strong>.</li>
          <li>Στο <strong>Τύπος διασύνδεσης</strong> διάλεξε <strong>Cloud ERP</strong>.</li>
          <li>Πάτα <strong>Εγγραφή στον ενδιάμεσο κόμβο</strong>. Εμφανίζεται ένας κωδικός: αυτός είναι ο κωδικός WebECR. Καταχώρισέ τον στο Secure πριν λήξει (λήγει σε λίγα λεπτά).</li>
        </ol>
        <p className="mt-2">Το TID φαίνεται πάνω δεξιά στην οθόνη «ΑΑΔΕ» του τερματικού.</p>
      </StepCard>

      <SectionTitle>Worldline</SectionTitle>

      <StepCard title="Όπως το Cardlink">
        <p>Τα τερματικά Worldline τα δηλώνεις στο Secure με EFT POS Provider <strong>Cardlink</strong> και ακολουθείς τα βήματα του Cardlink.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Ποιος το κάνει" variant="info">
        <p>Την προσθήκη τερματικού την κάνουν συνήθως οι <strong>τεχνικοί της Spotlight</strong>. Μπορεί να την κάνει και ο τεχνικός ή ο Διαχειριστής του καταστήματος.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
