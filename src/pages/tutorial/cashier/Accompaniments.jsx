import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function Accompaniments() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Συνοδευτικά Προϊόντος" subtitle="Προσθήκη συνοδευτικών, σειράς σερβιρίσματος, τιμοκαταλόγου και σχολίων">
      <InfoBox icon="✏️" title="Τι θα μάθεις" variant="purple">
        <p>Πατώντας το <strong>μολύβι</strong> πάνω δεξιά σε κάθε προϊόν, ανοίγει ένα παράθυρο όπου προσθέτεις <strong>συνοδευτικά</strong> (π.χ. ζάχαρη, γάλα, πάγο), <strong>σειρά σερβιρίσματος</strong>, <strong>τιμοκατάλογο</strong> και <strong>σχόλια</strong> πριν το προσθέσεις στην παραγγελία.</p>
      </InfoBox>

      <SectionTitle>1. Πλέγμα Προϊόντων</SectionTitle>

      <div className="flex justify-center">
        <img
          src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/13e1da5b8_image.png"
          alt="Πλέγμα προϊόντων κατηγορίας COFFEE"
          className="w-full max-w-md h-auto rounded-xl border border-gray-200 shadow-sm"
        />
      </div>

      <StepCard number="1" title="Επίλεξε κατηγορία">
        <p>Από τις «Κύριες Κατηγορίες» πάτα μια κατηγορία (π.χ. <strong>COFFEE</strong>). Ανοίγει το πλέγμα με τα προϊόντα της κατηγορίας σε λευκές κάρτες.</p>
      </StepCard>

      <StepCard number="2" title="Κάρτα προϊόντος">
        <p>Κάθε κάρτα δείχνει το <strong>όνομα</strong> του προϊόντος, την <strong>κατηγορία</strong> και την <strong>τιμή</strong> κάτω δεξιά. Πάνω δεξιά σε κάθε κάρτα υπάρχει ένα <strong>εικονίδιο μολυβιού</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Πάτα το μολύβι">
        <p>Πάτα το <strong>μολύβι</strong> πάνω δεξιά στην κάρτα του προϊόντος που θέλεις να παραμετροποιήσεις. Ανοίγει το παράθυρο επεξεργασίας προϊόντος.</p>
      </StepCard>

      <SectionTitle>2. Παράθυρο Επεξεργασίας Προϊόντος</SectionTitle>

      <div className="flex justify-center">
        <img
          src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/4f1d993ab_image.png"
          alt="Παράθυρο επεξεργασίας προϊόντος με συνοδευτικά"
          className="w-full max-w-md h-auto rounded-xl border border-gray-200 shadow-sm"
        />
      </div>

      <StepCard number="1" title="Επικεφαλίδα παραθύρου">
        <p>Στην επικεφαλίδα βλέπεις το <strong>όνομα του προϊόντος</strong> (π.χ. Double Espresso) και την <strong>τιμή</strong> του. Αριστερά υπάρχει το <strong>«Χ»</strong> για κλείσιμο, δεξιά το <strong>✓</strong> για επιβεβαίωση και προσθήκη στην παραγγελία.</p>
      </StepCard>

      <SectionTitle>3. Συνοδευτικά</SectionTitle>

      <StepCard number="1" title="Πρόσθεσε συνοδευτικά">
        <p>Στην ενότητα <strong>«Συνοδευτικά»</strong> εμφανίζονται επιλογές όπως <strong>Ζάχαρη</strong>, <strong>Γάλα</strong> και <strong>Πάγος</strong>. Πάτα την κάθε επιλογή (με το εικονίδιο του βέλους) για να ρυθμίσεις την ποσότητα ή την επιλογή.</p>
      </StepCard>

      <SectionTitle>4. Σειρά Σερβιρίσματος</SectionTitle>

      <StepCard number="1" title="Όρισε πού θα σερβιριστεί">
        <p>Στην ενότητα <strong>«Σειρά Σερβιρίσματος»</strong> επιλέγεις σε ποιο σταθμό θα προωθηθεί το προϊόν (π.χ. <strong>Drinks</strong>). Πάτα το πεδίο με το βέλος προς τα κάτω για να αλλάξεις σταθμό σερβιρίσματος.</p>
      </StepCard>

      <SectionTitle>5. Τιμοκατάλογος</SectionTitle>

      <StepCard number="1" title="Επίλεξε τιμοκατάλογο">
        <p>Στην ενότητα <strong>«Τιμοκατάλογος»</strong> φαίνεται το ενεργό τιμοκατάλογο (π.χ. <strong>Βασικός</strong>) και η αντίστοιχη <strong>τιμή</strong>. Πάτα το βέλος για να επιλέξεις διαφορετικό τιμοκατάλογο αν χρειάζεται (π.χ. takeaway, delivery).</p>
      </StepCard>

      <SectionTitle>6. Σχόλια</SectionTitle>

      <StepCard number="1" title="Πρόσθεσε σχόλιο">
        <p>Στο τέλος υπάρχει το πεδίο <strong>«Σχόλια»</strong>. Πάτα το για να γράψεις μια σημείωση για το προϊόν (π.χ. «χωρίς αφρόγαλα», «ζεστό»). Το σχόλιο εκτυπώνεται στην απόδειξη κουζίνας/μπαρ.</p>
      </StepCard>

      <StepCard number="2" title="Επιβεβαίωση με το ✓">
        <p>Όταν ορίσεις συνοδευτικά, σειρά σερβιρίσματος, τιμοκατάλογο και σχόλια, πάτα το <strong>✓</strong> πάνω δεξιά. Το προϊόν προστίθεται στο πάνελ παραγγελίας δεξιά με όλες τις παραμετροποιήσεις.</p>
      </StepCard>

      <InfoBox icon="💡" title="Συνοπτικά" variant="info">
        <p><strong>Μολύβι → Συνοδευτικά → Σειρά σερβιρίσματος → Τιμοκατάλογος → Σχόλια → ✓</strong>. Αν δεν χρειάζεσαι παραμετροποίηση, πάτα απλά την κάρτα (όχι το μολύβι) για να προσθέσεις το προϊόν απευθείας.</p>
      </InfoBox>
    </CashierTutorialLayout>
  );
}