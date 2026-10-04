import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Σύντομο email ειδοποίησης: μήνυμα + κουμπί προβολής της προσφοράς.
// Χωρίς πίνακα γραμμών / σύνολα / όρους και χωρίς συνημμένο PDF — ο πελάτης
// πρέπει να ανοίξει την προσφορά, ώστε να καταγράφεται η προβολή (viewed_at).
function buildHtmlBody(offer, settings, origin, customBody) {
  const introSource = customBody || settings?.default_email_body || '';
  const intro = introSource
    ? introSource.replace(/\n/g, '<br>')
    : `Αγαπητέ/ή ${offer?.contact_person || ''},<br><br>Σας αποστέλλουμε την προσφορά μας για το σύστημα Spotlight POS.`;

  const ref = offer?.reference_number || '';
  const expires = offer?.expires_at ? new Date(offer.expires_at).toLocaleDateString('el-GR') : '';
  const link = offer?.public_token ? `${origin}/offers/${offer.public_token}` : '';

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#0E1235;padding:20px 30px;">
      <h1 style="margin:0;font-size:22px;color:#fff;"><span style="color:#fff;">CYBER</span><span style="color:#0099cc;">VAULT</span></h1>
      ${settings?.company_name ? `<p style="margin:4px 0 0;color:#aaa;font-size:13px;">${settings.company_name}</p>` : ''}
    </div>
    <div style="background:#f9f9f9;padding:24px 30px;border:1px solid #eee;">
      <p style="margin:0 0 16px;font-size:14px;">${intro}</p>
      ${ref ? `<p style="margin:4px 0;font-size:14px;"><strong>Αριθμός Προσφοράς:</strong> <span style="color:#0099cc;font-family:monospace;">${ref}</span></p>` : ''}
      ${expires ? `<p style="margin:4px 0;font-size:14px;"><strong>Ισχύς έως:</strong> ${expires}</p>` : ''}
      ${link ? `
      <div style="margin-top:24px;padding:24px;background:#f0f9ff;border:2px solid #0099cc;text-align:center;">
        <p style="margin:0 0 16px;font-size:14px;color:#0E1235;">Ανοίξτε την προσφορά για να δείτε τα στοιχεία της και να την αποδεχτείτε ή να την απορρίψετε:</p>
        <a href="${link}" style="display:inline-block;background:#0099cc;color:#fff;padding:14px 32px;text-decoration:none;font-weight:bold;font-size:15px;">Προβολή Προσφοράς</a>
      </div>` : ''}
    </div>
    <div style="margin-top:20px;padding:16px;border-top:2px solid #0099cc;font-size:12px;color:#888;">
      ${settings?.public_phone ? `Τηλ: ${settings.public_phone} &nbsp;|&nbsp; ` : ''}
      ${settings?.public_email ? `Email: ${settings.public_email}` : ''}
    </div>
  </body></html>`;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { to, cc, subject, offer_id, custom_body } = body;

    if (!to || !subject) {
      return Response.json({ error: 'Missing required fields: to, subject' }, { status: 400 });
    }

    if (!offer_id) {
      return Response.json({ error: 'Missing offer_id' }, { status: 400 });
    }

    // ─── Fetch offer from DB (source of truth) ───
    const offers = await base44.asServiceRole.entities.ResellerOffer.filter({ id: offer_id });
    if (!offers || offers.length === 0) {
      return Response.json({ error: 'Offer not found' }, { status: 404 });
    }
    const offer = offers[0];

    // ─── Fetch settings from DB ───
    const settingsList = await base44.asServiceRole.entities.ResellerSettings.list();
    const settings = settingsList[0] || {};

    // ─── Build short notification body on backend ───
    let origin = req.headers.get('origin');
    if (!origin) {
      const referer = req.headers.get('referer');
      if (referer) {
        try { origin = new URL(referer).origin; } catch {}
      }
    }
    origin = origin || 'https://cybervault.gr';
    const htmlBody = buildHtmlBody(offer, settings, origin, custom_body);

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    const sendViaResend = async (recipient) => {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CyberVault <offers@cybervault.gr>',
          to: [recipient],
          subject,
          html: htmlBody,
        }),
      });
      const resBody = await res.json();
      console.log('Resend response status:', res.status, 'body:', JSON.stringify(resBody));
      if (!res.ok) {
        throw new Error(resBody.message || 'Resend error');
      }
      return resBody;
    };

    const sendResult = await sendViaResend(to);
    const ccList = cc ? String(cc).split(',').map(e => e.trim()).filter(Boolean) : [];
    for (const ccAddr of ccList) {
      try { await sendViaResend(ccAddr); } catch (e) { console.error('CC send failed:', ccAddr, e.message); }
    }

    // Update offer status and log
    const now = new Date().toISOString();
    let history = [];
    try { history = JSON.parse(offer.email_history || '[]'); } catch {}
    history.push({ sent_at: now, to, cc: cc || null, subject });
    await base44.asServiceRole.entities.ResellerOffer.update(offer_id, {
      status: 'sent',
      last_sent_at: now,
      last_sent_to: to,
      email_history: JSON.stringify(history),
    });

    return Response.json({ success: true, resend_id: sendResult?.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});