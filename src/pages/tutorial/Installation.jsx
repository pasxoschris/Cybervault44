import React from "react";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";

export default function Installation() {
  return (
    <TutorialLayout title="Εγκατάσταση Εφαρμογής" subtitle="Πώς να κατεβάσεις το SpotlightPOS στο iPhone σου">
      <InfoBox icon="📱" title="Μόνο για iOS" variant="info">
        Το SpotlightPOS λειτουργεί αποκλειστικά σε συσκευές Apple (iPhone / iPad). Δεν είναι διαθέσιμο για Android.
      </InfoBox>

      <div className="flex justify-center mb-2">
        <a
          href="https://apps.apple.com/gr/app/spotlight-pos/id969806094"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="h-12 hover:opacity-80 transition-opacity"
          />
        </a>
      </div>

      <SectionTitle>Βήματα Εγκατάστασης</SectionTitle>

      <StepCard number="1" title="Άνοιξε το App Store">
        <div className="flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/69f588f4590b173a2970ddb4/391e0b0a3_app-store-s-dark-128x128_2x.png"
            alt="App Store"
            className="w-10 h-10 rounded-xl flex-shrink-0 shadow"
          />
          <p>Βρες την εφαρμογή <strong>App Store</strong> στο iPhone σου και πάτησε για να την ανοίξεις.</p>
        </div>
      </StepCard>

      <StepCard number="2" title="Αναζήτηση για Spotlight POS">
        <div className="flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/69f588f4590b173a2970ddb4/c5b6c58e9_SpotlightPos_icon.png"
            alt="SpotlightPOS"
            className="w-10 h-10 rounded-xl flex-shrink-0 shadow"
          />
          <p>Στη γραμμή αναζήτησης πληκτρολόγησε <strong>"Spotlight POS"</strong> και πάτησε αναζήτηση.</p>
        </div>
      </StepCard>

      <StepCard number="3" title="Κατέβασε την εφαρμογή">
        <p>Βρες την εφαρμογή <strong>Spotlight POS</strong> (με το μωβ εικονίδιο) και πάτησε <strong>«Λήψη»</strong> (Get).</p>
      </StepCard>

      <StepCard number="4" title="Άνοιξε την εφαρμογή">
        <p>Μόλις ολοκληρωθεί η λήψη, πάτησε <strong>«Άνοιγμα»</strong> ή βρες το εικονίδιο στην αρχική οθόνη.</p>
      </StepCard>

      <InfoBox icon="✅" title="Επιτυχής εγκατάσταση" variant="success">
        <p>Αν δεις την παρακάτω οθόνη σύνδεσης του Spotlight με το μωβ background, η εγκατάσταση ολοκληρώθηκε σωστά!</p>
        <div className="mt-3 flex justify-center">
          <img
            src="https://media.base44.com/images/public/69f588f4590b173a2970ddb4/05d6e6612_image.png"
            alt="Οθόνη σύνδεσης SpotlightPOS"
            className="w-40 rounded-2xl shadow-md border border-green-500/30 cursor-zoom-in hover:opacity-90 transition-opacity"
            onClick={e => {
              const overlay = document.createElement('div');
              overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
              const img = document.createElement('img');
              img.src = e.target.src;
              img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:16px;box-shadow:0 25px 50px rgba(0,0,0,0.5)';
              overlay.appendChild(img);
              overlay.onclick = () => document.body.removeChild(overlay);
              document.body.appendChild(overlay);
            }}
          />
        </div>
      </InfoBox>
    </TutorialLayout>
  );
}