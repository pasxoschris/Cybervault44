const index = [
  {
    title: "Εγκατάσταση Εφαρμογής",
    path: "/tutorial/installation",
    keywords: ["εγκατάσταση", "app store", "κατέβασμα", "download", "iphone", "ios", "ipad"],
    context: "Κατέβασμα SpotlightPOS από App Store",
  },
  {
    title: "Σύνδεση Χρήστη",
    path: "/tutorial/login",
    keywords: ["σύνδεση", "login", "χρήστης", "κωδικός", "qr", "password", "είσοδος"],
    context: "Πρώτη σύνδεση & επόμενες",
  },
  {
    title: "Έναρξη Βάρδιας",
    path: "/tutorial/start-shift",
    keywords: ["βάρδια", "έναρξη", "shift", "ταμείο", "άνοιγμα", "start"],
    context: "Άνοιγμα βάρδιας & ταμείου",
  },
  {
    title: "Ρυθμίσεις Χρήστη",
    path: "/tutorial/settings",
    keywords: ["ρυθμίσεις", "settings", "εκτυπωτής", "pos", "τιμοκατάλογος", "printer"],
    context: "Εκτυπωτές, POS, τιμοκατάλογος",
  },
  {
    title: "Δημιουργία Παραγγελίας",
    path: "/tutorial/create-order",
    keywords: ["παραγγελία", "δημιουργία", "τραπέζι", "προϊόν", "order", "create", "αποστολή"],
    context: "Τραπέζι, προϊόντα & αποστολή",
  },
  {
    title: "Στοιχεία Παραγγελίας",
    path: "/tutorial/order-details",
    keywords: ["στοιχεία", "ακύρωση", "μεταφορά", "συγχώνευση", "order details", "cancel", "transfer", "merge"],
    context: "Ακύρωση, μεταφορά, συγχώνευση παραγγελίας",
  },
  {
    title: "Έκπτωση",
    path: "/tutorial/discount",
    keywords: ["έκπτωση", "discount", "ιδιοκατανάλωση", "ακύρωση", "γενική"],
    context: "Γενική, ιδιοκατανάλωση & άλλες εκπτώσεις",
  },
  {
    title: "Πληρωμή",
    path: "/tutorial/payment",
    keywords: ["πληρωμή", "payment", "μετρητά", "κάρτα", "split", "bill", "split bill", "cash", "card"],
    context: "Μετρητά, κάρτα, split payments",
  },
  {
    title: "Επεξεργασία Παραγγελίας",
    path: "/tutorial/edit-order",
    keywords: ["επεξεργασία", "edit", "αλλαγή", "τροποποίηση", "order"],
    context: "Εργαλεία επεξεργασίας παραγγελίας",
  },
  {
    title: "Έκδοση Τιμολογίου",
    path: "/tutorial/invoice",
    keywords: ["τιμολόγιο", "invoice", "έκδοση", "παραστατικό", "ακύρωση τιμολογίου", "vat", "αφμ"],
    context: "Στοιχεία & έκδοση παραστατικών",
  },
  {
    title: "Παραγγελίες Βάρδιας",
    path: "/tutorial/shift",
    keywords: ["βάρδια", "shift", "κλείσιμο", "ανάλυση", "εκτύπωση", "z"],
    context: "Ανάλυση, εκτύπωση & κλείσιμο βάρδιας",
  },
  {
    title: "Σενάρια",
    path: "/tutorial/scenarios",
    keywords: ["σενάριο", "παράδειγμα", "scenarios", "πρακτικό", "χρήση"],
    context: "Πρακτικά παραδείγματα χρήσης",
  },
];

export function searchItems(query) {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  return index.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.context.toLowerCase().includes(q) ||
    item.keywords.some(k => k.includes(q) || q.includes(k))
  );
}