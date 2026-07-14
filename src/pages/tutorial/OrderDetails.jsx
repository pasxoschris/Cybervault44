import React, { useState, useEffect } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

const topics = [
  { id: "overview", label: "Επισκόπηση", icon: "📋" },
  { id: "cancel-product", label: "Ακύρωση Προϊόντος", icon: "❌" },
  { id: "cancel-order", label: "Ακύρωση Παραγγελίας", icon: "🚫" },
  { id: "add-similar", label: "Προσθήκη Ομοίων", icon: "➕" },
  { id: "transfer", label: "Μεταφορά", icon: "↔️" },
  { id: "merge", label: "Συγχώνευση", icon: "🔗" },
];

const overviewRows = [
  ["ΑΝΟΙΚΤΗ ΠΑΡΑΓΓΕΛΙΑ", "Κατάσταση παραγγελίας"],
  ["Άτομα", "Αριθμός ατόμων (π.χ. 2)"],
  ["Τραπέζι", "Αριθμός τραπεζιού (π.χ. A4)"],
  ["Ώρα", "Ώρα παραγγελίας"],
  ["Προϊόντα", "Λίστα παραγγελθέντων"],
  ["Σύνολο", "Συνολικό ποσό"],
];

export default function OrderDetails() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active]);

  return (
    <TutorialLayout title="Στοιχεία Παραγγελίας" subtitle="Διαχείριση ανοικτής παραγγελίας">

      <div className="flex flex-wrap gap-2">
        {topics.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${active === t.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {active === "overview" && (
        <>
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
        </>
      )}

      {active === "cancel-product" && (
        <>
          <SectionTitle>Ακύρωση Προϊόντος</SectionTitle>
          <StepCard number="1" title="Άνοιξε την παραγγελία">
            <p>Πάτα πάνω στην παραγγελία για να δεις τα στοιχεία της.</p>
          </StepCard>
          <StepCard number="2" title="Επίλεξε «Επεξεργασία Παραγγελίας»">
            <p>Πάτα το εικονίδιο επεξεργασίας (✏️) για να μπεις στη λίστα προϊόντων.</p>
          </StepCard>
          <StepCard number="3" title="Επίλεξε το προϊόν">
            <p>Τσεκάρε το προϊόν που θέλεις να ακυρώσεις και επίλεξε <strong>«Έκδοση Ακυρωτικού Δελτίου»</strong>.</p>
          </StepCard>
          <InfoBox icon="⚠️" variant="warning">
            Η ακύρωση προϊόντος στέλνει ακυρωτικό δελτίο στην κουζίνα/μπαρ. Βεβαιώσου ότι το προϊόν δεν έχει ήδη ετοιμαστεί.
          </InfoBox>
        </>
      )}

      {active === "cancel-order" && (
        <>
          <SectionTitle>Ακύρωση Παραγγελίας</SectionTitle>
          <StepCard number="1" title="Άνοιξε την παραγγελία">
            <p>Πάτα στην παραγγελία που θέλεις να ακυρώσεις.</p>
          </StepCard>
          <StepCard number="2" title="Επίλεξε Επεξεργασία">
            <p>Πάτα ✏️ και στη συνέχεια επίλεξε <strong>όλα τα προϊόντα</strong>.</p>
          </StepCard>
          <StepCard number="3" title="Έκδοση Ακυρωτικού">
            <p>Πάτα <strong>«Έκδοση Ακυρωτικού Δελτίου Παραγγελίας»</strong>. Η παραγγελία θα ακυρωθεί και το τραπέζι θα ελευθερωθεί.</p>
          </StepCard>
        </>
      )}

      {active === "add-similar" && (
        <>
          <ScreenshotGallery
            images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/bac405ff5_10.JPG"]}
            caption="Προσθήκη ομοίων"
          />
          <SectionTitle>Προσθήκη Ομοίων</SectionTitle>
          <StepCard number="1" title="Άνοιξε την παραγγελία">
            <p>Μπες στα στοιχεία της παραγγελίας.</p>
          </StepCard>
          <StepCard number="2" title="Πάτα το εικονίδιο Προσθήκης">
            <p>Στη γραμμή εργαλείων (icons πάνω δεξιά), βρες και πάτα το εικονίδιο <strong>«Προσθήκη ομοίων»</strong>.</p>
          </StepCard>
          <StepCard number="3" title="Επίλεξε προϊόντα">
            <p>Εμφανίζεται λίστα με τα ήδη παραγγελμένα προϊόντα. Τσεκάρε αυτά που θέλεις να προσθέσεις ξανά και πάτα ✓.</p>
          </StepCard>
          <InfoBox icon="💡" variant="info">
            Χρήσιμο όταν μια παρέα θέλει τα ίδια ποτά/φαγητά ξανά χωρίς να τα ψάχνεις εκ νέου.
          </InfoBox>
        </>
      )}

      {active === "transfer" && (
        <>
          <SectionTitle>Μεταφορά Παραγγελίας</SectionTitle>
          <StepCard number="1" title="Άνοιξε την παραγγελία">
            <p>Βρες την παραγγελία που θέλεις να μεταφέρεις (από έναν σερβιτόρο σε άλλον).</p>
          </StepCard>
          <StepCard number="2" title="Επίλεξε προϊόντα για μεταφορά">
            <p>Στην επεξεργασία, επίλεξε τα προϊόντα που θα μεταφερθούν.</p>
          </StepCard>
          <StepCard number="3" title="Πάτα «Δημιουργία νέας παραγγελίας»">
            <p>Χρησιμοποίησε το εικονίδιο <strong>↗</strong> για να δημιουργήσεις νέα παραγγελία με τα επιλεγμένα προϊόντα σε άλλο τραπέζι/σερβιτόρο.</p>
          </StepCard>
        </>
      )}

      {active === "merge" && (
        <>
          <SectionTitle>Συγχώνευση Παραγγελίας</SectionTitle>
          <InfoBox icon="🔗" title="Τι είναι η συγχώνευση;" variant="info">
            Η συγχώνευση επιτρέπει να ενώσεις δύο ξεχωριστές παραγγελίες σε μία. Χρήσιμο όταν πελάτες από διαφορετικά τραπέζια θέλουν να πληρώσουν μαζί.
          </InfoBox>
          <StepCard number="1" title="Άνοιξε την πρώτη παραγγελία">
            <p>Πάτα στην παραγγελία που θέλεις να συγχωνεύσεις.</p>
          </StepCard>
          <StepCard number="2" title="Επίλεξε τη λειτουργία συγχώνευσης">
            <p>Βρες το εικονίδιο <strong>συγχώνευσης</strong> στη γραμμή εργαλείων.</p>
          </StepCard>
          <StepCard number="3" title="Επίλεξε τη δεύτερη παραγγελία">
            <p>Από τη λίστα, επίλεξε ποια άλλη παραγγελία θέλεις να συγχωνεύσεις. Τα προϊόντα θα ενωθούν σε μία παραγγελία.</p>
          </StepCard>
        </>
      )}
    </TutorialLayout>
  );
}