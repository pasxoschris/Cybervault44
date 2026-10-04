import React from "react";
import { Link } from "react-router-dom";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";
import ReceiptIssueMock from "@/components/tutorial/ReceiptIssueMock";

export default function IssueReceipt() {
  return (
    <TutorialLayout title="Έκδοση Παραστατικού" subtitle="Τι διαλέγεις από το αναδυόμενο παράθυρο της παραγγελίας">
      <div>
        <ReceiptIssueMock />
        <p className="mt-3 text-center text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
          Η οθόνη που ανοίγει πάνω από τα Στοιχεία Παραγγελίας
        </p>
      </div>

      <InfoBox icon="🧾" title="Πού τη βρίσκεις" variant="purple">
        <p>Στην οθόνη <strong>Στοιχεία Παραγγελίας</strong> πάτα το εικονίδιο του <strong>εκτυπωτή</strong> (κάτω αριστερά). Ανοίγει το παράθυρο <strong>«Έκδοση Παραστατικού»</strong> και διαλέγεις τι θα γίνει με το παραστατικό της παραγγελίας.</p>
      </InfoBox>

      <SectionTitle>Οι επιλογές σου</SectionTitle>

      <StepCard number="1" title="Απόδειξη Λιανικής Πώλησης — εκτύπωση κατευθείαν">
        <p>Εκτυπώνεται <strong>αμέσως</strong> η απόδειξη λιανικής της παραγγελίας. Διάλεξέ το όταν ο πελάτης πληρώνει τώρα και θέλει την απόδειξη στο χέρι.</p>
      </StepCard>

      <StepCard number="2" title="Δελτίο Παραγγελίας — πρώτα δελτίο, μετά παραστατικό">
        <p>Εκτυπώνεται <strong>δελτίο παραγγελίας</strong> και όχι φορολογικό παραστατικό. Αργότερα, από τις <strong>τρεις τελείες</strong> της παραγγελίας, εκδίδεις <strong>Απόδειξη Λιανικής</strong> ή <strong>Τιμολόγιο</strong> — δες το μάθημα <Link to="/tutorial/invoice" className="text-purple-600 font-semibold hover:underline">Έκδοση Τιμολογίου</Link>.</p>
      </StepCard>

      <StepCard number="3" title="Αργότερα — τίποτα προσωρινά">
        <p>Δεν εκτυπώνεται <strong>τίποτα</strong> αυτή τη στιγμή. Η παραγγελία μένει ανοιχτή και εκδίδεις παραστατικό όποτε χρειαστεί.</p>
      </StepCard>

      <StepCard number="4" title="Ακύρωση">
        <p>Κλείνει το παράθυρο χωρίς καμία ενέργεια — δεν εκτυπώνεται κάτι και δεν αλλάζει τίποτα στην παραγγελία.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Το δελτίο παραγγελίας δεν είναι απόδειξη" variant="warning">
        <p>Το δελτίο παραγγελίας <strong>δεν έχει φορολογική ισχύ</strong>. Για να κλείσει σωστά η παραγγελία, χρειάζεται στο τέλος <strong>απόδειξη</strong> ή <strong>τιμολόγιο</strong>.</p>
      </InfoBox>
    </TutorialLayout>
  );
}