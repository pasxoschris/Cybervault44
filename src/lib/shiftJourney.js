import { getRoleById } from './roles';

// Ο χάρτης της βάρδιας σε 6 βήματα — κοινή πηγή για τον online οδηγό και το PDF manual.
// Οι αριθμοί κεφαλαίων υπολογίζονται αυτόματα από τη σειρά των μαθημάτων του Service (src/lib/roles.js).
// Το `icon` δείχνει στο STEP_ICONS (src/lib/shiftJourneyIcons.js).
export const SHIFT_JOURNEY = {
  title: 'Η βάρδια σου σε 6 βήματα',
  subtitle: 'Η σειρά με την οποία δουλεύεις τη βάρδια σου — κάθε βήμα δείχνει το κεφάλαιο με τις λεπτομέρειες.',
  steps: [
    {
      n: 1,
      icon: 'start',
      title: 'Έναρξη Βάρδιας',
      hint: 'Άνοιξε τη βάρδια πριν δεχτείς παραγγελίες.',
      chapterTitle: 'Έναρξη Βάρδιας',
      lesson: '/tutorial/start-shift',
    },
    {
      n: 2,
      icon: 'order',
      title: 'Δημιουργία Παραγγελίας',
      hint: 'Διάλεξε τραπέζι, πρόσθεσε προϊόντα και στείλε την παραγγελία.',
      chapterTitle: 'Δημιουργία Παραγγελίας',
      lesson: '/tutorial/create-order',
    },
    {
      n: 3,
      icon: 'invoice',
      title: 'Έκδοση Παραστατικού',
      hint: 'Απόδειξη τώρα, δελτίο παραγγελίας ή αργότερα — διαλέγεις εσύ.',
      chapterTitle: 'Έκδοση Παραστατικού',
      lesson: '/tutorial/issue-receipt',
    },
    {
      n: 4,
      icon: 'payment',
      title: 'Πληρωμή',
      hint: 'Μετρητά, κάρτα, IRIS, split payments — με απόδειξη.',
      chapterTitle: 'Πληρωμή',
      lesson: '/tutorial/payment',
    },
    {
      n: 5,
      icon: 'close_order',
      title: 'Κλείσιμο Παραγγελίας',
      hint: 'Μετά την πληρωμή η παραγγελία κλείνει — δες τη στη βάρδια.',
      chapterTitle: 'Παραγγελίες Βάρδιας',
      lesson: '/tutorial/shift',
    },
    {
      n: 6,
      icon: 'close_shift',
      title: 'Ανάλυση & Κλείσιμο Βάρδιας',
      hint: 'Έλεγξε τα σύνολα της βάρδιας και κλείσε τη μέρα.',
      chapterTitle: 'Ανάλυση Βάρδιας',
      extraLessons: [{ lesson: '/tutorial/shift-close', title: 'Κλείσιμο Βάρδιας' }],
      lesson: '/tutorial/shift-analysis',
    },
  ],
};

// Αριθμός κεφαλαίου = θέση του μαθήματος στη λίστα του Service (1-based)
const serviceLessons = (getRoleById('service')?.lessons || []).map((l) => l.href);
const chapterOf = (lesson) => serviceLessons.indexOf(lesson) + 1;
SHIFT_JOURNEY.steps.forEach((step) => {
  step.chapter = chapterOf(step.lesson);
  if (step.extraLessons) step.extraRefs = step.extraLessons.map((x) => `Κεφ. ${chapterOf(x.lesson)} ${x.title}`);
});

// π.χ. «Κεφ. 7 · Δημιουργία Παραγγελίας (βήμα 2/6)»
export const journeyChapterRef = (step) =>
  `Κεφ. ${step.chapter} · ${step.chapterTitle}` +
  (step.stepInChapter ? ` (βήμα ${step.stepInChapter}/${step.stepsInChapter})` : '');