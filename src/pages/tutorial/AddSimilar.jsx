import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

export default function AddSimilar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Προσθήκη Ομοίων" subtitle="Προσθήκη ίδιων προϊόντων γρήγορα">
      <ScreenshotGallery
        images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/bac405ff5_10.JPG"]}
        caption="Προσθήκη ομοίων"
      />
      <SectionTitle>Προσθήκη Ομοίων</SectionTitle>
      <StepCard number="1" title="Άνοιξε την παραγγελία">
        <p>Μπες στα στοιχεία της παραγγελίας.</p>
      </StepCard>
      <StepCard number="2" title="Πάτα το εικονίδιο Προσθήκης">
        <p>Στην <strong>κάτω μπάρα</strong> της οθόνης, πάτα το εικονίδιο <strong>«Προσθήκη ομοίων»</strong> (τρίτο από αριστερά):</p>
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/668f7810a_add-similar-icon.webp" alt="Εικονίδιο Προσθήκη ομοίων" className="mt-3 w-14 h-14 rounded-xl shadow" />
      </StepCard>
      <StepCard number="3" title="Επίλεξε προϊόντα">
        <p>Εμφανίζεται λίστα με τα ήδη παραγγελμένα προϊόντα. Τσεκάρε αυτά που θέλεις να προσθέσεις ξανά και πάτα ✓.</p>
      </StepCard>
      <InfoBox icon="💡" variant="info">
        Χρήσιμο όταν μια παρέα θέλει τα ίδια ποτά/φαγητά ξανά χωρίς να τα ψάχνεις εκ νέου.
      </InfoBox>
    </TutorialLayout>
  );
}