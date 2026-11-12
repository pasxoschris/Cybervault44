import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function CallerId() {
  return (
    <SecureTutorialLayout title="Caller ID" subtitle="Αναγνώριση κλήσεων για τηλεφωνικές παραγγελίες">

      <Intro>
        Το <strong>Caller ID</strong> αναγνωρίζει τον αριθμό που καλεί το κατάστημα και εμφανίζει τον πελάτη στην εφαρμογή, για να πάρεις γρήγορα την τηλεφωνική παραγγελία ή το delivery. Δηλώνεται στα <S to="/tutorial/secure/f-other-devices">Other Devices</S>.
      </Intro>

      <StepCard number="1" title="Νέα συσκευή">
        <p>Από το μενού αριστερά πάτα <strong>Συσκευές</strong> → <strong>Other Devices</strong> και πρόσθεσε νέα συσκευή. Συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Όνομα</strong>*: π.χ. «Caller ID Ταμείο».</li>
          <li><strong>Τύπος Συσκευής</strong>*: <strong>Caller ID</strong>.</li>
          <li><strong>Διεύθυνση IP</strong>*: η διεύθυνση IP της συσκευής Caller ID.</li>
          <li><strong>Port</strong>: πάντα <strong>8081</strong>.</li>
          <li><strong>API key</strong> και <strong>UUID</strong>: μένουν κενά.</li>
        </ul>
        <p className="mt-2">Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Συγχρονισμός 🔄">
        <p>Κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Ποιος το κάνει" variant="info">
        <p>Το Caller ID το ρυθμίζουν συνήθως οι <strong>τεχνικοί της Spotlight</strong>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
