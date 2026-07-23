import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function OrderItems() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Προϊόντα Παραγγελίας" subtitle="Το πάνελ δεξιά όπου συγκεντρώνεται η παραγγελία">
      <InfoBox icon="🧾" title="Τι θα μάθεις" variant="purple">
        <p>Καθώς προσθέτεις προϊόντα, το δεξί πάνελ μετατρέπεται από την κενή εικονογράφηση στη <strong>λίστα παραγγελίας</strong>. Εδώ βλέπεις τα είδη, τα συνοδευτικά τους, τα σύνολα και το κουμπί <strong>«Ταμείο»</strong>.</p>
      </InfoBox>

      <SectionTitle>Επισκόπηση Πάνελ</SectionTitle>

      <div className="flex justify-center">
        <img
          src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/848ef402f_image.png"
          alt="Πάνελ προϊόντων παραγγελίας"
          className="w-full max-w-md h-auto rounded-xl border border-gray-200 shadow-sm"
        />
      </div>

      <SectionTitle>1. Επικεφαλίδα «Προϊόντα»</SectionTitle>

      <StepCard number="1" title="Μετρητής ειδών">
        <p>Η επικεφαλίδα δείχνει <strong>«Προϊόντα (1)»</strong> — ο αριθμός σε παρένθεση είναι τα είδη που έχεις προσθέσει. Δίπλα υπάρχουν εικονίδια <strong>εγγράφου</strong> και <strong>κάδου απορριμμάτων</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Κάδος απορριμμάτων">
        <p>Το εικονίδιο του <strong>κάδου</strong> αδειάζει ολόκληρη την παραγγελία. Χρησιμοποίησέ το με προσοχή — διαγράφει όλα τα είδη μονομιάς.</p>
      </StepCard>

      <SectionTitle>2. Γραμμή Είδους</SectionTitle>

      <StepCard number="1" title="Όνομα & ποσότητα">
        <p>Κάθε είδος εμφανίζεται ως γραμμή: <strong>«1x Double Espresso»</strong> με την τιμή <strong>5,00</strong> δεξιά και ένα βέλος. Ο αριθμός μπροστά δείχνει την <strong>ποσότητα</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Συνοδευτικά">
        <p>Κάτω από το όνομα φαίνονται τα <strong>συνοδευτικά</strong> που πρόσθεσες (π.χ. <strong>«Άσπρη ζάχαρη»</strong>). Αν δεν πρόσθεσες, η γραμμή είναι άδεια.</p>
      </StepCard>

      <StepCard number="3" title="Πάτα το είδος για επεξεργασία">
        <p>Πάτα τη γραμμή του είδους (ή το βέλος) για να ανοίξεις ξανά το παράθυρο επεξεργασίας και να αλλάξεις συνοδευτικά, ποσότητα ή σχόλια.</p>
      </StepCard>

      <SectionTitle>3. Μπάρα «Επεξεργασία Παραγγελίας»</SectionTitle>

      <StepCard number="1" title="Έκπτωση παραγγελίας">
        <p>Κάτω από τα είδη υπάρχει η μπάρα <strong>«Επεξεργασία Παραγγελίας»</strong> με εικονίδιο <strong>έκπτωσης (%)</strong>. Πάτα το για να εφαρμόσεις έκπτωση σε όλη την παραγγελία.</p>
      </StepCard>

      <SectionTitle>4. Σύνολα & «Ταμείο»</SectionTitle>

      <StepCard number="1" title="Έκπτωση & Σύνολο">
        <p>Στο κάτω μέρος βλέπεις <strong>«Έκπτωση(0%): 0,00 €»</strong> και <strong>«Σύνολο: 5,00 €»</strong>. Ενημερώνονται αυτόματα καθώς προσθέτεις είδη ή εφαρμόζεις έκπτωση.</p>
      </StepCard>

      <StepCard number="2" title="Κουμπί «Ταμείο»">
        <p>Το μεγάλο κουμπί <strong>«Ταμείο»</strong> οδηγεί στην <strong>οθόνη πληρωμής</strong>. Πάτησέ το όταν η παραγγελία είναι ολοκληρωμένη και έτοιμη για χρέωση.</p>
      </StepCard>

      <InfoBox icon="💡" title="Συνοπτικά" variant="info">
        <p>Το πάνελ δείχνει <strong>πόσα είδη</strong> έχεις, τα <strong>συνοδευτικά</strong> τους, το <strong>σύνολο</strong> και το κουμπί <strong>«Ταμείο»</strong>. Για να διαγράψεις ή να κάνεις έκπτωση σε <em>συγκεκριμένο</em> είδος, σούρε το αριστερά (δες το επόμενο μάθημα).</p>
      </InfoBox>
    </CashierTutorialLayout>
  );
}