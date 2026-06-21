import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import * as XLSX from 'npm:xlsx@0.18.5';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' });

    const { file_url, sheet_name } = await req.json();
    if (!file_url) return Response.json({ error: 'Missing file_url' });

    // Fetch the uploaded Excel file
    const fileRes = await fetch(file_url);
    if (!fileRes.ok) return Response.json({ error: `Αδυναμία λήψης αρχείου (HTTP ${fileRes.status})` });
    const arrayBuffer = await fileRes.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    // Parse workbook
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = sheet_name
      ? workbook.Sheets[sheet_name]
      : workbook.Sheets[workbook.SheetNames[0]];

    if (!sheet) {
      return Response.json({
        error: `Το sheet "${sheet_name}" δεν βρέθηκε. Διαθέσιμα: ${workbook.SheetNames.join(', ')}`
      });
    }

    // Convert to JSON (header row = 1)
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    if (rows.length < 2) return Response.json({ error: 'Δεν βρέθηκαν γραμμές δεδομένων στο αρχείο' });

    const headers = rows[0].map(h => String(h || '').trim());
    const dataRows = rows.slice(1);

    // Map column names to our fields
    const hIdx = {};
    headers.forEach((h, i) => { hIdx[h] = i; });

    // Find date column (first column is always date)
    const dateColIdx = 0;
    const findCol = (names) => {
      for (const n of names) {
        if (hIdx[n] !== undefined) return hIdx[n];
      }
      for (const n of names) {
        for (const [k, v] of Object.entries(hIdx)) {
          if (k.startsWith(n)) return v;
        }
      }
      for (const n of names) {
        for (const [k, v] of Object.entries(hIdx)) {
          if (k.includes(n)) return v;
        }
      }
      return -1;
    };

    const timeIdx = findCol(['Ώρα', 'Ωρα', 'ΩΡΑ', 'Time', 'TIME']);
    const operatorIdx = findCol(['Χειριστής', 'ΧΕΙΡΙΣΤΗΣ', 'Operator']);
    const storeIdx = findCol(['Κατάστημα', 'ΚΑΤΑΣΤΗΜΑ', 'Επωνυμία', 'Store']);
    const callerIdx = findCol(['Ποιος κάλεσε', 'ΠΟΙΟΣ ΚΑΛΕΣΕ', 'Caller']);
    const phoneIdx = findCol(['Τηλέφωνο', 'ΤΗΛΕΦΩΝΟ', 'Phone', 'Τηλ']);
    const problemIdx = findCol(['Πρόβλημα', 'ΠΡΟΒΛΗΜΑ', 'Problem']);
    const resolvedIdx = findCol(['Επιλύθηκε ή στάλθηκε στο ox.one support']);
    const notesIdx = findCol(['Παρατηρήσεις', 'ΠΑΡΑΤΗΡΗΣΕΙΣ', 'Notes', 'Ενέργειες']);

    // Category columns
    const catNotSpotIdx = findCol(['ΑΣΧΕΤΟ ΜΕ\nSpotlightPOS', 'AΣΧΕΤΟ ΜΕ SpotlightPOS', 'Spotlight SW/HW', 'not_spotlight']);
    const catPrintersIdx = findCol(['ΕΚΤΥΠΩΤΕΣ', 'Εκτυπωτές']);
    const catSettingsIdx = findCol(['ΡΥΘΜΙΣΕΙΣ ΕΦΑΡΜΟΓΗΣ', 'Ρυθμίσεις']);
    const catPdaIdx = findCol(['PDA']);
    const catPosIdx = findCol(['POS']);
    const catInvoicesIdx = findCol(['Τιμολόγια', 'ΤΙΜΟΛΟΓΙΑ']);

    if (storeIdx === -1 || problemIdx === -1) {
      return Response.json({
        error: `Απαιτούνται στήλες "Κατάστημα" και "Πρόβλημα". Βρέθηκαν: ${headers.join(', ')}`
      });
    }

    const toBool = (v) => {
      const s = String(v).trim().toLowerCase();
      return s === 'true' || s === '1' || s === 'yes' || s === 'ναι';
    };

    const toDate = (v) => {
      let s = String(v).trim();
      if (!s) return '';
      s = s.replace(/[T ].*/, '');
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
      const num = parseFloat(v);
      if (!isNaN(num) && num > 40000 && num < 80000) {
        const dt = new Date((num - 25569) * 86400000);
        return dt.toISOString().split('T')[0];
      }
      return s;
    };

    const toTime = (v) => {
      let s = String(v).trim();
      if (!s) return '';
      s = s.replace(/:\d{2}$/, '');
      return s;
    };

    const toPhone = (v) => {
      let s = String(v).trim();
      s = s.replace(/\.0+$/, '');
      s = s.replace(/\s/g, '');
      return s;
    };

    const toPriority = (v) => {
      const s = String(v).trim().toLowerCase();
      if (s.includes('επείγ') || s.includes('urgent')) return 'urgent';
      if (s.includes('ψηλή') || s.includes('high')) return 'high';
      if (s.includes('χαμηλή') || s.includes('low')) return 'low';
      return 'normal';
    };

    const tickets = [];
    for (const row of dataRows) {
      const store = String(row[storeIdx] || '').trim();
      const problem = String(row[problemIdx] || '').trim();
      if (!store || !problem) continue;

      tickets.push({
        date: toDate(row[dateColIdx]),
        time: toTime(timeIdx >= 0 ? row[timeIdx] : ''),
        operator: operatorIdx >= 0 ? String(row[operatorIdx] || '').trim() : '',
        store,
        caller: callerIdx >= 0 ? String(row[callerIdx] || '').trim() : '',
        phone: toPhone(phoneIdx >= 0 ? row[phoneIdx] : ''),
        problem,
        priority: toPriority(operatorIdx >= 0 ? '' : ''),
        resolved: resolvedIdx >= 0 ? toBool(row[resolvedIdx]) : false,
        notes: notesIdx >= 0 ? String(row[notesIdx] || '').trim() : '',
        category_not_spotlight: catNotSpotIdx >= 0 ? toBool(row[catNotSpotIdx]) : false,
        category_printers: catPrintersIdx >= 0 ? toBool(row[catPrintersIdx]) : false,
        category_settings: catSettingsIdx >= 0 ? toBool(row[catSettingsIdx]) : false,
        category_pos: catPosIdx >= 0 ? toBool(row[catPosIdx]) : false,
        category_pda: catPdaIdx >= 0 ? toBool(row[catPdaIdx]) : false,
        category_invoices: catInvoicesIdx >= 0 ? toBool(row[catInvoicesIdx]) : false,
      });
    }

    return Response.json({
      count: tickets.length,
      tickets,
      headers_found: headers,
      sheet_used: sheet_name || workbook.SheetNames[0],
      available_sheets: workbook.SheetNames,
    });
  } catch (error) {
    return Response.json({ error: error.message });
  }
});