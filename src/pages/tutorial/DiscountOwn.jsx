import React, { useEffect } from "react";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";
import { ScreenshotGallery } from "@/components/tutorial/ScreenshotGallery";

export default function DiscountOwn() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ιδιοκατανάλωση" subtitle="Κέρασμα τραπεζιού ή εσωτερική χρήση">
      <ScreenshotGallery
        images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/77e2ef6c1_15.JPG"]}
        caption="Ιδιοκατανάλωση"
      />
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
    </TutorialLayout>
  );
}