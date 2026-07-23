import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";
import { ScreenshotGallery } from "@/components/tutorial/ScreenshotGallery";

export default function CloseCashier() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Κλείσιμο Βάρδιας" subtitle="Ανάλυση και κλείσιμο της βάρδιας">

      <InfoBox icon="⚠️" title="Προσοχή" variant="warning">
        Το κλείσιμο βάρδιας είναι <strong>μη αναστρέψιμη ενέργεια</strong>. Βεβαιώσου ότι όλες οι παραγγελίες έχουν ολοκληρωθεί πριν προχωρήσεις.
      </InfoBox>

      <ScreenshotGallery
        images={["https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/d1e36c530_image.png"]}
        caption="Ανάλυση Βάρδιας — σύνοψη και κλείσιμο"
      />

      <SectionTitle>Άνοιγμα Ανάλυσης Βάρδιας</SectionTitle>
      <StepCard number="1" title="Άνοιξε το μενού Βάρδιας">
        <p>Από το μενού της εφαρμογής, επίλεξε <strong>«Ανάλυση Βάρδιας»</strong>. Ανοίγει ένα modal με τη σύνοψη της βάρδιας του τρέχοντος χρήστη.</p>
      </StepCard>

      <SectionTitle>Σύνοψη Βάρδιας</SectionTitle>
      <StepCard number="2" title="Έλεγξε τα δεδομένα βάρδιας">
        <p>Στο modal «Ανάλυση Βάρδιας» βλέπεις:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Συνολικό Ποσό</strong> — το σύνολο πωλήσεων της βάρδιας</li>
          <li><strong>Παραγγελίες</strong> — αριθμός παραγγελιών</li>
          <li><strong>Μετρητά</strong> — τα μετρητά που συλλέχθηκαν</li>
          <li><strong>In-house &amp; Delivery</strong> — ανάλυση ανά τύπο παραγγελίας</li>
          <li><strong>Χρήστης</strong> — πωλήσεις ανά χρήστη (π.χ. ChrisS)</li>
          <li><strong>Tips Παραγγελιών</strong> — συνολικά φιλοδωρήματα</li>
        </ul>
      </StepCard>
      <InfoBox icon="💡" variant="info">
        Πάτα στο <strong>«Συνολικό Ποσό»</strong> ή σε κάποιον <strong>χρήστη</strong> για να δεις αναλυτικά στοιχεία.
      </InfoBox>

      <SectionTitle>Εκτύπωση Αναφοράς</SectionTitle>
      <StepCard number="3" title="Εκτύπωσε την αναφορά">
        <p>Από το εικονίδιο <strong>εκτύπωσης</strong> (πάνω δεξιά στο modal) μπορείς να εκτυπώσεις την αναφορά βάρδιας.</p>
      </StepCard>

      <SectionTitle>Κλείσιμο Βάρδιας</SectionTitle>
      <StepCard number="4" title="Έλεγξε ανοικτές παραγγελίες">
        <p>Βεβαιώσου ότι δεν υπάρχουν ανοικτές παραγγελίες. Αν υπάρχουν, ολοκλήρωσέ τες πρώτα.</p>
      </StepCard>
      <StepCard number="5" title="Πάτα «Κλείσιμο Βάρδιας»">
        <p>Στο κάτω μέρος του modal, πάτα το κουμπί <strong>«Κλείσιμο Βάρδιας»</strong>.</p>
      </StepCard>
      <StepCard number="6" title="Επιβεβαίωση">
        <p>Επιβεβαίωσε το κλείσιμο. Η βάρδια κλείνει και μπορείς να αποσυνδεθείς ή να ξεκινήσεις νέα βάρδια.</p>
      </StepCard>
      <InfoBox icon="💡" variant="info">
        Μετά το κλείσιμο βάρδιας, μπορείς να <strong>Αποσυνδεθείς</strong> από το μενού της εφαρμογής για να την ελευθερώσεις για άλλο χρήστη.
      </InfoBox>
    </CashierTutorialLayout>
  );
}