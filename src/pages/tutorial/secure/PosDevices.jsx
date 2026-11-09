import React from "react";
import SecureTutorialLayout from "../../../components/tutorial/SecureTutorialLayout";
import { StepCard, InfoBox, SectionTitle } from "../../../components/tutorial/StepCard";
import { Shot, S, Intro } from "../../../components/tutorial/SecureShot";

export default function PosDevices() {
  return (
    <SecureTutorialLayout title="Σημεία Πώλησης / Συσκευές Χρηστών" subtitle="Οι θέσεις εργασίας και τα iPhone/iPad του καταστήματος">

      <Intro>
        Ένα <strong>Σημείο Πώλησης (POS)</strong> είναι μια <strong>θέση εργασίας</strong>, π.χ. «Horeca iPad 1». Στο Secure φτιάχνεις τις θέσεις. Κάθε iPhone/iPad συνδέεται μετά σε μία από αυτές, από την εφαρμογή.
      </Intro>

      <SectionTitle>Η λίστα</SectionTitle>

      <StepCard number="1" title="Άνοιξε τη λίστα">
        <p>Από το μενού αριστερά, πάτα <strong>Συσκευές</strong> → <strong>Σημεία Πώλησης / Συσκευές Χρηστών</strong>. Πάνω έχεις <strong>Αναζήτηση</strong>, φίλτρο <strong>Ενεργά</strong> και το κουμπί <strong>Προσθήκη POS</strong>.</p>
      </StepCard>

      <StepCard title="Οι στήλες">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Όνομα:</strong> το όνομα της θέσης. Είναι αυτό που βλέπει ο σερβιτόρος ως Συσκευή POS στην εφαρμογή.</li>
          <li><strong>Χρήστης:</strong> ποιος είναι συνδεδεμένος τώρα σε αυτή τη συσκευή.</li>
          <li><strong>Έκδοση:</strong> η έκδοση της εφαρμογής, π.χ. 3.5.7(74).</li>
          <li><strong>Εκτυπωτές</strong>, <strong>iOS / Timezone</strong>, <strong>Μοντέλο</strong> της συσκευής.</li>
          <li><strong>Last Ping:</strong> πότε επικοινώνησε τελευταία φορά η συσκευή.</li>
        </ul>
        <p>Δεξιά σε κάθε γραμμή: το ροζ εικονίδιο του Spotit (όπου είναι ενεργό), το 👁 για απενεργοποίηση και ο 🗑 κάδος για διαγραφή.</p>
      </StepCard>

      <InfoBox icon="💡" title="«Το iPad δεν δουλεύει»" variant="info">
        <p>Κοίτα πρώτα το <strong>Last Ping</strong> της θέσης: αν είναι παλιό, η συσκευή δεν επικοινωνεί. Κοίτα και την <strong>Έκδοση</strong>, για να δεις αν η εφαρμογή θέλει ενημέρωση.</p>
      </InfoBox>

      <SectionTitle>Νέα θέση εργασίας</SectionTitle>

      <StepCard number="2" title="Πάτα Προσθήκη POS">
        <p>Συμπλήρωσε <strong>Όνομα</strong> (υποχρεωτικό), <strong>UID</strong>, <strong>Τύπος Συσκευής</strong> (π.χ. iPod / iPhone) και <strong>Ομάδα Εκτύπωσης Φορολογικής Συσκευής</strong>. Πάτα <strong>Αποθήκευση</strong>.</p>
      </StepCard>

      <StepCard number="3" title="Σύνδεσε τη συσκευή">
        <p>Η συσκευή συνδέεται από την εφαρμογή, με το <strong>QR Code Καταστήματος</strong>: στην οθόνη Σύνδεση Χρήστη πατάς το κουμπί «κατάστημα - θέση» και διαλέγεις τη θέση από τη λίστα. Δες το <S to="/tutorial/login-device">Κεφ. 3 του Service</S>.</p>
      </StepCard>

      <InfoBox icon="ℹ️" title="Μόνο iPhone και iPad" variant="info">
        <p>Η εφαρμογή POS λειτουργεί σε iPhone και iPad. Οι Οθόνες Κουζίνας είναι η μόνη συσκευή που μπορεί να είναι και Android.</p>
      </InfoBox>

      <SectionTitle>Επεξεργασία POS</SectionTitle>

      <Shot src="59015cac3_pos-edit.webp" alt="Επεξεργασία POS: πεδία και διακόπτες" caption="Επεξεργασία POS (το όνομα και το UID έχουν θολωθεί)" max="max-w-sm" />

      <StepCard title="Πεδία που εμφανίζονται στην επεξεργασία">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Issue Invoices:</strong> αν από αυτή τη θέση εκδίδονται τιμολόγια (<S to="/tutorial/invoice">Έκδοση Τιμολογίου</S> στο Service).</li>
          <li><strong>Πρόθεμα Απόδειξης:</strong> η σειρά των αποδείξεων της θέσης, π.χ. 045.</li>
          <li><strong>Verinvo Key Generation Status</strong> και <strong>Manage Registration</strong> (Revoke / Εγγραφή).</li>
        </ul>
      </StepCard>

      <InfoBox icon="ℹ️" title="Οι διακόπτες της θέσης" variant="info">
        <p>Επιλογή Τραπεζιών · Επιλογή Επισκεπτών · Επιλογή Tips · Αρίθμηση Παραγγελιών (με πρόθεμα) · Απόκρυψη Τιμών · Επιλογή ελάχιστης κατανάλωσης · Air Pay Beacon · Clock In Beacon · Ενεργοποίηση Wolt · Ενεργοποίηση eFood · Enable Delivery Manager · Ενεργοποίηση Spotit.</p>
      </InfoBox>

      <InfoBox icon="🔄" title="Κάνε Συγχρονισμό" variant="info">
        <p>Μετά από αλλαγές, κάνε <S to="/tutorial/secure/a-sync">Συγχρονισμό</S>.</p>
      </InfoBox>

    </SecureTutorialLayout>
  );
}
