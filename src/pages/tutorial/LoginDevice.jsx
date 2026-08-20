import React, { useEffect } from "react";
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

export default function LoginDevice() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Σύνδεση από νέα συσκευή" subtitle="Πώς να συνδέσεις μια νέα συσκευή (iPhone/iPad) με το κατάστημα">

      <InfoBox icon="📱" title="Συμβατότητα Συσκευής" variant="info">
        Η εφαρμογή Spotlight POS (όχι το διαχειριστικό Secure) τρέχει <strong>μόνο σε iOS συσκευές</strong> — <strong>iPhone</strong> και <strong>iPad</strong>. Βεβαιώσου ότι χρησιμοποιείς συμβατή συσκευή.
      </InfoBox>

      <InfoBox icon="⚠️" title="Προαπαιτούμενα" variant="warning">
        Πριν συνδέσεις νέα συσκευή, ο διαχειριστής πρέπει να έχει κάνει τα εξής στο <strong>Secure (Διαχειριστικό)</strong>:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Δημιουργία χρηστών</li>
          <li>Δημιουργία σημείων πώλησης/συσκευών (POS) των χρηστών</li>
        </ul>
      </InfoBox>

      <ScreenshotGallery images={["https://media.base44.com/images/public/69f588f4590b173a2970ddb4/63180b251_3.JPG"]} caption="Οθόνη σύνδεσης — πρώτη φορά" />
      <SectionTitle>Σύνδεση από νέα συσκευή</SectionTitle>

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
        Μετά την πρώτη σύνδεση, η συσκευή συνδέεται με το κατάστημα. Η επόμενη φορά θα είναι πιο γρήγορη — βλέπε το μάθημα <strong>Σύνδεση Χρήστη</strong>.
      </InfoBox>
    </TutorialLayout>
  );
}