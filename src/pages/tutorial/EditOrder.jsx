import React from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

const tools = [
  { icon: "↗", label: "Δημιουργία νέας παραγγελίας", desc: "Δημιουργεί νέα παραγγελία με τα επιλεγμένα προϊόντα (χρήσιμο για μεταφορά μέρους παραγγελίας)" },
  { icon: "🚫", label: "Έκδοση Ακυρωτικού Δελτίου", desc: "Ακυρώνει τα επιλεγμένα προϊόντα και στέλνει ακυρωτικό στην κουζίνα" },
  { icon: "Σ%", label: "Έκπτωση", desc: "Εφαρμόζει έκπτωση στα επιλεγμένα προϊόντα" },
  { icon: "💶", label: "Πληρωμή", desc: "Πληρώνει τα επιλεγμένα προϊόντα (μερική πληρωμή)" },
];

export default function EditOrder() {
  return (
    <TutorialLayout title="Επεξεργασία Παραγγελίας" subtitle="Εργαλεία για επεξεργασία ανοικτής παραγγελίας">

      <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/066594d33_16.JPG"]} caption="Επεξεργασία παραγγελίας — εργαλεία" />

      <SectionTitle>Πώς να μπεις στην Επεξεργασία</SectionTitle>

      <StepCard number="1" title="Άνοιξε την παραγγελία">
        <p>Πάτα στη λίστα παραγγελιών πάνω στην παραγγελία που θέλεις να επεξεργαστείς.</p>
      </StepCard>
      <StepCard number="2" title="Πάτα το εικονίδιο επεξεργασίας">
        <p>Στην κεφαλίδα, πάτα το εικονίδιο <strong>✏️ (Επεξεργασία Παραγγελίας)</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Επίλεξε προϊόντα">
        <p>Στη λίστα προϊόντων, τσεκάρε ένα ή περισσότερα. Στη συνέχεια επίλεξε από τα εργαλεία παρακάτω.</p>
      </StepCard>

      <SectionTitle>Εργαλεία Επεξεργασίας</SectionTitle>

      <div className="grid gap-3">
        {tools.map((t, i) => (
          <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md"
              style={{ background: "linear-gradient(135deg, #5B21B6, #2D2B55)" }}
            >
              {t.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-base" style={{ fontFamily: 'Inter, sans-serif' }}>{t.label}</h3>
              <p className="text-gray-600 text-base leading-relaxed mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <InfoBox icon="↗" title="Δημιουργία νέας παραγγελίας" variant="info">
        <strong>Δεν μπορεί να δημιουργηθεί νέα παραγγελία με ήδη πληρωμένα προϊόντα.</strong>
      </InfoBox>

      <InfoBox icon="⚠️" title="Πιστωτικό σε προϊόν με μηδενική τιμή" variant="info">
        Αν υπάρχει <strong>προϊόν με μηδενική τιμή</strong>, πρέπει να <strong>μην είναι επιλεγμένο</strong>, καθώς δεν μπορεί να εκδοθεί <strong>Πιστωτικό Στοιχείο Λιανικής</strong> για αυτό το προϊόν.
      </InfoBox>

      <InfoBox icon="💡" title="Μερική Πληρωμή" variant="info">
        Επιλέγοντας συγκεκριμένα προϊόντα και πατώντας «Πληρωμή», μπορείς να πληρώσεις <strong>μέρος της παραγγελίας</strong> χωρίς να κλείσει ολόκληρο το τραπέζι.
      </InfoBox>

      <InfoBox icon="ℹ️" title="Πληρωμή από την Επεξεργασία" variant="info">
        Αν πληρώσεις από την Επεξεργασία Παραγγελίας, η παραγγελία <strong>δεν κλείνει αυτόματα</strong>: μένει στις <strong>Ανοικτές</strong> και κλείνει με το <strong>Κλείσιμο Βάρδιας</strong>.
      </InfoBox>
    </TutorialLayout>
  );
}