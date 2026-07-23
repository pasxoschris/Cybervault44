import React, { useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";

export default function SwipeActions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CashierTutorialLayout title="Διαγραφή & Έκπτωση Είδους" subtitle="Σούρσιμο αριστερά σε είδος της παραγγελίας">
      <InfoBox icon="👈" title="Τι θα μάθεις" variant="purple">
        <p>Για να εφαρμόσεις <strong>έκπτωση</strong> ή να <strong>διαγράψεις</strong> ένα συγκεκριμένο είδος μέσα στην παραγγελία, <strong>σούρε το αριστερά</strong>. Εμφανίζονται δύο κουμπιά: <strong>«Έκπτωση»</strong> και <strong>«Διαγραφή»</strong>.</p>
      </InfoBox>

      <SectionTitle>Η κίνηση Swipe</SectionTitle>

      <div className="flex justify-center">
        <img
          src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/9366f7756_image.png"
          alt="Swipe αριστερά σε είδος — Έκπτωση / Διαγραφή"
          className="w-full max-w-md h-auto rounded-xl border border-gray-200 shadow-sm"
        />
      </div>

      <StepCard number="1" title="Σούρε το είδος αριστερά">
        <p>Στη λίστα «Προϊόντα», <strong>κράτα και σούρε αριστερά</strong> τη γραμμή του είδους που θέλεις να επεξεργαστείς (π.χ. Double Espresso).</p>
      </StepCard>

      <StepCard number="2" title="Εμφανίζονται δύο κουμπιά">
        <p>Καθώς σούρεις, αποκαλύπτονται δύο κουμπιά δεξιά της γραμμής:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li><strong>«Έκπτωση»</strong> — σκούρο μπλε κουμπί για έκπτωση σε <em>αυτό το είδος</em>.</li>
          <li><strong>«Διαγραφή»</strong> — <span className="text-red-600 font-semibold">κόκκινο</span> κουμπί για αφαίρεση του είδους.</li>
        </ul>
      </StepCard>

      <SectionTitle>Έκπτωση Είδους</SectionTitle>

      <StepCard number="1" title="Πάτα «Έκπτωση»">
        <p>Πάτα το σκούρο μπλε κουμπί <strong>«Έκπτωση»</strong>. Ανοίγει το παράθυρο έκπτωσης για <strong>αυτό το είδος μόνο</strong> — όχι για όλη την παραγγελία.</p>
      </StepCard>

      <StepCard number="2" title="Όρισε ποσοστό ή ποσό">
        <p>Εισήγαγε το ποσοστό ή το ποσό έκπτωσης και επιβεβαίωσε. Η τιμή του είδους ενημερώνεται και το σύνολο αναπροσαρμόζεται.</p>
      </StepCard>

      <SectionTitle>Διαγραφή Είδους</SectionTitle>

      <StepCard number="1" title="Πάτα «Διαγραφή»">
        <p>Πάτα το <span className="text-red-600 font-semibold">κόκκινο</span> κουμπί <strong>«Διαγραφή»</strong>. Το είδος αφαιρείται αμέσως από την παραγγελία και το σύνολο μειώνεται.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Προσοχή" variant="warning">
        <ul className="list-disc pl-5 mt-1 space-y-1.5">
          <li>Η <strong>έκπτωση με swipe</strong> αφορά <em>ένα είδος</em>. Η έκπτωση από τη μπάρα «Επεξεργασία Παραγγελίας» αφορά <em>όλη</em> την παραγγελία.</li>
          <li>Η <strong>Διαγραφή</strong> αφαιρεί μόνο το είδος, όχι όλη την παραγγελία (για αυτό υπάρχει ο κάδος στην επικεφαλίδα).</li>
        </ul>
      </InfoBox>

      <InfoBox icon="💡" title="Συνοπτικά" variant="info">
        <p><strong>Σούρε αριστερά → Έκπτωση (είδος) ή Διαγραφή (είδος)</strong>. Γρήγορος τρόπος να διορθώσεις μια παραγγελία χωρίς να ανοίξεις το παράθυρο επεξεργασίας.</p>
      </InfoBox>
    </CashierTutorialLayout>
  );
}