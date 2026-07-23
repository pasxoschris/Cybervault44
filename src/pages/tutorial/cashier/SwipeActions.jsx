import React, { useState, useEffect } from "react";
import CashierTutorialLayout from "@/components/tutorial/CashierTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";
import { ScreenshotGallery } from "@/components/tutorial/ScreenshotGallery";

const discountTypes = [
  { id: "general", label: "Γενική Έκπτωση", icon: "🏷️" },
  { id: "own", label: "Ιδιοκατανάλωση", icon: "🎁" },
  { id: "other", label: "Άλλες Εκπτώσεις", icon: "🏷️" },
];

export default function SwipeActions() {
  const [active, setActive] = useState("general");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active]);

  return (
    <CashierTutorialLayout title="Διαγραφή & Έκπτωση" subtitle="Σούρσιμο αριστερά σε είδος της παραγγελίας">
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

      <StepCard number="2" title="Εισήγαγε Κωδικό Διαχειριστή">
        <p>Για να εφαρμόσεις έκπτωση, θα σου ζητηθεί ο <strong>Κωδικός Διαχειριστή</strong>. Βάλε τον κωδικό ή σκάναρε QR.</p>
      </StepCard>

      <StepCard number="3" title="Ρύθμισε την έκπτωση">
        <p>Στην οθόνη <strong>Έκπτωση</strong>:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li>
            Επίλεξε το <strong>Είδος έκπτωσης</strong>:
            <div className="ml-6 mt-2 flex flex-col gap-2 items-start">
              <span className="rounded bg-gray-100 px-2 py-1 text-sm">Γενική Έκπτωση</span>
              <span className="rounded bg-gray-100 px-2 py-1 text-sm">Ίδια Κατανάλωση</span>
              <span className="rounded bg-gray-100 px-2 py-1 text-sm">Άλλες Εκπτώσεις</span>
            </div>
          </li>
          <li>Κύλησε τη μπάρα <strong>Έκπτωση %</strong> από <strong>0%</strong> έως <strong>100%</strong>.</li>
        </ul>
      </StepCard>

      <StepCard number="4" title="Επιβεβαίωση">
        <p>Πάτα <strong>✓</strong> για να εφαρμόσεις την έκπτωση. Η νέα τιμή εμφανίζεται αμέσως.</p>
      </StepCard>

      <InfoBox icon="💡" variant="info">
        Η τιμή δίπλα στο ποσοστό δείχνει τη νέα τιμή μετά την έκπτωση. Βεβαιώσου ότι είναι σωστή πριν επιβεβαιώσεις.
      </InfoBox>

      {/* Τύποι έκπτωσης — από Service Mode */}
      <SectionTitle>Τύποι Έκπτωσης</SectionTitle>

      <div className="flex flex-wrap gap-2">
        {discountTypes.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-2 text-sm font-medium transition-all border rounded-lg ${
              active === t.id
                ? "border-amber-500/60 bg-amber-100 text-amber-900"
                : "border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-amber-300"
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {active === "general" && (
        <>
          <ScreenshotGallery
            images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/188cb6052_14.JPG"]}
            caption="Οθόνη έκπτωσης"
          />
          <SectionTitle>Γενική Έκπτωση</SectionTitle>
          <StepCard number="1" title="Άνοιξε την παραγγελία">
            <p>Πάτα στην ανοικτή παραγγελία για να δεις τα στοιχεία της.</p>
          </StepCard>
          <StepCard number="2" title="Πάτα το εικονίδιο έκπτωσης">
            <p>Πάτησε πάνω δεξιά στις τρεις τελείες, και επέλεξε <strong>Έκπτωση</strong>.</p>
          </StepCard>
          <StepCard number="3" title="Εισήγαγε Κωδικό Διαχειριστή">
            <p>Για να εφαρμόσεις συνολική έκπτωση, θα σου ζητηθεί ο <strong>Κωδικός Διαχειριστή</strong>. Βάλε τον κωδικό ή σκάναρε QR.</p>
          </StepCard>
          <StepCard number="4" title="Ρύθμισε την έκπτωση">
            <p>Στην οθόνη <strong>Έκπτωση</strong>:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>
                Επίλεξε το <strong>Είδος έκπτωσης</strong>:
                <div className="ml-6 mt-2 flex flex-col gap-2 items-start">
                  <span className="rounded bg-gray-100 px-2 py-1 text-sm">Γενική Έκπτωση</span>
                  <span className="rounded bg-gray-100 px-2 py-1 text-sm">Ίδια Κατανάλωση</span>
                  <span className="rounded bg-gray-100 px-2 py-1 text-sm">Άλλες Εκπτώσεις</span>
                </div>
              </li>
              <li>Κύλησε τη μπάρα <strong>Έκπτωση %</strong> από <strong>0%</strong> έως <strong>100%</strong>.</li>
            </ul>
          </StepCard>
          <StepCard number="5" title="Επιβεβαίωση">
            <p>Πάτα <strong>✓</strong> για να εφαρμόσεις την έκπτωση. Η νέα τιμή εμφανίζεται αμέσως.</p>
          </StepCard>
          <InfoBox icon="💡" variant="info">
            Η τιμή δίπλα στο ποσοστό δείχνει τη νέα τιμή μετά την έκπτωση. Βεβαιώσου ότι είναι σωστή πριν επιβεβαιώσεις.
          </InfoBox>
        </>
      )}

      {active === "own" && (
        <>
          <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/77e2ef6c1_15.JPG"]} caption="Ιδιοκατανάλωση" />
          <SectionTitle>Ιδιοκατανάλωση</SectionTitle>
          <InfoBox icon="🎁" title="Τι είναι η Ιδιοκατανάλωση;" variant="info">
            Χρησιμοποιείται όταν θέλεις να κεράσεις το τραπέζι ή να περάσεις κατανάλωση ως εσωτερική χρήση. Εφαρμόζει 100% έκπτωση (ή συγκεκριμένο ποσοστό ανάλογα με τη ρύθμιση).
          </InfoBox>
          <StepCard number="1" title="Άνοιξε έκπτωση">
            <p>Ακολούθησε τα ίδια βήματα με τη Γενική Έκπτωση (εικονίδιο Σ% + κωδικός διαχειριστή).</p>
          </StepCard>
          <StepCard number="2" title="Επίλεξε «Ιδιο Κατανάλωση»">
            <p>Στο πεδίο <strong>«Είδος έκπτωσης»</strong> επίλεξε <strong>«Ιδιο Κατανάλωση»</strong>. Το ποσοστό θα συμπληρωθεί αυτόματα (π.χ. 70%).</p>
          </StepCard>
          <StepCard number="3" title="Επίλεξε προϊόντα και επιβεβαίωσε">
            <p>Επίλεξε τα προϊόντα και πάτα <strong>✓</strong>.</p>
          </StepCard>
        </>
      )}

      {active === "other" && (
        <>
          <SectionTitle>Άλλες Εκπτώσεις</SectionTitle>
          <InfoBox icon="🏷️" title="Τι είναι οι Άλλες Εκπτώσεις;" variant="info">
            Είναι κατηγορίες εκπτώσεων που έχεις φτιάξει εσύ στο διαχειριστικό, για ειδικές περιπτώσεις (π.χ. εργαζόμενοι, τακτικοί πελάτες, προσωπικές εκπτώσεις).
          </InfoBox>
          <StepCard number="1" title="Άνοιξε έκπτωση">
            <p>Μπες στο εικονίδιο έκπτωσης και δώσε κωδικό διαχειριστή.</p>
          </StepCard>
          <StepCard number="2" title="Επίλεξε «Άλλες Εκπτώσεις»">
            <p>Από το μενού <strong>«Είδος έκπτωσης»</strong> επίλεξε <strong>«Άλλες Εκπτώσεις»</strong> και βρες την κατηγορία που έχεις δημιουργήσει.</p>
          </StepCard>
          <StepCard number="3" title="Επίλεξε προϊόντα και επιβεβαίωσε">
            <p>Επίλεξε τα προϊόντα που θέλεις να εκπτώσεις, ρύθμισε το ποσοστό αν χρειάζεται και πάτα <strong>✓</strong>.</p>
          </StepCard>
          <InfoBox icon="💡" variant="info">
            Οι κατηγορίες δημιουργούνται από το διαχειριστικό. Αν δεν βλέπεις αυτή που χρειάζεσαι, ζήτα από τον διαχειριστή να τη φτιάξει.
          </InfoBox>
        </>
      )}

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