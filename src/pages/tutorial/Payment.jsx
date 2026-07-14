import React, { useState, useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

const methods = [
  { id: "cash", label: "Μετρητά", icon: "💵" },
  { id: "card", label: "Κάρτα", icon: "💳" },
  { id: "split", label: "Split Payments", icon: "✂️" },
  { id: "credit", label: "Επί Πιστώσει", icon: "📝" },
];

export default function Payment() {
  const [active, setActive] = useState("cash");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active]);

  return (
    <TutorialLayout title="Πληρωμή" subtitle="Διαδικασία πληρωμής παραγγελίας">

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
          <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/6f89d5a83_11.JPG"]} caption="Μενού πληρωμής" />
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
            Αν πληρωθείς με κάρτα αλλά η παραγγελία παγώσει, επικοινώνησε με τον διαχειριστή. Μην επαναλάβεις τη χρέωση χωρίς επαλήθευση.
          </InfoBox>
        </>
      )}

      {active === "split" && (
        <>
          <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/be30649b8_12.JPG"]} caption="Split Payments οθόνη" />
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

      {active === "credit" && (
        <>
          <SectionTitle>Επί Πιστώσει</SectionTitle>
          <InfoBox icon="📝" title="Τι σημαίνει Επί Πιστώσει;" variant="info">
            Η παραγγελία καταχωρείται ως οφειλή. Ο πελάτης δεν πληρώνει άμεσα — η χρέωση γίνεται αργότερα.
          </InfoBox>
          <StepCard number="1" title="Επίλεξε «Επί Πιστώσει»">
            <p>Στο μενού πληρωμής επίλεξε <strong>«Επί Πιστώσει»</strong>.</p>
          </StepCard>
          <StepCard number="2" title="Επιβεβαίωση">
            <p>Επιβεβαίωσε. Η παραγγελία θα καταχωρηθεί ως ανεξόφλητη στο σύστημα.</p>
          </StepCard>
          <InfoBox icon="💡" variant="info">
            Η λίστα παραγγελιών Επί Πιστώσει διαχειρίζεται από το διαχειριστικό (Secure).
          </InfoBox>
        </>
      )}
    </TutorialLayout>
  );
}