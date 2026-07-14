import React, { useState, useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

const methods = [
  { id: "cash", label: "Πληρωμή με Μετρητά", icon: "💵" },
  { id: "card", label: "Πληρωμή με Κάρτα", icon: "💳" },
  { id: "online", label: "Ηλεκτρονική Πληρωμή", icon: "🌐" },
  { id: "split", label: "Split Payments", icon: "✂️" },
  { id: "iris", label: "Πληρωμή με IRIS", icon: "🔵" },
];

export default function Payment() {
  const [active, setActive] = useState("cash");

  const methodLabels = {
    cash: "Πληρωμή με Μετρητά",
    card: "Πληρωμή με Κάρτα",
    online: "Ηλεκτρονική Πληρωμή",
    split: "Split Payments",
    iris: "Πληρωμή με IRIS",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active]);

  return (
    <TutorialLayout title="Πληρωμή" subtitle="Διαδικασία πληρωμής παραγγελίας">

      <StepCard number="1" title="Πάτα το εικονίδιο Κέρματα">
        <p>Από τα στοιχεία παραγγελίας, πάτα το εικονίδιο <strong>Κέρματα</strong> στο κάτω μενού για να ανοίξει το μενού πληρωμής.</p>
      </StepCard>

      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/195dd216c_Screenshot2026-07-14101523.png" alt="Μενού επιλογής τρόπου πληρωμής" className="w-40 h-auto rounded-lg border border-gray-200" />
      </div>

      <div className="flex flex-wrap gap-2">
        {methods.map(m => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${active === m.id ? "bg-primary text-primary-foreground shadow" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {active === "cash" && (
        <>
          <SectionTitle>Πληρωμή με Μετρητά</SectionTitle>
          <StepCard number="1" title="Άνοιξε την παραγγελία">
            <p>Πάτα στην παραγγελία για να δεις τα στοιχεία της.</p>
          </StepCard>
          <StepCard number="2" title="Πάτα «Πληρωμή με Μετρητά»">
            <p>Στο κάτω μέρος ή από το μενού πληρωμής, επίλεξε <strong>«Πληρωμή με Μετρητά»</strong>.</p>
          </StepCard>
          <StepCard number="3" title="Εισήγαγε ποσό (προαιρετικό)">
            <p>Αν ο πελάτης δώσει ποσό μεγαλύτερο, χρησιμοποίησε το <strong>εργαλείο για ρέστα</strong> για να υπολογίσεις τα ρέστα.</p>
          </StepCard>
          <StepCard number="4" title="Επιβεβαίωση">
            <p>Επιβεβαίωσε την πληρωμή. Η απόδειξη θα εκτυπωθεί αυτόματα.</p>
          </StepCard>
        </>
      )}

      {active === "card" && (
        <>
          <SectionTitle>Πληρωμή με Κάρτα</SectionTitle>
          <StepCard number="1" title="Επίλεξε «Πληρωμή με Κάρτα»">
            <p>Στο μενού πληρωμής, επίλεξε <strong>«Πληρωμή με Κάρτα (Nexi)»</strong> ή το τερματικό που έχεις ρυθμίσει.</p>
          </StepCard>
          <StepCard number="2" title="Χρέωσε στο POS terminal">
            <p>Το ποσό θα σταλεί αυτόματα στο τερματικό POS. Ζήτα από τον πελάτη να πληρώσει στο τερματικό.</p>
          </StepCard>
          <StepCard number="3" title="Αναμονή επιβεβαίωσης">
            <p>Μόλις η συναλλαγή εγκριθεί, η παραγγελία κλείνει αυτόματα και η απόδειξη εκτυπώνεται.</p>
          </StepCard>
          <InfoBox icon="⚠️" title="Αν παγώσει η παραγγελία" variant="warning">
            <p>Αν πληρωθείς με κάρτα αλλά η παραγγελία παγώσει, ακολούθησε τα εξής βήματα:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li><strong>Κράτα τα κέρματα πατημένα για 10 δευτερόλεπτα</strong>.</li>
              <li>Θα εμφανιστεί το μήνυμα: <strong>«Αφαίρεση ελέγχου εκκρεμών συναλλαγών και ξεκλείδωμα παραγγελίας;»</strong>.</li>
              <li>Πάτα <strong>«Ναι»</strong> για να ξεκλειδώσει η παραγγελία.</li>
            </ul>
          </InfoBox>
        </>
      )}

      {active === "split" && (
        <>
          <SectionTitle>Split Payments — Διαίρεση Πληρωμής</SectionTitle>
          <StepCard number="1" title="Επίλεξε «Split Payments»">
            <p>Στο μενού πληρωμής, πάτα <strong>«Split Payments»</strong>.</p>
          </StepCard>
          <StepCard number="2" title="Ορισμός αριθμού πληρωμών">
            <p>Με τα κουμπιά <strong>«+»</strong> και <strong>«-»</strong> ρύθμισε τον αριθμό πληρωμών (π.χ. 2). Το σύστημα διαιρεί αυτόματα το σύνολο ισόποσα.</p>
          </StepCard>
          <StepCard number="3" title="Επίλεξε τρόπο πληρωμής για κάθε μέρος">
            <p>Πάτα <strong>«Τρόπος πληρωμής»</strong> δίπλα σε κάθε γραμμή και επίλεξε: Μετρητά, Κάρτα ή Ηλεκτρονική Πληρωμή.</p>
          </StepCard>
          <StepCard number="4" title="Χρέωση μία-μία">
            <p>Πάτα <strong>«Χρέωση»</strong> για κάθε πληρωμή ξεχωριστά. Ολοκλήρωσε την πρώτη πριν πας στη δεύτερη.</p>
          </StepCard>
          <InfoBox icon="⚠️" title="Σημαντικό!" variant="warning">
            <strong>Πρέπει να ολοκληρώνεται η μία πληρωμή πριν πας στη 2η.</strong> Μην αλλάζεις τρόπο πληρωμής ενώ εκκρεμεί χρέωση.
          </InfoBox>
        </>
      )}

      {active === "online" && (
        <>
          <SectionTitle>Ηλεκτρονική Πληρωμή</SectionTitle>
          <InfoBox icon="⚙️" title="Προαπαιτούμενο" variant="purple">
            Η <strong>Ηλεκτρονική Πληρωμή</strong> πρέπει πρώτα να ενεργοποιηθεί στις <strong>Ρυθμίσεις του χρήστη</strong>. Πήγαινε στις Ρυθμίσεις και άνοιξε το διακόπτη <strong>«Ηλεκτρονική Πληρωμή»</strong>.
          </InfoBox>
          <div className="flex justify-center">
            <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/b098d52d1_anyviewer_screenshot_20260714104819.png" alt="Ενεργοποίηση Ηλεκτρονικής Πληρωμής στις Ρυθμίσεις" className="w-44 h-auto rounded-lg border border-gray-200" />
          </div>
          <StepCard number="1" title="Επίλεξε «Ηλεκτρονική Πληρωμή»">
            <p>Στο μενού πληρωμής, πάτα <strong>«Ηλεκτρονική Πληρωμή»</strong>.</p>
          </StepCard>
          <StepCard number="2" title="Αποστολή πληρωμής">
            <p>Το σύστημα δημιουργεί σύνδεσμο ηλεκτρονικής πληρωμής ή QR code που ο πελάτης μπορεί να σκανάρει / ανοίξει.</p>
          </StepCard>
          <StepCard number="3" title="Αναμονή επιβεβαίωσης">
            <p>Όταν ο πελάτης ολοκληρώσει την πληρωμή, η παραγγελία κλείνει αυτόματα και εκτυπώνεται η απόδειξη.</p>
          </StepCard>
          <InfoBox icon="💡" variant="info">
            Ιδανικό για παραγγελίες που δεν εξυπηρετούνται στο κατάστημα (delivery, preorder).
          </InfoBox>
        </>
      )}

      {active === "iris" && (
        <>
          <SectionTitle>Πληρωμή με IRIS</SectionTitle>
          <InfoBox icon="🔵" title="Τι είναι το IRIS;" variant="info">
            Το IRIS είναι το σύστημα άμεσων πληρωμών της Ελληνικής Τράπεζας — ο πελάτης πληρώνει με κωδικό IRIS από την τραπεζική του εφαρμογή.
          </InfoBox>
          <StepCard number="1" title="Επίλεξε «Πληρωμή με IRIS»">
            <p>Στο μενού πληρωμής, πάτα <strong>«Πληρωμή με IRIS»</strong>.</p>
          </StepCard>
          <StepCard number="2" title="Εμφάνιση κωδικού">
            <p>Το σύστημα εμφανίζει τον κωδικό IRIS ή QR που ο πελάτης σκανάρει / εισάγει στην τραπεζική εφαρμογή του.</p>
          </StepCard>
          <StepCard number="3" title="Επιβεβαίωση πληρωμής">
            <p>Όταν η πληρωμή ολοκληρωθεί, η παραγγελία κλείνει αυτόματα και η απόδειξη εκτυπώνεται.</p>
          </StepCard>
        </>
      )}
    </TutorialLayout>
  );
}