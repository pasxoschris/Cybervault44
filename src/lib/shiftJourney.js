// Ο χάρτης της βάρδιας σε 8 βήματα — κοινή πηγή για τον online οδηγό και το PDF manual.
// Οι αριθμοί κεφαλαίων αντιστοιχούν στη σειρά των κεφαλαίων του Service Mode manual.
export const SHIFT_JOURNEY = {
  title: 'Η βάρδια σου σε 8 βήματα',
  subtitle: 'Η σειρά με την οποία δουλεύεις τη βάρδια σου — κάθε βήμα δείχνει το κεφάλαιο με τις λεπτομέρειες.',
  steps: [
    {
      n: 1,
      title: 'Login',
      hint: 'Συνδέσου με όνομα χρήστη και κωδικό.',
      chapter: 3,
      chapterTitle: 'Σύνδεση Χρήστη',
      lesson: '/tutorial/login',
    },
    {
      n: 2,
      title: 'Έναρξη Βάρδιας',
      hint: 'Άνοιξε τη βάρδια πριν δεχτείς παραγγελίες.',
      chapter: 5,
      chapterTitle: 'Έναρξη Βάρδιας',
      lesson: '/tutorial/start-shift',
    },
    {
      n: 3,
      title: 'Επιλογή Τραπεζιού',
      hint: 'Διάλεξε τραπέζι για τη νέα παραγγελία.',
      chapter: 7,
      chapterTitle: 'Δημιουργία Παραγγελίας',
      stepInChapter: 2,
      stepsInChapter: 6,
      lesson: '/tutorial/create-order',
    },
    {
      n: 4,
      title: 'Παραγγελία',
      hint: 'Πρόσθεσε προϊόντα με τα συνοδευτικά τους.',
      chapter: 7,
      chapterTitle: 'Δημιουργία Παραγγελίας',
      lesson: '/tutorial/create-order',
    },
    {
      n: 5,
      title: 'Αποστολή',
      hint: 'Στείλε την παραγγελία στους εκτυπωτές.',
      chapter: 7,
      chapterTitle: 'Δημιουργία Παραγγελίας',
      stepInChapter: 6,
      stepsInChapter: 6,
      lesson: '/tutorial/create-order',
    },
    {
      n: 6,
      title: 'Προσθήκες / Αλλαγές',
      hint: 'Επεξεργασία, ακυρώσεις, εκπτώσεις.',
      chapter: 8,
      chapterTitle: 'Στοιχεία Παραγγελίας',
      extraRefs: ['Κεφ. 21 Επεξεργασία', 'Κεφ. 11 Ομόια', 'Κεφ. 9 Ακύρωση'],
      lesson: '/tutorial/order-details',
    },
    {
      n: 7,
      title: 'Πληρωμή',
      hint: 'Μετρητά, κάρτα, IRIS, split, απόδειξη.',
      chapter: 15,
      chapterTitle: 'Πληρωμή',
      lesson: '/tutorial/payment',
    },
    {
      n: 8,
      title: 'Κλείσιμο Βάρδιας',
      hint: 'Έλεγξε τη βάρδια και κλείσε τη μέρα.',
      chapter: 27,
      chapterTitle: 'Κλείσιμο Βάρδιας',
      lesson: '/tutorial/shift-close',
    },
  ],
};

// π.χ. «Κεφ. 7 · Δημιουργία Παραγγελίας (βήμα 2/6)»
export const journeyChapterRef = (step) =>
  `Κεφ. ${step.chapter} · ${step.chapterTitle}` +
  (step.stepInChapter ? ` (βήμα ${step.stepInChapter}/${step.stepsInChapter})` : '');