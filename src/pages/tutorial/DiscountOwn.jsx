import React, { useEffect } from "react";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";
import { ScreenshotGallery } from "@/components/tutorial/ScreenshotGallery";

export default function DiscountOwn() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ιδιοκατανάλωση" subtitle="Κατανάλωση αγαθών από το προσωπικό του καταστήματος">
      <ScreenshotGallery
        images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/77e2ef6c1_15.JPG"]}
        caption="Ιδιοκατανάλωση"
      />
      <SectionTitle>Ιδιοκατανάλωση</SectionTitle>
      <InfoBox icon="🎁" title="Τι είναι η Ιδιοκατανάλωση;" variant="info">
        Χρησιμοποιείται για την κατανάλωση από το προσωπικό του καταστήματος.
        Η αξία του γεύματος δεν υπολογίζεται με βάση τον τιμοκατάλογο του καταστήματος (τιμές λιανικής).
        Καθώς έχει ήδη εκπέσει τον ΦΠΑ των πρώτων υλών κατά την αγορά,
        ως αξία ορίζεται το κόστος αγοράς των πρώτων υλών που χρησιμοποιήθηκαν για την παρασκευή των φαγητών ή των ποτών που καταναλώθηκαν.
        Δεν εκδίδεται Στοιχείο Λιανικής Πώλησης (απόδειξη), αλλά <strong>Στοιχείο Αυτοπαράδοσης</strong>.
      </InfoBox>
      <StepCard number="1" title="Άνοιξε έκπτωση">
        <p>Ακολούθησε τα ίδια βήματα με τη Γενική Έκπτωση (<strong>τρεις τελείες (···) → Έκπτωση</strong> → κωδικός διαχειριστή).</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε «Ιδιο Κατανάλωση»">
        <p>Στο πεδίο <strong>«Είδος έκπτωσης»</strong> επίλεξε <strong>«Ιδιο Κατανάλωση»</strong>. Το ποσοστό θα συμπληρωθεί αυτόματα.</p>
      </StepCard>
      <StepCard number="3" title="Επίλεξε προϊόντα και επιβεβαίωσε">
        <p>Επίλεξε τα προϊόντα και πάτα <strong>✓</strong>.</p>
      </StepCard>
    </TutorialLayout>
  );
}