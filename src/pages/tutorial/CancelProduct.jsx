import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import CancelActionButton from "../../components/tutorial/CancelActionIcon";

const CREDIT_ICON_SRC = "https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/4b3fc7876_image.png";

export default function CancelProduct() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ακύρωση Προϊόντος" subtitle="Ακύρωση προϊόντος πριν ή μετά την έκδοση δελτίου / απόδειξης">
      <InfoBox icon="🆚" title="Τρεις περιπτώσεις" variant="purple">
        <p><strong>1η περίπτωση:</strong> Δεν έχεις εκδώσει δελτίο παραγγελίας και το προϊόν δεν έχει πληρωθεί → <strong>Διαγραφή</strong> με slide προς τα αριστερά.</p>
        <p className="mt-1"><strong>2η περίπτωση:</strong> Έχεις εκδώσει δελτίο παραγγελίας ή/και απόδειξη → <strong>κρατάς πατημένο</strong> το προϊόν και επιλέγεις <strong>«Ακύρωση Προϊόντος»</strong>.</p>
        <p className="mt-1"><strong>3η περίπτωση:</strong> Έχεις εκδώσει απόδειξη και ο πελάτης ζητάει τιμολόγιο → ακύρωση των αποδείξεων με έκδοση <strong>Πιστωτικού Στοιχείου Λιανικής</strong> από την Επεξεργασία Παραγγελίας.</p>
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

      <SectionTitle>3η περίπτωση — Έχεις εκδώσει απόδειξη και ο πελάτης ζητάει τιμολόγιο</SectionTitle>
      <InfoBox icon="🧾" variant="purple">
        Όταν έχει εκδοθεί απόδειξη και τελικά ο πελάτης ζητήσει τιμολόγιο, πρέπει να ακυρωθούν οι αποδείξεις. Για την ακρίβεια εκδίδεται <strong>Πιστωτικό Στοιχείο Λιανικής</strong>.
      </InfoBox>
      <StepCard number="1" title="Άνοιξε την Επεξεργασία Παραγγελίας">
        <p>Από την οθόνη <strong>Στοιχεία Παραγγελίας</strong> πάτα στο μολύβι <strong>✏️</strong> και εμφανίζεται η οθόνη <strong>Επεξεργασία Παραγγελίας</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε όλα τα προϊόντα">
        <p>Τσέκαρε <strong>όλα τα προϊόντα</strong> της παραγγελίας.</p>
      </StepCard>
      <StepCard number="3" title="Πάτα το εικονίδιο στο κάτω μέρος">
        <CancelActionButton size={56} src={CREDIT_ICON_SRC} label="" />
        <p className="mt-2">Πάτα στο κάτω μέρος αυτό το εικονίδιο.</p>
      </StepCard>
      <StepCard number="4" title="Επιβεβαίωση με ΟΚ">
        <p>Εμφανίζεται το μήνυμα:</p>
        <p className="mt-2 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-gray-800">
          <strong>Έκδοση Πιστωτικού Στοιχείου Λιανικής Πώλησης για τα επιλεγμένα προϊόντα;</strong><br />
          Ποσό: … €
        </p>
        <p className="mt-2">Πάτα <strong>ΟΚ</strong>.</p>
      </StepCard>
    </TutorialLayout>
  );
}