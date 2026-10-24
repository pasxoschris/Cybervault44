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
        <p>Σε <strong>νέα παραγγελία</strong>, στην οθόνη <strong>Στοιχεία Παραγγελίας</strong> πάτα το εικονίδιο του <strong>εκτυπωτή</strong> (κάτω αριστερά). Ανοίγει το παράθυρο <strong>«Έκδοση Παραστατικού»</strong> και διαλέγεις τι θα γίνει με το παραστατικό της παραγγελίας.</p>
      </InfoBox>

      <SectionTitle>Οι επιλογές σου</SectionTitle>

      <StepCard number="1" title="Απόδειξη Λιανικής Πώλησης — εκτύπωση κατευθείαν">
        <p>Εκτυπώνεται <strong>αμέσως</strong> η απόδειξη λιανικής της παραγγελίας. Διάλεξέ το όταν ο πελάτης πληρώνει τώρα και θέλει την απόδειξη στο χέρι.</p>
      </StepCard>

      <StepCard number="2" title="Δελτίο Παραγγελίας — πρώτα δελτίο, μετά παραστατικό">
        <p>Εκτυπώνεται <strong>Δελτίο παραγγελίας</strong>. 
        Στο τέλος, εκδίδεις <strong>Απόδειξη Λιανικής</strong> ή <strong>Τιμολόγιο</strong> </p>
      </StepCard>

      <StepCard number="3" title="Αργότερα — τίποτα προσωρινά">
        <p>Δεν εκτυπώνεται <strong>τίποτα</strong> αυτή τη στιγμή και η παραγγελία μένει ανοιχτή.</p>
      </StepCard>

      <StepCard number="4" title="Ακύρωση">
        <p>Κλείνει το παράθυρο χωρίς καμία ενέργεια — δεν εκτυπώνεται κάτι και δεν αλλάζει τίποτα στην παραγγελία.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Σε ανοικτή παραγγελία" variant="info">
        <p>Αν η παραγγελία είναι <strong>ανοικτή</strong>, ο εκτυπωτής δεν ανοίγει το «Έκδοση Παραστατικού» αλλά δίνει τις επιλογές:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Εκτύπωση Δελτίου Παραγγελίας</li>
          <li>Εκτύπωση Συνολικής Παραγγελίας</li>
          <li>Επανεκτύπωση παραγγελίας</li>
        </ul>
      </InfoBox>

      <InfoBox icon="⚠️" title="Το Δελτίο Παραγγελίας δεν είναι απόδειξη" variant="info">
              <p>Είναι ειδικό στοιχείο που φέρει σήμανση από τον Πάροχο και κλείνει με παραστατικά αξίας, δηλαδή πρέπει να εκδοθεί Απόδειξη Λιανικής Πώλησης ή Τιμολόγιο. </p>
      </InfoBox>
    </TutorialLayout>
  );
}