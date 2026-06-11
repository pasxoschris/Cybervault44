import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const body = await req.json();
  const { offer_id } = body;
  if (!offer_id) return Response.json({ error: 'Missing offer_id' }, { status: 400 });

  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const now = new Date().toISOString();

  const offers = await base44.asServiceRole.entities.ResellerOffer.filter({ id: offer_id });
  if (!offers || offers.length === 0) return Response.json({ error: 'Offer not found' }, { status: 404 });

  const offer = offers[0];

  if (['accepted', 'rejected', 'expired'].includes(offer.status)) {
    return Response.json({ error: 'Η προσφορά δεν μπορεί να τροποποιηθεί.' }, { status: 400 });
  }

  let auditLog = [];
  try { auditLog = JSON.parse(offer.audit_log || '[]'); } catch {}
  auditLog.push({
    action: 'rejected',
    timestamp: now,
    actor: 'customer',
    details: { ip, user_agent: userAgent }
  });

  await base44.asServiceRole.entities.ResellerOffer.update(offer_id, {
    status: 'rejected',
    rejected_at: now,
    audit_log: JSON.stringify(auditLog),
  });

  return Response.json({ success: true });
});