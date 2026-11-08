import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { Cloud, Wifi, WifiOff } from "lucide-react";

export default function SyncStatus() {
  return (
    <TutorialLayout
      title="Δείκτης Σύνδεσης & Συγχρονισμού"
      subtitle="Πώς να επιβεβαιώσεις ότι η συσκευή είναι συνδεδεμένη και τα δεδομένα σου συγχρονίζονται"
    >
      <StepCard number="1" title="Πού βρίσκεται ο δείκτης">
        <p>
          Στο <strong>κάτω μέρος της οθόνης</strong> του SpotlightPOS εμφανίζεται ένας δείκτης που δείχνει την κατάσταση σύνδεσης και συγχρονισμού με το Cloud.
        </p>
      </StepCard>

      <StepCard number="2" title="Πράσινη κουκίδα — Συνδεδεμένο">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block flex-shrink-0 shadow-[0_0_6px_rgba(0,200,83,0.6)]"></span>
          <span className="font-semibold text-gray-800">Πράσινη κουκίδα + «All synced»</span>
        </div>
        <p>
          Υπάρχει <strong>ενεργή σύνδεση δικτύου</strong>. Τα προϊόντα που έχεις βάλει στην παραγγελία έχουν <strong>συγχρονιστεί επιτυχώς στο Cloud</strong>.
        </p>
      </StepCard>

      <StepCard number="3" title="«Syncing… N items» — Συγχρονισμός σε εξέλιξη">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block flex-shrink-0"></span>
          <span className="font-semibold text-gray-800">«Syncing… 2 items»</span>
        </div>
        <p>
          Η συσκευή στέλνει στο Cloud όσα εκκρεμούν. Ο αριθμός δείχνει πόσα απομένουν. Περίμενε να γίνει <strong>«All synced»</strong>.
        </p>
      </StepCard>

      <StepCard number="4" title="Κόκκινη κουκίδα — Χωρίς σύνδεση">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block flex-shrink-0 shadow-[0_0_6px_rgba(229,57,53,0.6)]"></span>
          <span className="font-semibold text-gray-800">Κόκκινη κουκίδα</span>
        </div>
        <p>
          <strong>Δεν υπάρχει σύνδεση δικτύου</strong>. Τα προϊόντα που προσθέτεις στην παραγγελία παραμένουν τοπικά και <strong>δεν συγχρονίζονται</strong> μέχρι να επανέλθει η σύνδεση.
        </p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Μήνυμα «Συγχρονισμός...»" variant="info">
        <p>
          Όταν ο Διαχειριστής κάνει αλλαγές στο <strong>Secure (Διαχειριστικό)</strong>, π.χ. σε προϊόντα, τιμές ή ρυθμίσεις, και πατήσει <strong>Συγχρονισμός</strong>, οι αλλαγές περνούν αυτόματα στη συσκευή σου. Για λίγα δευτερόλεπτα η οθόνη σκουραίνει και εμφανίζεται το μήνυμα <strong>«Συγχρονισμός...»</strong>.
        </p>
        <p className="mt-2">
          Δεν χρειάζεται να πατήσεις τίποτα. <strong>Περίμενε να εξαφανιστεί</strong> και συνέχισε κανονικά.
        </p>
        <div className="mt-3 flex justify-center">
          <img
            src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/90df3e3a3_sync-message.webp"
            alt="Μήνυμα «Συγχρονισμός...» στην εφαρμογή"
            className="w-full max-w-xs h-auto rounded-2xl border border-gray-200"
          />
        </div>
      </InfoBox>

      <InfoBox icon="💡" title="Γιατί έχει σημασία" variant="info">
        <p>
          Πριν προχωρήσεις σε πληρωμή ή κλείσιμο βάρδιας, έλεγξε πάντα ότι ο δείκτης είναι <strong>πράσινος</strong>. Αν είναι κόκκινος, περίμενε να επανέλθει το δίκτυο για να διασφαλίσεις ότι καμία παραγγελία δεν θα χαθεί.
        </p>
      </InfoBox>
    </TutorialLayout>
  );
}