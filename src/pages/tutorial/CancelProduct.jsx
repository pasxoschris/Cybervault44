import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function CancelProduct() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ακύρωση Προϊόντος" subtitle="Ακύρωση προϊόντος πριν ή μετά την έκδοση δελτίου / απόδειξης">
      <InfoBox icon="🆚" title="Δύο περιπτώσεις" variant="purple">
        <p><strong>1η περίπτωση:</strong> Δεν έχεις εκδώσει δελτίο παραγγελίας και το προϊόν δεν έχει πληρωθεί → <strong>Διαγραφή</strong> με slide προς τα αριστερά.</p>
        <p className="mt-1"><strong>2η περίπτωση:</strong> Έχεις εκδώσει δελτίο παραγγελίας ή/και απόδειξη → <strong>κρατάς πατημένο</strong> το προϊόν και επιλέγεις <strong>«Ακύρωση Προϊόντος»</strong>.</p>
      </InfoBox>

      <SectionTitle>1η περίπτωση — Δεν έχει εκδοθεί δελτίο παραγγελίας / δεν έχει πληρωθεί</SectionTitle>
      <StepCard number="1" title="Άνοιξε τα Στοιχεία Παραγγελίας">
        <p>Πάτα πάνω στην παραγγελία για να ανοίξει η οθόνη <strong>Στοιχεία Παραγγελίας</strong>. Σε αυτή την περίπτωση το προϊόν εμφανίζεται στα <strong>«ΜΗ ΕΚΤΥΠΩΜΕΝΑ ΠΡΟΪΟΝΤΑ»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Slide προς τα αριστερά">
        <p>Σύρε το προϊόν <strong>προς τα αριστερά (slide)</strong> — δεν πατάς το προϊόν. Εμφανίζεται η επιλογή <strong>«Διαγραφή»</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Πάτα «Διαγραφή»">
        <p>Το προϊόν αφαιρείται από την παραγγελία. Δεν εκδίδεται ακυρωτικό δελτίο, αφού δεν έχει σταλεί τίποτα στην κουζίνα/μπαρ.</p>
      </StepCard>
      <InfoBox icon="💡" variant="info">
        Χρήσιμο όταν ο πελάτης αλλάξει γνώμη την ώρα που δίνει την παραγγελία, πριν εκδοθεί δελτίο παραγγελίας.
      </InfoBox>

      <SectionTitle>2η περίπτωση — Έχει εκδοθεί δελτίο παραγγελίας ή/και απόδειξη</SectionTitle>
      <StepCard number="1" title="Άνοιξε τα Στοιχεία Παραγγελίας">
        <p>Στην οθόνη <strong>Στοιχεία Παραγγελίας</strong> βλέπεις τα εκτυπωμένα προϊόντα της παραγγελίας.</p>
      </StepCard>
      <StepCard number="2" title="Κράτα πατημένο το προϊόν">
        <p><strong>Κράτα πατημένο</strong> το προϊόν που θέλεις να ακυρώσεις — δεν πατάς απλά πάνω του.</p>
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
      <InfoBox icon="⚠️" variant="warning">
        Η ακύρωση προϊόντος στέλνει ακυρωτικό δελτίο στην κουζίνα/μπαρ. Βεβαιώσου ότι το προϊόν δεν έχει ήδη ετοιμαστεί.
      </InfoBox>

    </TutorialLayout>
  );
}