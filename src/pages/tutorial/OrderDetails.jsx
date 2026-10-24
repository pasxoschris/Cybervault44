import React, { useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";
import { Tag, Clock, Users, LayoutGrid, Palette, MessageSquare, ShoppingBasket, Euro } from "lucide-react";
import OrderDetailsMock, { Marker } from "../../components/tutorial/OrderDetailsMock";

// Η σειρά ακολουθεί την οθόνη «Στοιχεία Παραγγελίας» της εφαρμογής.
const overviewRows = [
  { label: "ΝΕΑ / ΑΝΟΙΚΤΗ ΠΑΡΑΓΓΕΛΙΑ", desc: "Η κατάσταση της παραγγελίας", icon: Tag },
  { label: "Ώρα", desc: "Η ώρα δημιουργίας της παραγγελίας", icon: Clock },
  { label: "Άτομα", desc: "Ο αριθμός ατόμων", icon: Users },
  { label: "Τραπέζι", desc: "Πατώντας το επιλέγεις ή αλλάζεις τραπέζι", icon: LayoutGrid },
  { label: "Χρώμα", desc: "Πατώντας το διαλέγεις χρώμα για τη λίστα παραγγελιών", icon: Palette },
  { label: "Εισάγετε σχόλιο", desc: "", icon: MessageSquare },
  { label: "Προϊόντα", desc: "Η λίστα με τα προϊόντα της παραγγελίας", icon: ShoppingBasket },
  { label: "Σύνολο", desc: "Το συνολικό ποσό", icon: Euro },
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
      <div className="max-w-2xl w-full mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
        <OrderDetailsMock />
        <p className="text-base text-gray-600 mt-6 mb-3">Τι δείχνει κάθε αριθμός:</p>
        <ul className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
          {overviewRows.map((row, i) => {
            const IconComponent = row.icon;
            return (
              <li key={row.label} className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-100 last:border-0">
                <Marker n={i + 1} className="w-7 h-7 text-xs ring-0" />
                <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                  <IconComponent size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">{row.label}</p>
                  {row.desc && <p className="text-sm text-gray-600 mt-0.5">{row.desc}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <InfoBox icon="💡" title="Επιλογή τραπεζιού" variant="info">
        Τραπέζι μπορείς να επιλέξεις και μετά τη δημιουργία της παραγγελίας: στα <strong>Στοιχεία Παραγγελίας</strong> πάτα πάνω στο πεδίο <strong>«Τραπέζι»</strong>.
      </InfoBox>
      <InfoBox icon="🎨" title="Χρώμα παραγγελίας" variant="info">
        Πάτα <strong>«Χρώμα»</strong> στα Στοιχεία Παραγγελίας και διάλεξε ένα από τα χρώματα. Η παραγγελία θα εμφανίζεται με αυτό το χρώμα στη λίστα παραγγελιών, ώστε να την ξεχωρίζεις εύκολα.
      </InfoBox>
      <InfoBox icon="⋯" title="Μενού επιλογών (···)" variant="info">
        Στα δεξιά της επικεφαλίδας υπάρχουν 3 τελείες (···) που ανοίγουν επιπλέον επιλογές:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Έκπτωση (Συνολική Έκπτωση επί της παραγγελίας -θα ζητήσει Κωδικό Διαχειριστή)</li>
          <li>Αν θέλεις να κάνεις Έκπτωση σε ένα μόνο προϊόν, σέρνεις το προϊόν προς τα αριστερά</li>
          <li>Ιδιο Κατανάλωση (θα σου ζητήσει qr υπαλλήλου) - Εναλλακτικά πας Έκπτωση και το περνάς σαν είδος Έκπτωσης</li>
          <li>Έκδοση Τιμολογίου (εφόσον έχει ενεργοποιηθεί για αυτή τη συσκευή)</li>
        </ul>
      </InfoBox>
    </TutorialLayout>
  );
}