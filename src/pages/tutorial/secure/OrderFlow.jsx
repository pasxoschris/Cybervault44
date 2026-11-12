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

export default function OrderFlow() {
  return (
    <SecureTutorialLayout title="Ροή Παραγγελιών" subtitle="Όλες οι παραγγελίες του καταστήματος σε χρονολόγιο">

      <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
        Η Ροή Παραγγελιών δείχνει κάθε παραγγελία που χτυπήθηκε στην εφαρμογή, με τη σειρά που έγινε. Από εδώ ελέγχεις εκπτώσεις, ιδιοκαταναλώσεις, ακυρώσεις και συγχωνεύσεις, και βρίσκεις κάθε παραστατικό που εκδόθηκε.
      </p>

      <SectionTitle>Φίλτρα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τη Ροή Παραγγελιών">
        <p>Από το μενού αριστερά, πάτα <strong>Ροή Παραγγελιών</strong>. Αριστερά βλέπεις τα <strong>Φίλτρα</strong> και δεξιά το χρονολόγιο με τις παραγγελίες.</p>
      </StepCard>

      <StepCard number="2" title="Διάλεξε τι θέλεις να δεις">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Από / Έως:</strong> το διάστημα ημερομηνιών.</li>
          <li><strong>Χρήστης:</strong> οι παραγγελίες ενός σερβιτόρου.</li>
          <li><strong>Τραπέζι, Υπεύθυνος, Ετικέτες Delivery, Δωμάτιο.</strong></li>
          <li>Με τα κουτάκια βλέπεις μόνο τις παραγγελίες <strong>Με Εκπτώσεις</strong>, <strong>Με Μεταφορές</strong>, <strong>Ακυρώσεις &amp; Φύρα</strong>, <strong>Συγχωνευμένες</strong>, <strong>Με Χρέωση Δωματίου</strong> ή <strong>Με Ελάχιστη Κατανάλωση</strong>.</li>
        </ul>
        <p>Πάτα <strong>Εφαρμογή</strong>. Με το <strong>Αυτόματη Ανανέωση</strong> (πάνω) η λίστα ενημερώνεται μόνη της με τις νέες παραγγελίες.</p>
      </StepCard>

      <Shot src="19b494732_flow-filters.webp" alt="Ροή Παραγγελιών: φίλτρα και υπόμνημα χρωμάτων" caption="Φίλτρα (αριστερά) και υπόμνημα χρωμάτων (δεξιά)" max="max-w-sm" />

      <InfoBox icon="ℹ️" title="Φίλτρα ανά κατάστημα" variant="info">
        <p>Τα φίλτρα Δωμάτιο, Χρέωση Δωματίου και Ελάχιστη Κατανάλωση εμφανίζονται μόνο στα καταστήματα που έχουν αυτές τις λειτουργίες.</p>
      </InfoBox>

      <SectionTitle>Πώς διαβάζεις μια κάρτα</SectionTitle>

      <Shot src="24b29cd33_flow-cards.webp" alt="Κάρτες παραγγελιών στη Ροή" caption="Κάρτες με διαφορετικά χρώματα στο χρονολόγιο" max="max-w-xs" />

      <StepCard title="Το χρώμα της κάρτας">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Ανοιχτόχρωμη:</strong> ανοιχτή παραγγελία.</li>
          <li><strong>Σκούρα:</strong> κλειστή παραγγελία.</li>
          <li><strong>Μωβ:</strong> Γενική Έκπτωση.</li>
          <li><strong>Ροζ:</strong> Ιδιοκατανάλωση.</li>
          <li><strong>Κόκκινη:</strong> Ακυρώσεις &amp; Φύρα.</li>
          <li><strong>Κίτρινο:</strong> Εκπτώσεις Πελατών, όπου υπάρχει Σύστημα Επιβράβευσης.</li>
        </ul>
      </StepCard>

      <StepCard title="Το εικονίδιο κάτω αριστερά">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>✓</strong> κανονική παραγγελία.</li>
          <li><strong>⊗</strong> ακυρωμένη παραγγελία.</li>
          <li><strong>Πράσινο ✓</strong> συγχωνευμένη παραγγελία. Η κάρτα κρατά το χρώμα της (ανοιχτόχρωμη ή σκούρα) και πράσινο γίνεται μόνο το εικονίδιο.</li>
        </ul>
      </StepCard>

      <StepCard title="Ποσό και ώρα">
        <p><strong>Ποσό:</strong> το τελικό ποσό της παραγγελίας. Αν δίπλα υπάρχει <strong>διαγραμμένο</strong> ποσό, αυτό είναι το <strong>ποσό της έκπτωσης</strong>. Π.χ. «<s>6,00€</s> 9,00€» σημαίνει έκπτωση 6,00€ και τελικό 9,00€.</p>
        <p><strong>Ώρα:</strong> η ώρα της <strong>τελευταίας ενέργειας</strong>, π.χ. της απόδειξης ή του πιστωτικού. Γι' αυτό μια παραγγελία μετακινείται στο χρονολόγιο όταν πληρώνεται ή ακυρώνεται.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Διαφορές με την εφαρμογή" variant="info">
        <p>Στις <S to="/tutorial/shift">Παραγγελίες Βάρδιας</S> της εφαρμογής ο σερβιτόρος βλέπει την <strong>ώρα δημιουργίας</strong>, ενώ η Ροή δείχνει την ώρα της τελευταίας ενέργειας. Τα χρώματα στην εφαρμογή είναι τα χρώματα των <strong>ομάδων τραπεζιών</strong> και δεν σχετίζονται με τα χρώματα της Ροής.</p>
      </InfoBox>

      <SectionTitle>Στοιχεία Παραγγελίας</SectionTitle>

      <StepCard number="1" title="Πάτα μια κάρτα">
        <p>Ανοίγουν τα <strong>Στοιχεία Παραγγελίας</strong>. Πάνω δεξιά βλέπεις τον χρήστη και την ώρα δημιουργίας. Από κάτω το Τραπέζι, τα Άτομα και τα Προϊόντα.</p>
      </StepCard>

      <Shot src="f9982d90e_flow-details.webp" alt="Στοιχεία Παραγγελίας" caption="Στοιχεία ανοιχτής παραγγελίας με τα κουμπιά στο κάτω μέρος" max="max-w-sm" />

      <StepCard number="2" title="Διάβασε τα προϊόντα">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Εικονίδιο εγγράφου</strong> δίπλα στο προϊόν: «Εκδόθηκε», δηλαδή το προϊόν έχει περάσει σε παραστατικό.</li>
          <li><strong>Εικονίδιο πληρωμής</strong>: ο τρόπος πληρωμής, π.χ. «Πληρωμένο με Μετρητά».</li>
          <li><strong>Έκπτωση:</strong> η αρχική τιμή διαγραμμένη και δίπλα η νέα. Το <strong>🔒 Owner</strong> κάτω από το προϊόν δείχνει ποιος έδωσε τον Κωδικό Διαχειριστή (<S to="/tutorial/discount">Γενική Έκπτωση</S>).</li>
          <li><strong>Ιδιοκατανάλωση:</strong> «🔒 Owner › [υπάλληλος]», δηλαδή ποιος ενέκρινε και ποιος κατανάλωσε (<S to="/tutorial/discount-own">Ιδιοκατανάλωση</S>).</li>
          <li><strong>Ακύρωση:</strong> το προϊόν διαγραμμένο με κόκκινο, η <strong>αιτία</strong> της ακύρωσης και ποιος την ενέκρινε (<S to="/tutorial/cancel-product">Ακύρωση Προϊόντος</S>).</li>
        </ul>
        <p>Κάτω βλέπεις το <strong>Σύνολο</strong> και, αν η παραγγελία δεν έχει πληρωθεί, τα <strong>Απλήρωτα</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Τα κουμπιά στο κάτω μέρος">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Μπλε 📂:</strong> τα παραστατικά της παραγγελίας (δες παρακάτω).</li>
          <li><strong>Ιστορικό:</strong> εμφανίζεται στις συγχωνευμένες παραγγελίες.</li>
          <li><strong>Μαύρο εικονίδιο εγγράφου:</strong> Έκδοση Τιμολογίου από το Secure.</li>
          <li><strong>Πράσινο εικονίδιο εγγράφου:</strong> Issue B2G Invoice (<S to="/tutorial/secure/h-b2g">B2G Invoices</S>).</li>
        </ul>
      </StepCard>

      <InfoBox icon="⚠️" title="Μην εκδίδεις τιμολόγιο από το Secure" variant="warning">
        <p>Τα τιμολόγια εκδίδονται από την εφαρμογή, κατά την πληρωμή (<S to="/tutorial/invoice">Τιμολόγιο</S>). Αν εκδοθεί τιμολόγιο από το Secure, η εφαρμογή δεν ενημερώνεται και βλέπει την παραγγελία σαν να μην έχει εκδοθεί κανένα παραστατικό. Έτσι ο σερβιτόρος μπορεί να εκδώσει δεύτερο παραστατικό για την ίδια παραγγελία. Η έκδοση από το Secure γίνεται <strong>μόνο σε ακραία περίπτωση</strong>, ειδικά όχι σε ανοιχτή βάρδια.</p>
      </InfoBox>

      <SectionTitle>Παραστατικά (📂)</SectionTitle>

      <StepCard number="1" title="Πάτα το μπλε 📂">
        <p>Ανοίγει η λίστα <strong>Παραστατικά</strong> με όλα όσα εκδόθηκαν για την παραγγελία: Τύπος, Αριθμός, Περιγραφή, Συνολική Αξία, Mark και Ημερομηνία Έκδοσης.</p>
      </StepCard>

      <Shot src="b399c1e56_flow-documents.webp" alt="Λίστα παραστατικών παραγγελίας" caption="Όλη η ιστορία μιας παραγγελίας: Δελτίο Παραγγελίας, Απόδειξη και Πιστωτικό" max="max-w-2xl" />

      <StepCard number="2" title="Άνοιξε ένα παραστατικό">
        <p>Πάτα το <strong>🔗</strong> στο τέλος της γραμμής. Ανοίγει το παραστατικό στη σελίδα της <strong>ONESIGN</strong>, με κουμπιά <strong>Download</strong>, <strong>Print</strong> και <strong>Share</strong>. Έτσι το κατεβάζεις, το τυπώνεις ή το στέλνεις σε πελάτη.</p>
      </StepCard>

      <StepCard title="Οι τύποι παραστατικών">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>8.6 · Δελτίο Παραγγελίας</strong> (σειρά ΔΠ): εκδίδεται όταν χτυπιέται η παραγγελία. Είναι πληροφοριακό στοιχείο και όχι απόδειξη. Αν ακυρωθεί πριν την πληρωμή, εκδίδεται <strong>Ακυρωτικό Δελτίο Παραγγελίας</strong>, ίδιου τύπου και σειράς.</li>
          <li><strong>11.1 · Απόδειξη Λιανικής Πώλησης:</strong> εκδίδεται στην πληρωμή.</li>
          <li><strong>11.4 · Πιστωτικό Στοιχείο Λιανικής</strong> (σειρά CR): εκδίδεται όταν ακυρώνεται παραγγελία που είχε ήδη απόδειξη (<S to="/tutorial/cancel-order">Ακύρωση Παραγγελίας</S>, <S to="/tutorial/cancel-receipt">Ακύρωση Απόδειξης</S>).</li>
          <li><strong>6.1 · Στοιχείο Αυτοπαράδοσης</strong> (σειρά SD): εκδίδεται στην Ιδιοκατανάλωση, με το Κόστος Αγαθού του προϊόντος.</li>
        </ul>
      </StepCard>

      <InfoBox icon="ℹ️" title="Τι είναι τα στοιχεία στο παραστατικό" variant="info">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Τύπος Παραστατικού:</strong> ο κωδικός του είδους του, π.χ. 8.6 ή 11.1.</li>
          <li><strong>ΜΑΡΚ (Mark):</strong> ο Μοναδικός Αριθμός Καταχώρησης που παίρνει το παραστατικό όταν διαβιβάζεται στο myDATA της ΑΑΔΕ. Αν έχει ΜΑΡΚ, έχει καταχωρηθεί.</li>
          <li><strong>QR:</strong> με σάρωση ανοίγει το παραστατικό στη σελίδα της ONESIGN, για επαλήθευση.</li>
          <li><strong>Related Marks:</strong> το ΜΑΡΚ του παραστατικού με το οποίο συνδέεται, π.χ. ποιο Δελτίο ακυρώνει ένα Ακυρωτικό Δελτίο.</li>
        </ul>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Γιατί το Δελτίο και η Απόδειξη έχουν διαφορετικό ποσό" variant="info">
        <p>Το Δελτίο Παραγγελίας εκδίδεται όταν χτυπιέται η παραγγελία, ενώ η έκπτωση δίνεται συνήθως στην πληρωμή. Έτσι το Δελτίο έχει το ποσό <strong>πριν</strong> την έκπτωση και η Απόδειξη το ποσό <strong>μετά</strong>. Αυτό είναι σωστό.</p>
      </InfoBox>

      <SectionTitle>Συγχωνευμένες παραγγελίες</SectionTitle>

      <StepCard title="Τι βλέπεις μετά από συγχώνευση">
        <p>Στη Ροή μένει μόνο η παραγγελία στην οποία έγινε η συγχώνευση, με όλα τα προϊόντα και πράσινο ✓ (<S to="/tutorial/merge-orders">Συγχώνευση Παραγγελιών</S>). Στα Στοιχεία της εμφανίζεται το κουμπί <strong>Ιστορικό</strong>, που δείχνει τις αρχικές παραγγελίες (<strong>Merged Orders</strong>). Στο 📂 βρίσκεις τα Δελτία Παραγγελίας όλων των αρχικών παραγγελιών.</p>
      </StepCard>

      <Shot src="164df352e_flow-merged-history.webp" alt="Merged Orders" caption="Ιστορικό: οι δύο αρχικές παραγγελίες που συγχωνεύτηκαν" max="max-w-sm" />

      <SectionTitle>Παραγγελίες από πλατφόρμες</SectionTitle>

      <InfoBox icon="ℹ️" title="Παραγγελίες από Wolt και efood" variant="info">
        <p>Οι παραγγελίες από Wolt και efood περνούν αυτόματα στη Ροή μέσω γέφυρας (την ενεργοποιεί η Spotlight, με άδεια για κάθε γέφυρα). Τις αναγνωρίζεις έτσι:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Η κάρτα γράφει <strong>Wolt Delivery</strong> ή <strong>E-Food Go</strong> και <strong>Delivery</strong> με το όνομα της πλατφόρμας.</li>
          <li>Στο σχόλιο φαίνεται ο αριθμός της πλατφόρμας, π.χ. <strong>«Wolt: #362»</strong>, μαζί με το μήνυμα του πελάτη.</li>
          <li>Στα Στοιχεία Παραγγελίας, ο Πελάτης είναι π.χ. «Wolt Delivery», το Τραπέζι «Delivery», και στα προϊόντα υπάρχει το εικονίδιο <strong>Ηλεκτρονική πληρωμή</strong>.</li>
        </ul>
      </InfoBox>

      <SectionTitle>Επαναφορά παραγγελίας</SectionTitle>

      <InfoBox icon="ℹ️" title="Πώς φαίνεται μια επαναφορά" variant="info">
        <p>Η Επαναφορά γίνεται από την εφαρμογή (<S to="/tutorial/shift">Παραγγελίες Βάρδιας</S>), με <strong>Κωδικό Διαχειριστή</strong>. Στη Ροή η παραγγελία εμφανίζεται ξανά ως κανονική ανοιχτή, στην ίδια ώρα, χωρίς ένδειξη για το ποιος ή πότε την επανέφερε. Αν δεις ανοιχτή παραγγελία που έχει ήδη απόδειξη στο 📂, έχει γίνει επαναφορά.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
