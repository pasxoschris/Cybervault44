import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function Payments() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Πληρωμές" subtitle="Επιλογή τρόπου πληρωμής από το κουμπί «Ταμείο»">
      <InfoBox icon="💳" title="Τι θα μάθεις" variant="purple">
        <p>Πατώντας το κουμπί <strong>«Ταμείο»</strong> ανοίγει το παράθυρο πληρωμής. Εμφανίζεται το <strong>σύνολο</strong> και πέντε τρόποι πληρωμής: <strong>Μετρητά</strong>, <strong>Κάρτα</strong>, <strong>Ηλεκτρονική Πληρωμή</strong>, <strong>Split Payments</strong> και <strong>IRIS</strong>.</p>
      </InfoBox>

      <SectionTitle>Άνοιγμα Πληρωμής</SectionTitle>

      <div className="flex justify-center">
        <img
          src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/7648083cf_image.png"
          alt="Παράθυρο επιλογής τρόπου πληρωμής"
          className="w-full max-w-md h-auto rounded-xl border border-gray-200 shadow-sm"
        />
      </div>

      <StepCard number="1" title="Πάτα «Ταμείο»">
        <p>Όταν η παραγγελία είναι έτοιμη, πάτα το κουμπί <strong>«Ταμείο»</strong> κάτω δεξιά. Ανοίγει το παράθυρο πληρωμής με βέλος που δείχνει προς το κουμπί.</p>
      </StepCard>

      <StepCard number="2" title="Σύνολο">
        <p>Στην κορυφή του παραθύρου φαίνεται <strong>«Σύνολο: 5,00 €»</strong> — το ποσό που πρέπει να πληρωθεί.</p>
      </StepCard>

      <SectionTitle>Τρόποι Πληρωμής</SectionTitle>

      <StepCard number="1" title="Πληρωμή με Μετρητά">
        <p>Για <strong>μετρητά</strong>. Ανοίγει η οθόνη εισαγωγής του ποσού που έδωσε ο πελάτης και υπολογίζει το <strong>ρεστά</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Κάρτα (Mellon device)">
        <p>Για <strong>πληρωμή με κάρτα</strong> μέσω της συσκευής Mellon. Η συσκευή αναλαμβάνει την επεξεργασία της συναλλαγής.</p>
      </StepCard>

      <StepCard number="3" title="Ηλεκτρονική Πληρωμή">
        <p>Για <strong>ηλεκτρονική πληρωμή</strong> (π.χ. QR / e-wallet). Ο πελάτης ολοκληρώνει την πληρωμή ψηφιακά.</p>
      </StepCard>

      <StepCard number="4" title="Split Payments">
        <p>Όταν ο πελάτης θέλει να <strong>χωρίσει</strong> το σύνολο σε <strong>περισσότερους τρόπους πληρωμής</strong> (π.χ. μισό μετρητά, μισό κάρτα). Δες το αντίστοιχο μάθημα Split Payments.</p>
      </StepCard>

      <StepCard number="5" title="IRIS (Mellon device)">
        <p>Για <strong>IRIS</strong> — πληρωμή μέσω της υπηρεσίας IRIS (συνήθως πληρωμή με scan κωδικού / τραπεζικού λογαριασμού) μέσω της συσκευής Mellon.</p>
      </StepCard>

      <InfoBox icon="💡" title="Συνοπτικά" variant="info">
        <p><strong>«Ταμείο» → Σύνολο → Επιλογή τρόπου πληρωμής</strong>. Επίλεξε τον τρόπο, ολοκλήρωσε τη συναλλαγή και η παραγγελία κλείνει και εκτυπώνεται η απόδειξη.</p>
      </InfoBox>
    </CashierTutorialLayout>
  );
}