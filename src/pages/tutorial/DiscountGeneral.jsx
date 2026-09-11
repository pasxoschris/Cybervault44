import React, { useEffect } from "react";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";
import { ScreenshotGallery } from "@/components/tutorial/ScreenshotGallery";

export default function DiscountGeneral() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Γενική Έκπτωση" subtitle="Πώς να εφαρμόσεις μια γενική έκπτωση σε παραγγελία">
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
              <span className="rounded bg-gray-100 px-2 py-1 text-sm">Γενική Έκπτωση</span>
              <span className="rounded bg-gray-100 px-2 py-1 text-sm">Ίδια Κατανάλωση</span>
              <span className="rounded bg-gray-100 px-2 py-1 text-sm">Άλλες Εκπτώσεις</span>
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
    </TutorialLayout>
  );
}