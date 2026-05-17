import React, { useState } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

const tabs = [
  { id: "view", label: "Παραγγελίες Βάρδιας", icon: "📋" },
  { id: "analysis", label: "Ανάλυση Βάρδιας", icon: "📊" },
  { id: "close", label: "Κλείσιμο Βάρδιας", icon: "🔒" },
];

export default function Shift() {
  const [active, setActive] = useState("view");

  return (
    <TutorialLayout title="Παραγγελίες Βάρδιας" subtitle="Διαχείριση και ανάλυση της βάρδιας">

      <InfoBox icon="⚙️" title="Απαιτείται ενεργοποίηση" variant="warning">
        Για να εμφανίζεται η λειτουργία <strong>Παραγγελίες Βάρδιας</strong>, πρέπει να είναι ενεργοποιημένη στις ρυθμίσεις του διαχειριστικού: <em>Διαχειριστής → Κατάστημα → Άλλες Υπηρεσίες → Παραγγελίες Βάρδιας: ON</em>
      </InfoBox>

      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-2 text-sm font-medium transition-all border ${
              active === t.id
                ? "border-purple-500/60 bg-purple-900/30 text-white"
                : "border-[#00D4FF]/10 bg-[#0D1526]/70 text-white/50 hover:text-white/80 hover:border-[#00D4FF]/25"
            }`}
          >
            {t.icon} <span className="font-rajdhani">{t.label}</span>
          </button>
        ))}
      </div>

      {active === "view" && (
        <>
          <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/ecc8a9261_20.JPG"]} caption="Παραγγελίες βάρδιας — ρύθμιση ενεργοποίησης" />
          <SectionTitle>Προβολή Παραγγελιών Βάρδιας</SectionTitle>
          <StepCard number="1" title="Άνοιξε την οθόνη Βάρδιας">
            <p>Από το μενού της εφαρμογής, επίλεξε <strong>«Παραγγελίες Βάρδιας»</strong>.</p>
          </StepCard>
          <StepCard number="2" title="Βλέπεις τις παραγγελίες">
            <p>Εμφανίζεται λίστα με όλες τις παραγγελίες της βάρδιας. Για κάθε παραγγελία βλέπεις:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Τραπέζι &amp; αριθμός</li>
              <li>Ώρα παραγγελίας</li>
              <li>Αριθμός ατόμων &amp; προϊόντων</li>
              <li>Κατάσταση (ολοκληρωμένη ✓ / ανοικτή)</li>
            </ul>
          </StepCard>
          <StepCard number="3" title="Φιλτράρισμα">
            <p>Χρησιμοποίησε το εικονίδιο <strong>φίλτρου (▽)</strong> για να βλέπεις μόνο συγκεκριμένες παραγγελίες.</p>
          </StepCard>
          <StepCard number="4" title="Επαναφορά παραγγελίας">
            <p>Αν θέλεις να επαναφέρεις μια ολοκληρωμένη παραγγελία, επίλεξέ την και πάτα <strong>«Επαναφορά»</strong>.</p>
          </StepCard>
          <StepCard number="5" title="Επανεκτύπωση Απόδειξης">
            <p>Επίλεξε παραγγελία και πάτα <strong>«Επανεκτύπωση Απόδειξης»</strong> για να ξαναεκτυπώσεις.</p>
          </StepCard>
        </>
      )}

      {active === "analysis" && (
        <>
          <SectionTitle>Ανάλυση Βάρδιας</SectionTitle>
          <StepCard number="1" title="Άνοιξε Ανάλυση Βάρδιας">
            <p>Από τις Παραγγελίες Βάρδιας, επίλεξε <strong>«Ανάλυση Βάρδιας»</strong>.</p>
          </StepCard>
          <InfoBox icon="📊" title="Τι περιλαμβάνει η ανάλυση;" variant="info">
            <ul className="space-y-1">
              <li>• Σύνολο πωλήσεων ανά κατηγορία</li>
              <li>• Αριθμός παραγγελιών</li>
              <li>• Ανάλυση ανά τρόπο πληρωμής</li>
              <li>• Εκπτώσεις που δόθηκαν</li>
            </ul>
          </InfoBox>
          <StepCard number="2" title="Εκτύπωση Αναφοράς">
            <p>Πάτα <strong>«Εκτύπωση Αναφοράς Βάρδιας»</strong> για να εκτυπώσεις αναλυτική αναφορά.</p>
          </StepCard>
        </>
      )}

      {active === "close" && (
        <>
          <SectionTitle>Κλείσιμο Βάρδιας</SectionTitle>
          <InfoBox icon="⚠️" title="Προσοχή" variant="warning">
            Το κλείσιμο βάρδιας είναι <strong>μη αναστρέψιμη ενέργεια</strong>. Βεβαιώσου ότι όλες οι παραγγελίες έχουν ολοκληρωθεί.
          </InfoBox>
          <StepCard number="1" title="Έλεγξε ανοικτές παραγγελίες">
            <p>Βεβαιώσου ότι δεν υπάρχουν ανοικτές παραγγελίες. Αν υπάρχουν, ολοκλήρωσέ τες πρώτα.</p>
          </StepCard>
          <StepCard number="2" title="Πάτα «Κλείσιμο Βάρδιας»">
            <p>Από τις Παραγγελίες Βάρδιας, επίλεξε <strong>«Κλείσιμο Βάρδιας»</strong>.</p>
          </StepCard>
          <StepCard number="3" title="Επιβεβαίωση">
            <p>Επιβεβαίωσε το κλείσιμο. Η βάρδια κλείνει και μπορείς να αποσυνδεθείς ή να ξεκινήσεις νέα βάρδια.</p>
          </StepCard>
          <InfoBox icon="💡" variant="info">
            Μετά το κλείσιμο βάρδιας, μπορείς να <strong>Αποσυνδεθείς</strong> από το μενού της εφαρμογής για να την ελευθερώσεις για άλλο χρήστη.
          </InfoBox>
        </>
      )}
    </TutorialLayout>
  );
}