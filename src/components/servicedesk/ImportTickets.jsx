import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ImportTickets({ onImported }) {
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState('');
  const [sheetName, setSheetName] = useState('Support');
  const [deleteExisting, setDeleteExisting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    setImportStatus('Φόρτωση αρχείου...');
    try {
      const uploadRes = await base44.integrations.Core.UploadFile({ file });
      setImportStatus('Ανάλυση δεδομένων...');
      const res = await base44.functions.invoke('importTicketsFromExcel', {
        file_url: uploadRes.file_url,
        sheet_name: sheetName || 'Support',
      });
      const data = res.data;
      if (data.error) {
        setImportStatus(`Σφάλμα: ${data.error}`);
        return;
      }
      const tickets = data.tickets || [];
      if (tickets.length === 0) {
        setImportStatus('Δεν βρέθηκαν έγκυρα tickets (απαιτείται Κατάστημα & Πρόβλημα).');
        return;
      }
      if (deleteExisting) {
        setImportStatus('Διαγραφή υπαρχόντων tickets...');
        const deleteRes = await base44.functions.invoke('deleteAllTickets', {});
        if (deleteRes.data?.error) {
          setImportStatus(`Σφάλμα διαγραφής: ${deleteRes.data.error}`);
          return;
        }
        setImportStatus(`Διαγράφηκαν ${deleteRes.data?.deleted || 0} tickets.`);
      }
      setImportStatus(`Δημιουργία ${tickets.length} tickets...`);
      const batchSize = 200;
      let imported = 0;
      for (let i = 0; i < tickets.length; i += batchSize) {
        const batch = tickets.slice(i, i + batchSize);
        await base44.entities.Ticket.bulkCreate(batch);
        imported += batch.length;
        setImportStatus(`Δημιουργία ${imported}/${tickets.length} tickets...`);
      }
      setImportStatus(`✓ Εισήχθησαν ${imported} tickets! (Sheet: ${data.sheet_used})`);
      if (onImported) onImported();
    } catch (err) {
      setImportStatus(`Σφάλμα: ${err.message || 'Δοκιμάστε ξανά.'}`);
    } finally {
      setImporting(false);
      setTimeout(() => setImportStatus(''), 8000);
    }
    e.target.value = '';
  };

  return (
    <div className="border border-[#00CFFF]/20 bg-[#131840]/80 p-6 space-y-5 max-w-2xl mx-auto">
      <div>
        <h3 className="font-orbitron text-[#00CFFF] text-sm mb-4">ΕΙΣΑΓΩΓΗ ΑΠΟ ΑΡΧΕΙΟ</h3>
        <p className="text-white/40 text-sm mb-5">Ανεβάστε ένα αρχείο Excel (.xlsx, .csv) με τα ιστορικά tickets. Οι στήλες θα αντιστοιχιστούν αυτόματα.</p>
      </div>

      {/* File picker */}
      <div className="flex items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileImport}
          accept=".xlsx,.csv,.xls,.json"
          className="hidden"
        />
        <input
          type="text"
          value={sheetName}
          onChange={e => setSheetName(e.target.value)}
          className="cyber-input text-sm w-44"
          placeholder="Sheet name"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={importing}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#00CFFF] text-[#0E1235] font-semibold text-sm hover:bg-[#00D4FF] transition-colors disabled:opacity-40"
        >
          <Upload size={15} />
          {importing ? 'Εισαγωγή...' : 'Επιλογή αρχείου'}
        </button>
      </div>

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={deleteExisting}
          onChange={e => setDeleteExisting(e.target.checked)}
          className="w-4 h-4 accent-[#00CFFF]"
        />
        <span className="text-sm text-white/50">Διαγραφή όλων των υπαρχόντων tickets πριν την εισαγωγή</span>
      </label>

      {importStatus && (
        <div className={`text-sm px-4 py-3 border ${
          importStatus.startsWith('✓') ? 'border-green-500/30 bg-green-500/10 text-green-400' :
          importStatus.startsWith('Σφάλμα') ? 'border-red-500/30 bg-red-500/10 text-red-400' :
          'border-[#00CFFF]/20 bg-[#00CFFF]/5 text-[#00CFFF]/70'
        }`}>
          {importStatus}
        </div>
      )}
    </div>
  );
}