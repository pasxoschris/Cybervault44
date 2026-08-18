import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function CancelReceipt() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ακύρωση Απόδειξης" subtitle="Πώς να ακυρώσεις απόδειξη ώστε να μην αποδοθεί διπλό ΑΦΜ">
      <SectionTitle>Ακύρωση Απόδειξης</SectionTitle>
      <StepCard number="1" title="Βρες την παραγγελία στις Παραγγελίες Βάρδιας">
        <p>Η παραγγελία έχει ήδη πληρωθεί και έχει εκδοθεί απόδειξη. Πήγαινε στις <strong>«Παραγγελίες Βάρδιας»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Επαναφορά παραγγελίας">
        <p>Επίλεξε την παραγγελία και πάτα <strong>«Επαναφορά παραγγελίας»</strong> για να την ξανανοίξεις.</p>
      </StepCard>
      <StepCard number="3" title="Επίλεξε Επεξεργασία">
        <p>Πάτα το εικονίδιο <strong>✏️ (Επεξεργασία Παραγγελίας)</strong> και στη συνέχεια επίλεξε <strong>όλα τα προϊόντα</strong>.</p>
      </StepCard>
      <StepCard number="4" title="Έκδοση Ακυρωτικού Δελτίου">
        <p>Πάτα <strong>«Έκδοση Ακυρωτικού Δελτίου»</strong>. Η απόδειξη ακυρώνεται και το τραπέζι ελευθερώνεται.</p>
      </StepCard>
      <InfoBox icon="🧾" title="Πότε χρειάζεται" variant="info">
        <p>Η ακύρωση απόδειξης χρειάζεται όταν έχεις εκδώσει <strong>απόδειξη</strong> και θέλεις να εκδώσεις <strong>τιμολόγιο</strong> για την ίδια παραγγελία — ώστε να μην αποδοθεί διπλό ΑΦΜ.</p>
      </InfoBox>
      <InfoBox icon="⚠️" title="Σημαντικό" variant="warning">
        <p>Η ακύρωση απόδειξης ακυρώνει <strong>ολόκληρη την παραγγελία</strong>. Αν θέλεις τιμολόγιο, μετά την ακύρωση πρέπει να <strong>επαναφέρεις</strong> την παραγγελία και να εκδώσεις τιμολόγιο (βλέπε μάθημα: Έκδοση Τιμολογίου).</p>
      </InfoBox>
    </TutorialLayout>
  );
}