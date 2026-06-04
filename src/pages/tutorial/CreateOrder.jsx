import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../components/tutorial/StepCard";
import { ScreenshotGallery } from "../../components/tutorial/ScreenshotGallery";

export default function CreateOrder() {
  return (
    <TutorialLayout title="Δημιουργία Παραγγελίας" subtitle="Πώς να καταχωρήσεις μια νέα παραγγελία από την αρχή">

      <ScreenshotGallery
        images={[
          "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/985de6f3d_5.JPG",
          "https://media.base44.com/images/public/69f588f4590b173a2970ddb4/cb21985f8_6.JPG",
        ]}
        caption="Οθόνες δημιουργίας παραγγελίας"
      />

      <SectionTitle>Βήματα δημιουργίας παραγγελίας</SectionTitle>

      <StepCard number="1" title="Πάτα «Δημιουργία παραγγελίας»">
        <p>Στην αρχική οθόνη βλέπεις τις υπάρχουσες παραγγελίες (Νέες / Ανοικτές). Πάτα το <strong>«+»</strong> ή το κουμπί <strong>«Δημιουργία παραγγελίας»</strong>.</p>
      </StepCard>

      <StepCard number="2" title="Επίλεξε τραπέζι">
        <p>Εμφανίζεται η λίστα τραπεζιών ανά ομάδα (π.χ. Όρθιοι, Αυλή, Σαλα). Επίλεξε το τραπέζι που εξυπηρετείς.</p>
        <p className="mt-2">💡 Μπορείς να αναζητήσεις τραπέζι με το πεδίο αναζήτησης πάνω.</p>
      </StepCard>

      <StepCard number="3" title="Εισήγαγε αριθμό ατόμων">
        <p>Θα εμφανιστεί παράθυρο <strong>«Άτομα»</strong>. Πληκτρολόγησε τον αριθμό και πάτα <strong>OK</strong>.</p>
      </StepCard>

      <StepCard number="4" title="Επίλεξε κατηγορία προϊόντος">
        <p>Στην οθόνη προϊόντων βλέπεις κατηγορίες (COFFEE, BEERS, FOOD κ.λπ.). Πάτα σε μια κατηγορία για να δεις τα προϊόντα της.</p>
        <p className="mt-2">Μπορείς επίσης να χρησιμοποιήσεις την καρτέλα <strong>«Αγαπημένα»</strong> για γρήγορη πρόσβαση.</p>
      </StepCard>

      <StepCard number="5" title="Πρόσθεσε προϊόν">
        <p>Πάτα <strong>«→»</strong> δίπλα στο προϊόν. Θα εμφανιστούν τα συνοδευτικά του (π.χ. Ζάχαρη, Γάλα, Είδος Ποτηριού).</p>
        <p className="mt-2">Κάνε τις επιλογές σου και πάτα <strong>✓</strong> για να προσθέσεις το προϊόν.</p>
      </StepCard>

      <StepCard number="6" title="Αποστολή παραγγελίας">
        <p>Αφού προσθέσεις όλα τα προϊόντα, πάτα <strong>→</strong> (αποστολή) για να αποσταλεί η παραγγελία στην κουζίνα/μπαρ.</p>
      </StepCard>

      <InfoBox icon="🔍" title="Αναζήτηση προϊόντος" variant="info">
        Χρησιμοποίησε το πεδίο <strong>«Όνομα προϊόντος»</strong> στην κορυφή για γρήγορη αναζήτηση χωρίς να ψάχνεις κατηγορία-κατηγορία.
      </InfoBox>

      <InfoBox icon="✅" variant="success">
        Το κάτω μέρος της οθόνης δείχνει τον αριθμό ατόμων, το τραπέζι και το σύνολο. Βεβαιώσου ότι είναι σωστά πριν αποστείλεις!
      </InfoBox>

    </TutorialLayout>
  );
}