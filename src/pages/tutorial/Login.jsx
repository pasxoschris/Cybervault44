import React, { useState } from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle, FieldRow } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

const zoomOverlay = (src) => {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
  const img = document.createElement('img');
  img.src = src;
  img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:16px;box-shadow:0 25px 50px rgba(0,0,0,0.5)';
  overlay.appendChild(img);
  overlay.onclick = () => document.body.removeChild(overlay);
  document.body.appendChild(overlay);
};

export default function Login() {
  const [tab, setTab] = useState("first");

  return (
    <TutorialLayout title="Σύνδεση Χρήστη" subtitle="Πώς να συνδεθείς στην εφαρμογή">

      <InfoBox icon="⚠️" title="Προαπαιτούμενα" variant="warning">
        Πριν συνδεθείς, ο διαχειριστής πρέπει να έχει κάνει τα εξής στο <strong>Secure (διαχειριστικό)</strong>:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Δημιουργία των χρηστών</li>
          <li>Δημιουργία των σημείων πώλησης/συσκευών (POS) των χρηστών</li>
        </ul>
      </InfoBox>

      {/* Tab selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("first")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === "first" ? "bg-primary text-primary-foreground shadow" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
        >
          🆕 Πρώτη Φορά
        </button>
        <button
          onClick={() => setTab("repeat")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === "repeat" ? "bg-primary text-primary-foreground shadow" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
        >
          🔄 Επόμενες Φορές
        </button>
      </div>

      {tab === "first" && (
        <>
          <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/63180b251_3.JPG"]} caption="Οθόνη σύνδεσης — πρώτη φορά" />
          <SectionTitle>Σύνδεση για πρώτη φορά</SectionTitle>

          <StepCard number="1" title="Άνοιξε την εφαρμογή">
            <p>Θα δεις την οθόνη <strong>"Συνδεθείτε στο Κατάστημα"</strong> με Email, Κωδικό Πρόσβασης και κουμπί QR Code.</p>
            <div className="mt-3 flex justify-center">
              <img
                src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/d23c6a6d8_image.png"
                alt="Οθόνη σύνδεσης SpotlightPOS"
                className="w-full max-w-sm rounded-2xl shadow-md border border-gray-100 cursor-zoom-in hover:opacity-90 transition-opacity"
                onClick={e => zoomOverlay(e.target.src)}
              />
            </div>
          </StepCard>

          <StepCard number="2" title="Πάτα «QR Code» για σύνδεση καταστήματος">
            <p>Στην οθόνη σύνδεσης πάτα το κουμπί <strong>«QR Code»</strong>. Θα ανοίξει η κάμερα του iPhone/iPad σου.</p>
            <p className="mt-2">Σκάναρε το <strong>QR Code του καταστήματος</strong> (το παρέχει ο διαχειριστής από το Secure ή το βλέπεις από άλλη συνδεδεμένη συσκευή) για να συνδέσεις τη συσκευή σου με το κατάστημα.</p>
          </StepCard>

          <StepCard number="3" title="Επίλεξε κατάστημα και συσκευή (POS) χρήστη">
            <p>Μετά το σκάναρισμα θα εμφανιστεί η οθόνη επιλογής. Διάλεξε το <strong>Κατάστημα</strong> και τη <strong>Συσκευή (POS)</strong> που θα χρησιμοποιήσεις.</p>
            <div className="mt-3 flex justify-center">
              <img
                src="https://media.base44.com/images/public/69f588f4590b173a2970ddb4/9cf0016f5_image.png"
                alt="Επιλογή καταστήματος και POS"
                className="w-full max-w-sm rounded-2xl shadow-md border border-border cursor-zoom-in hover:opacity-90 transition-opacity"
                onClick={e => zoomOverlay(e.target.src)}
              />
            </div>
          </StepCard>

          <StepCard number="4" title="Βλέπεις την οθόνη Σύνδεση Χρήστη (User Sign in)">
            <p>Μετά τη σύνδεση με το κατάστημα, θα σου ζητηθεί να συνδεθείς με όνομα χρήστη και τον κωδικό που σου έχει φτιάξει ο διαχειριστής:</p>
            <div className="mt-3 flex justify-center mb-3">
              <img
                src="https://media.base44.com/images/public/69f588f4590b173a2970ddb4/d233f965e_image.png"
                alt="Οθόνη σύνδεσης χρήστη"
                className="w-full max-w-sm rounded-2xl shadow-md border border-border cursor-zoom-in hover:opacity-90 transition-opacity"
                onClick={e => zoomOverlay(e.target.src)}
              />
            </div>
            <div className="border border-[#00D4FF]/10 bg-[#080c20]/60 rounded-sm overflow-hidden mt-2">
              <FieldRow label="Όνομα Χρήστη" value="Το όνομα χρήστη σου" />
              <FieldRow label="Κωδικός Πρόσβασης" value="Ο κωδικός σου" />
            </div>
          </StepCard>

          <InfoBox icon="💡" title="Σημείωση" variant="info">
            Μετά την πρώτη σύνδεση, η συσκευή συνδέεται με το κατάστημα. Η επόμενη φορά θα είναι πιο γρήγορη!
          </InfoBox>
        </>
      )}

      {tab === "repeat" && (
        <>
          <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/3eb8334c2_4.JPG"]} caption="Οθόνη User Sign in" />
          <SectionTitle>Σύνδεση μετά την πρώτη φορά</SectionTitle>
          <StepCard number="1" title="Βλέπεις την οθόνη User Sign in">
            <p>Εφόσον η συσκευή έχει ήδη συνδεθεί με κατάστημα, θα εμφανιστεί απευθείας η οθόνη <strong>«User Sign in»</strong>.</p>
          </StepCard>
          <StepCard number="2" title="Εισήγαγε στοιχεία χρήστη">
            <div className="border border-[#00D4FF]/10 bg-[#080c20]/60 rounded-sm overflow-hidden mt-2">
              <FieldRow label="Username" value="Το όνομα χρήστη σου" />
              <FieldRow label="Password" value="Ο κωδικός σου" />
            </div>
          </StepCard>
          <StepCard number="3" title="Πάτα Login">
            <p>Θα δεις κάτω αριστερά το <strong>κατάστημα – συσκευή</strong> (π.χ. «Spotlight Demo - pos 1»).</p>
          </StepCard>
          <InfoBox icon="📊" title="Πολλοί χρήστες / Άδειες" variant="info">
            Μπορείτε να δημιουργήσετε πολλούς χρήστες και πολλές συσκευές. Όμως, ο αριθμός των <strong>παράλληλα συνδεδεμένων χρηστών</strong> εξαρτάται από τις άδειες που έχετε αγοράσει.
          </InfoBox>
        </>
      )}
    </TutorialLayout>
  );
}