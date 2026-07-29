import { Cloud } from 'lucide-react';

export default function SyncStatusInfo() {
  return (
    <div className="border rounded-2xl p-6 bg-blue-50 border-blue-200">
      <div className="flex items-start gap-4">
        <span className="text-2xl flex-shrink-0 mt-0.5">📶</span>
        <div className="text-base leading-relaxed text-blue-800" style={{ fontFamily: 'Inter, sans-serif' }}>
          <p className="font-semibold text-sm mb-2">Δείκτης Σύνδεσης & Συγχρονισμού</p>
          <p>
            Στο <strong>κάτω μέρος της οθόνης</strong> εμφανίζεται ένας δείκτης που δείχνει την κατάσταση σύνδεσης και συγχρονισμού:
          </p>

          {/* Visual mock of the footer indicator */}
          <div className="mt-4 rounded-xl overflow-hidden border border-blue-200 shadow-sm max-w-xs">
            <div className="flex items-center justify-center gap-2 py-3 px-4" style={{ background: '#2E1A47' }}>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block shadow-[0_0_6px_rgba(0,200,83,0.6)]"></span>
              <Cloud size={16} className="text-white" />
              <span className="text-white text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>All synced</span>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block flex-shrink-0 shadow-[0_0_6px_rgba(0,200,83,0.6)]"></span>
              <span className="text-sm"><strong>Πράσινη κουκίδα</strong> — υπάρχει ενεργή σύνδεση δικτύου.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block flex-shrink-0 shadow-[0_0_6px_rgba(229,57,53,0.6)]"></span>
              <span className="text-sm"><strong>Κόκκινη κουκίδα</strong> — δεν υπάρχει σύνδεση δικτύου.</span>
            </div>
          </div>

          <p className="mt-4">
            Η ένδειξη <strong>«All synced»</strong> με το εικονίδιο σύννεφου είναι σημαντική: δείχνει ότι τα προϊόντα που έχεις βάλει στην παραγγελία έχουν <strong>συγχρονιστεί στο Cloud</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}