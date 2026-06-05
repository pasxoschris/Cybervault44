import React from "react";

const badgeStyles = {
  // Status
  active: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  standard: "bg-blue-100 text-blue-800 border-blue-200",
  basic: "bg-sky-100 text-sky-800 border-sky-200",
  premium: "bg-purple-100 text-purple-800 border-purple-200",
  suspended: "bg-amber-100 text-amber-800 border-amber-200",
  ended: "bg-gray-100 text-gray-600 border-gray-200",
  none: "bg-gray-100 text-gray-500 border-gray-200",
  not_started: "bg-gray-100 text-gray-500 border-gray-200",
  inactive: "bg-gray-100 text-gray-500 border-gray-200",
  prospect: "bg-yellow-100 text-yellow-800 border-yellow-200",
  trial: "bg-blue-100 text-blue-700 border-blue-200",
  expired: "bg-red-100 text-red-700 border-red-200",
  true: "bg-green-100 text-green-800 border-green-200",
  false: "bg-gray-100 text-gray-500 border-gray-200",
};

const labelMap = {
  active: "Ενεργό",
  inactive: "Ανενεργό",
  suspended: "Αναστολή",
  prospect: "Υποψήφιο",
  completed: "Ολοκληρώθηκε",
  in_progress: "Σε εξέλιξη",
  not_started: "Δεν ξεκίνησε",
  none: "Χωρίς",
  basic: "Basic",
  standard: "Standard",
  premium: "Premium",
  ended: "Έληξε",
  trial: "Δοκιμή",
  expired: "Έληξε",
  true: "Ναι",
  false: "Όχι",
};

export default function StoreBadge({ value, customLabel }) {
  if (value === undefined || value === null) return null;
  const key = String(value);
  const style = badgeStyles[key] || "bg-gray-100 text-gray-500 border-gray-200";
  const label = customLabel || labelMap[key] || key;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {label}
    </span>
  );
}