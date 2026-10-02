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
    context: "Επισκόπηση τρόπων πληρωμής",
  },
  {
    title: "Πληρωμή με Μετρητά",
    path: "/tutorial/payment-cash",
    keywords: ["μετρητά", "cash", "ρέστα", "πληρωμή"],
    context: "Πληρωμή παραγγελίας με μετρητά",
  },
  {
    title: "Πληρωμή με Κάρτα",
    path: "/tutorial/payment-card",
    keywords: ["κάρτα", "card", "pos", "terminal", "πληρωμή"],
    context: "Χρέωση μέσω POS terminal",
  },
  {
    title: "Split Payments",
    path: "/tutorial/split-payment",
    keywords: ["split", "split bill", "διαίρεση", "μοιρασμό", "πληρωμή"],
    context: "Διαίρεση πληρωμής σε πολλαπλές χρεώσεις",
  },
  {
    title: "Ηλεκτρονική Πληρωμή",
    path: "/tutorial/payment-online",
    keywords: ["ηλεκτρονική", "online", "web", "πληρωμή"],
    context: "Ενεργοποίηση και ολοκλήρωση ηλεκτρονικής πληρωμής",
  },
  {
    title: "Πληρωμή με IRIS",
    path: "/tutorial/payment-iris",
    keywords: ["iris", "κωδικός", "qr", "τράπεζα", "πληρωμή"],
    context: "Άμεση πληρωμή με κωδικό IRIS",
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