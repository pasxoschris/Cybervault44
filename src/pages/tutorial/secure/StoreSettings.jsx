import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { S, Intro } from "../../../components/tutorial/SecureShot";

export default function StoreSettings() {
  return (
    <SecureTutorialLayout title="Ρυθμίσεις" subtitle="Τύποι καρτών, ζώνες ώρας, λόγοι ακύρωσης και φύρας">

      <Intro>
        Στις <strong>Ρυθμίσεις</strong> ορίζεις λίστες που χρησιμοποιούν η εφαρμογή και τα στατιστικά του καταστήματος. Όλες οι ενότητες είναι στην ίδια σελίδα και σώζονται μαζί.
      </Intro>

      <StepCard number="1" title="Άνοιξε τις Ρυθμίσεις">
        <p>Από το μενού αριστερά πάτα <strong>Ρυθμίσεις</strong>.</p>
      </StepCard>

      <SectionTitle>Προσαρμοσμένοι Τύποι Καρτών</SectionTitle>

      <StepCard number="2" title="Τύποι καρτών">
        <ul className="list-disc pl-5 space-y-1">
          <li>Οι βασικοί τύποι (Visa, Mastercard, Union Pay, American Express, Diners Club) είναι <strong>γκρι</strong>: το όνομά τους δεν αλλάζει.</li>
          <li>Με τον διακόπτη <strong>Ενεργό</strong> ενεργοποιείς ή απενεργοποιείς έναν τύπο.</li>
          <li>Για δικό σου τύπο, γράψε το όνομα στην κενή γραμμή στο τέλος και πάτα <strong>Add Custom</strong>.</li>
        </ul>
      </StepCard>

      <SectionTitle>Ζώνες Ώρας</SectionTitle>

      <StepCard number="3" title="Όρισε τις ζώνες της μέρας">
        <ul className="list-disc pl-5 space-y-1">
          <li>Πάτα <strong>Προσθήκη</strong>: εμφανίζεται νέα γραμμή.</li>
          <li>Γράψε <strong>Όνομα</strong> (π.χ. Dinner), <strong>Ώρα Έναρξης</strong> (π.χ. 16:00) και <strong>Ώρα Λήξης</strong> (π.χ. 00:00).</li>
          <li>Με το <strong>⊗</strong> στα δεξιά διαγράφεις μια ζώνη.</li>
        </ul>
        <p className="mt-2">Τα έσοδα ανά ζώνη τα βλέπεις στα <S to="/tutorial/secure/d-time-zones">Στατιστικά → Ζώνες Ώρας</S>.</p>
      </StepCard>

      <SectionTitle>Λόγοι Ακύρωσης και Φύρας</SectionTitle>

      <StepCard number="4" title="Οι λόγοι που διαλέγει ο σερβιτόρος">
        <p>Είναι οι λόγοι που εμφανίζονται στην εφαρμογή όταν ακυρώνεται ένα προϊόν, με τη σειρά που ορίζεις εδώ. Π.χ. Λάθος καταχώρηση, Δεν άρεσε, Καθυστέρηση, Έπεσε στον σερβιτόρο, Επιστροφή.</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Με τον διακόπτη <strong>Ενεργό</strong> εμφανίζεις ή κρύβεις έναν λόγο.</li>
          <li>Σύρε από το <strong>↕</strong> στα αριστερά για να αλλάξεις τη σειρά.</li>
          <li>Για δικό σου λόγο, γράψε τον στην κενή γραμμή στο τέλος και πάτα <strong>Add Custom</strong>.</li>
        </ul>
      </StepCard>

      <SectionTitle>Αποθήκευση</SectionTitle>

      <StepCard number="5" title="Πάτα Αποθήκευση">
        <p>Το κουμπί <strong>Αποθήκευση</strong> είναι στο κάτω μέρος της σελίδας και σώζει όλες τις ενότητες μαζί.</p>
      </StepCard>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S> για να περάσουν στις συσκευές.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
