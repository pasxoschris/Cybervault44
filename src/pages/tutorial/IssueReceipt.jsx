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
        <p className="mt-2">Στη συνέχεια ανοίγει το παράθυρο <strong>«Τρόπος Πληρωμής»</strong>, όπου επιλέγεις πώς πληρώνει ο πελάτης — δες το μάθημα <Link to="/tutorial/payment" className="underline font-semibold">Πληρωμή</Link>.</p>
      </StepCard>

      <StepCard number="2" title="Δελτίο Παραγγελίας — πρώτα δελτίο, μετά παραστατικό">
        <p>Εκτυπώνεται <strong>Δελτίο παραγγελίας</strong>. 
        Στο τέλος, εκδίδεις <strong>Απόδειξη Λιανικής</strong> (με την <Link to="/tutorial/payment" className="text-purple-600 underline hover:text-purple-800 font-semibold">Πληρωμή</Link>) ή <strong>Τιμολόγιο</strong> (<Link to="/tutorial/invoice" className="text-purple-600 underline hover:text-purple-800 font-semibold">Έκδοση Τιμολογίου</Link>).</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Το Δελτίο Παραγγελίας δεν είναι απόδειξη" variant="info">
        <p>Είναι ειδικό στοιχείο που φέρει σήμανση από τον Πάροχο και κλείνει με παραστατικά αξίας, δηλαδή πρέπει να εκδοθεί Απόδειξη Λιανικής Πώλησης ή Τιμολόγιο. </p>
      </InfoBox>

      <StepCard number="3" title="Αργότερα — τίποτα προσωρινά">
        <p>Δεν εκτυπώνεται <strong>τίποτα</strong> αυτή τη στιγμή και η παραγγελία μένει ανοιχτή.</p>
        <p className="mt-2">Η επιλογή εμφανίζεται μόνο αν έχει ενεργοποιηθεί.</p>
      </StepCard>

      <StepCard number="4" title="Ακύρωση">
        <p>Κλείνει το παράθυρο χωρίς καμία ενέργεια — δεν εκτυπώνεται κάτι και δεν αλλάζει τίποτα στην παραγγελία.</p>
      </StepCard>

      <SectionTitle>Σε ανοιχτή παραγγελία</SectionTitle>
      <InfoBox icon="🔒" title="Ο εκτυπωτής με το λουκέτο" variant="purple">
        <p>Σε ανοιχτή παραγγελία, στα <strong>Στοιχεία Παραγγελίας</strong>, ο εκτυπωτής εμφανίζεται <strong>με λουκέτο</strong>. Πατώντας τον ανοίγει μενού με τρεις επιλογές.</p>
      </InfoBox>
      <StepCard number="1" title="Εκτύπωση Δελτίου Παραγγελίας">
        <p>Εκτυπώνει <strong>Δελτίο Παραγγελίας</strong> με όλα τα προϊόντα της παραγγελίας, ή μόνο με όσα επιλέξεις με τη γραφίδα (✏️).</p>
      </StepCard>
      <StepCard number="2" title="Εκτύπωση Συνολικής Παραγγελίας (pre-bill)">
        <p>Εκτυπώνει τον <strong>προσωρινό λογαριασμό</strong> της παραγγελίας, για να δει ο πελάτης τι κατανάλωσε πριν πληρώσει.</p>
        <p className="mt-2">⚠️ <strong>Δεν είναι απόδειξη</strong> ούτε νόμιμο φορολογικό στοιχείο. Μετά πρέπει να εκδοθεί <strong>Απόδειξη Λιανικής</strong> ή <strong>Τιμολόγιο</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Επανεκτύπωση παραγγελίας" admin>
        <p>Ξαναστέλνει την παραγγελία στους <strong>εκτυπωτές κουζίνας/μπαρ</strong>, π.χ. αν δεν τυπώθηκε. Ζητείται <strong>Κωδικός Διαχειριστή</strong>.</p>
      </StepCard>
    </TutorialLayout>
  );
}