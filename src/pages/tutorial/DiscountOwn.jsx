import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TutorialLayout from "@/components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "@/components/tutorial/StepCard";
import { ScreenshotGallery } from "@/components/tutorial/ScreenshotGallery";

export default function DiscountOwn() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Ιδιοκατανάλωση" subtitle="Κατανάλωση αγαθών από το προσωπικό του καταστήματος">
      <ScreenshotGallery
        images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/77e2ef6c1_15.JPG"]}
        caption="Ιδιοκατανάλωση"
      />
      <SectionTitle>Ιδιοκατανάλωση</SectionTitle>
      <InfoBox icon="🎁" title="Τι είναι η Ιδιοκατανάλωση;" variant="info">
        Χρησιμοποιείται για την κατανάλωση από το προσωπικό του καταστήματος.
        Η αξία του γεύματος δεν υπολογίζεται με βάση τον τιμοκατάλογο του καταστήματος (τιμές λιανικής).
        Καθώς έχει ήδη εκπέσει τον ΦΠΑ των πρώτων υλών κατά την αγορά,
        ως αξία ορίζεται το κόστος αγοράς των πρώτων υλών που χρησιμοποιήθηκαν για την παρασκευή των φαγητών ή των ποτών που καταναλώθηκαν.
        Δεν εκδίδεται Στοιχείο Λιανικής Πώλησης (απόδειξη), αλλά <strong>Στοιχείο Αυτοπαράδοσης</strong>.
      </InfoBox>
      <StepCard number="1" title="Άνοιξε έκπτωση">
        <p>Ακολούθησε τα ίδια βήματα με τη Γενική Έκπτωση (<strong>τρεις τελείες (···) → Έκπτωση</strong> → κωδικός διαχειριστή).</p>
        <p className="mt-2">Δες και <Link to="/tutorial/discount" className="underline font-semibold">«Από πού ανοίγει η έκπτωση»</Link> στο μάθημα Γενική Έκπτωση.</p>
      </StepCard>
      <StepCard number="2" title="Επίλεξε «Ιδιο Κατανάλωση»">
        <p>Στο πεδίο <strong>«Είδος έκπτωσης»</strong> επίλεξε <strong>«Ιδιο Κατανάλωση»</strong>. Το ποσοστό θα συμπληρωθεί αυτόματα.</p>
        <p className="mt-2">Αν μπήκες με <strong>Κωδικό Διαχειριστή</strong>, επιλέγεις και τον <strong>υπάλληλο</strong>.</p>
      </StepCard>
      <StepCard number="3" title="Επίλεξε προϊόντα και επιβεβαίωσε">
        <p>Επίλεξε τα προϊόντα και πάτα <strong>✓</strong>.</p>
      </StepCard>
      <StepCard number="4" title="Πάτα τον εκτυπωτή και επιβεβαίωσε">
        <p>Πάτα τον <strong>εκτυπωτή</strong>. Εμφανίζεται το μήνυμα <strong>«Έκδοση Στοιχείου Αυτοπαράδοσης;»</strong> με το <strong>Ποσό</strong>. Πάτα <strong>OK</strong>.</p>
      </StepCard>
      <div className="flex justify-center gap-4 flex-wrap">
        <figure className="flex flex-col items-center">
          <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/767c00274_own-total-zero.webp" alt="Σύνολο 0,00 € με Ιδιοκατανάλωση" className="w-40 h-auto rounded-lg border border-gray-200" />
          <figcaption className="text-xs text-gray-500 mt-1 text-center">Πριν τον εκτυπωτή: Σύνολο 0,00 €</figcaption>
        </figure>
        <figure className="flex flex-col items-center">
          <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/fa1150af2_own-selfdelivery-dialog.webp" alt="Έκδοση Στοιχείου Αυτοπαράδοσης, Ποσό 1,00 €" className="w-40 h-auto rounded-lg border border-gray-200" />
          <figcaption className="text-xs text-gray-500 mt-1 text-center">Μετά τον εκτυπωτή: Ποσό 1,00 €</figcaption>
        </figure>
      </div>
      <InfoBox icon="ℹ️" title="Γιατί το Σύνολο δείχνει 0,00 €;" variant="info">
        <p>Στην παραγγελία το Σύνολο δείχνει <strong>0,00 €</strong>, γιατί ο υπάλληλος δεν πληρώνει τίποτα.</p>
        <p className="mt-2">Το Στοιχείο Αυτοπαράδοσης όμως εκδίδεται με το <strong>κόστος του αγαθού</strong> και όχι με την τιμή πώλησης. Το ποσό αυτό το βλέπεις μόνο όταν πατήσεις τον <strong>εκτυπωτή</strong>.</p>
        <p className="mt-2">Π.χ. ένας Double Espresso των 5,00 € με κόστος 1,00 € δείχνει Σύνολο 0,00 € και βγάζει Στοιχείο Αυτοπαράδοσης 1,00 €.</p>
        <p className="mt-2">Το κόστος του αγαθού το ορίζει ο <strong>Διαχειριστής</strong>.</p>
      </InfoBox>
    </TutorialLayout>
  );
}