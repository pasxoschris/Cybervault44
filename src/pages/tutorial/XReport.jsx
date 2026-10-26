import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function XReport() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Αναφορά Χ" subtitle="Τα σύνολα των αποδείξεων της ημέρας, χωρίς κλείσιμο">
      <InfoBox icon="ℹ️" title="Τι είναι" variant="info">
        Η Αναφορά Χ δείχνει τα σύνολα των αποδείξεων από το τελευταίο κλείσιμο μέχρι τώρα, ανά συντελεστή ΦΠΑ.{" "}
        <strong>Δεν κλείνει τη βάρδια και δεν μηδενίζει τίποτα</strong>, οπότε μπορείς να την εκδώσεις όσες φορές χρειαστεί.
      </InfoBox>

      <SectionTitle>Έκδοση Αναφοράς Χ</SectionTitle>

      <StepCard number="1" title="Άνοιξε την Αναφορά Χ">
        <p>Πάτα τις <strong>τρεις γραμμές (☰) πάνω αριστερά</strong> και επίλεξε <strong>«Αναφορά Χ»</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Κωδικός Διαχειριστή">
        <p>Πληκτρολόγησε τον <strong>Κωδικό Διαχειριστή</strong> ή πάτα <strong>«Scan QR Code»</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Δες τα σύνολα">
        <p>Η οθόνη <strong>«Αναφορά Χ»</strong> δείχνει:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>ανά συντελεστή ΦΠΑ (π.χ. 24%): <strong>Καθαρή Αξία</strong>, <strong>Αξία Φ.Π.Α.</strong> και <strong>Συνολική Αξία Αποδείξεων</strong></li>
          <li>τα γενικά σύνολα: <strong>Συνολική Καθαρή Αξία</strong>, <strong>Συνολική Αξία Φ.Π.Α.</strong>, <strong>Συνολική Αξία</strong></li>
          <li><strong>Total Tax Documents</strong>: το πλήθος των παραστατικών</li>
        </ul>
      </StepCard>

      <StepCard number="4" title="Εκτύπωσε">
        <p>Πάτα το <strong>εικονίδιο του εκτυπωτή</strong> πάνω δεξιά. Με το εικονίδιο της <strong>ανανέωσης</strong> δίπλα του ενημερώνονται τα ποσά.</p>
      </StepCard>
    </TutorialLayout>
  );
}
