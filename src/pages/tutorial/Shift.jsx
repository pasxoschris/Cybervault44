import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

export default function Shift() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Παραγγελίες Βάρδιας" subtitle="Προβολή και διαχείριση των παραγγελιών βάρδιας">

      <InfoBox icon="⚙️" title="Απαιτείται ενεργοποίηση" variant="warning">
        Για να εμφανίζεται η λειτουργία <strong>Παραγγελίες Βάρδιας</strong>, πρέπει να είναι ενεργοποιημένη στις ρυθμίσεις του διαχειριστικού: <em>Διαχειριστής → Κατάστημα → Άλλες Υπηρεσίες → Παραγγελίες Βάρδιας: ON</em>
      </InfoBox>

      <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/ecc8a9261_20.JPG"]} caption="Παραγγελίες βάρδιας — ρύθμιση ενεργοποίησης" />
      <SectionTitle>Προβολή Παραγγελιών Βάρδιας</SectionTitle>
      <StepCard number="1" title="Άνοιξε την οθόνη Βάρδιας">
        <p>Από το μενού της εφαρμογής, επίλεξε <strong>«Παραγγελίες Βάρδιας»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Βλέπεις τις παραγγελίες">
        <p>Εμφανίζεται λίστα με όλες τις παραγγελίες της βάρδιας. Για κάθε παραγγελία βλέπεις:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Τραπέζι &amp; αριθμός</li>
          <li>Ώρα παραγγελίας</li>
          <li>Αριθμός ατόμων &amp; προϊόντων</li>
          <li>Κατάσταση (ολοκληρωμένη ✓ / ανοικτή)</li>
        </ul>
      </StepCard>
      <StepCard number="3" title="Φιλτράρισμα">
        <p>Χρησιμοποίησε το εικονίδιο <strong>φίλτρου (▽)</strong> για να βλέπεις μόνο συγκεκριμένες παραγγελίες.</p>
      </StepCard>
      <StepCard number="4" title="Επαναφορά παραγγελίας">
        <p>Σύρε την ολοκληρωμένη παραγγελία <strong>προς τα αριστερά (slide)</strong> — δεν πατάς την παραγγελία. Εμφανίζεται το κουμπί <strong>«Επαναφορά»</strong>.</p>
      </StepCard>
      <StepCard number="5" title="Επανεκτύπωση Απόδειξης">
        <p>Με τον ίδιο τρόπο (slide προς τα αριστερά) εμφανίζεται το <strong>«Επανεκτύπωση Απόδειξης»</strong> για να ξαναεκτυπώσεις.</p>
      </StepCard>
    </TutorialLayout>
  );
}