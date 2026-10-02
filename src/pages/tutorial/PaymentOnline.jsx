import React, { useEffect } from "react";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function PaymentOnline() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ηλεκτρονική Πληρωμή" subtitle="Ενεργοποίηση και ολοκλήρωση ηλεκτρονικής πληρωμής">
      <SectionTitle>Ηλεκτρονική Πληρωμή</SectionTitle>
      <InfoBox icon="⚙️" title="Προαπαιτούμενο" variant="purple">
        <p>Η <strong>Ηλεκτρονική Πληρωμή</strong> πρέπει πρώτα να ενεργοποιηθεί στις <strong>Ρυθμίσεις του χρήστη</strong>.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li>Πήγαινε στις <strong>Ρυθμίσεις</strong>.</li>
          <li>Βρες τη γραμμή <strong>«Ηλεκτρονική Πληρωμή»</strong>.</li>
          <li>Άνοιξε το διακόπτη (γίνεται <strong>πράσινο</strong>).</li>
        </ul>
      </InfoBox>
      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/b098d52d1_anyviewer_screenshot_20260714104819.png" alt="Ενεργοποίηση Ηλεκτρονικής Πληρωμής στις Ρυθμίσεις" className="w-44 h-auto rounded-lg border border-gray-200" />
      </div>
      <StepCard number="1" title="Επίλεξε «Ηλεκτρονική Πληρωμή»">
        <p>Στο μενού πληρωμής, πάτα <strong>«Ηλεκτρονική Πληρωμή»</strong>.</p>
      </StepCard>
      <StepCard number="2" title="Εμφάνιση παραθύρου «Επιλέξτε ενέργεια»">
        <p>Εμφανίζεται παράθυρο με τρεις επιλογές:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li><strong>Κλείσιμο</strong> — κλείνει την παραγγελία χωρίς εκτύπωση.</li>
          <li><strong>Εκτύπωση Απόδειξης και Κλείσιμο</strong> — εκτυπώνει απόδειξη και κλείνει.</li>
          <li><strong>Ακύρωση</strong> — ακυρώνει την ενέργεια.</li>
        </ul>
      </StepCard>
      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/40daaac78_.png" alt="Παράθυρο Επιλέξτε ενέργεια" className="w-40 h-auto rounded-lg border border-gray-200" />
      </div>
      <StepCard number="3" title="Επίλεξε ενέργεια">
        <p>Πάτα <strong>«Εκτύπωση Απόδειξης και Κλείσιμο»</strong> για να εκτυπωθεί η απόδειξη και να κλείσει η παραγγελία.</p>
      </StepCard>
    </TutorialLayout>
  );
}