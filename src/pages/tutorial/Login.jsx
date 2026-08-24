import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle, FieldRow } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

export default function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Σύνδεση Χρήστη" subtitle="Πώς να συνδεθείς με τα στοιχεία χρήστη σου">

      <InfoBox icon="📱" title="Συμβατότητα Συσκευής" variant="info">
        Η εφαρμογή SpotlightPOS (όχι το διαχειριστικό Secure) τρέχει <strong>μόνο σε iOS συσκευές</strong> — <strong>iPhone</strong> και <strong>iPad</strong>. Βεβαιώσου ότι χρησιμοποιείς συμβατή συσκευή.
      </InfoBox>

      <InfoBox icon="⚠️" title="Προαπαιτούμενα" variant="warning">
        Πριν συνδεθείς, ο διαχειριστής πρέπει να έχει κάνει τα εξής στο <strong>Secure (Διαχειριστικό)</strong>:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Δημιουργία χρηστών</li>
          <li>Δημιουργία σημείων πώλησης/συσκευών (POS) των χρηστών</li>
        </ul>
      </InfoBox>

      <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/3eb8334c2_4.JPG"]} caption="Οθόνη User Sign in" />
      <SectionTitle>Σύνδεση νέου χρήστη</SectionTitle>
      <StepCard number="1" title="Βλέπεις την οθόνη User Sign in">
        <p>Εφόσον η συσκευή έχει ήδη συνδεθεί με κατάστημα, θα εμφανιστεί απευθείας η οθόνη <strong>«User Sign in»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Εισήγαγε στοιχεία χρήστη">
        <div className="border border-[#00D4FF]/10 bg-[#080c20]/60 rounded-sm overflow-hidden mt-2">
          <FieldRow label="Username" value="Το όνομα χρήστη σου" />
          <FieldRow label="Password" value="Ο κωδικός σου" />
        </div>
      </StepCard>
      <StepCard number="3" title="Πάτα Login">
        <p>Θα δεις κάτω αριστερά το <strong>κατάστημα – συσκευή</strong> (π.χ. «Spotlight Demo - pos 1»).</p>
      </StepCard>
      <InfoBox icon="📊" title="Πολλοί χρήστες / Άδειες" variant="info">
        Μπορείτε να δημιουργήσετε πολλούς χρήστες και πολλές συσκευές. Όμως, ο αριθμός των <strong>παράλληλα συνδεδεμένων χρηστών</strong> εξαρτάται από τις άδειες που έχετε αγοράσει.
      </InfoBox>
    </TutorialLayout>
  );
}