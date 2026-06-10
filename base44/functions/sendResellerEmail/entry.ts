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

  // Send email via base44 integration
  await base44.asServiceRole.integrations.Core.SendEmail({
    to,
    subject,
    body: html_body,
    from_name: 'CyberVault'
  });

  if (cc) {
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: cc,
      subject,
      body: html_body,
      from_name: 'CyberVault'
    });
  }

  // Update offer status and log
  if (offer_id) {
    const offer = await base44.asServiceRole.entities.ResellerOffer.list();
    const found = offer.find(o => o.id === offer_id);
    if (found) {
      const now = new Date().toISOString();
      let history = [];
      try { history = JSON.parse(found.email_history || '[]'); } catch {}
      history.push({ sent_at: now, to, cc: cc || null, subject });

      await base44.asServiceRole.entities.ResellerOffer.update(offer_id, {
        status: 'sent',
        last_sent_at: now,
        last_sent_to: to,
        email_history: JSON.stringify(history)
      });
    }
  }

  return Response.json({ success: true });
});