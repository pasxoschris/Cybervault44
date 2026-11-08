import { SECURE_PARTS, SECURE_LESSONS } from './secureLessons';

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
    parts: SECURE_PARTS,
    lessons: SECURE_LESSONS,
  },
  {
    id: 'backoffice',
    emoji: '🛠️',
    title: 'Backoffice',
    subtitle: 'Επεξεργασία Καταστήματος — για το προσωπικό της Spotlight και συνεργάτες/τεχνικούς',
    color: '#0F766E',
    colorLight: 'rgba(15,118,110,0.12)',
    colorBorder: 'rgba(15,118,110,0.3)',
    // Εμφανίζεται ΜΟΝΟ σε όσους έχουν ρητά το mode «backoffice» (και στους admin της εφαρμογής).
    restricted: true,
    parts: [
      { id: "1", title: "Πληροφορίες" },
      { id: "2", title: "Χρήστες" },
      { id: "3", title: "Άδειες Χρήσης" },
      { id: "4", title: "Πληρωμές" },
    ],
    lessons: [
      { num: "1.1", part: "1", title: "Στοιχεία Καταστήματος", href: '/tutorial/backoffice/info-store', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Όνομα Καταστήματος · Μεταπωλητής · Τύπος Καταστήματος · Προϊόντα και Κατηγορίες Προϊόντων (Ανεβάστε)"}] },
      { num: "1.2", part: "1", title: "Basic info", href: '/tutorial/backoffice/info-basic', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Περιορισμός προσκλήσεων · Νόμισμα · Δέχεται Ξένα Νομίσματα · Ζώνη Ώρας · Χώρα · Τοποθεσία · Στοιχεία"}] },
      { num: "1.3", part: "1", title: "Στοιχεία Συνδρομής", href: '/tutorial/backoffice/info-subscription', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Δοκιμή · Ενεργό · Πληρώνει · Πρώην Πελάτης"}] },
      { num: "1.4", part: "1", title: "Διάρκεια Συνδρομής", href: '/tutorial/backoffice/info-subscription-duration', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Ενεργοποίηση Χειροκίνητης Λειτουργίας · Μήνες. Η Παύση αναστέλλει την εφαρμογή iOS και τη μηνιαία τιμολόγηση· η Επανεκκίνηση τις ενεργοποιεί ξανά."}] },
      { num: "1.5", part: "1", title: "Λεπτομέρειες Βάσης Δεδομένων", href: '/tutorial/backoffice/info-database', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Server · Έκδοση · Database Server"}] },
      { num: "1.6", part: "1", title: "Λεπτομέρειες Τιμολόγησης", href: '/tutorial/backoffice/info-billing', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Πληροφορίες Τιμολόγησης Υπηρεσίας · Enable Custom VAT · Προσαρμογή Στοιχείων Τιμολόγησης"}] },
      { num: "1.7", part: "1", title: "Ρυθμίσεις", href: '/tutorial/backoffice/info-settings', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Ωράριο Καταστήματος · Τοπικά Ονόματα Προϊόντων · Disable Device Inactivity · Drawer Mode · Ενεργοποίηση Εκτύπωσης Αποδείξεων · Has Tax Provider · Tax Provider Integration · Τρόπος Έκδοσης Αποδείξεων · Τρόπος Εκτύπωσης Αποδείξεων · Enable order forms (Δελτία Παραγγελίας) · Enable AADE POS Integration · Εκτυπώνει Τιμολόγια · Invoices Via Tax Provider · Enable B2G Invoices · στοιχεία παρόχου (Business ID, Location ID, API Key, Secret Key, Production Mode) · Default Action Mapping for Missed Order Form Value · στοιχεία επιχείρησης (Email, ΑΦΜ, Δ.Ο.Υ., Αριθμός ΓΕΜΗ, Επωνυμία, Σύντομη Επωνυμία, Διεύθυνση, Πόλη, Τ.Κ., Δραστηριότητα, Τηλέφωνο, Νόμιμος Εκπρόσωπος, Κωδικός Εγκατάστασης) · Ποσοστό Ιδιοκατανάλωσης · Προεπιλεγμένο Ποσοστό Ιδιοκατανάλωσης % · Ενεργοποιημένοι Τύποι Μονάδων · Ενεργοποίηση Περιορισμένης Ώρας Βάρδιας · Δέχεται Πιστωτικές Κάρτες · Has Pay Card Types · Εμφάνιση Τιμών στην Εκτύπωση · Προβολή Σειρών Σερβιρίσματος · Ενεργοποίηση στατιστικών ΦΠΑ · Αρνητική τιμή στα συνοδευτικά · Ενεργοποίηση ελάχιστης κατανάλωσης · Allow Price Override · Εκτύπωση προϊόντων βάρδιας · Enable Variants"}] },
      { num: "1.8", part: "1", title: "Υπηρεσίες", href: '/tutorial/backoffice/info-services', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Maitre Mode · Enable Salesperson · Οικονομικά Στοιχεία · Delivery · Τιμοκατάλογοι · Συνδυασμοί · Accept Scheduled Orders · Εκδηλώσεις · Κρατήσεις · Δωμάτια · Παρουσιολόγιο · Τύποι Πελατών · Σύστημα Επιβράβευσης · Κουπόνια · Gift Cards · Promotions · Προσαρμοσμένοι Κανόνες Ιδιοκατανάλωσης · Αποθήκη · Αρχική Απογραφή · Εκτίμηση Καταναλώσεων · Ενοικιάσεις · Έχει Μάρκες · Has Modifiers Filters · Has Food Channels · Online Κατάλογος · Σύνδεση Spotit"}] },
      { num: "1.9", part: "1", title: "IHost Service", href: '/tutorial/backoffice/info-ihost', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Enable IHost · IHost Store ID · IHost Auth Token"}] },
      { num: "1.10", part: "1", title: "Grubhub Service", href: '/tutorial/backoffice/info-grubhub', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Enable Grubhub"}] },
      { num: "1.11", part: "1", title: "Συσκευές", href: '/tutorial/backoffice/info-devices', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Caller ID · Enable Cash Drawer · Ζυγαριά · Πληρωμές με NFC · Barcode Scanner · Οθόνες Κουζίνας · Kitchen Expo · Digital Order Displays · Customer Display · Clock In Beacon"}] },
      { num: "1.12", part: "1", title: "EFTPOS Providers", href: '/tutorial/backoffice/info-eftpos', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Viva · Sumup · Neosoft · Pinelabs · Mellon · Nexidesk · Cardlink · Epay · Nbg · Worldline · Jcc · Attica · Pancreta · Edps · Nexiandroid · Mypos · Inss"}] },
      { num: "1.13", part: "1", title: "Άλλες Υπηρεσίες", href: '/tutorial/backoffice/info-other-services', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Αρχικό Ταμείο · Παραγγελίες Βάρδιας · Παραγγελίες με Πίστωση · Saving receipts in Recepta · Product Price History · Additional Services Support · One Page Report · Φιλοδωρήματα στο κλείσιμο της βάρδιας · Παραδόθηκαν · Remove User From Tax Receipts · Αρίθμηση Παραγγελίας στην Απόδειξη · Hide dine-in order paper title · Allow Access to Printers & KDS in Products · Δημοτικά Τέλη · Απόκρυψη ΦΠΑ από Συνολική Παραγγελία · External Api Key · SoftOne Sales Report · Φωνητικές Ηχογραφήσεις · Residents · Adani One · Stockflo · Resaverse · Υπηρεσία Hotelier · RoomRack Service · Φραγή εξόφλησης παραγγελιών · Softone Integration"}] },
      { num: "2.1", part: "2", title: "Χρήστες", href: '/tutorial/backoffice/users', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Λίστα λογαριασμών με πρόσβαση στο Secure (Email, Λογαριασμός, ενεργός/ανενεργός, διαγραφή) · Add new"}] },
      { num: "3.1", part: "3", title: "Άδειες Χρήσης", href: '/tutorial/backoffice/licenses', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Επισκόπηση: Στοιχεία Τιμολόγησης Καταστήματος (Πρώτη, Τελευταία και Επόμενη Ημερομηνία Τιμολόγησης, Ποσό Συνδρομής, Ληξιπρόθεσμο Ποσό) και Ενεργές Άδειες Χρήσης · Επεξεργασία Αδειών Χρήσης (π.χ. Basic Access Fee POS, Standard POS, Χωρίς Χρέωση) · Προσθήκη Άδειας Χρήσης (Άδεια Χρήσης, Ημερομηνία Δημιουργίας, Μηνιαία Συνδρομή, Ποσοστό Έκπτωσης, Χωρίς Χρέωση, Ενεργή Άδεια Χρήσης)"}] },
      { num: "4.1", part: "4", title: "Πληρωμές", href: '/tutorial/backoffice/payments', notes: [{"icon":"ℹ️","variant":"info","title":"Πεδία σε αυτή την ενότητα","text":"Πληρωμές Καταστήματος ανά μήνα (πράσινη κουκίδα = πληρωμένη, κόκκινη = απλήρωτη) · Add new"}] },
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