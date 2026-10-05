import { CHAPTERS_A } from './manualChaptersA';
import { CHAPTERS_B } from './manualChaptersB';
import { CHAPTERS_C } from './manualChaptersC';

export const MANUAL_META = {
  title: 'SpotlightPOS — Εγχειρίδιο Service Mode',
  subtitle: 'Εγχειρίδιο Εκπαίδευσης',
  subtitleLong: 'Οδηγός χρήσης για σερβιτόρους (Service Mode)',
  footer: 'SpotlightPOS — Εγχειρίδιο Service Mode',
  coverNote: 'Το εκπαιδευτικό υλικό είναι διαθέσιμο και online, μαζί με τον Spotlight Assistant — βλ. τελευταία σελίδα.',
  logos: [
    { src: 'https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/71e29efae_web-app-manifest-512x512.png', name: 'CyberVault', url: 'https://cybervault.gr' },
    { src: 'https://media.base44.com/images/public/69f588f4590b173a2970ddb4/c5b6c58e9_SpotlightPos_icon.png', name: 'SpotlightPOS', url: 'https://www.spotlightpos.com/' },
  ],
};

const ALL_MANUAL_CHAPTERS = [...CHAPTERS_A, ...CHAPTERS_B, ...CHAPTERS_C];

// Κεφάλαια με αρίθμηση & εγγραφή στα Περιεχόμενα (τα «Σενάρια» μένουν εκτός manual).
export const MANUAL_CHAPTERS = ALL_MANUAL_CHAPTERS.filter((chapter) => !chapter.informational && chapter.id !== 'scenarios');

// Πληροφοριακές σελίδες: υλικό χωρίς αρίθμηση κεφαλαίου και εκτός Περιεχομένων.
export const MANUAL_INFO_CHAPTERS = ALL_MANUAL_CHAPTERS.filter((chapter) => chapter.informational);

// Καταληκτική σελίδα: το online υλικό και ο assistant εκπαίδευσης
export const MANUAL_CLOSING = {
  title: 'Το υλικό online & ο assistant',
  paragraphs: [
    'Το ίδιο υλικό για το Spotlight POS (SpotlightPOS) υπάρχει και online — οργανωμένο ανά ρόλο (Service, Cashier, Maitre Service, Maitre Mode, Secure (Διαχειριστικό)), με εικόνες βήμα-βήμα και δυνατότητα αναζήτησης.',
    'Άνοιγμα του online οδηγού:',
  ],
  link: {
    label: 'https://cybervault.gr/spotlight-pos-guide',
    url: 'https://cybervault.gr/spotlight-pos-guide',
  },
  notes: [
    {
      variant: 'purple',
      title: 'Assistant εκπαίδευσης',
      lines: [
        'Στον online οδηγό υπάρχει και assistant: ρωτήστε ό,τι θέλετε για το Spotlight POS (SpotlightPOS) — **γραπτά ή προφορικά** — και η απάντηση βασίζεται στο υλικό αυτού του εγχειριδίου.',
        'Τον βρίσκετε στο **«Assistant»** του online οδηγού.',
      ],
      smallLines: [
        'Η πρόσβαση στο online υλικό δίνεται ανά email.',
        'Η προφορική χρήση απαιτεί συσκευή με μικρόφωνο.',
      ],
    },
  ],
};