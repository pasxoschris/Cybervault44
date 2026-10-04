// Ο χάρτης της βάρδιας σε 6 βήματα — κοινή πηγή για τον online οδηγό και το PDF manual.
// Οι αριθμοί κεφαλαίων αντιστοιχούν στη σειρά των κεφαλαίων του Service Mode manual.
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
      chapter: 5,
      chapterTitle: 'Έναρξη Βάρδιας',
      lesson: '/tutorial/start-shift',
    },
    {
      n: 2,
      icon: 'order',
      title: 'Δημιουργία Παραγγελίας',
      hint: 'Διάλεξε τραπέζι, πρόσθεσε προϊόντα και στείλε την παραγγελία.',
      chapter: 7,
      chapterTitle: 'Δημιουργία Παραγγελίας',
      lesson: '/tutorial/create-order',
    },
    {
      n: 3,
      icon: 'invoice',
      title: 'Έκδοση Παραστατικού',
      hint: 'Έκδωσε τιμολόγιο πριν την πληρωμή, όταν χρειάζεται.',
      chapter: 22,
      chapterTitle: 'Έκδοση Τιμολογίου',
      lesson: '/tutorial/invoice',
    },
    {
      n: 4,
      icon: 'payment',
      title: 'Πληρωμή',
      hint: 'Μετρητά, κάρτα, IRIS, split payments — με απόδειξη.',
      chapter: 15,
      chapterTitle: 'Πληρωμή',
      lesson: '/tutorial/payment',
    },
    {
      n: 5,
      icon: 'close_order',
      title: 'Κλείσιμο Παραγγελίας',
      hint: 'Μετά την πληρωμή η παραγγελία κλείνει — δες τη στη βάρδια.',
      chapter: 25,
      chapterTitle: 'Παραγγελίες Βάρδιας',
      lesson: '/tutorial/shift',
    },
    {
      n: 6,
      icon: 'close_shift',
      title: 'Ανάλυση & Κλείσιμο Βάρδιας',
      hint: 'Έλεγξε τα σύνολα της βάρδιας και κλείσε τη μέρα.',
      chapter: 26,
      chapterTitle: 'Ανάλυση Βάρδιας',
      extraRefs: ['Κεφ. 27 Κλείσιμο Βάρδιας'],
      lesson: '/tutorial/shift-analysis',
    },
  ],
};

// π.χ. «Κεφ. 7 · Δημιουργία Παραγγελίας (βήμα 2/6)»
export const journeyChapterRef = (step) =>
  `Κεφ. ${step.chapter} · ${step.chapterTitle}` +
  (step.stepInChapter ? ` (βήμα ${step.stepInChapter}/${step.stepsInChapter})` : '');