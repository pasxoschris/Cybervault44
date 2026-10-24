import React, { useEffect } from "react";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, SectionTitle } from "@/components/tutorial/StepCard";

export default function PaymentCash() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Πληρωμή με Μετρητά" subtitle="Πληρωμή παραγγελίας με μετρητά">
      <SectionTitle>Πληρωμή με Μετρητά</SectionTitle>
      <StepCard number="1" title="Άνοιξε την παραγγελία">
        <p>Πάτα στην παραγγελία για να δεις τα στοιχεία της.</p>
      </StepCard>
      <StepCard number="2" title="Πάτα «Πληρωμή με Μετρητά»">
        <p>Στο κάτω μέρος ή από το μενού πληρωμής, επίλεξε <strong>«Πληρωμή με Μετρητά»</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Εισήγαγε ποσό (προαιρετικό)">
        <p>Αν ο πελάτης δώσει μεγαλύτερο ποσό, μπορείς να χρησιμοποιήσεις το <strong>εργαλείο για ρέστα</strong> για να υπολογίσεις τα ρέστα.</p>
        <p>Το Εργαλείο για ρέστα ενεργοποιείται στις <strong><a href="/tutorial/Settings" className="text-purple-600 underline hover:text-purple-800">«Ρυθμίσεις Χρήστη»</a></strong>.</p>

      </StepCard>
      <StepCard number="4" title="Επιβεβαίωση">
        <p>Επιβεβαίωσε την πληρωμή. Η απόδειξη θα εκτυπωθεί αυτόματα.</p>
      </StepCard>
    </TutorialLayout>
  );
}