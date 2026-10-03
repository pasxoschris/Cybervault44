import { CHAPTERS_A } from './manualChaptersA';
import { CHAPTERS_B } from './manualChaptersB';
import { CHAPTERS_C } from './manualChaptersC';

export const MANUAL_META = {
  title: 'SpotlightPOS — Εγχειρίδιο Service Mode',
  subtitle: 'Εγχειρίδιο Εκπαίδευσης',
  subtitleLong: 'Οδηγός χρήσης για σερβιτόρους (Service Mode)',
  footer: 'SpotlightPOS — Εγχειρίδιο Service Mode',
  fileName: 'SpotlightPOS-Service-Mode-Manual.pdf',
  logos: [
    { src: 'https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/71e29efae_web-app-manifest-512x512.png', name: 'CyberVault', url: 'https://cybervault.gr' },
    { src: 'https://media.base44.com/images/public/69f588f4590b173a2970ddb4/c5b6c58e9_SpotlightPos_icon.png', name: 'SpotlightPOS', url: 'https://www.spotlightpos.com/' },
  ],
};

// Τα «Σενάρια» δεν περιλαμβάνονται στο PDF του Manual
export const MANUAL_CHAPTERS = [...CHAPTERS_A, ...CHAPTERS_B, ...CHAPTERS_C].filter((chapter) => chapter.id !== 'scenarios');