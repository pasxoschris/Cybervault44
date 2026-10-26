import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function ShiftClose() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Κλείσιμο Βάρδιας" subtitle="Ολοκλήρωση και κλείσιμο της τρέχουσας βάρδιας">

      <SectionTitle>Κλείσιμο Βάρδιας</SectionTitle>
      <InfoBox icon="⚠️" title="Προσοχή" variant="warning">
        Το κλείσιμο βάρδιας είναι <strong>μη αναστρέψιμη ενέργεια</strong>. Βεβαιώσου ότι όλες οι παραγγελίες έχουν ολοκληρωθεί.
      </InfoBox>
      <StepCard number="1" title="Έλεγξε για ανεξόφλητες παραγγελίες">
        <p>Αν υπάρχουν <strong>ανεξόφλητες</strong> παραγγελίες, δεν μπορείς να κλείσεις τη βάρδια. Πρέπει να τις <Link to="/tutorial/payment" className="underline font-semibold">σημειώσεις ως πληρωμένες</Link>.</p>
        <p className="mt-2">Οι <strong>ανοιχτές</strong> παραγγελίες που έχουν ήδη πληρωθεί κλείνουν αυτόματα με το κλείσιμο της βάρδιας.</p>
      </StepCard>
      <InfoBox icon="⚠️" title="Προσοχή: απλήρωτες παραγγελίες στο τέλος του ωραρίου" variant="warning">
        <p>Με τη λήξη του ωραρίου του καταστήματος κλείνουν αυτόματα <strong>μόνο οι πληρωμένες</strong> παραγγελίες. Αν μείνει έστω και μία <strong>απλήρωτη</strong>, η βάρδια δεν κλείνει και <strong>δεν μπορείς να κάνεις login</strong>.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Πριν τελειώσει το ωράριο, σημείωσε όλες τις παραγγελίες ως πληρωμένες (<Link to="/tutorial/payment" className="underline font-semibold">Πληρωμή</Link>).</li>
          <li>Αν μια παραγγελία δεν μπορεί να σημειωθεί ως πληρωμένη, είναι προτιμότερο να την <strong>ακυρώσεις</strong> (<Link to="/tutorial/cancel-order" className="underline font-semibold">Ακύρωση Παραγγελίας</Link>) και να τη <strong>δημιουργήσεις ξανά</strong>.</li>
          <li>Αν έχει ήδη συμβεί και δεν μπορείς να συνδεθείς, <strong>επικοινώνησε με τη Spotlight</strong>.</li>
        </ul>
      </InfoBox>
      <StepCard number="2" title="Εκτύπωση Αναφοράς Βάρδιας">
        <p>Πάνω δεξιά στην οθόνη υπάρχει το εικονίδιο ενός <strong>εκτυπωτή</strong>. Πατώντας το, σου δίνεται η επιλογή να εκτυπώσεις τα <strong>«Προϊόντα Βάρδιας»</strong> ή την <strong>«Αναφορά Βάρδιας»</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Πάτα «Κλείσιμο Βάρδιας»">
        <p>Από την Ανάλυση Βάρδιας, επίλεξε <strong>«Κλείσιμο Βάρδιας»</strong>.</p>
      </StepCard>
      <StepCard number="4" title="Επιβεβαίωση">
        <p>Επιβεβαίωσε το κλείσιμο. Η βάρδια κλείνει.</p>
      </StepCard>
      <InfoBox icon="💡" variant="info">
        Μετά το Κλείσιμο Βάρδιας, <strong>αποσυνδέεσαι αυτόματα</strong> από την εφαρμογή για να την ελευθερώσεις για άλλο χρήστη.
      </InfoBox>
    </TutorialLayout>
  );
}