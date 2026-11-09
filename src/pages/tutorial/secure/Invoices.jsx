import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function Invoices() {
  return (
    <SecureTutorialLayout title="Τιμολόγια" subtitle="Η λίστα με τα τιμολόγια που έχουν εκδοθεί">

      <Intro>
        Στη σελίδα <strong>Τιμολόγια</strong> βλέπεις τα τιμολόγια που έχουν εκδοθεί από την εφαρμογή. Τα τιμολόγια τα εκδίδουν οι σερβιτόροι από το iPhone/iPad. Δες το <S to="/tutorial/invoice">μάθημα του Service για το τιμολόγιο</S>.
      </Intro>

      <SectionTitle>Η λίστα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τα Τιμολόγια">
        <p>Από το μενού αριστερά πάτα <strong>Τιμολόγια</strong>. Με τα φίλτρα επάνω διαλέγεις το διάστημα που θέλεις να δεις.</p>
      </StepCard>

      <StepCard number="2" title="Έλεγχος">
        <p>Χρησιμοποίησέ τη για να ελέγξεις ποια τιμολόγια βγήκαν και πότε.</p>
      </StepCard>

      <SectionTitle>Έκδοση τιμολογίου από το Secure</SectionTitle>

      <InfoBox icon="⚠️" title="Μόνο σε ακραία περίπτωση" variant="warning">
        <p>Στη <S to="/tutorial/secure/c-order-flow">Ροή Παραγγελιών</S> → Στοιχεία Παραγγελίας υπάρχει το μαύρο εικονίδιο <strong>Έκδοση Τιμολογίου</strong>. Χρησιμοποίησέ το μόνο σε ακραία περίπτωση: η εφαρμογή στο iPhone/iPad δεν ενημερώνεται, οπότε ο σερβιτόρος μπορεί να εκδώσει δεύτερο παραστατικό για την ίδια παραγγελία.</p>
      </InfoBox>

      <InfoBox icon="ℹ️" title="Τιμολόγια προς το Δημόσιο" variant="info">
        <p>Για τιμολόγια προς φορείς του Δημοσίου δες το <S to="/tutorial/secure/h-b2g">μάθημα 16.3 B2G Invoices</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
