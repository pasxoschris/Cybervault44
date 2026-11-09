import React from "react";
import { Link } from "react-router-dom";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";

const IMG = "https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/";

function Shot({ src, alt, caption, max = "max-w-md" }) {
  return (
    <figure className="flex flex-col items-center gap-2">
      <img src={IMG + src} alt={alt} className={`w-full ${max} h-auto rounded-2xl border border-gray-200 shadow-sm`} loading="lazy" />
      {caption && <figcaption className="text-sm text-gray-500 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>{caption}</figcaption>}
    </figure>
  );
}

const S = ({ to, children }) => <Link to={to} className="text-purple-700 underline">{children}</Link>;

export default function Now() {
  return (
    <SecureTutorialLayout title="Τώρα" subtitle="Η τρέχουσα κατάσταση του καταστήματος, ανά πάσα στιγμή">

      <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
        Η σελίδα <strong>Τώρα</strong> δείχνει τι συμβαίνει αυτή τη στιγμή στο κατάστημα: πόσες παραγγελίες είναι ανοιχτές σε κάθε χώρο, πόσα άτομα και προϊόντα έχουν, πόσα έσοδα έχουν γίνει και ποιοι χρήστες έχουν ανοιχτή βάρδια.
      </p>

      <SectionTitle>Πώς τη διαβάζεις</SectionTitle>

      <StepCard number="1" title="Άνοιξε το Τώρα">
        <p>Από το μενού αριστερά, πάτα <strong>Τώρα</strong>. Είναι η πρώτη επιλογή του μενού. Ο τίτλος της σελίδας είναι <strong>«Τραπέζια σε πραγματικό χρόνο»</strong>.</p>
      </StepCard>

      <Shot src="bc9366d2f_now-live.webp" alt="Σελίδα Τώρα με μία ανοιχτή παραγγελία στο Standing" caption="Ομάδες αριστερά, κάρτες και πίνακας παραγγελιών δεξιά" max="max-w-3xl" />

      <StepCard number="2" title="Διάλεξε ομάδα">
        <p>Στη στήλη <strong>Ομάδες</strong> βλέπεις τα <strong>Standing</strong>, <strong>Take-away</strong>, <strong>Delivery</strong> και τις ομάδες τραπεζιών του καταστήματος (π.χ. ΑΥΛΗ, ΣΑΛΑ).</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Σκούρα γράμματα</strong> με αριθμό σε παρένθεση, π.χ. <strong>ΣΑΛΑ (1)</strong>: η ομάδα έχει ανοιχτές παραγγελίες.</li>
          <li><strong>Γκρι γράμματα:</strong> η ομάδα δεν έχει κίνηση αυτή τη στιγμή.</li>
        </ul>
        <p>Πάτα μια ομάδα για να δεις τα στοιχεία της. Μπορείς να αλλάξεις ομάδα και από το βελάκι δίπλα στο όνομά της, στον τίτλο της σελίδας.</p>
      </StepCard>

      <StepCard number="3" title="Οι τέσσερις κάρτες">
        <p>Για την ομάδα που επέλεξες βλέπεις:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Παραγγελίες</strong></li>
          <li><strong>Άτομα</strong></li>
          <li><strong>Προϊόντα</strong></li>
          <li><strong>Έσοδα</strong> (μπλε κάρτα)</li>
        </ul>
      </StepCard>

      <StepCard number="4" title="Ο πίνακας Παραγγελίες">
        <p>Κάτω από τις κάρτες, κάθε παραγγελία της ομάδας σε μια γραμμή:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Ημερομηνία</strong> και ώρα της παραγγελίας</li>
          <li><strong>Άτομα</strong></li>
          <li><strong>Χρήστης:</strong> ποιος σερβιτόρος την άνοιξε</li>
          <li><strong>Έκπτωση:</strong> ποσό και ποσοστό</li>
          <li><strong>Συνολικό Ποσό</strong></li>
          <li><strong>Κατάσταση</strong>, π.χ. <strong>Απλήρωτη</strong></li>
        </ul>
      </StepCard>

      <StepCard number="5" title="Ανοιχτές Βάρδιες">
        <p>Πάνω δεξιά, στο <strong>Ανοιχτές Βάρδιες</strong>, βλέπεις ποιοι χρήστες έχουν ανοιχτή βάρδια αυτή τη στιγμή.</p>
      </StepCard>

      <SectionTitle>Πότε το χρησιμοποιείς</SectionTitle>

      <StepCard title="Ανά πάσα στιγμή">
        <p>Για να δεις με μια ματιά πόσο «γεμάτο» είναι το κατάστημα και πού: ποιοι χώροι έχουν κίνηση, πόσα άτομα κάθονται, πόσα έσοδα έχουν γίνει.</p>
      </StepCard>

      <StepCard title="Πριν τελειώσει το ωράριο">
        <p>Έλεγξε αν υπάρχουν <strong>απλήρωτες</strong> παραγγελίες και σε ποιον χρήστη ανήκουν, ώστε να σημειωθούν ως <S to="/tutorial/payment">πληρωμένες</S>.</p>
      </StepCard>

      <InfoBox icon="⚠️" title="Απλήρωτες στο τέλος του ωραρίου" variant="warning">
        <p>Με τη λήξη του ωραρίου κλείνουν αυτόματα <strong>μόνο οι πληρωμένες</strong> παραγγελίες. Αν μείνει έστω και μία απλήρωτη, η βάρδια δεν κλείνει και ο χρήστης <strong>δεν μπορεί να κάνει login</strong>. Δες το μάθημα <S to="/tutorial/shift-close">Λήξη Βάρδιας</S>.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Για το ιστορικό των παραγγελιών" variant="info">
        <p>Το Τώρα δείχνει την τρέχουσα εικόνα. Για όλες τις παραγγελίες με τη σειρά, τα παραστατικά τους, τις εκπτώσεις και τις ακυρώσεις, πήγαινε στη <S to="/tutorial/secure/c-order-flow">3.2 Ροή Παραγγελιών</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
