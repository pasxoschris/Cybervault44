import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, SectionTitle, InfoBox } from "../../components/tutorial/StepCard";

export default function CancelOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ακύρωση Παραγγελίας" subtitle="Ακύρωση ολόκληρης παραγγελίας — ανοιχτής ή κλειστής">
      <InfoBox icon="ℹ️" title="Δύο περιπτώσεις" variant="purple">
        <p><strong>Ανοιχτή παραγγελία</strong> (δεν έχει πληρωθεί): σύρε την παραγγελία προς τα αριστερά (slide) → «Ακύρωση».</p>
        <p className="mt-1"><strong>Κλειστή παραγγελία</strong> (έχει πληρωθεί — με ή χωρίς απόδειξη): <strong>πρώτα «Επαναφορά παραγγελίας»</strong> από τις Παραγγελίες Βάρδιας και μετά slide → «Ακύρωση».</p>
      </InfoBox>

      <SectionTitle>Ανοιχτή παραγγελία</SectionTitle>
      <StepCard number="1" title="Εντόπισε την παραγγελία">
        <p>Εντόπισε την <strong>ανοιχτή παραγγελία</strong> που θέλεις να ακυρώσεις.</p>
      </StepCard>
      <StepCard number="2" title="Slide προς τα αριστερά">
        <p>Κάνοντας <strong>slide προς τα αριστερά</strong> πάνω στην παραγγελία, εμφανίζεται η επιλογή <strong>«Ακύρωση»</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Κωδικός διαχειριστή">
        <p>Απαιτείται <strong>κωδικός διαχειριστή</strong>.</p>
      </StepCard>
      <StepCard number="4" title="Αιτία Ακύρωσης">
        <p>Επίλεξε <strong>Αιτία Ακύρωσης</strong>.</p>
      </StepCard>
      <StepCard number="5" title="Επιβεβαίωση">
        <p>Επιβεβαίωσε την ακύρωση της παραγγελίας.</p>
      </StepCard>

      <SectionTitle>Κλειστή παραγγελία (πληρωμένη)</SectionTitle>
      <InfoBox icon="⚠️" title="Προαπαιτούμενο" variant="warning">
        Η ακύρωση κλειστής παραγγελίας ή απόδειξης γίνεται <strong>μόνο</strong> από τις <strong>Παραγγελίες Βάρδιας</strong>. Αν δεν τις βλέπεις στο μενού (☰), πρέπει να τις ενεργοποιήσει ο Διαχειριστής στο <strong>Secure (Διαχειριστικό) → Κατάστημα → Άλλες Υπηρεσίες → Παραγγελίες Βάρδιας: ON</strong>.
      </InfoBox>
      <StepCard number="1" title="Άνοιξε τις Παραγγελίες Βάρδιας">
        <p>
          Η κλειστή παραγγελία βρίσκεται στις <strong>Παραγγελίες Βάρδιας</strong> — η διαδικασία ξεκινά από εκεί, όπως στο{" "}
          <Link to="/tutorial/shift" className="text-purple-600 underline">Παραγγελίες Βάρδιας</Link>.
        </p>
      </StepCard>
      <StepCard number="2" title="Επαναφορά παραγγελίας">
        <p>
          Σύρε την παραγγελία <strong>προς τα αριστερά (slide)</strong> — δεν πατάς την παραγγελία — και πάτα <strong>«Επαναφορά παραγγελίας»</strong> για να ξανανοίξει.
        </p>
      </StepCard>
      <StepCard number="3" title="Slide → «Ακύρωση»">
        <p>
          Μετά την επαναφορά, σύρε ξανά την παραγγελία <strong>προς τα αριστερά (slide)</strong> → <strong>«Ακύρωση»</strong> → κωδικός διαχειριστή → <strong>Αιτία Ακύρωσης</strong> → επιβεβαίωση.
        </p>
      </StepCard>
    </TutorialLayout>
  );
}