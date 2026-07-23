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
      { title: 'Σύνδεση Χρήστη', href: '/tutorial/login' },
      { title: 'Έναρξη Βάρδιας', href: '/tutorial/start-shift' },
      { title: 'Ρυθμίσεις Χρήστη', href: '/tutorial/settings' },
      { title: 'Δημιουργία Παραγγελίας', href: '/tutorial/create-order' },
      { title: 'Στοιχεία Παραγγελίας', href: '/tutorial/order-details' },
      { title: 'Έκπτωση', href: '/tutorial/discount' },
      { title: 'Πληρωμή', href: '/tutorial/payment' },
      { title: 'Επεξεργασία Παραγγελίας', href: '/tutorial/edit-order' },
      { title: 'Έκδοση Τιμολογίου', href: '/tutorial/invoice' },
      { title: 'Μεταφορά Παραγγελίας', href: '/tutorial/transfer-order' },
      { title: 'Συγχώνευση Παραγγελιών', href: '/tutorial/merge-orders' },
      { title: 'Παραγγελίες Βάρδιας', href: '/tutorial/shift' },
      { title: 'Σενάρια', href: '/tutorial/scenarios' },
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
      { title: 'Έναρξη Βάρδιας', href: '/tutorial/cashier/open' },
      { title: 'Πληρωμές', href: '/tutorial/cashier/payments' },
      { title: 'Split Payments', href: '/tutorial/cashier/split' },
      { title: 'Έκδοση Τιμολογίου', href: '/tutorial/cashier/invoice' },
      { title: 'Ρυθμίσεις Χρήστη', href: '/tutorial/cashier/settings' },
      { title: 'Παραγγελία Delivery', href: '/tutorial/cashier/delivery' },
      { title: 'Κλείσιμο Βάρδιας', href: '/tutorial/cashier/close' },
    ],
  },
  {
    id: 'backoffice',
    emoji: '⚙️',
    title: 'Secure / Back Office',
    subtitle: 'Διαχειριστικό σύστημα',
    color: '#DC2626',
    colorLight: 'rgba(220,38,38,0.12)',
    colorBorder: 'rgba(220,38,38,0.3)',
    lessons: [
      { title: 'Χρήστες', href: '/tutorial/backoffice/users' },
      { title: 'Ρόλοι', href: '/tutorial/backoffice/roles' },
      { title: 'Εκτυπωτές', href: '/tutorial/backoffice/printers' },
      { title: 'Κατάλογοι', href: '/tutorial/backoffice/catalogs' },
      { title: 'Τιμοκατάλογοι', href: '/tutorial/backoffice/pricelists' },
      { title: 'Τραπέζια', href: '/tutorial/backoffice/tables' },
      { title: 'Αναφορές', href: '/tutorial/backoffice/reports' },
      { title: 'Παραμετροποίηση', href: '/tutorial/backoffice/config' },
    ],
  },
];

export function getRoleById(id) {
  return ROLES.find(r => r.id === id);
}

export function getRoleByPath(pathname) {
  for (const role of ROLES) {
    if (role.lessons.some(l => l.href === pathname)) return role;
  }
  return null;
}