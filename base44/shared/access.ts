// Κοινοί έλεγχοι πρόσβασης βάσει των whitelists (AllowedUserReseller, AllowedUserGuide, AllowedUser).
// Οι whitelists είναι η πηγή αλήθειας. Τα πεδία reseller_access / guide_access / servicedesk_access του
// χρήστη είναι αυτόματο αντίγραφό τους, ώστε να τα ελέγχουν οι κανόνες RLS.
// Τα πεδία αυτά τα γράφει μόνο ο server (asServiceRole) — ο χρήστης δεν μπορεί.

async function isListed(base44, entityName, email) {
  if (!email) return false;
  const list = await base44.asServiceRole.entities[entityName].filter({ email: String(email).toLowerCase() });
  return Array.isArray(list) && list.length > 0;
}

export async function computeAccess(base44, email) {
  const [reseller, guide, servicedesk] = await Promise.all([
    isListed(base44, 'AllowedUserReseller', email),
    isListed(base44, 'AllowedUserGuide', email),
    isListed(base44, 'AllowedUser', email),
  ]);
  return { reseller_access: reseller, guide_access: guide, servicedesk_access: servicedesk };
}

/** Admin ή χρήστης στη whitelist του Reseller Console. */
export async function isResellerUser(base44, user) {
  if (user?.role === 'admin') return true;
  return isListed(base44, 'AllowedUserReseller', user?.email);
}

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Ασφαλής εμφάνιση κειμένου μέσα σε HTML email. */
export function escapeHtml(value) {
  return String(value === null || value === undefined ? '' : value).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

const EMAIL_RE = /^[^\s@<>,;"']+@[^\s@<>,;"']+\.[^\s@<>,;"']+$/;

export function isValidEmail(value) {
  return typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value.trim());
}

/** Κωδικός 6 ψηφίων με κρυπτογραφικά ασφαλή τυχαιότητα. */
export function secureOtp() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return String(100000 + (buf[0] % 900000));
}

/** Επιτρέπει μόνο δημόσια https URLs (όχι localhost, IP, εσωτερικά δίκτυα). */
export function isSafePublicUrl(value) {
  let url;
  try { url = new URL(String(value)); } catch { return false; }
  if (url.protocol !== 'https:') return false;
  if (url.username || url.password) return false;
  if (url.port && url.port !== '443') return false;
  const host = url.hostname.toLowerCase();
  if (!host.includes('.')) return false;
  if (/^[\d.]+$/.test(host) || host.includes(':') || host.startsWith('[')) return false;
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) return false;
  return true;
}
