import { Cloud } from 'lucide-react';

export default function SyncStatusInfo({ number = '5' }) {
  return (
    <div className="border rounded-2xl p-6 bg-white border-gray-100 shadow-sm">
      <div className="flex items-start gap-5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5 text-white shadow-md"
          style={{ background: "linear-gradient(135deg, #5B21B6, #2D2B55)" }}
        >
          {number}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Δείκτης Σύνδεσης & Συγχρονισμού
          </h3>
          <div className="text-gray-600 text-base leading-relaxed space-y-3 [&_strong]:text-gray-800 [&_strong]:font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
            <p>
              Στο <strong>κάτω μέρος της οθόνης</strong> εμφανίζεται ένας δείκτης που δείχνει την κατάσταση σύνδεσης και συγχρονισμού:
            </p>

            {/* Visual mock of the footer indicator */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm max-w-xs">
              <div className="flex items-center justify-center gap-2 py-3 px-4" style={{ background: '#2E1A47' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block shadow-[0_0_6px_rgba(0,200,83,0.6)]"></span>
                <Cloud size={16} className="text-white" />
                <span className="text-white text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>All synced</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block flex-shrink-0 shadow-[0_0_6px_rgba(0,200,83,0.6)]"></span>
                <span><strong>Πράσινη κουκίδα</strong> — υπάρχει ενεργή σύνδεση δικτύου.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block flex-shrink-0 shadow-[0_0_6px_rgba(229,57,53,0.6)]"></span>
                <span><strong>Κόκκινη κουκίδα</strong> — δεν υπάρχει σύνδεση δικτύου.</span>
              </div>
            </div>

            <p>
              Η ένδειξη <strong>«All synced»</strong> με το εικονίδιο σύννεφου είναι σημαντική: δείχνει ότι τα προϊόντα που έχεις βάλει στην παραγγελία έχουν <strong>συγχρονιστεί στο Cloud</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}