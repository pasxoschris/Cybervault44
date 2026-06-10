import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { to, cc, subject, html_body, offer_id } = body;

  if (!to || !subject || !html_body) {
    return Response.json({ error: 'Missing required fields: to, subject, html_body' }, { status: 400 });
  }

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

  const sendViaResend = async (recipient) => {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CyberVault <onboarding@resend.dev>',
        to: [recipient],
        subject,
        html: html_body,
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Resend error');
    }
    return res.json();
  };

  await sendViaResend(to);
  if (cc) await sendViaResend(cc);

  // Update offer status and log
  if (offer_id) {
    const now = new Date().toISOString();
    const offers = await base44.asServiceRole.entities.ResellerOffer.list();
    const found = offers.find(o => o.id === offer_id);
    if (found) {
      let history = [];
      try { history = JSON.parse(found.email_history || '[]'); } catch {}
      history.push({ sent_at: now, to, cc: cc || null, subject });
      await base44.asServiceRole.entities.ResellerOffer.update(offer_id, {
        status: 'sent',
        last_sent_at: now,
        last_sent_to: to,
        email_history: JSON.stringify(history),
      });
    }
  }

  return Response.json({ success: true });
});