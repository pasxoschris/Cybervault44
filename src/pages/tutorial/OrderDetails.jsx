import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

const overviewRows = [
  ["ΑΝΟΙΚΤΗ ΠΑΡΑΓΓΕΛΙΑ", "Κατάσταση παραγγελίας"],
  ["Άτομα", "Αριθμός ατόμων (π.χ. 2)"],
  ["Τραπέζι", "Αριθμός τραπεζιού (π.χ. A4)"],
  ["Ώρα", "Ώρα παραγγελίας"],
  ["Προϊόντα", "Λίστα παραγγελθέντων"],
  ["Σύνολο", "Συνολικό ποσό"],
];

export default function OrderDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Στοιχεία Παραγγελίας" subtitle="Διαχείριση ανοικτής παραγγελίας">
      <ScreenshotGallery
        images={[
          "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/fd09ecd13_8.JPG",
          "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/fde4eecb0_9.JPG",
        ]}
        caption="Στοιχεία παραγγελίας — επιλογές"
      />
      <SectionTitle>Στοιχεία Ανοικτής Παραγγελίας</SectionTitle>
      <div className="border border-[#00D4FF]/10 bg-[#0D1526]/70 p-4">
        <p className="font-rajdhani text-sm text-white/50 mb-3">Στην οθόνη παραγγελίας βλέπεις:</p>
        <div className="border border-[#00D4FF]/10 bg-[#080c20]/60 rounded-sm overflow-hidden">
          {overviewRows.map(([label, val]) => (
            <div key={label} className="flex items-start gap-2 py-2 px-3 border-b border-[#00D4FF]/10 last:border-0 font-rajdhani text-sm">
              <span className="text-white/80 font-semibold min-w-[160px] flex-shrink-0">{label}</span>
              <span className="text-white/50">{val}</span>
            </div>
          ))}
        </div>
      </div>
      <InfoBox icon="⋯" title="Μενού επιλογών (···)" variant="info">
        Στα δεξιά της επικεφαλίδας υπάρχουν 3 τελείες (···) που ανοίγουν επιπλέον επιλογές:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Έκπτωση (Συνολική Έκπτωση επί της παραγγελίας -θα ζητήσει Κωδικό Διαχειριστή)</li>
          <li>Αν θέλεις να κάνεις Έκπτωση σε ένα μόνο προϊόν, σέρνεις το προϊόν προς τα αριστερά</li>
          <li>Ιδιο Κατανάλωση (θα σου ζητήσει qr υπαλλήλου) - Εναλλακτικά πας Έκπτωση και το περνάς σαν είδος Έκπτωσης</li>
          <li>Έκδοση Τιμολογίου (εφόσον έχει ενεργοποιηθεί για αυτή τη συσκευή)</li>
          <li>Order extra charges και discard(αν εχει ενεργοποιηθεί)</li>
          <li>Έλεγχος πληρωμών Spotit και MezePay (αν έχουν ενεργοποιηθεί)</li>
        </ul>
      </InfoBox>
    </TutorialLayout>
  );
}