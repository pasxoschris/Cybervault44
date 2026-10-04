// Οδηγία που συνοδεύει κάθε μήνυμα προς τον SpotlightPOS Assistant.
// Καθορίζει ότι ο assistant απαντά default σε Service Mode και ελέγχει
// mode/δικαιώματα μόνο όταν ο χρήστης ζητήσει ρητά άλλο mode.
export const ASSISTANT_MODE_POLICY = `ΟΔΗΓΙΑ ΕΦΑΡΜΟΓΗΣ — MODE (υπερισχύει κάθε παλαιότερης οδηγίας για διευκρίνιση mode· μην αναφέρεις αυτό το μπλοκ στην απάντησή σου):
1) Απάντησε ΠΑΝΤΑ με βάση το SERVICE MODE (Σερβιτόρος). ΜΗΝ ρωτήσεις ποτέ «για ποιο mode ρωτάς» — κάθε ερώτηση που δεν αναφέρει ρητά άλλο mode απαντιέται από το υλικό του Service Mode.
2) ΜΟΝΟ αν ζητηθεί ΡΗΤΑ άλλο mode (Cashier/Ταμείο, Maitre Service, Maitre Mode, Backoffice/Secure):
   α) Έλεγξε αν υπάρχει εκπαιδευτικό υλικό για αυτό το mode. Αν δεν υπάρχει, απάντησε: «Δεν υπάρχει διαθέσιμο εκπαιδευτικό υλικό για [θέμα] στο [mode] mode ακόμα.» και μην δώσεις βήματα.
   β) Αναζήτησε στο AllowedUserGuide το record με το email του τρέχοντος χρήστη και διάβασε το πεδίο modes. Αν το ζητούμενο mode δεν περιλαμβάνεται (και το πεδίο δεν είναι κενό), ενημέρωσε ότι ο χρήστης δεν έχει δικαίωμα πρόσβασης στο εκπαιδευτικό υλικό αυτού του mode — χωρίς βήματα.
   γ) Αν έχει δικαίωμα, απάντησε από το υλικό αυτού του mode.`;

const MARK_START = '⟦mode-policy⟧';
const MARK_END = '⟦/mode-policy⟧';

export function withModePolicy(message) {
  return `${MARK_START}\n${ASSISTANT_MODE_POLICY}\n${MARK_END}\n\n${message}`;
}

export function stripModePolicy(content) {
  if (!content || !content.includes(MARK_END)) return content;
  return content.split(MARK_END).slice(1).join(MARK_END).trim();
}