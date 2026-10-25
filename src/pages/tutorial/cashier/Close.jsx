import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
        <p>Πάτα τις <strong>τρεις γραμμές (☰) πάνω αριστερά</strong> → <strong>«Ρυθμίσεις (Όνομα Χρήστη)»</strong> → κουμπί <strong>«Ανάλυση Βάρδιας»</strong> στο κάτω μέρος της οθόνης. Ανοίγει ένα modal με τη σύνοψη της βάρδιας του τρέχοντος χρήστη.</p>
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
      <StepCard number="4" title="Έλεγξε για ανεξόφλητες παραγγελίες">
        <p>Αν υπάρχουν <strong>ανεξόφλητες</strong> παραγγελίες, δεν μπορείς να κλείσεις τη βάρδια. Πρέπει να τις <Link to="/tutorial/cashier/payments" className="underline font-semibold">σημειώσεις ως πληρωμένες</Link>.</p>
        <p className="mt-2">Οι <strong>ανοιχτές</strong> παραγγελίες που έχουν ήδη πληρωθεί κλείνουν αυτόματα με το κλείσιμο της βάρδιας.</p>
      </StepCard>
      <StepCard number="5" title="Πάτα «Κλείσιμο Βάρδιας»">
        <p>Στο κάτω μέρος του modal, πάτα το κουμπί <strong>«Κλείσιμο Βάρδιας»</strong>.</p>
      </StepCard>
      <StepCard number="6" title="Επιβεβαίωση">
        <p>Επιβεβαίωσε το κλείσιμο. Η βάρδια κλείνει.</p>
      </StepCard>
      <InfoBox icon="💡" variant="info">
        Μετά το Κλείσιμο Βάρδιας, <strong>αποσυνδέεσαι αυτόματα</strong> από την εφαρμογή για να την ελευθερώσεις για άλλο χρήστη.
      </InfoBox>
    </CashierTutorialLayout>
  );
}