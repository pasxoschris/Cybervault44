import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function Checklist() {
  return (
    <SecureTutorialLayout title="Τι να έχεις έτοιμο και λίστα ελέγχου" subtitle="Ο χάρτης για να στήσεις ένα νέο κατάστημα στο Secure">

      <Intro>
        Σε νέο κατάστημα οι ρυθμίσεις γίνονται με συγκεκριμένη σειρά, γιατί η μία χρειάζεται την άλλη (π.χ. τα προϊόντα χρειάζονται εκτυπωτές). Μάζεψε πρώτα τα στοιχεία και μετά ακολούθησε τα βήματα.
      </Intro>

      <SectionTitle>Τι να έχεις έτοιμο</SectionTitle>

      <StepCard title="Πριν ξεκινήσεις">
        <ul className="list-disc pl-5 space-y-1">
          <li>Λίστα προϊόντων με κατηγορίες, τιμές και ΦΠΑ.</li>
          <li>Κάτοψη του χώρου: ομάδες τραπεζιών (π.χ. Σάλα, Βεράντα) και αριθμό τραπεζιών.</li>
          <li>Τα ονόματα του προσωπικού και ποιος ρόλος αντιστοιχεί στον καθένα.</li>
          <li>Ποιος εκτυπωτής πάει σε ποιο πόστο (κουζίνα, μπαρ, ταμείο) και τι βγάζει ο καθένας.</li>
          <li>Τις συσκευές (iPhone/iPad) και τα τερματικά καρτών που θα χρησιμοποιηθούν.</li>
        </ul>
      </StepCard>

      <SectionTitle>Η σειρά των ρυθμίσεων</SectionTitle>

      <StepCard number="1" title="Εκτυπωτές">
        <p>Πρόσθεσε τους εκτυπωτές. Το Port είναι πάντα <strong>9100</strong>. Δες το <S to="/tutorial/secure/f-printers">μάθημα 7.1</S>.</p>
      </StepCard>

      <StepCard number="2" title="Οθόνες Κουζίνας (αν υπάρχουν) 🔓">
        <p>Αν το κατάστημα έχει οθόνες κουζίνας, ρύθμισέ τες σε αυτό το σημείο.</p>
      </StepCard>

      <StepCard number="3" title="Κατηγορίες και Προϊόντα">
        <p>Φτιάξε τις κατηγορίες και μετά τα προϊόντα, και σύνδεσέ τα με τους εκτυπωτές. Δες το <S to="/tutorial/secure/e-products">μάθημα 5.1</S>.</p>
        <p className="mt-2">⚠️ Η νέα κατηγορία έχει το <strong>Ενεργή</strong> κλειστό. Άνοιξέ το.</p>
      </StepCard>

      <StepCard number="4" title="Τραπέζια">
        <p>Φτιάξε τις ομάδες και τα τραπέζια και τακτοποίησε την κάτοψη. Δες τα μαθήματα <S to="/tutorial/secure/f-tables-list">8.1</S> και <S to="/tutorial/secure/f-floor-plan">8.2</S>.</p>
        <p className="mt-2">⚠️ Το νέο τραπέζι έχει το <strong>Ενεργό</strong> κλειστό. Άνοιξέ το.</p>
      </StepCard>

      <StepCard number="5" title="Ρόλοι, Χρήστες και Δικαιώματα">
        <p>Έλεγξε τους ρόλους, φτιάξε τους χρήστες και όρισε ποιοι έχουν Κωδικό Διαχειριστή και τι εγκρίνει. Δες τα μαθήματα <S to="/tutorial/secure/i-roles">17.6</S>, <S to="/tutorial/secure/i-users">17.1</S> και <S to="/tutorial/secure/i-admin-code-rights">17.2</S>.</p>
        <p className="mt-2">⚠️ Ο νέος χρήστης έχει το <strong>Ενεργός</strong> κλειστό. Άνοιξέ το.</p>
      </StepCard>

      <StepCard number="6" title="Σημεία Πώλησης και τερματικά">
        <p>Πρόσθεσε τις συσκευές των χρηστών και σύνδεσέ τες με το QR Code του καταστήματος. Μετά ρύθμισε τα τερματικά καρτών και τις άλλες συσκευές. Δες τα μαθήματα <S to="/tutorial/secure/f-pos-devices">7.4</S> και <S to="/tutorial/secure/f-other-devices">7.3</S>.</p>
      </StepCard>

      <StepCard number="7" title="Συγχρονισμός 🔄">
        <p>Πάτα <strong>Συγχρονισμός</strong> για να φτάσουν όλες οι αλλαγές στις συσκευές. Δες το <S to="/tutorial/secure/a-sync">μάθημα 1.3</S>.</p>
      </StepCard>

      <StepCard number="8" title="Δοκιμαστική παραγγελία">
        <p>Κάνε μια δοκιμαστική παραγγελία από μια συσκευή και έλεγξε:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>φαίνονται τα τραπέζια, οι κατηγορίες και τα προϊόντα;</li>
          <li>τυπώνει κάθε προϊόν στον σωστό εκτυπωτή;</li>
          <li>φαίνεται η παραγγελία στο Secure, στη <S to="/tutorial/secure/c-now">Τώρα</S>;</li>
        </ul>
      </StepCard>

      <InfoBox icon="💡" title="Κάτι δεν εμφανίζεται στις συσκευές;" variant="info">
        <p>Πρώτα έλεγξε ότι είναι <strong>Ενεργό</strong> και ότι έγινε <strong>Συγχρονισμός</strong> μετά την αλλαγή.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
