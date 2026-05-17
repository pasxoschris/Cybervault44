import React from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function StartShift() {
  return (
    <TutorialLayout title="Έναρξη Βάρδιας" subtitle="Πώς να ανοίξεις βάρδια και να ξεκινήσεις την εργάσιμη μέρα">

      <InfoBox icon="⏰" title="Πότε γίνεται η έναρξη βάρδιας;" variant="info">
        Η έναρξη βάρδιας γίνεται στην αρχή κάθε βάρδιας / εργάσιμης μέρας, πριν ξεκινήσεις να παίρνεις παραγγελίες.
      </InfoBox>

      <SectionTitle>Βήματα Έναρξης Βάρδιας</SectionTitle>

      <StepCard number="1" title="Σύνδεση στην εφαρμογή">
        <p>Συνδέσου στην εφαρμογή με τα στοιχεία σου (όπως περιγράφεται στην ενότητα <strong>«Σύνδεση Χρήστη»</strong>).</p>
      </StepCard>

      <StepCard number="2" title="Έναρξη νέας βάρδιας">
        <p>Από την αρχική οθόνη, επίλεξε <strong>«Έναρξη Βάρδιας»</strong>. Εμφανίζεται η φόρμα έναρξης.</p>
      </StepCard>

      <StepCard number="3" title="Εισήγαγε αρχικό ποσό ταμείου">
        <p>Πληκτρολόγησε το αρχικό ποσό μετρητών που υπάρχει στο ταμείο. Αν δεν υπάρχει, πάτησε <strong>ΟΚ</strong>.</p>
        <p className="mt-2">⚙️ Αυτή η επιλογή πρέπει να έχει ενεργοποιηθεί από τον <strong>Διαχειριστή</strong> στο Secure.</p>
      </StepCard>

      <StepCard number="4" title="Έναρξη βάρδιας">
        <p>Ξεκινάει επίσημα η βάρδια σου. Μπορείς πλέον να δέχεσαι παραγγελίες.</p>
      </StepCard>

      <InfoBox icon="💡" title="Σημείωση" variant="info">
        Κάθε χρήστης ανοίγει τη δική του βάρδια. Αν εργάζονται παράλληλα πολλοί σερβιτόροι, ο καθένας κάνει έναρξη βάρδιας χωριστά από τη δική του συσκευή.
      </InfoBox>

      <InfoBox icon="⚠️" title="Προσοχή" variant="warning">
        Χωρίς έναρξη βάρδιας δεν μπορείς να δεχτείς πληρωμές. Βεβαιώσου ότι έχεις ανοίξει βάρδια πριν ξεκινήσεις τις παραγγελίες.
      </InfoBox>

        <InfoBox icon="⚠️" title="Προσοχή" variant="warning">
        Κάνοντας αποσύνδεση δεν κλείνει η βάρδια. 
      </InfoBox>

    </TutorialLayout>
  );
}