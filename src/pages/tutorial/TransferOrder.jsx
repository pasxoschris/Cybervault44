import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function TransferOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Μεταφορά Παραγγελίας" subtitle="Μεταφορά παραγγελίας από σερβιτόρο σε σερβιτόρο">
      <SectionTitle>Μεταφορά Παραγγελίας (από σερβιτόρο σε σερβιτόρο)</SectionTitle>

      <InfoBox icon="⚙️" title="Προαπαιτούμενο" variant="purple">
        <p>Ο διαχειριστής του καταστήματος πρέπει πρώτα να επιτρέψει τη μεταφορά παραγγελιών στον χρήστη, από το <strong>Διαχειριστικό</strong>.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li>Μπες στο <strong>Διαχειριστικό (Secure)</strong>.</li>
          <li>Πήγαινε στα <strong>«Δικαιώματα Διαχειριστικού Κωδικού»</strong>.</li>
          <li>Βρες τη γραμμή <strong>«Μεταφορά Παραγγελιών»</strong> και άνοιξε το διακόπτη (γίνεται <strong>πράσινο / ON</strong>).</li>
        </ul>
      </InfoBox>

      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/8e9ad91bc_Screenshot2026-07-15131416.png" alt="Δικαιώματα Διαχειριστικού Κωδικού — Μεταφορά Παραγγελιών" className="w-52 h-auto rounded-lg border border-gray-200" />
      </div>

      <StepCard number="1" title="Κράτα πατημένη την παραγγελία">
        <p>Από τη λίστα παραγγελιών, <strong>κράτα πατημένη</strong> την παραγγελία που θέλεις να μεταφέρεις. Εμφανίζεται μενού ενεργειών.</p>
      </StepCard>

      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/4c4fc9fbf_.png" alt="Μενού ενεργειών με παρατεταμένο πάτημα" className="w-52 h-auto rounded-lg border border-gray-200" />
      </div>

      <StepCard number="2" title="Επίλεξε «Μεταφορά παραγγελίας»">
        <p>Από το μενού που εμφανίζεται, πάτα <strong>«Μεταφορά παραγγελίας»</strong>.</p>
      </StepCard>

      <InfoBox icon="☰" title="Εναλλακτικός τρόπος" variant="info">
        <p>Η μεταφορά γίνεται επίσης και από το <strong>μενού</strong> που ανοίγει πατώντας τις <strong>τρεις γραμμές πάνω αριστερά</strong>. Εμφανίζεται λίστα με επιλογές — πάτα <strong>«Μεταφορά παραγγελιών»</strong>.</p>
      </InfoBox>

      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/b196f278d_.png" alt="Μενού από τις τρεις γραμμές — Μεταφορά παραγγελιών" className="w-52 h-auto rounded-lg border border-gray-200" />
      </div>

      <StepCard number="3" title="Εισήγαγε κωδικό διαχειριστή">
        <p>Το σύστημα ζητάει <strong>κωδικό διαχειριστή</strong> για επιβεβαίωση. Εισήγαγε τον κωδικό και πάτα επιβεβαίωση.</p>
      </StepCard>

      <StepCard number="4" title="Επίλεξε χρήστη παραλήπτη">
        <p>Εμφανίζεται η οθόνη <strong>«Επιλογή χρήστη»</strong> με τους διαθέσιμους χρήστες. <strong>Βλέπεις μόνο τους χρήστες που έχουν ανοίξει βάρδια.</strong> Επίλεξε σε ποιον θα μεταφερθεί η παραγγελία.</p>
      </StepCard>

      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/6efd7f239_-.png" alt="Οθόνη επιλογής χρήστη" className="w-52 h-auto rounded-lg border border-gray-200" />
      </div>

      <StepCard number="5" title="Επιβεβαίωση μεταφοράς">
        <p>Εμφανίζεται παράθυρο επιβεβαίωσης: <strong>«1 παραγγελία θα μεταφερθεί στον χρήστη: [όνομα]. Επιβεβαίωση;»</strong>. Πάτα <strong>«OK»</strong> για ολοκλήρωση ή <strong>«Ακύρωση»</strong> για ακύρωση.</p>
      </StepCard>

      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/1e9cf1dd3_3.png" alt="Παράθυρο επιβεβαίωσης μεταφοράς" className="w-52 h-auto rounded-lg border border-gray-200" />
      </div>

      <InfoBox icon="⚠️" title="Σημαντικό!" variant="warning">
        <ul className="list-disc pl-5 mt-1 space-y-1.5">
          <li>Χρειάζεται <strong>κωδικό διαχειριστή</strong> για να ξεκινήσει η μεταφορά.</li>
          <li>Ο χρήστης-παραλήπτης πρέπει να έχει <strong>ανοιχτή βάρδια</strong> — αλλιώς δεν εμφανίζεται στη λίστα.</li>
          <li>Η μεταφορά <strong>δεν</strong> αλλάζει τα είδη της παραγγελίας — μόνο ποιος σερβιτόρος τη διαχειρίζεται.</li>
          <li>Δεν μπορείς να μεταφέρεις παραγγελία που έχει ήδη κλείσει.</li>
        </ul>
      </InfoBox>
    </TutorialLayout>
  );
}