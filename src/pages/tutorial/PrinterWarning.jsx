import TutorialLayout from "../../components/tutorial/TutorialLayout";
import PrinterWarningContent from "../../components/tutorial/PrinterWarningContent";

export default function PrinterWarning() {
  return (
    <TutorialLayout
      title="Προειδοποιητικό Τρίγωνο Εκτυπωτή"
      subtitle="Τι σημαίνει και πότε εμφανίζεται — ισχύει για όλα τα mode"
    >
      <PrinterWarningContent />
    </TutorialLayout>
  );
}