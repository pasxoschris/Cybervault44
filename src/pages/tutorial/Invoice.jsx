import React from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle, FieldRow } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

const fields = [
  { label: "Email*", value: "Email πελάτη" },
  { label: "Τρόπος Πληρωμής*", value: "Μετρητά / Κάρτα / Κατάθεση / Επί Πιστώσει" },
  { label: "Τύπος Τιμολογίου*", value: "Τιμολόγιο Πώλησης / Τιμολόγιο Παροχής Υπηρεσιών" },
  { label: "ΑΦΜ Εταιρείας*", value: "ΑΦΜ (μπορείς να αναζητήσεις από ΑΑΔΕ)" },
  { label: "Επωνυμία Εταιρείας*", value: "Αυτόματη συμπλήρωση μετά το ΑΦΜ" },
  { label: "Διεύθυνση*", value: "Αυτόματη συμπλήρωση" },
  { label: "Δ.Ο.Υ.*", value: "Αυτόματη συμπλήρωση" },
  { label: "Δραστηριότητα*", value: "Αυτόματη συμπλήρωση" },
  { label: "Πόλη", value: "Προαιρετικό" },
  { label: "Τ.Κ.", value: "Προαιρετικό" },
  { label: "Σχόλια", value: "Προαιρετικό" },
];

export default function Invoice() {
  return (
    <TutorialLayout title="Έκδοση Τιμολογίου" subtitle="Πώς να εκδώσεις τιμολόγιο από την εφαρμογή">

      <ScreenshotGallery
        images={[
          "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/1c2d5c355_17.JPG",
          "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/a151b64da_18.JPG",
          "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/d65d4c712_19.JPG",
        ]}
        caption="Φόρμα έκδοσης τιμολογίου"
      />

      <SectionTitle>Διαδικασία Έκδοσης</SectionTitle>

      <StepCard number="1" title="Άνοιξε την παραγγελία">
        <p>Βρες την παραγγελία για την οποία θέλεις να εκδώσεις τιμολόγιο.</p>
      </StepCard>

      <StepCard number="2" title="Επίλεξε το εικονίδιο τιμολογίου">
        <p>Στις τρεις τελείες πάνω δεξιά, βρες και πάτα <strong>Έκδοση Τιμολογίου</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Αναζήτηση πελάτη για τον οποίο έχει ξαναεκδοθεί τιμολόγιο">
        <p>Αν ο πελάτης είναι ήδη αποθηκευμένος στο Spotlight, πάτα <strong>«Αναζήτηση σε Spotlight»</strong> και αναζήτησε με τηλέφωνο, email ή ΑΦΜ.</p>
      </StepCard>

      <StepCard number="4" title="Συμπλήρωσε τα στοιχεία">
        <div className="bg-[#080c20] border border-[#00D4FF]/10 rounded-sm overflow-hidden mt-2 px-3">
          {fields.map((f, i) => (
            <FieldRow key={i} label={f.label} value={f.value} />
          ))}
        </div>
      </StepCard>

      <StepCard number="5" title="Πάτα «Έκδοση»">
        <p>Μόλις συμπληρώσεις όλα τα υποχρεωτικά πεδία (*), πάτα <strong>«Έκδοση»</strong> και επιβεβαίωσε.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Σημαντικό — Ακύρωση Τιμολογίου" variant="warning">
        <p className="font-semibold">Το τιμολόγιο ακυρώνεται ΜΟΝΟ από το διαχειριστικό (Secure).</p>
        <p className="mt-1">Αν θέλεις να ακυρώσεις τιμολόγιο <em>από την εφαρμογή</em>, θα πρέπει να <strong>ακυρώσεις ολόκληρη την παραγγελία</strong>.</p>
      </InfoBox>

      <InfoBox icon="💡" title="Αναζήτηση ΑΦΜ" variant="info">
        Μπορείς να πατήσεις το εικονίδιο 📖 δίπλα στο πεδίο ΑΦΜ για αυτόματη αναζήτηση στην ΑΑΔΕ. Τα στοιχεία της εταιρείας θα συμπληρωθούν αυτόματα.
      </InfoBox>
    </TutorialLayout>
  );
}