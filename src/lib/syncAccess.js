import { base44 } from '@/api/base44Client';

// Ενημερώνει (στον server) τα πεδία πρόσβασης του χρήστη από τις whitelists,
// ώστε οι κανόνες προστασίας των δεδομένων να ξέρουν τι επιτρέπεται.
// Τρέχει μία φορά ανά φόρτωση της σελίδας.
let pending = null;

export function syncMyAccess() {
  if (!pending) {
    pending = base44.functions.invoke('syncAccess', {}).catch(() => null);
  }
  return pending;
}

// Μόνο για admin: μετά από προσθήκη/διαγραφή στη Whitelist.
export function syncAccessFor(email) {
  if (!email) return Promise.resolve(null);
  return base44.functions.invoke('syncAccess', { email }).catch(() => null);
}
