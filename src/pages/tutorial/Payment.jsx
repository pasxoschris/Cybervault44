import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, SectionTitle, InfoBox } from "../../components/tutorial/StepCard";

const methods = [
  { path: "/tutorial/payment-cash", icon: "💵", label: "Πληρωμή με Μετρητά", desc: "Πληρωμή με μετρητά και υπολογισμός ρέστων." },
  { path: "/tutorial/payment-card", icon: "💳", label: "Πληρωμή με Κάρτα", desc: "Χρέωση στο τερματικό πληρωμών (POS) και αντιμετώπιση προβλημάτων." },
  { path: "/tutorial/payment-online", icon: "🌐", label: "Ηλεκτρονική Πληρωμή", desc: "Ενεργοποίηση και ολοκλήρωση ηλεκτρονικής πληρωμής." },
  { path: "/tutorial/payment-credit", icon: "🧾", label: "Πληρωμή Επί Πιστώσει", desc: "Η παραγγελία καταχωρείται ως οφειλή του πελάτη." },
  { path: "/tutorial/payment-iris", icon: "🔵", label: "Πληρωμή με IRIS", desc: "Άμεση πληρωμή με κωδικό IRIS από τον πελάτη." },
  { path: "/tutorial/split-payment", icon: "✂️", label: "Split Payments", desc: "Διαίρεση της παραγγελίας σε πολλαπλές πληρωμές." },
];

// Αναπαράσταση του μενού πληρωμής της εφαρμογής (σειρά όπως στην οθόνη)
const paymentMenu = [
  { label: "Πληρωμή με Μετρητά", path: "/tutorial/payment-cash" },
  { label: "Πληρωμή με Κάρτα (όνομα τερματικού)", path: "/tutorial/payment-card" },
  { label: "Ηλεκτρονική Πληρωμή", path: "/tutorial/payment-online" },
  { label: "Επί Πιστώσει", path: "/tutorial/payment-credit" },
  { label: "Split Payments", path: "/tutorial/split-payment" },
  { label: "Πληρωμή με IRIS (όνομα τερματικού)", path: "/tutorial/payment-iris" },
];

function PaymentMenuMock() {
  const row = "block w-full px-4 py-3.5 text-center text-[15px] text-[#2f6fde]";
  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl bg-[#262645] p-2.5" aria-label="Μενού επιλογής τρόπου πληρωμής">
      <div className="overflow-hidden rounded-xl bg-[#eef0f4] divide-y divide-gray-300/80">
        {paymentMenu.map((m) =>
          m.path ? (
            <Link key={m.label} to={m.path} className={`${row} hover:bg-white/70`}>{m.label}</Link>
          ) : (
            <span key={m.label} className={row}>{m.label}</span>
          )
        )}
      </div>
      <div className="mt-2 rounded-xl bg-white py-3.5 text-center text-[15px] font-semibold text-[#2f6fde]">Ακύρωση</div>
    </div>
  );
}

export default function Payment() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Πληρωμή" subtitle="Διαδικασία πληρωμής παραγγελίας">

      <StepCard number="1" title="Πάτα το εικονίδιο Κέρματα">
        <p>Από τα στοιχεία παραγγελίας, πάτα το εικονίδιο <strong>Κέρματα</strong> στο κάτω μενού για να ανοίξει το μενού πληρωμής.</p>
      </StepCard>

      <PaymentMenuMock />

      <SectionTitle>Τρόποι πληρωμής</SectionTitle>
      <p><strong>Κάθε τρόπος πληρωμής είναι ξεχωριστό μάθημα — διάλεξε αυτόν που θέλεις να δεις.</strong></p>
      <div className="grid gap-3 sm:grid-cols-2">
        {methods.map((m) => (
          <Link
            key={m.path}
            to={m.path}
            className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-primary hover:bg-primary/5"
          >
            <span className="text-xl leading-none">{m.icon}</span>
            <span className="flex flex-col">
              <span className="font-semibold text-gray-900">{m.label}</span>
              <span className="text-sm text-gray-500">{m.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      <InfoBox icon="ℹ️" title="Μετά την πληρωμή" variant="info">
        Μετά την πληρωμή η παραγγελία <strong>κλείνει αυτόματα</strong> και τη βρίσκεις στις <strong>Παραγγελίες Βάρδιας</strong>.
      </InfoBox>

    </TutorialLayout>
  );
}