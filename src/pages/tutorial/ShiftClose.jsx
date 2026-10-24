import React, { useEffect } from "react";
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
        <p>Αν υπάρχουν <strong>ανεξόφλητες</strong> παραγγελίες, δεν μπορείς να κλείσεις τη βάρδια. Πρέπει να τις σημειώσεις ως πληρωμένες.</p>
        <p className="mt-2">Οι <strong>ανοιχτές</strong> παραγγελίες που έχουν ήδη πληρωθεί κλείνουν αυτόματα με το κλείσιμο της βάρδιας.</p>
      </StepCard>
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