import { Play, ClipboardList, FileText, CreditCard, CheckCircle2, BarChart3 } from 'lucide-react';

// Εικονίδια των βημάτων της βάρδιας — κοινά για τον online οδηγό και το PDF manual.
export const STEP_ICONS = {
  start: Play,
  order: ClipboardList,
  invoice: FileText,
  payment: CreditCard,
  close_order: CheckCircle2,
  close_shift: BarChart3,
};