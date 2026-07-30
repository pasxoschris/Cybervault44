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
        <p>Στη γραμμή εργαλείων (icons πάνω δεξιά), βρες και πάτα το εικονίδιο <strong>«Προσθήκη ομοίων»</strong>.</p>
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