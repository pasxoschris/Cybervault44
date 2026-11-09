import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function Roles() {
  return (
    <SecureTutorialLayout title="Ρόλοι" subtitle="Οι ομάδες χρηστών του καταστήματος">

      <Intro>
        Κάθε χρήστης ανήκει σε έναν <strong>ρόλο</strong>. Στη σελίδα <strong>Χρήστες</strong> οι χρήστες εμφανίζονται ομαδοποιημένοι ανά ρόλο.
      </Intro>

      <StepCard number="1" title="Άνοιξε τους Ρόλους">
        <p>Από το μενού αριστερά, πάτα <strong>Ρόλοι</strong>.</p>
      </StepCard>

      <StepCard title="Οι ρόλοι">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Ιδιοκτήτης</strong> και <strong>Υπεύθυνος</strong></li>
          <li><strong>Σερβιτόρος</strong> (οδηγός <S to="/academy/service">Service</S>) και <strong>Ταμείας</strong></li>
          <li><strong>Maitre</strong> και <strong>Maitre Service</strong></li>
          <li><strong>Προσωπικό</strong></li>
          <li><strong>Απογραφή</strong> και <strong>Αποθήκη</strong></li>
          <li><strong>Take-Out &amp; Delivery</strong> και <strong>Διανομέας</strong></li>
          <li><strong>Οθόνη Κουζίνας</strong> και <strong>Customer Display</strong></li>
        </ul>
      </StepCard>

      <InfoBox icon="ℹ️" title="Ο Υπεύθυνος είναι ρόλος" variant="info">
        <p>Ο «Υπεύθυνος» που βλέπεις στα <S to="/tutorial/secure/d-staff">Στατιστικά → Υπεύθυνοι</S> και στα φίλτρα της <S to="/tutorial/secure/c-order-flow">Ροής Παραγγελιών</S> είναι ρόλος χρήστη.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Ο ρόλος κάθε χρήστη" variant="info">
        <p>Τον ρόλο τον ορίζεις στο πεδίο <strong>Ρόλος</strong> της <S to="/tutorial/secure/i-users">Επεξεργασίας Χρήστη</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
