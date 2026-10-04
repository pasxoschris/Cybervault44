import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import CancelActionButton from "../../components/tutorial/CancelActionIcon";

export default function CancelProduct() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ακύρωση Προϊόντος" subtitle="Ακύρωση μεμονωμένου ή πολλαπλών προϊόντων από παραγγελία">
      <SectionTitle>Επεξεργασία Παραγγελίας</SectionTitle>
      <StepCard number="1" title="Άνοιξε την Επεξεργασία Παραγγελίας">
        <p>Πάτα πάνω στην παραγγελία και μετά το εικονίδιο επεξεργασίας (✏️) για να μπεις στη λίστα προϊόντων.</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε ένα ή περισσότερα προϊόντα">
        <p>Τσέκαρε τα προϊόντα που θέλεις να ακυρώσεις. Στην κορυφή εμφανίζεται το σύνολο και ο αριθμός τους (π.χ. <strong>«5,00 € (1 προϊόν)»</strong>).</p>
      </StepCard>
      <StepCard number="3" title="Πάτα το εικονίδιο ακύρωσης">
        <CancelActionButton />
        <p className="mt-2">Στο κάτω μέρος της οθόνης πάτα αυτό το εικονίδιο. Εκδίδεται <strong>Ακυρωτικό Δελτίο</strong> για τα επιλεγμένα προϊόντα.</p>
      </StepCard>
      <InfoBox icon="🧾" variant="info">
        Με την επιλογή προϊόντων στην Επεξεργασία Παραγγελίας ακυρώνεις τα προϊόντα από την <strong>απόδειξη</strong> ή το <strong>δελτίο παραγγελίας</strong>.
      </InfoBox>
      <InfoBox icon="⚠️" variant="warning">
        Η ακύρωση προϊόντος στέλνει ακυρωτικό δελτίο στην κουζίνα/μπαρ. Βεβαιώσου ότι το προϊόν δεν έχει ήδη ετοιμαστεί.
      </InfoBox>

      <SectionTitle>Πάτημα σε συγκεκριμένο προϊόν</SectionTitle>
      <StepCard number="1" title="Άνοιξε τα Στοιχεία Παραγγελίας">
        <p>Στην οθόνη <strong>Στοιχεία Παραγγελίας</strong> βλέπεις τα εκτυπωμένα προϊόντα της παραγγελίας.</p>
      </StepCard>
      <StepCard number="2" title="Πάτα πάνω στο προϊόν">
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
      <InfoBox icon="📄" variant="purple">
        Για το ακυρωμένο προϊόν εκδίδεται <strong>πιστωτικό στοιχείο λιανικής</strong>.
      </InfoBox>
    </TutorialLayout>
  );
}