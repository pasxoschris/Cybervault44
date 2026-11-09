import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function Sync() {
  return (
    <SecureTutorialLayout title="Συγχρονισμός" subtitle="Πώς φτάνουν οι αλλαγές του Secure στις συσκευές">

      <Intro>
        Ό,τι αλλάζεις στο Secure (προϊόντα, τιμές, τραπέζια, χρήστες, ρυθμίσεις) φτάνει στις συσκευές των σερβιτόρων <strong>μόνο αφού κάνεις Συγχρονισμό</strong>. Ο Συγχρονισμός στέλνει όλες τις αλλαγές στον server (στο Cloud της Google) και από εκεί περνούν σε όλους τους χρήστες.
      </Intro>

      <SectionTitle>Πώς το κάνεις</SectionTitle>

      <StepCard number="1" title="Κάνε τις αλλαγές σου">
        <p>Ολοκλήρωσε και αποθήκευσε όσες αλλαγές θέλεις, σε όποια σελίδα του Secure.</p>
      </StepCard>

      <StepCard number="2" title="Πάτα Συγχρονισμός">
        <p>Από το μενού αριστερά, πάτα <strong>Συγχρονισμός</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Τι βλέπουν οι σερβιτόροι">
        <p>Στα iPhone/iPad εμφανίζεται για λίγο το μήνυμα <strong>«Συγχρονισμός...»</strong>. Είναι ενημερωτικό: ο σερβιτόρος δεν πατάει τίποτα, οι αλλαγές περνούν μόνες τους. Δες και το <S to="/tutorial/sync-status">Κεφ. 4 του Service</S>.</p>
      </StepCard>

      <SectionTitle>Καλό να ξέρεις</SectionTitle>

      <StepCard title="Δεν είναι μόνο για τη Spotlight">
        <p>Τον Συγχρονισμό τον κάνει ο Διαχειριστής του καταστήματος κάθε φορά που αλλάζει κάτι στο Secure. Είναι ασφαλής και στη μέση της βάρδιας.</p>
      </StepCard>

      <InfoBox icon="💡" title="«Έκανα αλλαγή και δεν φαίνεται στην εφαρμογή»" variant="info">
        <p>Ο πρώτος έλεγχος: έγινε Συγχρονισμός μετά την αλλαγή; Αν όχι, κάν' τον και ξαναδές.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Το σήμα 🔄 στα μαθήματα" variant="info">
        <p>Στα μαθήματα του Secure, το 🔄 σου θυμίζει ότι μετά από αυτές τις αλλαγές χρειάζεται Συγχρονισμός.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
