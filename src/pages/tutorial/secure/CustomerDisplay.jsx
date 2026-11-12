import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function CustomerDisplay() {
  return (
    <SecureTutorialLayout title="Customer Display" subtitle="Οθόνη πελάτη">

      <Intro>
        Το <strong>Customer Display</strong> είναι η οθόνη πελάτη. Δηλώνεται στα <S to="/tutorial/secure/f-other-devices">Other Devices</S>.
      </Intro>

      <StepCard number="1" title="Νέα συσκευή">
        <p>Από το μενού αριστερά πάτα <strong>Συσκευές</strong> → <strong>Other Devices</strong> και πρόσθεσε νέα συσκευή. Συμπλήρωσε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Όνομα</strong>*: π.χ. «Οθόνη πελάτη Ταμείο».</li>
          <li><strong>Τύπος Συσκευής</strong>*: <strong>Customer Display</strong>.</li>
          <li><strong>Διεύθυνση IP</strong>*: η τοπική IP της οθόνης πελάτη.</li>
          <li><strong>Port</strong>: πάντα <strong>3000</strong>.</li>
          <li><strong>API key</strong>, <strong>UUID</strong> και <strong>Serial No</strong>: μένουν κενά.</li>
        </ul>
        <p className="mt-2">Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Συγχρονισμός 🔄">
        <p>Κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Δεν βλέπεις τον τύπο στη λίστα;" variant="info">
        <p>Αν στον <strong>Τύπο Συσκευής</strong> δεν υπάρχει το Customer Display, ζήτησε από τη <strong>Spotlight</strong> να το ενεργοποιήσει.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Ποιος το κάνει" variant="info">
        <p>Την οθόνη πελάτη τη ρυθμίζουν συνήθως οι <strong>τεχνικοί της Spotlight</strong>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
