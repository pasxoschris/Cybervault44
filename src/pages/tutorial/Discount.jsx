import React, { useState, useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

const types = [
  { id: "general", label: "Γενική Έκπτωση", icon: "🏷️" },
  { id: "own", label: "Ιδιοκατανάλωση", icon: "🎁" },
  { id: "cancel", label: "Άλλες Εκπτώσεις", icon: "🗑️" },
];

export default function Discount() {
  const [active, setActive] = useState("general");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active]);

  return (
    <TutorialLayout title="Έκπτωση" subtitle="Τύποι εκπτώσεων και πώς να τις εφαρμόσεις">

      <div className="flex gap-2 mb-6 flex-wrap">
        {types.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-2 border font-rajdhani text-sm font-semibold transition-all ${active === t.id ? "border-purple-500/70 bg-purple-900/30 text-[#A78BFA]" : "border-[#00D4FF]/15 bg-[#0D1526]/70 text-white/50 hover:border-[#00D4FF]/30 hover:text-white/80"}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {active === "general" && (
        <>
          <ScreenshotGallery
            images={[
              "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/188cb6052_14.JPG",
            ]}
            caption="Οθόνη έκπτωσης"
          />
          <SectionTitle>Γενική Έκπτωση</SectionTitle>
          <StepCard number="1" title="Άνοιξε την παραγγελία">
            <p>Πάτα στην ανοικτή παραγγελία για να δεις τα στοιχεία της.</p>
          </StepCard>
          <StepCard number="2" title="Πάτα το εικονίδιο έκπτωσης">
            <p>Π'ατησε πάνω δεξία στις τρεις τελείες, και επέλεξε <strong>Έκπτωση</strong>.</p>
          </StepCard>
          <StepCard number="3" title="Εισήγαγε Κωδικό Διαχειριστή">
            <p>Για να εφαρμόσεις συνολική έκπτωση, θα σου ζητηθεί ο <strong>Κωδικός Διαχειριστή</strong>. Βάλε τον κωδικό ή σκάναρε QR.</p>
          </StepCard>
         <StepCard number="4" title="Ρύθμισε την έκπτωση">
  <p>Στην οθόνη <strong>Έκπτωση</strong>:</p>

  <ul className="list-disc list-inside mt-2 space-y-2">
 <li>
  Επίλεξε το <strong>Είδος έκπτωσης</strong>:
  <div className="ml-6 mt-2 flex flex-col gap-2 items-start">
    <span className="rounded bg-gray-100 px-2 py-1 text-sm">
      Γενική Έκπτωση
    </span>
    <span className="rounded bg-gray-100 px-2 py-1 text-sm">
      Ίδια Κατανάλωση
    </span>
    <span className="rounded bg-gray-100 px-2 py-1 text-sm">
      Άλλες Εκπτώσεις
    </span>
  </div>
</li>

    <li>
      Κύλησε τη μπάρα <strong>Έκπτωση %</strong> από <strong>0%</strong> έως <strong>100%</strong>.
    </li>
  </ul>
</StepCard>
          <StepCard number="5" title="Επιβεβαίωση">
            <p>Πάτα <strong>✓</strong> για να εφαρμόσεις την έκπτωση. Η νέα τιμή εμφανίζεται αμέσως.</p>
          </StepCard>
          <InfoBox icon="💡" variant="info">
            Η τιμή δίπλα στο ποσοστό δείχνει τη νέα τιμή μετά την έκπτωση. Βεβαιώσου ότι είναι σωστή πριν επιβεβαιώσεις.
          </InfoBox>
        </>
      )}

      {active === "own" && (
        <>
          <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/77e2ef6c1_15.JPG"]} caption="Ιδιοκατανάλωση" />
          <SectionTitle>Ιδιοκατανάλωση</SectionTitle>
          <InfoBox icon="🎁" title="Τι είναι η Ιδιοκατανάλωση;" variant="info">
            Χρησιμοποιείται όταν θέλεις να κεράσεις το τραπέζι ή να περάσεις κατανάλωση ως εσωτερική χρήση. Εφαρμόζει 100% έκπτωση (ή συγκεκριμένο ποσοστό ανάλογα με τη ρύθμιση).
          </InfoBox>
          <StepCard number="1" title="Άνοιξε έκπτωση">
            <p>Ακολούθησε τα ίδια βήματα με τη Γενική Έκπτωση (εικονίδιο Σ% + κωδικός διαχειριστή).</p>
          </StepCard>
          <StepCard number="2" title="Επίλεξε «Ιδιο Κατανάλωση»">
            <p>Στο πεδίο <strong>«Είδος έκπτωσης»</strong> επίλεξε <strong>«Ιδιο Κατανάλωση»</strong>. Το ποσοστό θα συμπληρωθεί αυτόματα (π.χ. 70%).</p>
          </StepCard>
          <StepCard number="3" title="Επίλεξε προϊόντα και επιβεβαίωσε">
            <p>Επίλεξε τα προϊόντα και πάτα <strong>✓</strong>.</p>
          </StepCard>
        </>
      )}

      {active === "cancel" && (
        <>
          <SectionTitle>Άλλες Εκπτώσεις</SectionTitle>
          <InfoBox icon="🏷️" title="Τι είναι οι Άλλες Εκπτώσεις;" variant="info">
            Είναι κατηγορίες εκπτώσεων που έχεις φτιάξει εσύ στο διαχειριστικό, για ειδικές περιπτώσεις (π.χ. εργαζόμενοι, τακτικοί πελάτες, προσωπικές εκπτώσεις).
          </InfoBox>
          <StepCard number="1" title="Άνοιξε έκπτωση">
            <p>Μπες στο εικονίδιο έκπτωσης και δώσε κωδικό διαχειριστή.</p>
          </StepCard>
          <StepCard number="2" title="Επίλεξε «Άλλες Εκπτώσεις»">
            <p>Από το μενού <strong>«Είδος έκπτωσης»</strong> επίλεξε <strong>«Άλλες Εκπτώσεις»</strong> και βρες την κατηγορία που έχεις δημιουργήσει.</p>
          </StepCard>
          <StepCard number="3" title="Επίλεξε προϊόντα και επιβεβαίωσε">
            <p>Επίλεξε τα προϊόντα που θέλεις να εκπτώσεις, ρύθμισε το ποσοστό αν χρειάζεται και πάτα <strong>✓</strong>.</p>
          </StepCard>
          <InfoBox icon="💡" variant="info">
            Οι κατηγορίες δημιουργούνται από το διαχειριστικό. Αν δεν βλέπεις αυτή που χρειάζεσαι, ζήτα από τον διαχειριστή να τη φτιάξει.
          </InfoBox>
        </>
      )}
    </TutorialLayout>
  );
}