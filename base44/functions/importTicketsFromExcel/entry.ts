import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import * as XLSX from 'npm:xlsx@0.18.5';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { file_url, sheet_name } = await req.json();
    if (!file_url) return Response.json({ error: 'Missing file_url' }, { status: 400 });

    // Fetch the uploaded Excel file
    const fileRes = await fetch(file_url);
    if (!fileRes.ok) return Response.json({ error: 'Failed to fetch file' }, { status: 400 });
    const arrayBuffer = await fileRes.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    // Parse workbook
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = sheet_name
      ? workbook.Sheets[sheet_name]
      : workbook.Sheets[workbook.SheetNames[0]];

    if (!sheet) {
      return Response.json({ error: `Sheet "${sheet_name}" not found. Available: ${workbook.SheetNames.join(', ')}` }, { status: 400 });
    }

    // Convert to JSON (header row = 1)
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    if (rows.length < 2) return Response.json({ error: 'No data rows found' }, { status: 400 });

    const headers = rows[0].map(h => String(h || '').trim());
    const dataRows = rows.slice(1);

    // Map column names to our fields
    const hIdx = {};
    headers.forEach((h, i) => { hIdx[h] = i; });

    // Find date column (first column with dates, usually "Στήλη 1")
    const dateColIdx = 0; // First column is always date
    const findCol = (names) => {
      // Exact match first
      for (const n of names) {
        if (hIdx[n] !== undefined) return hIdx[n];
      }
      // Partial match (starts with)
      for (const n of names) {
        for (const [k, v] of Object.entries(hIdx)) {
          if (k.startsWith(n)) return v;
        }
      }
      // Partial match (contains)
      for (const n of names) {
        for (const [k, v] of Object.entries(hIdx)) {
          if (k.includes(n)) return v;
        }
      }
      return -1;
    };

    const timeIdx = findCol(['Ώρα', 'Ωρα', 'ΩΡΑ', 'Time', 'TIME']);
    const operatorIdx = findCol(['Χειριστής', 'ΧΕΙΡΙΣΤΗΣ', 'Operator']);
    const storeIdx = findCol(['Κατάστημα', 'Κατάστημα', 'ΚΑΤΑΣΤΗΜΑ', 'Επωνυμία', 'Store']);
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
      }, { status: 400 });
    }

    const toBool = (v) => {
      const s = String(v).trim().toLowerCase();
      return s === 'true' || s === '1' || s === 'yes' || s === 'ναι';
    };

    const toDate = (v) => {
      let s = String(v).trim();
      if (!s) return '';
      // If it's a datetime like "2025-09-28 00:00:00" or "2025-09-28T00:00:00"
      s = s.replace(/[T ].*/, '');
      // If it looks like a date already (YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
      // Try to parse as Excel date number
      const num = parseFloat(v);
      if (!isNaN(num) && num > 40000 && num < 80000) {
        // Excel date serial number
        const dt = new Date((num - 25569) * 86400000);
        return dt.toISOString().split('T')[0];
      }
      return s;
    };

    const toTime = (v) => {
      let s = String(v).trim();
      if (!s) return '';
      // "17:51:00" → "17:51"
      s = s.replace(/:\d{2}$/, '');
      return s;
    };

    const toPhone = (v) => {
      let s = String(v).trim();
      // "6948533060.0" → "6948533060"
      s = s.replace(/\.0+$/, '');
      // Remove spaces
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

    return Response.json({ count: tickets.length, tickets, sheet_used: sheet_name || workbook.SheetNames[0], available_sheets: workbook.SheetNames });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});