import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TutorialLayout from "../../components/tutorial/TutorialLayout";
import { StepCard, SectionTitle } from "../../components/tutorial/StepCard";

const methods = [
  { path: "/tutorial/payment-cash", icon: "💵", label: "Πληρωμή με Μετρητά", desc: "Πληρωμή με μετρητά και υπολογισμός ρέστων." },
  { path: "/tutorial/payment-card", icon: "💳", label: "Πληρωμή με Κάρτα", desc: "Χρέωση στο POS terminal και αντιμετώπιση προβλημάτων." },
  { path: "/tutorial/payment-split", icon: "✂️", label: "Split Payments", desc: "Διαίρεση της παραγγελίας σε πολλαπλές πληρωμές." },
  { path: "/tutorial/payment-online", icon: "🌐", label: "Ηλεκτρονική Πληρωμή", desc: "Ενεργοποίηση και ολοκλήρωση ηλεκτρονικής πληρωμής." },
  { path: "/tutorial/payment-iris", icon: "🔵", label: "Πληρωμή με IRIS", desc: "Άμεση πληρωμή με κωδικό IRIS από τον πελάτη." },
];

export default function Payment() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TutorialLayout title="Πληρωμή" subtitle="Διαδικασία πληρωμής παραγγελίας">

      <StepCard number="1" title="Πάτα το εικονίδιο Κέρματα">
        <p>Από τα στοιχεία παραγγελίας, πάτα το εικονίδιο <strong>Κέρματα</strong> στο κάτω μενού για να ανοίξει το μενού πληρωμής.</p>
      </StepCard>

      <div className="flex justify-center">
        <img src="https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/195dd216c_Screenshot2026-07-14101523.png" alt="Μενού επιλογής τρόπου πληρωμής" className="w-40 h-auto rounded-lg border border-gray-200" />
      </div>

      <SectionTitle>Τρόποι πληρωμής</SectionTitle>
      <p>Κάθε τρόπος πληρωμής είναι ξεχωριστό μάθημα — διάλεξε αυτόν που θέλεις να δεις.</p>
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

    </TutorialLayout>
  );
}