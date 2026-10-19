// Δημόσια σελίδα προσφοράς — ανοίγει από τον σύνδεσμο του email του πελάτη
// χωρίς σύνδεση χρήστη στην εφαρμογή.
//
//   GET  /functions/publicOffer?token=<public_token>  → σελίδα προσφοράς
//   POST /functions/publicOffer  { token, action }    → αποδοχή / απόρριψη
//
// Το token είναι το τυχαίο public_token της προσφοράς (crypto.randomUUID), οπότε
// χρησιμεύει ως το μοναδικό κλειδί πρόσβασης του πελάτη.
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import {
  acceptOfferCore,
  findOfferByToken,
  logOfferViewCore,
  rejectOfferCore,
} from '../../shared/offerAcceptance.ts';
import { formatAthensDate, formatAthensDateTime } from '../../shared/offerNotifications.ts';

const FINAL_STATUSES = ['accepted', 'rejected', 'expired'];

const STATUS_LABELS = {
  draft: 'Προσχέδιο',
  sent: 'Εστάλη',
  viewed: 'Εθεάθη',
  accepted: 'Αποδεκτή',
  rejected: 'Απορρίφθηκε',
  expired: 'Έληξε',
};

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function esc(value) {
  return String(value === null || value === undefined ? '' : value).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

function euro(value) {
  return `€${Number(value || 0).toFixed(2)}`;
}

function isOfferExpired(offer) {
  if (offer.status === 'expired') return true;
  return Boolean(offer.expires_at && new Date(offer.expires_at) < new Date());
}

function shellStyles() {
  return `
  * { box-sizing: border-box; }
  body { margin: 0; background: #f4f5fa; color: #1f2430; font-family: 'Inter', -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; }
  .top { background: #0E1235; color: #fff; padding: 16px 20px; }
  .top-inner { max-width: 860px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; }
  .brand { font-size: 20px; font-weight: 700; letter-spacing: 0.02em; }
  .brand span { color: #00CFFF; }
  .company { margin: 4px 0 0; font-size: 12px; color: rgba(255,255,255,0.55); }
  .ref { text-align: right; }
  .ref-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.45); }
  .ref-value { font-family: 'Courier New', monospace; color: #00CFFF; font-weight: 700; font-size: 14px; letter-spacing: 0.03em; }
  .wrap { max-width: 860px; margin: 0 auto; padding: 24px 20px 8px; display: flex; flex-direction: column; gap: 16px; }
  .card { background: #fff; border: 1px solid #e5e7ef; border-radius: 14px; padding: 22px; }
  .card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
  .card h2 { margin: 0; font-size: 16px; }
  .banner { border-radius: 14px; padding: 18px 20px; }
  .banner h3 { margin: 0 0 4px; font-size: 16px; }
  .banner p { margin: 0; font-size: 13px; }
  .banner.ok { background: #eafaf0; border: 1px solid #b7e6c9; color: #14532d; }
  .banner.err { background: #fdecec; border: 1px solid #f6c3c3; color: #7f1d1d; }
  .banner.warn { background: #fff6e6; border: 1px solid #f3d9a5; color: #7c4a03; }
  .banner.center { text-align: center; padding: 34px 20px; }
  .chip { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: #eef1fa; color: #334155; white-space: nowrap; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px 20px; font-size: 13px; }
  .grid .k { display: block; color: #8a90a2; font-size: 12px; }
  .grid .v { font-weight: 500; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  thead th { background: #0E1235; color: #fff; text-align: left; padding: 10px 8px; font-size: 11px; font-weight: 600; }
  thead th.num { text-align: right; }
  tbody td { padding: 10px 8px; border-bottom: 1px solid #eef0f6; vertical-align: top; }
  tbody td.num { text-align: right; white-space: nowrap; }
  tbody tr:nth-child(even) { background: #fafbfe; }
  .desc { font-weight: 500; }
  .desc small { display: block; color: #98a0b3; font-weight: 400; }
  .totals { margin-top: 16px; display: flex; justify-content: flex-end; }
  .totals-inner { width: 100%; max-width: 290px; font-size: 13px; }
  .totals-row { display: flex; justify-content: space-between; padding: 4px 0; color: #5b6478; }
  .totals-row.discount { color: #c62828; }
  .totals-row.grand { border-top: 1px solid #e5e7ef; margin-top: 6px; padding-top: 10px; font-weight: 700; color: #0E1235; font-size: 15px; }
  .actions { display: flex; flex-wrap: wrap; gap: 12px; }
  button { font-family: inherit; font-size: 14px; font-weight: 600; border-radius: 10px; padding: 13px 26px; cursor: pointer; border: 1px solid transparent; }
  .primary { background: #0E1235; color: #fff; }
  .primary:hover { background: #0099cc; }
  .danger { background: #fff; color: #dc2626; border-color: #f6c3c3; }
  .danger:hover { background: #fdecec; }
  button[disabled] { opacity: 0.5; cursor: default; }
  .hint { margin: 12px 0 0; font-size: 12px; color: #8a90a2; }
  .msg { margin: 0 0 14px; padding: 12px 14px; border-radius: 10px; background: #fdecec; border: 1px solid #f6c3c3; color: #7f1d1d; font-size: 13px; }
  .notes { white-space: pre-wrap; font-size: 12px; color: #7b8397; margin: 0; }
  .pdf-btn { display: inline-block; margin-top: 12px; background: #15803d; color: #fff; text-decoration: none; padding: 11px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; }
  footer { text-align: center; font-size: 12px; color: #9aa1b2; padding: 24px 20px 40px; line-height: 1.7; }
  footer p { margin: 0; }
  .confirm { text-align: center; padding: 46px 26px; }
  .check { width: 76px; height: 76px; margin: 0 auto 20px; border-radius: 50%; background: #eafaf0; border: 2px solid #86dfa8; color: #15803d; font-size: 38px; line-height: 72px; font-weight: 700; }
  .confirm-title { margin: 0 0 10px; font-size: 22px; color: #0E1235; }
  .confirm-sub { margin: 0 auto; max-width: 540px; font-size: 14px; color: #5b6478; line-height: 1.6; }
  .confirm-grid { margin: 26px auto 0; max-width: 560px; text-align: left; background: #f7f8fc; border: 1px solid #e8eaf3; border-radius: 12px; padding: 16px 18px; }
  .confirm-note { margin: 22px 0 0; font-size: 12px; color: #8a90a2; line-height: 1.7; }`;
}

function shell({ title, ref, body, settings }) {
  return `<!DOCTYPE html>
<html lang="el">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${shellStyles()}</style>
</head>
<body>
<div class="top">
  <div class="top-inner">
    <div>
      <div class="brand">CYBER<span>VAULT</span></div>
      ${settings.company_name ? `<p class="company">${esc(settings.company_name)}</p>` : ''}
    </div>
    ${ref ? `<div class="ref"><div class="ref-label">Προσφορά</div><div class="ref-value">${esc(ref)}</div></div>` : ''}
  </div>
</div>
<div class="wrap">${body}</div>
<footer>
  ${settings.public_phone ? `<p>Τηλ: ${esc(settings.public_phone)}</p>` : ''}
  ${settings.public_email ? `<p>${esc(settings.public_email)}</p>` : ''}
  <p>© CyberVault — Ηλεκτρονική Αποδοχή Προσφοράς</p>
</footer>
</body>
</html>`;
}

function infoRow(label, value) {
  if (value === null || value === undefined || value === '') return '';
  return `<div><span class="k">${esc(label)}</span><span class="v">${esc(value)}</span></div>`;
}

function statusBanner(offer, expired) {
  if (offer.status === 'accepted') {
    return `<div class="banner ok">
      <h3>Η προσφορά έχει γίνει αποδεκτή</h3>
      <p>Ηλεκτρονική αποδοχή στις ${esc(formatAthensDateTime(offer.accepted_at))}</p>
    </div>`;
  }
  if (offer.status === 'rejected') {
    return `<div class="banner err">
      <h3>Η προσφορά απορρίφθηκε</h3>
      <p>${esc(formatAthensDateTime(offer.rejected_at))}</p>
    </div>`;
  }
  if (expired) {
    return `<div class="banner warn">
      <h3>Η προσφορά έχει λήξει</h3>
      <p>Ισχύς έως: ${esc(formatAthensDate(offer.expires_at))}</p>
    </div>`;
  }
  return '';
}

function linesTable(offer) {
  let lines = [];
  try { lines = JSON.parse(offer.items || '[]'); } catch {}

  const rows = lines.map((l) => {
    const total = Number(l.quantity || 0) * Number(l.unit_price || 0) * (1 - Number(l.discount_pct || 0) / 100);
    return `<tr>
      <td><span class="desc">${esc(l.name)}</span>${l.description ? `<small>${esc(l.description)}</small>` : ''}</td>
      <td class="num">${esc(l.quantity)}</td>
      <td class="num">${euro(l.unit_price)}</td>
      <td class="num">${Number(l.discount_pct || 0) > 0 ? `${esc(l.discount_pct)}%` : '—'}</td>
      <td class="num">${euro(total)}</td>
    </tr>`;
  }).join('');

  return `<table>
    <thead>
      <tr>
        <th>Περιγραφή</th>
        <th class="num">Ποσ.</th>
        <th class="num">Τιμή</th>
        <th class="num">Έκπτ.</th>
        <th class="num">Σύνολο</th>
      </tr>
    </thead>
    <tbody>${rows || '<tr><td colspan="5">—</td></tr>'}</tbody>
  </table>
  <div class="totals">
    <div class="totals-inner">
      <div class="totals-row"><span>Σύνολο πριν έκπτωση</span><span>${euro(offer.subtotal_before_discount)}</span></div>
      ${Number(offer.total_discount || 0) > 0 ? `<div class="totals-row discount"><span>Έκπτωση</span><span>-${euro(offer.total_discount)}</span></div>` : ''}
      <div class="totals-row"><span>Καθαρό ποσό</span><span>${euro(offer.subtotal_after_discount)}</span></div>
      <div class="totals-row"><span>ΦΠΑ ${esc(offer.vat_rate || 24)}%</span><span>${euro(offer.vat_amount)}</span></div>
      <div class="totals-row grand"><span>Σύνολο</span><span>${euro(offer.final_total)}</span></div>
    </div>
  </div>`;
}

function actionCard(token) {
  return `<div class="card">
    <h2>Αποδοχή Προσφοράς</h2>
    <p class="hint" style="margin: 8px 0 16px;">Μπορείτε να αποδεχτείτε ή να απορρίψετε την προσφορά απευθείας, χωρίς σύνδεση ή κωδικό. Η αποδοχή είναι οριστική.</p>
    <div id="msg" class="msg" hidden></div>
    <div class="actions">
      <button id="acceptBtn" class="primary" type="button" onclick="act('accept')">Αποδοχή Προσφοράς</button>
      <button id="rejectBtn" class="danger" type="button" onclick="act('reject')">Απόρριψη</button>
    </div>
  </div>
  <script>
  var TOKEN = ${JSON.stringify(token)};
  function act(action) {
    var question = action === 'accept'
      ? 'Η αποδοχή της προσφοράς είναι οριστική. Συνέχεια;'
      : 'Να απορριφθεί η προσφορά;';
    if (!window.confirm(question)) return;
    var box = document.getElementById('msg');
    box.hidden = true;
    document.getElementById('acceptBtn').disabled = true;
    document.getElementById('rejectBtn').disabled = true;
    fetch(window.location.pathname + window.location.search, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: TOKEN, action: action })
    }).then(function (res) {
      return res.json().then(function (data) { return { ok: res.ok, data: data }; });
    }).then(function (result) {
      if (result.ok && result.data && result.data.success) {
        if (action === 'accept') {
          window.location.href = window.location.pathname + '?token=' + encodeURIComponent(TOKEN) + '&accepted=1';
        } else {
          window.location.reload();
        }
        return;
      }
      box.textContent = (result.data && result.data.error) || 'Κάτι πήγε λάθος. Δοκιμάστε ξανά.';
      box.hidden = false;
      document.getElementById('acceptBtn').disabled = false;
      document.getElementById('rejectBtn').disabled = false;
    }).catch(function () {
      box.textContent = 'Σφάλμα σύνδεσης. Ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.';
      box.hidden = false;
      document.getElementById('acceptBtn').disabled = false;
      document.getElementById('rejectBtn').disabled = false;
    });
  }
  </script>`;
}

function renderOfferPage(offer, settings, token) {
  const expired = isOfferExpired(offer);
  const readOnly = expired || FINAL_STATUSES.includes(offer.status);
  const statusLabel = STATUS_LABELS[offer.status] || STATUS_LABELS.draft;

  const body = [
    statusBanner(offer, expired),
    `<div class="card">
      <div class="card-head">
        <h2>Στοιχεία Προσφοράς</h2>
        <span class="chip">${esc(statusLabel)}</span>
      </div>
      <div class="grid">
        ${infoRow('Αρ. Αναφοράς', offer.reference_number)}
        ${infoRow('Ημ/νία Έκδοσης', formatAthensDate(offer.created_date))}
        ${infoRow('Ισχύς Έως', formatAthensDate(offer.expires_at))}
        ${offer.viewed_at ? infoRow('Εθεάθη', formatAthensDateTime(offer.viewed_at)) : ''}
      </div>
    </div>`,
    `<div class="card">
      <h2>Στοιχεία Πελάτη</h2>
      <div class="grid" style="margin-top: 14px;">
        ${infoRow('Επωνυμία', offer.company_legal_name)}
        ${infoRow('Κατάστημα', offer.store_name)}
        ${infoRow('ΑΦΜ', offer.vat_number)}
        ${infoRow('Διεύθυνση', offer.address)}
        ${infoRow('Υπεύθυνος', offer.contact_person)}
        ${infoRow('Email', offer.email)}
        ${infoRow('Τηλέφωνο', offer.phone)}
      </div>
    </div>`,
    `<div class="card">
      <h2>Αναλυτική Προσφορά</h2>
      <div style="margin-top: 14px; overflow-x: auto;">${linesTable(offer)}</div>
    </div>`,
    settings.default_terms ? `<div class="card">
      <h2 style="font-size: 14px;">Όροι & Προϋποθέσεις</h2>
      <p class="notes" style="margin-top: 12px;">${esc(settings.default_terms)}</p>
    </div>` : '',
    readOnly ? '' : actionCard(token),
  ].join('');

  return shell({
    title: `Προσφορά ${offer.reference_number || ''} — CyberVault`.trim(),
    ref: offer.reference_number,
    body,
    settings,
  });
}

// Σελίδα επιβεβαίωσης — εμφανίζεται αμέσως μετά την αποδοχή της προσφοράς.
function renderAcceptanceConfirmationPage(offer, settings) {
  const contact = [settings.public_phone, settings.public_email].filter(Boolean).map(esc).join(' · ');
  const note = [
    offer.email ? `Στείλαμε email επιβεβαίωσης στη διεύθυνση ${esc(offer.email)}.` : '',
    contact ? `Για οποιαδήποτε διευκρίνιση επικοινωνήστε μαζί μας: ${contact}.` : '',
  ].filter(Boolean).join(' ');

  const body = `<div class="card confirm">
    <div class="check">✓</div>
    <h2 class="confirm-title">Η αποδοχή της προσφοράς καταχωρήθηκε επιτυχώς</h2>
    <p class="confirm-sub">Ευχαριστούμε. Λάβαμε την αποδοχή σας και η προσφορά καταχωρήθηκε οριστικά στα στοιχεία μας.</p>
    <div class="grid confirm-grid">
      ${infoRow('Αρ. Αναφοράς', offer.reference_number)}
      ${infoRow('Επωνυμία', offer.company_legal_name || offer.store_name)}
      ${infoRow('Ημ/νία & Ώρα Αποδοχής', formatAthensDateTime(offer.accepted_at))}
      ${infoRow('Σύνολο Προσφοράς', euro(offer.final_total))}
    </div>
    ${note ? `<p class="confirm-note">${note}</p>` : ''}
  </div>`;

  return shell({
    title: `Η αποδοχή καταχωρήθηκε — ${offer.reference_number || 'CyberVault'}`,
    ref: offer.reference_number,
    body,
    settings,
  });
}

function renderMessagePage({ title, heading, message, settings }) {
  return shell({
    title,
    ref: '',
    settings,
    body: `<div class="banner warn center">
      <h3>${esc(heading)}</h3>
      <p>${esc(message)}</p>
    </div>`,
  });
}

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const meta = { ip, userAgent };

    const settingsList = await base44.asServiceRole.entities.ResellerSettings.list();
    const settings = settingsList[0] || {};

    // ─── Ενέργειες πελάτη (αποδοχή / απόρριψη) ───
    if (req.method === 'POST') {
      let body = {};
      try { body = await req.json(); } catch { body = {}; }

      const token = String(body.token || '').trim();
      const action = String(body.action || '');

      if (!token) return Response.json({ error: 'Λείπει ο σύνδεσμος της προσφοράς.' }, { status: 400 });

      const offer = await findOfferByToken(base44, token);
      if (!offer) return Response.json({ error: 'Η προσφορά δεν βρέθηκε.' }, { status: 404 });

      const result = action === 'accept'
        ? await acceptOfferCore(base44, offer.id, meta)
        : action === 'reject'
          ? await rejectOfferCore(base44, offer.id, meta)
          : { ok: false, status: 400, error: 'Μη έγκυρη ενέργεια.' };

      if (!result.ok) return Response.json({ error: result.error }, { status: result.status || 400 });
      return Response.json({ success: true });
    }

    // ─── Προβολή σελίδας προσφοράς ───
    const token = (url.searchParams.get('token') || '').trim();
    if (!token) {
      return new Response(renderMessagePage({
        title: 'Προσφορά — CyberVault',
        heading: 'Ο σύνδεσμος δεν είναι έγκυρος',
        message: 'Ο σύνδεσμος της προσφοράς είναι ελλιπής. Ανοίξτε ξανά το email της προσφοράς ή επικοινωνήστε μαζί μας.',
        settings,
      }), { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
    }

    const offer = await findOfferByToken(base44, token);
    if (!offer) {
      return new Response(renderMessagePage({
        title: 'Η προσφορά δεν βρέθηκε — CyberVault',
        heading: 'Η προσφορά δεν βρέθηκε',
        message: 'Ο σύνδεσμος μπορεί να είναι λανθασμένος ή η προσφορά να έχει αφαιρεθεί.',
        settings,
      }), { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
    }

    // ─── Σελίδα επιβεβαίωσης αμέσως μετά την αποδοχή ───
    if (url.searchParams.get('accepted') === '1' && offer.status === 'accepted') {
      return new Response(renderAcceptanceConfirmationPage(offer, settings), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }

    const view = await logOfferViewCore(base44, offer.id, meta);
    const current = view.ok && view.offer ? view.offer : offer;

    return new Response(renderOfferPage(current, settings, token), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    return new Response(
      `<!DOCTYPE html><html lang="el"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Σφάλμα — CyberVault</title></head><body style="font-family:Arial,sans-serif;padding:40px;text-align:center;color:#1f2430;"><h2>Κάτι πήγε λάθος</h2><p>Δοκιμάστε ξανά σε λίγο ή επικοινωνήστε μαζί μας.</p></body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
    );
  }
}