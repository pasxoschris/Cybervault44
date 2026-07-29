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

      <StepCard number="6" title="Το PDA του παραλήπτη πρέπει να είναι ενεργό" variant="warning">
        <p>
          <strong>Είναι απολύτως απαραίτητο και σημαντικό</strong> το PDA του σερβιτόρου που <strong>δέχεται</strong> τη μεταφορά να έχει την εφαρμογή <strong>ανοιχτή και active</strong> (στο προσκήνιο) εκείνη τη στιγμή. Αν η εφαρμογή του παραλήπτη είναι κλειστή, σε παρασκήνιο ή οθόνη στάσης, η μεταφορά <strong>δεν ολοκληρώνεται σωστά</strong>.
        </p>
      </StepCard>

      <InfoBox icon="🚫" title="Χαμένες Μεταφορές — Διαχειριστικό" variant="warning">
        <p>
          Όταν μια μεταφορά <strong>δεν ολοκληρώνεται σωστά</strong> (π.χ. ο παραλήπτης δεν είχε ανοιχτή/active την εφαρμογή), καταγράφεται στο <strong>Διαχειριστικό</strong> ως <strong>«χαμένη μεταφορά»</strong> και φαίνεται με <strong>κόκκινο χρώμα</strong>. Στο χρονολόγιο μεταφορών, οι χαμένες εμφανίζονται με <strong>κόκκινο</strong> δείκτη (όνομα σερβιτόρου με λουκέτο και βέλος από→προς σε κόκκινο), ενώ στο παράθυρο «Μετακινήσεις Παραγγελίας» η γραμμή φέρει <strong>κόκκινο Χ</strong> δεξιά.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/addf40367_Screenshot2026-07-29104534.png" alt="Μετακινήσεις Παραγγελίας — χαμένη μεταφορά με κόκκινο Χ" className="w-full h-auto rounded-lg border border-gray-200" />
          <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/64923452b_Screenshot2026-07-29104754.png" alt="Χρονολόγιο — χαμένες μεταφορές με κόκκινο δείκτη" className="w-full h-auto rounded-lg border border-gray-200" />
        </div>
      </InfoBox>

      <InfoBox icon="🔁" title="Τι κάνω σε περίπτωση χαμένης μεταφοράς" variant="warning">
        <p>Αν μια μεταφορά καταγραφεί ως χαμένη, ακολούθησε τα εξής βήματα:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li>Οι παραγγελίες που δεν έφτασαν στον παραλήπτη πρέπει να <strong>ξαναδημιουργηθούν</strong> χειροκίνητα από τον σερβιτόρο που τις διαχειρίζεται πλέον.</li>
          <li>Ενημέρωσε την <strong>Spotlight</strong> ώστε να <strong>ακυρώσει τις χαμένες μεταφορές</strong> από το σύστημα και να καθαρίσει το χρονολόγιο.</li>
          
        </ul>
      </InfoBox>

      <InfoBox icon="⚠️" title="Σημαντικό!" variant="warning">
        <ul className="list-disc pl-5 mt-1 space-y-1.5">
          <li>Χρειάζεται <strong>κωδικό διαχειριστή</strong> για να ξεκινήσει η μεταφορά.</li>
          <li>Ο χρήστης-παραλήπτης πρέπει να έχει <strong>ανοιχτή βάρδια</strong> — αλλιώς δεν εμφανίζεται στη λίστα.</li>
          <li>Η μεταφορά <strong>δεν</strong> αλλάζει τα είδη της παραγγελίας — μόνο ποιος σερβιτόρος τη διαχειρίζεται.</li>
          <li>Δεν μπορείς να μεταφέρεις παραγγελία που έχει ήδη κλείσει.</li>
        </ul>
      </InfoBox>
    </TutorialLayout>);

}