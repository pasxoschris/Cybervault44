import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox } from "../../../components/tutorial/StepCard";
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
          <li><strong>EFTPOS:</strong> τα τερματικά καρτών της τράπεζας, π.χ. Cardlink, EDPS, Epay, Mellon, Mypay, Nexi, Viva, Worldline. Πώς προσθέτεις τερματικό: δες το <S to="/tutorial/secure/f-eftpos">μάθημα 7.3.1</S>.</li>
          <li><strong>Caller ID:</strong> αναγνώριση κλήσεων για τηλεφωνικές παραγγελίες.</li>
          <li><strong>Customer Display:</strong> οθόνη πελάτη.</li>
          <li><strong>Cash Drawer:</strong> συρτάρι μετρητών.</li>
        </ul>
      </StepCard>

      <StepCard title="Οι στήλες">
        <p><strong>Όνομα</strong>, <strong>Τύπος</strong>, <strong>Διεύθυνση IP</strong> και <strong>Port</strong>. Σε κάποια τερματικά τα πεδία IP και Port είναι κενά.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Ενεργοποίηση από τη Spotlight" variant="info">
        <p>Η ενότητα εμφανίζεται όταν την έχει ενεργοποιήσει η Spotlight για το κατάστημα.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
