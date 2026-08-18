import { StepCard, InfoBox } from "./StepCard";
import { AlertTriangle } from "lucide-react";

export default function PrinterWarningContent() {
  return (
    <>
      <StepCard number="1" title="Τι σημαίνει το προειδοποιητικό τρίγωνο">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={18} className="text-amber-600" />
          </span>
          <span className="font-semibold text-gray-800">Προειδοποιητικό τρίγωνο</span>
        </div>
        <p>
          Το προειδοποιητικό τρίγωνο που εμφανίζεται στην εφαρμογή <strong>δεν αποτελεί δυσλειτουργία του λογισμικού</strong>. Εμφανίζεται όταν η εφαρμογή δεν μπορεί να εντοπίσει ή να επικοινωνήσει με τον εκτυπωτή.
        </p>
      </StepCard>

      <StepCard number="2" title="Πότε εμφανίζεται">
        <p className="mb-3">Αυτό μπορεί να συμβεί όταν:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>ο εκτυπωτής δεν είναι συνδεδεμένος στο <strong>σωστό δίκτυο</strong>,</li>
          <li>έχει καταχωριστεί <strong>λανθασμένη διεύθυνση IP</strong>,</li>
          <li>ο εκτυπωτής είναι <strong>εκτός ρεύματος</strong> ή εκτός λειτουργίας,</li>
          <li>το κινητό ή η συσκευή στην οποία λειτουργεί η εφαρμογή είναι συνδεδεμένη σε <strong>διαφορετικό δίκτυο</strong>,</li>
          <li>η υφιστάμενη <strong>δικτυακή υποδομή</strong> ή η παραμετροποίηση του <strong>access point</strong> δεν επιτρέπει την επικοινωνία της εφαρμογής με τον εκτυπωτή.</li>
        </ul>
      </StepCard>

      <InfoBox icon="💡" title="Τι να ελέγξεις" variant="warning">
        <p>
          Βεβαιώσου ότι ο εκτυπωτής και η συσκευή βρίσκονται στο <strong>ίδιο δίκτυο</strong>, ότι η <strong>διεύθυνση IP</strong> είναι σωστή και ότι ο εκτυπωτής είναι <strong>ενεργοποιημένος</strong>. Αν το πρόβλημα παραμένει, επικοινώνησε με τον διαχειριστή του καταστήματος.
        </p>
      </InfoBox>
    </>
  );
}