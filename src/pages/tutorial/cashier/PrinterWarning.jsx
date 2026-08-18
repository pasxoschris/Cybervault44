import CashierTutorialLayout from "../../../components/tutorial/CashierTutorialLayout";
import PrinterWarningContent from "../../../components/tutorial/PrinterWarningContent";

export default function PrinterWarningCashier() {
  return (
    <CashierTutorialLayout
      title="Προειδοποιητικό Τρίγωνο Εκτυπωτή"
      subtitle="Τι σημαίνει και πότε εμφανίζεται — ισχύει για όλα τα mode"
    >
      <PrinterWarningContent />
    </CashierTutorialLayout>
  );
}