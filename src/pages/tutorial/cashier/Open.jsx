import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function Open() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Άνοιγμα Ταμείου" subtitle="Πώς να ανοίξεις ταμείο και να ξεκινήσεις την εργάσιμη μέρα">

      <InfoBox icon="⏰" title="Πότε γίνεται το άνοιγμα ταμείου;" variant="info">
        Το άνοιγμα ταμείου γίνεται στην αρχή κάθε βάρδιας / εργάσιμης μέρας, πριν ξεκινήσεις να δέχεσαι παραγγελίες.
      </InfoBox>

      <SectionTitle>Βήματα Ανοίγματος Ταμείου</SectionTitle>

      <StepCard number="1" title="Σύνδεση στην εφαρμογή">
        <p>Συνδέσου στην εφαρμογή με τα στοιχεία σου (όπως περιγράφεται στην ενότητα <strong>«Σύνδεση Χρήστη»</strong>).</p>
      </StepCard>

      <StepCard number="2" title="Άνοιγμα νέου ταμείου">
        <p>Από την αρχική οθόνη, επίλεξε <strong>«Άνοιγμα Ταμείου»</strong>. Εμφανίζεται η φόρμα ανοίγματος.</p>
      </StepCard>

      <StepCard number="3" title="Εισήγαγε αρχικό ποσό ταμείου">
        <p>Πληκτρολόγησε το αρχικό ποσό μετρητών που υπάρχει στο ταμείο. Αν δεν υπάρχει, πάτησε <strong>ΟΚ</strong>.</p>
        <p className="mt-2">⚙️ Αυτή η επιλογή πρέπει να έχει ενεργοποιηθεί από τον <strong>Διαχειριστή</strong> στο Secure.</p>
      </StepCard>

      <StepCard number="4" title="Έναρξη ταμείου">
        <p>Ξεκινάει επίσημα το ταμείο σου. Μπορείς πλέον να δέχεσαι παραγγελίες και πληρωμές.</p>
      </StepCard>

      <InfoBox icon="💡" title="Σημείωση" variant="info">
        Κάθε χρήστης ανοίγει το δικό του ταμείο. Αν εργάζονται παράλληλα πολλοί ταμίες, ο καθένας κάνει άνοιγμα ταμείου χωριστά από τη δική του συσκευή.
      </InfoBox>

      <InfoBox icon="⚠️" title="Προσοχή" variant="warning">
        Χωρίς άνοιγμα ταμείου δεν μπορείς να δεχτείς πληρωμές. Βεβαιώσου ότι έχεις ανοίξει ταμείο πριν ξεκινήσεις τις παραγγελίες.
      </InfoBox>

      <InfoBox icon="⚠️" title="Προσοχή" variant="warning">
        Κάνοντας αποσύνδεση δεν κλείνει το ταμείο.
      </InfoBox>

    </CashierTutorialLayout>
  );
}