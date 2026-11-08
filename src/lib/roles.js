export const ROLES = [
  {
    id: 'service',
    emoji: '🍽️',
    title: 'Service Mode',
    subtitle: 'Σερβιτόρος',
    color: '#7C3AED',
    colorLight: 'rgba(124,58,237,0.12)',
    colorBorder: 'rgba(124,58,237,0.3)',
    lessons: [
      { title: 'Εγκατάσταση Εφαρμογής', href: '/tutorial/installation' },
      { title: 'Σύνδεση από νέα συσκευή', href: '/tutorial/login-device' },
      { title: 'Σύνδεση Χρήστη', href: '/tutorial/login' },
      { title: 'Δείκτης Σύνδεσης & Συγχρονισμού', href: '/tutorial/sync-status' },
      { title: 'Έναρξη Βάρδιας', href: '/tutorial/start-shift' },
      { title: 'Ρυθμίσεις Χρήστη', href: '/tutorial/settings' },
      { title: 'Δημιουργία Παραγγελίας', href: '/tutorial/create-order' },
      { title: 'Στοιχεία Παραγγελίας', href: '/tutorial/order-details' },
      { title: 'Προσθήκη Ομοίων', href: '/tutorial/add-similar' },
      { title: 'Γενική Έκπτωση', href: '/tutorial/discount' },
      { title: 'Ιδιοκατανάλωση', href: '/tutorial/discount-own' },
      { title: 'Άλλες Εκπτώσεις', href: '/tutorial/discount-other' },
      { title: 'Πληρωμή', href: '/tutorial/payment' },
      { title: 'Πληρωμή με Μετρητά', href: '/tutorial/payment-cash' },
      { title: 'Πληρωμή με Κάρτα', href: '/tutorial/payment-card' },
      { title: 'Ηλεκτρονική Πληρωμή', href: '/tutorial/payment-online' },
      { title: 'Πληρωμή Επί Πιστώσει', href: '/tutorial/payment-credit' },
      { title: 'Πληρωμή με IRIS', href: '/tutorial/payment-iris' },
      { title: 'Split Payments', href: '/tutorial/split-payment' },
      { title: 'Επεξεργασία Παραγγελίας', href: '/tutorial/edit-order' },
      { title: 'Έκδοση Παραστατικού', href: '/tutorial/issue-receipt' },
      { title: 'Έκδοση Τιμολογίου', href: '/tutorial/invoice' },
      { title: 'Ακύρωση Προϊόντος', href: '/tutorial/cancel-product' },
      { title: 'Ακύρωση Παραγγελίας', href: '/tutorial/cancel-order' },
      { title: 'Ακύρωση Απόδειξης', href: '/tutorial/cancel-receipt' },
      { title: 'Μεταφορά Παραγγελίας', href: '/tutorial/transfer-order' },
      { title: 'Συγχώνευση Παραγγελιών', href: '/tutorial/merge-orders' },
      { title: 'Παραγγελίες Βάρδιας', href: '/tutorial/shift' },
      { title: 'Αναφορά Χ', href: '/tutorial/x-report' },
      { title: 'Ανάλυση Βάρδιας', href: '/tutorial/shift-analysis' },
      { title: 'Κλείσιμο Βάρδιας', href: '/tutorial/shift-close' },
    ],
  },
  {
    id: 'maitre-service',
    emoji: '👨‍💼',
    title: 'Maitre Service',
    subtitle: 'Σερβιτόρος σε maitre-mode',
    color: '#0891B2',
    colorLight: 'rgba(8,145,178,0.12)',
    colorBorder: 'rgba(8,145,178,0.3)',
    lessons: [
      { title: 'Εισαγωγή στο Maitre Service', href: '/tutorial/maitre-service/intro' },
      { title: 'Μεταφορά Τραπεζιού', href: '/tutorial/maitre-service/transfer' },
      { title: 'Συγχώνευση Τραπεζιών', href: '/tutorial/maitre-service/merge' },
      { title: 'Αλλαγή Σερβιτόρου', href: '/tutorial/maitre-service/waiter-change' },
      { title: 'Διαχείριση Παραγγελιών', href: '/tutorial/maitre-service/orders' },
      { title: 'Εγκρίσεις και Δικαιώματα', href: '/tutorial/maitre-service/approvals' },
    ],
  },
  {
    id: 'maitre-mode',
    emoji: '🎛️',
    title: 'Maitre Mode',
    subtitle: 'Κεντρικό Ταμείο',
    color: '#059669',
    colorLight: 'rgba(5,150,105,0.12)',
    colorBorder: 'rgba(5,150,105,0.3)',
    lessons: [
      { title: 'Dashboard Maitre', href: '/tutorial/maitre-mode/dashboard' },
      { title: 'Παρακολούθηση Τραπεζιών', href: '/tutorial/maitre-mode/tables' },
      { title: 'Παρακολούθηση Προσωπικού', href: '/tutorial/maitre-mode/staff' },
      { title: 'Διαχείριση Σάλας', href: '/tutorial/maitre-mode/hall' },
      { title: 'Αναφορές Βάρδιας', href: '/tutorial/maitre-mode/reports' },
    ],
  },
  {
    id: 'cashier',
    emoji: '🧑‍💻',
    title: 'Cashier Mode',
    subtitle: 'Ταμείο και πληρωμές',
    color: '#D97706',
    colorLight: 'rgba(217,119,6,0.12)',
    colorBorder: 'rgba(217,119,6,0.3)',
    lessons: [
      { title: 'Αρχική Οθόνη', href: '/tutorial/cashier/initial-screen' },
      { title: 'Συνοδευτικά Προϊόντος', href: '/tutorial/cashier/accompaniments' },
      { title: 'Προϊόντα Παραγγελίας', href: '/tutorial/cashier/order-items' },
      { title: 'Διαγραφή & Έκπτωση', href: '/tutorial/cashier/swipe-actions' },
      { title: 'Σύνδεση Χρήστη', href: '/tutorial/cashier/login' },
      { title: 'Δείκτης Σύνδεσης & Συγχρονισμού', href: '/tutorial/cashier/sync-status' },
      { title: 'Έναρξη Βάρδιας', href: '/tutorial/cashier/open' },
      { title: 'Πληρωμές', href: '/tutorial/cashier/payments' },
      { title: 'Split Payments', href: '/tutorial/cashier/split' },
      { title: 'Έκδοση Τιμολογίου', href: '/tutorial/cashier/invoice' },
      { title: 'Ρυθμίσεις Χρήστη', href: '/tutorial/cashier/settings' },
      { title: 'Παραγγελία Delivery', href: '/tutorial/cashier/delivery' },
      { title: 'Κλείσιμο Βάρδιας', href: '/tutorial/cashier/close' },
      { title: 'Προειδοποιητικό Τρίγωνο', href: '/tutorial/cashier/printer-warning' },
    ],
  },
  {
    id: 'secure',
    emoji: '⚙️',
    title: 'Secure (Διαχειριστικό)',
    subtitle: 'Διαχείριση καταστήματος',
    color: '#DC2626',
    colorLight: 'rgba(220,38,38,0.12)',
    colorBorder: 'rgba(220,38,38,0.3)',
    lessons: [
      { title: 'Χρήστες', href: '/tutorial/secure/users' },
      { title: 'Ρόλοι', href: '/tutorial/secure/roles' },
      { title: 'Εκτυπωτές', href: '/tutorial/secure/printers' },
      { title: 'Κατάλογοι', href: '/tutorial/secure/catalogs' },
      { title: 'Τιμοκατάλογοι', href: '/tutorial/secure/pricelists' },
      { title: 'Τραπέζια', href: '/tutorial/secure/tables' },
      { title: 'Αναφορές', href: '/tutorial/secure/reports' },
      { title: 'Παραμετροποίηση', href: '/tutorial/secure/config' },
    ],
  },
  {
    id: 'backoffice',
    emoji: '🛠️',
    title: 'Backoffice',
    subtitle: 'Για το προσωπικό της Spotlight και συνεργάτες/τεχνικούς',
    color: '#0F766E',
    colorLight: 'rgba(15,118,110,0.12)',
    colorBorder: 'rgba(15,118,110,0.3)',
    // Εμφανίζεται ΜΟΝΟ σε όσους έχουν ρητά το mode «backoffice» (και στους admin της εφαρμογής).
    restricted: true,
    lessons: [
      { title: 'Ωράριο Καταστήματος & Βάρδια', href: '/tutorial/backoffice/store-hours' },
      { title: 'Ρυθμίσεις Βάρδιας & Εξόφλησης', href: '/tutorial/backoffice/shift-settings' },
      { title: 'Αποδείξεις & Τιμολόγια', href: '/tutorial/backoffice/receipts-invoices' },
      { title: 'Ιδιοκατανάλωση', href: '/tutorial/backoffice/own-consumption' },
      { title: 'Πληρωμές με Κάρτα (EFTPOS)', href: '/tutorial/backoffice/card-payments' },
      { title: 'Maitre Mode, Τιμοκατάλογοι & Προωθήσεις', href: '/tutorial/backoffice/features' },
      { title: 'Οθόνες Κουζίνας & Περιφερειακά', href: '/tutorial/backoffice/peripherals' },
      { title: 'Δωμάτια & IHost', href: '/tutorial/backoffice/hotel' },
      { title: 'Λοιπές Ρυθμίσεις', href: '/tutorial/backoffice/other' },
    ],
  },
];

// Ορατότητα ρόλου βάσει του πεδίου modes (AllowedUserGuide).
// Κενό modes = όλοι οι ρόλοι ΕΚΤΟΣ από τους restricted (π.χ. Backoffice), που θέλουν ρητή εξουσιοδότηση.
export function canAccessRole(role, modes, isAdmin = false) {
  if (!role) return false;
  if (isAdmin) return true;
  const list = (modes || '').split(',').map(m => m.trim()).filter(Boolean);
  if (role.restricted) return list.includes(role.id);
  return list.length === 0 || list.includes(role.id);
}

export function getRoleById(id) {
  return ROLES.find(r => r.id === id);
}

export function getRoleByPath(pathname) {
  for (const role of ROLES) {
    if (role.lessons.some(l => l.href === pathname)) return role;
  }
  return null;
}