import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function ShiftClose() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Κλείσιμο Βάρδιας" subtitle="Ολοκλήρωση και κλείσιμο της τρέχουσας βάρδιας">

      <InfoBox icon="⚙️" title="Απαιτείται ενεργοποίηση" variant="warning">
        Για να εμφανίζεται η λειτουργία <strong>Παραγγελίες Βάρδιας</strong>, πρέπει να είναι ενεργοποιημένη στις ρυθμίσεις του διαχειριστικού: <em>Διαχειριστής → Κατάστημα → Άλλες Υπηρεσίες → Παραγγελίες Βάρδιας: ON</em>
      </InfoBox>

      <SectionTitle>Κλείσιμο Βάρδιας</SectionTitle>
      <InfoBox icon="⚠️" title="Προσοχή" variant="warning">
        Το κλείσιμο βάρδιας είναι <strong>μη αναστρέψιμη ενέργεια</strong>. Βεβαιώσου ότι όλες οι παραγγελίες έχουν ολοκληρωθεί.
      </InfoBox>
      <StepCard number="1" title="Έλεγξε ανοικτές παραγγελίες">
        <p>Βεβαιώσου ότι δεν υπάρχουν ανοικτές παραγγελίες. Αν υπάρχουν, ολοκλήρωσέ τες πρώτα.</p>
      </StepCard>
      <StepCard number="2" title="Πάτα «Κλείσιμο Βάρδιας»">
        <p>Από τις Παραγγελίες Βάρδιας, επίλεξε <strong>«Κλείσιμο Βάρδιας»</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Επιβεβαίωση">
        <p>Επιβεβαίωσε το κλείσιμο. Η βάρδια κλείνει και μπορείς να αποσυνδεθείς ή να ξεκινήσεις νέα βάρδια.</p>
      </StepCard>
      <InfoBox icon="💡" variant="info">
        Μετά το κλείσιμο βάρδιας, μπορείς να <strong>Αποσυνδεθείς</strong> από το μενού της εφαρμογής για να την ελευθερώσεις για άλλο χρήστη.
      </InfoBox>
    </TutorialLayout>
  );
}