import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function CancelProduct() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ακύρωση Προϊόντος" subtitle="Ακύρωση μεμονωμένου προϊόντος από παραγγελία">
      <SectionTitle>Παραγγελία χωρίς απόδειξη</SectionTitle>
      <StepCard number="1" title="Άνοιξε την παραγγελία">
        <p>Πάτα πάνω στην παραγγελία για να δεις τα στοιχεία της.</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε «Επεξεργασία Παραγγελίας»">
        <p>Πάτα το εικονίδιο επεξεργασίας (✏️) για να μπεις στη λίστα προϊόντων.</p>
      </StepCard>
      <StepCard number="3" title="Επίλεξε το προϊόν">
        <p>Τσεκάρε το προϊόν που θέλεις να ακυρώσεις και επίλεξε <strong>«Έκδοση Ακυρωτικού Δελτίου»</strong>.</p>
      </StepCard>
      <InfoBox icon="⚠️" variant="warning">
        Η ακύρωση προϊόντος στέλνει ακυρωτικό δελτίο στην κουζίνα/μπαρ. Βεβαιώσου ότι το προϊόν δεν έχει ήδη ετοιμαστεί.
      </InfoBox>

      <SectionTitle>Αν έχει εκδοθεί απόδειξη</SectionTitle>
      <StepCard number="1" title="Άνοιξε τα Στοιχεία Παραγγελίας">
        <p>Στην οθόνη <strong>Στοιχεία Παραγγελίας</strong> βλέπεις τα εκτυπωμένα προϊόντα της παραγγελίας.</p>
      </StepCard>
      <StepCard number="2" title="Πάτα πάνω στο συγκεκριμένο προϊόν">
        <p>Πάτα πάνω στο προϊόν που θέλεις να ακυρώσεις — όχι στην Επεξεργασία Παραγγελίας.</p>
      </StepCard>
      <StepCard number="3" title="Επίλεξε «Ακύρωση Προϊόντος»">
        <p>Ανοίγει μενού με τις επιλογές του προϊόντος (Σχόλια, Ακύρωση προϊόντος). Επίλεξε <strong>«Ακύρωση Προϊόντος»</strong>.</p>
      </StepCard>
      <StepCard number="4" title="Κωδικός διαχειριστή">
        <p>Σου ζητείται <strong>κωδικός διαχειριστή</strong> για επιβεβαίωση.</p>
      </StepCard>
      <StepCard number="5" title="Αιτία ακύρωσης">
        <p>Στη συνέχεια δηλώνεις την <strong>αιτία της ακύρωσης</strong>.</p>
      </StepCard>
      <InfoBox icon="🧾" variant="info">
        Για το ακυρωμένο προϊόν εκδίδεται <strong>πιστωτικό στοιχείο λιανικής</strong>.
      </InfoBox>
    </TutorialLayout>
  );
}