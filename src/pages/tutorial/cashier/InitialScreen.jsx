import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";
import SyncStatusInfo from "@/components/tutorial/SyncStatusInfo";

export default function InitialScreen() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Αρχική Οθόνη" subtitle="Η κεντρική οθόνη του Cashier Mode στο iPad">
      <InfoBox icon="📱" title="Cashier Mode" variant="purple">
        <p>Το <strong>Cashier Mode</strong> τρέχει <strong>μόνο σε iPad</strong> και απευθύνεται σε <strong>υπαλλήλους ταμείου</strong> — όχι σε σερβιτόρους. Ο πελάτης παραγγέλνει και πληρώνει <strong>στο ταμείο</strong>, οπότε η ροή είναι γρήγορη και άμεση.</p>
      </InfoBox>

      <SectionTitle>Επισκόπηση Οθόνης</SectionTitle>

      <div className="flex justify-center">
        <img
          src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/20dcd8969_image.png"
          alt="Αρχική οθόνη Cashier Mode"
          className="w-full max-w-md h-auto rounded-xl border border-gray-200 shadow-sm"
        />
      </div>

      <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
        Η αρχική οθόνη χωρίζεται σε <strong>τρία τμήματα</strong>: την πάνω μπάρα εργαλείων, την κεντρική περιοχή με τις κατηγορίες προϊόντων (αριστερά) και το πάνελ παραγγελίας (δεξιά).
      </p>

      <SectionTitle>1. Πάνω Μπάρα Εργαλείων</SectionTitle>

      <StepCard number="1" title="Μενού & Αναζήτηση">
        <p>Στα αριστερά βρίσκεται το <strong>μενού</strong> (το εικονίδιο με τις <strong>τρεις οριζόντιες γραμμές</strong>) και η <strong>μπάρα αναζήτησης</strong> με placeholder «Όνομα προϊόντος». Πληκτρολόγησε το όνομα του προϊόντος για να το βρεις γρήγορα χωρίς να περιηγηθείς στις κατηγορίες.</p>
      </StepCard>

      <StepCard number="2" title="Αγαπημένα & Ετικέτα Τιμής">
        <p>Το εικονίδιο <strong>φακέλου/αγαπημένων</strong> ανοίγει τα προϊόντα που έχουν μαρκαριστεί ως αγαπημένα για ταχύτητα. Το εικονίδιο <strong>ετικέτας τιμής</strong> δίνει πρόσβαση σε λειτουργίες τιμολογίου.</p>
      </StepCard>

      <StepCard number="3" title="Κουμπί Delivery">
        <p>Στα δεξιά υπάρχει το διακοσμημένο κουμπί <strong>«Delivery»</strong>. Πάτησέ το για να μεταβείς σε λειτουργία παράδοσης όταν δέχεσαι παραγγελίες προς αποστολή.</p>
      </StepCard>

      <SectionTitle>2. Κύριες Κατηγορίες</SectionTitle>

      <StepCard number="1" title="Πλέγμα Κατηγοριών">
        <p>Στο κέντρο αριστερά εμφανίζονται οι <strong>«Κύριες Κατηγορίες»</strong> σε πλέγμα 3 στηλών (π.χ. FOOD, COFFEE, SOFT DRINKS, SPIRITS LIST, BEERS, BEVERAGES, DESSERTS). Κάθε κουμπί έχει μια <strong>μωβ λωρίδα στα αριστερά</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Επιλογή Κατηγορίας">
        <p>Πάτα μια κατηγορία για να ανοίξει ο <strong>υποκατάλογος</strong> με τα προϊόντα της. Από εκεί προσθέτεις είδη κατευθείαν στην παραγγελία δεξιά.</p>
      </StepCard>

      <SectionTitle>3. Πάνελ Παραγγελίας (Δεξιά)</SectionTitle>

      <StepCard number="1" title="Επιλέξτε Προϊόντα">
        <p>Το δεξί πάνελ έχει επικεφαλίδα <strong>«Επιλέξτε Προϊόντα»</strong>. Όταν η παραγγελία είναι άδεια, εμφανίζεται μια εικονογράφηση με scooter και ταμείο. Καθώς προσθέτεις είδη, γεμίζει η λίστα εδώ.</p>
      </StepCard>

      <StepCard number="2" title="Σύνολα & Έκπτωση">
        <p>Στο κάτω μέρος του πάνελ βλέπεις τη γραμμή <strong>«Έκπτωση(0%):»</strong> και το <strong>«Σύνολο:»</strong> που ενημερώνονται αυτόματα καθώς προσθέτεις προϊόντα ή εφαρμόζεις έκπτωση.</p>
      </StepCard>

      <StepCard number="3" title="Κουμπί «Ταμείο»">
        <p>Το μεγάλο κουμπί <strong>«Ταμείο»</strong> στο κάτω μέρος του πάνελ οδηγεί στην οθόνη <strong>πληρωμής</strong>. Πάτησέ το όταν η παραγγελία είναι έτοιμη για χρέωση.</p>
      </StepCard>

      <SectionTitle>4. Footer Μπάρα</SectionTitle>

      <SyncStatusInfo />

      <StepCard number="2" title="Συντομεύσεις Footer">
        <p>Στη μέση και δεξιά του footer υπάρχουν εικονίδια για <strong>Delivery</strong> (scooter), <strong>Ιστορικό</strong> (ρολόι) και <strong>POS/Έγγραφα</strong>. Χρησιμοποιούνται για γρήγορη πρόσβαση σε παραγγελίες παράδοσης, ιστορικό και λειτουργίες ταμείου.</p>
      </StepCard>

      <InfoBox icon="💡" title="Συνοπτικά" variant="info">
        <p>Η ροή είναι: <strong>Επιλογή κατηγορίας → Προσθήκη προϊόντων → (προαιρετικά έκπτωση) → «Ταμείο» → Πληρωμή</strong>. Όλα γίνονται από το ταμείο, χωρίς σερβιτόρο.</p>
      </InfoBox>
    </CashierTutorialLayout>
  );
}