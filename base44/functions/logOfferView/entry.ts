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

  // Only log view if not in final state
  if (['accepted', 'rejected', 'expired'].includes(offer.status)) {
    return Response.json({ success: true, skipped: true });
  }

  // Parse existing audit log
  let auditLog = [];
  try { auditLog = JSON.parse(offer.audit_log || '[]'); } catch {}

  // Only mark viewed once (first time)
  const alreadyViewed = auditLog.some(e => e.action === 'viewed');

  const updates = {};

  if (!alreadyViewed) {
    auditLog.push({
      action: 'viewed',
      timestamp: now,
      actor: 'customer',
      details: { ip, user_agent: userAgent }
    });
    updates.status = 'viewed';
    updates.viewed_at = now;
  } else {
    // Still log subsequent views but don't change status
    auditLog.push({
      action: 'viewed',
      timestamp: now,
      actor: 'customer',
      details: { ip, user_agent: userAgent }
    });
  }

  updates.audit_log = JSON.stringify(auditLog);

  await base44.asServiceRole.entities.ResellerOffer.update(offer_id, updates);

  return Response.json({ success: true });
});