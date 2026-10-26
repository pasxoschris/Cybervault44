import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import CancelActionButton from "../../components/tutorial/CancelActionIcon";

export default function CancelReceipt() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ακύρωση Απόδειξης" subtitle="Πώς να ακυρώσεις απόδειξη ώστε να μην αποδοθεί διπλό ΦΠΑ">
      <InfoBox icon="🧾" title="Ακύρωση Απόδειξης" variant="purple">
        <p><strong>Ακύρωση Απόδειξης</strong> (αυτό το μάθημα): η παραγγελία <strong>έχει ήδη πληρωθεί</strong> και έχει εκδοθεί <strong>απόδειξη</strong>. Χρειάζεται πρώτα επαναφορά. Βλέπε μάθημα: <Link to="/tutorial/shift" className="font-semibold text-purple-700 underline underline-offset-2 hover:text-purple-900">Παραγγελίες Βάρδιας</Link>.</p>
      </InfoBox>

      <SectionTitle>Ακύρωση Απόδειξης</SectionTitle>
      <StepCard number="1" title="Βρες την παραγγελία στις Παραγγελίες Βάρδιας">
        <p>Η παραγγελία <strong>έχει ήδη πληρωθεί</strong> και έχει εκδοθεί <strong>απόδειξη</strong>. Πήγαινε στις <strong>«Παραγγελίες Βάρδιας»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Επαναφορά παραγγελίας">
        <p>Σύρε την παραγγελία <strong>προς τα αριστερά (slide)</strong> — δεν πατάς την παραγγελία — και πάτα <strong>«Επαναφορά παραγγελίας»</strong> για να την ξανανοίξεις.</p>
      </StepCard>
      <StepCard number="3" title="Επίλεξε Επεξεργασία">
        <p>Πάτα το εικονίδιο <strong>✏️ (Επεξεργασία Παραγγελίας)</strong> και στη συνέχεια επίλεξε <strong>όλα τα προϊόντα</strong>.</p>
        <InfoBox icon="⚠️" title="Προσοχή — προϊόν με μηδενική τιμή" variant="warning">
          <p>Αν υπάρχει <strong>προϊόν με μηδενική τιμή</strong>, πρέπει να <strong>μην είναι επιλεγμένο</strong>, καθώς δεν μπορεί να εκδοθεί <strong>Πιστωτικό Στοιχείο Λιανικής</strong> για αυτό το προϊόν.</p>
        </InfoBox>
      </StepCard>
      <StepCard number="4" title="Έκδοση Πιστωτικού Στοιχείου Λιανικής">
        <CancelActionButton />
        <p className="mt-2">Πάτα αυτό το κουμπί στο κάτω μέρος της οθόνης (<strong>«Έκδοση Ακυρωτικού Δελτίου»</strong>). Εμφανίζεται το μήνυμα:</p>
        <p className="mt-2 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-gray-800">
          <strong>Έκδοση Πιστωτικού Στοιχείου Λιανικής Πώλησης για τα επιλεγμένα προϊόντα;</strong><br />
          Ποσό: … €
        </p>
        <p className="mt-2">Πάτα <strong>ΟΚ</strong>. Η απόδειξη ακυρώνεται με έκδοση <strong>Πιστωτικού Στοιχείου Λιανικής</strong>.</p>
      </StepCard>
      <InfoBox icon="🧾" title="Πότε χρειάζεται" variant="info">
        <p>Η ακύρωση απόδειξης χρειάζεται όταν έχεις εκδώσει <strong>απόδειξη</strong> και θέλεις να εκδώσεις <strong>τιμολόγιο</strong> για την ίδια παραγγελία — ώστε να μην αποδοθεί διπλό ΦΠΑ.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Παραγγελίες Βάρδιας" variant="info">
        Η ακύρωση κλειστής παραγγελίας ή απόδειξης γίνεται <strong>μόνο</strong> από τις <strong>Παραγγελίες Βάρδιας</strong>. Αν δεν τις βλέπεις στο μενού (☰), επικοινώνησε με τη <strong>Spotlight</strong> για να τις ενεργοποιήσει για το κατάστημα.
      </InfoBox>

    </TutorialLayout>
  );
}