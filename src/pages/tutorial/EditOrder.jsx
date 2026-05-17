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
          <div key={i} className="border border-[#00D4FF]/10 bg-[#0D1526]/70 p-4 flex items-start gap-4 relative">
            <div className="w-10 h-10 border border-purple-500/40 bg-purple-900/20 flex items-center justify-center text-[#A78BFA] font-bold text-sm flex-shrink-0 font-mono-cyber">
              {t.icon}
            </div>
            <div>
              <p className="font-orbitron text-sm font-bold text-white tracking-wide">{t.label}</p>
              <p className="font-rajdhani text-sm text-white/50 mt-0.5">{t.desc}</p>
            </div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-500/20" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-500/20" />
          </div>
        ))}
      </div>

      <InfoBox icon="💡" title="Μερική Πληρωμή" variant="info">
        Επιλέγοντας συγκεκριμένα προϊόντα και πατώντας «Πληρωμή», μπορείς να πληρώσεις <strong>μέρος της παραγγελίας</strong> χωρίς να κλείσει ολόκληρο το τραπέζι.
      </InfoBox>
    </TutorialLayout>
  );
}