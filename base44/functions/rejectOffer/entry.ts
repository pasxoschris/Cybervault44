// Απόρριψη προσφοράς από τη σελίδα της εφαρμογής.
// Η λογική είναι κοινή με τη δημόσια σελίδα προσφοράς — base44/shared/offerAcceptance.ts.
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { rejectOfferCore, findOfferByToken } from '../../shared/offerAcceptance.ts';

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    // Πρόσβαση μόνο με το μυστικό token του συνδέσμου της προσφοράς (όχι με το id).
    const token = typeof body?.token === 'string' ? body.token : '';
    if (!token) return Response.json({ error: 'Missing token' }, { status: 400 });
    const found = await findOfferByToken(base44, token);
    if (!found) return Response.json({ error: 'Offer not found' }, { status: 404 });
    const offer_id = found.id;

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const result = await rejectOfferCore(base44, offer_id, { ip, userAgent });
    if (!result.ok) return Response.json({ error: result.error }, { status: result.status });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}