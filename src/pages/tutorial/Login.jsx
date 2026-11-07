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
        Η εφαρμογή SpotlightPOS — όχι το Secure (Διαχειριστικό) — τρέχει <strong>μόνο σε iOS συσκευές</strong> — <strong>iPhone</strong> και <strong>iPad</strong>. Βεβαιώσου ότι χρησιμοποιείς συμβατή συσκευή.
      </InfoBox>

      <InfoBox icon="⚠️" title="Προαπαιτούμενα" variant="warning">
        Πριν συνδεθείς, ο διαχειριστής πρέπει να έχει κάνει τα εξής στο <strong>Secure (Διαχειριστικό)</strong>:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Δημιουργία χρηστών</li>
          <li>Δημιουργία Θέσεων/Συσκευών Χρηστών (POS)</li>
        </ul>
      </InfoBox>

      <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/3eb8334c2_4.JPG"]} caption="Οθόνη «Σύνδεση Χρήστη»" />
      <SectionTitle>Σύνδεση με όνομα χρήστη και κωδικό</SectionTitle>
      <StepCard number="1" title="Βλέπεις την οθόνη «Σύνδεση Χρήστη»">
        <p>Εφόσον η συσκευή έχει ήδη συνδεθεί με κατάστημα, θα εμφανιστεί απευθείας η οθόνη <strong>«Σύνδεση Χρήστη»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Εισήγαγε στοιχεία χρήστη">
        <div className="border border-[#00D4FF]/10 bg-[#080c20]/60 rounded-sm overflow-hidden mt-2">
          <FieldRow label="Όνομα Χρήστη" value="Το όνομα χρήστη σου" />
          <FieldRow label="Κωδικός Πρόσβασης" value="Ο κωδικός σου" />
        </div>
      </StepCard>
      <StepCard number="3" title="Πάτα «Σύνδεση»">
        <p>Στο κάτω μέρος της οθόνης βλέπεις το <strong>κατάστημα – συσκευή</strong> (π.χ. «LS DEMO - chris-1»).</p>
      </StepCard>
      <SectionTitle>Σύνδεση με QR Code</SectionTitle>
      <StepCard number="1" title="Πάτα «QR Code»">
        <p>Στην οθόνη σύνδεσης χρήστη, αντί για όνομα χρήστη και κωδικό, πάτα το κουμπί <strong>«QR Code»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Σκάναρε το QR σου">
        <p>Ανοίγει η κάμερα με το μήνυμα <strong>«Σκανάρετε το QR του Χρήστη»</strong>. Σκάναρε το προσωπικό σου QR και συνδέεσαι.</p>
      </StepCard>
      <InfoBox icon="ℹ️" title="Πού βρίσκεις το QR σου" variant="info">
        <p>Κάθε χρήστης έχει το <strong>δικό του QR</strong>. Το δίνει ο <strong>Διαχειριστής</strong> από το <strong>Secure (Διαχειριστικό)</strong> ή σου το στέλνει με <strong>email</strong> («Spotlight POS - [όνομα] QR code»).</p>
        <p className="mt-2">Είναι το ίδιο QR που χρησιμοποιείται και στην <strong>Ιδιοκατανάλωση</strong>. Δεν είναι το QR του καταστήματος, που χρησιμοποιείται για τη σύνδεση νέας συσκευής.</p>
      </InfoBox>

      <InfoBox icon="📊" title="Πολλοί χρήστες / Άδειες" variant="info">
        Μπορούν να δημιουργηθούν πολλοί χρήστες και πολλές Θέσεις/Συσκευές Χρηστών (POS). Ο αριθμός των <strong>χρηστών που συνδέονται ταυτόχρονα</strong> εξαρτάται από τις άδειες που διαθέτει το κατάστημα.
      </InfoBox>
    </TutorialLayout>
  );
}