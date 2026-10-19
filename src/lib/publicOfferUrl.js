// Δημόσιος σύνδεσμος προσφοράς.
// Δεν είναι route της εφαρμογής (αυτή απαιτεί σύνδεση), αλλά backend function
// που σερβίρει τη σελίδα της προσφοράς σε οποιονδήποτε επισκέπτη, χωρίς login.
const PUBLIC_FALLBACK_ORIGIN = 'https://cybervault.gr';

export function publicOfferUrl(publicToken) {
  if (!publicToken) return '';
  const { hostname, origin } = window.location;
  const isLocalOrPreview = /localhost|127\.0\.0\.1|base44/.test(hostname);
  return `${isLocalOrPreview ? PUBLIC_FALLBACK_ORIGIN : origin}/functions/publicOffer?token=${publicToken}`;
}