import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function MergeOrders() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Συγχώνευση Παραγγελιών" subtitle="Συνένωση δύο παραγγελιών σε μία">
      <SectionTitle>Συγχώνευση Παραγγελιών</SectionTitle>

      <InfoBox icon="☰" title="Πώς να ανοίξεις τη Συγχώνευση" variant="info">
        <p>Η συγχώνευση γίνεται από το <strong>μενού</strong> που ανοίγει πατώντας τις <strong>τρεις γραμμές πάνω αριστερά</strong>. Εμφανίζεται λίστα με επιλογές — πάτα <strong>«Συγχώνευση παραγγελιών»</strong>.</p>
      </InfoBox>

      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/16d53fc19_.png" alt="Μενού από τις τρεις γραμμές — Συγχώνευση παραγγελιών" className="w-52 h-auto rounded-lg border border-gray-200" />
      </div>

      <StepCard number="1" title="Εισήγαγε κωδικό διαχειριστή">
        <p>Το σύστημα ζητάει <strong>κωδικό διαχειριστή</strong> για επιβεβαίωση. Εισήγαγε τον κωδικό και πάτα επιβεβαίωση.</p>
      </StepCard>

      <StepCard number="2" title="Άνοιξε την πρώτη παραγγελία">
        <p>Βρες την παραγγελία που θέλεις να απορροφήσει την άλλη και πάτα πάνω της.</p>
      </StepCard>

      <StepCard number="3" title="Επίλεξε τη δεύτερη παραγγελία">
        <p>Εμφανίζεται λίστα με τις υπόλοιπες ανοιχτές παραγγελίες. Επίλεξε ποια παραγγελία θα ενωθεί με την τρέχουσα πατώντας τον <strong>κύκλο επιλογής</strong> αριστερά.</p>
      </StepCard>

      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/e43e6c563_.png" alt="Λίστα παραγγελιών για συγχώνευση" className="w-56 h-auto rounded-lg border border-gray-200" />
      </div>

      <StepCard number="4" title="Έλεγξε το άθροισμα και πάτα το τικ">
        <p>Κάτω αριστερά εμφανίζεται το <strong>άθροισμα του ποσού</strong> των παραγγελιών. Κάτω δεξιά πάτα το <strong>εικονίδιο τικ</strong> (λευκός κύκλος) για να επιβεβαιώσεις.</p>
      </StepCard>

      <StepCard number="5" title="Μήνυμα επιβεβαίωσης">
        <p>Εμφανίζεται μήνυμα: <strong>«1 παραγγελία θα συγχωνευτεί με την παραγγελία του τραπεζιού: A2 — Επιβεβαίωση;»</strong>. Πάτα <strong>«OK»</strong> για να ολοκληρωθεί η συγχώνευση ή <strong>«Ακύρωση»</strong> για να ματαιώσεις.</p>
      </StepCard>

      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/88e60433d_anyviewer_screenshot_20260715135221.png" alt="Μήνυμα επιβεβαίωσης συγχώνευσης" className="w-56 h-auto rounded-lg border border-gray-200" />
      </div>

      <InfoBox icon="⚠️" title="Σημαντικό!" variant="warning">
        <ul className="list-disc pl-5 mt-1 space-y-1.5">
          <li>Οι δύο παραγγελίες πρέπει να ανήκουν στον <strong>ίδιο σερβιτόρο</strong> για να συγχωνευτούν.</li>
          <li>Όλα τα είδη μεταφέρονται — δεν μπορείς να επιλέξεις μεμονωμένα είδη.</li>
          <li>Η συγχώνευση <strong>δεν αναιρείται</strong>. Αν κάνεις λάθος, θα χρειαστεί επεξεργασία παραγγελίας για να το διορθώσεις.</li>
          <li>Δεν μπορείς να συγχωνεύσεις παραγγελία που έχει ήδη πληρωθεί.</li>
        </ul>
      </InfoBox>
    </TutorialLayout>
  );
}