import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function FoodTypes() {
  return (
    <SecureTutorialLayout title="Τύποι Φαγητού" subtitle="Χαρακτηρισμός προϊόντων, π.χ. Vegetarian">

      <Intro>
        Οι <strong>Τύποι Φαγητού</strong> χαρακτηρίζουν τα προϊόντα, π.χ. <strong>Vegetarian</strong> ή <strong>Non-vegetarian</strong>. Τους διαλέγεις στο πεδίο <strong>Τύποι Φαγητού</strong> των <S to="/tutorial/secure/e-products">προϊόντων και των κατηγοριών</S> και των <S to="/tutorial/secure/e-modifiers">συνοδευτικών</S>.
      </Intro>

      <StepCard number="1" title="Η λίστα">
        <p>Από το μενού αριστερά πάτα <strong>Κατάλογος</strong> → <strong>Τύποι Φαγητού</strong>. Βλέπεις τους διαθέσιμους τύπους: <strong>Vegetarian</strong>, <strong>Non-vegetarian</strong>, <strong>Eggetarian</strong>, <strong>Not specified</strong>. Η πράσινη τελεία σημαίνει ότι ο τύπος είναι ενεργός.</p>
      </StepCard>

      <StepCard number="2" title="Δικός σου τύπος">
        <p>Στο <strong>Προσαρμοσμένος Τύπος Φαγητού</strong> γράψε το όνομα (π.χ. Vegan) και πάτα <strong>Προσθήκη</strong>.</p>
      </StepCard>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
