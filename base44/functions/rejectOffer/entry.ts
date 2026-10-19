// Απόρριψη προσφοράς από τη σελίδα της εφαρμογής.
// Η λογική είναι κοινή με τη δημόσια σελίδα προσφοράς — base44/shared/offerAcceptance.ts.
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { rejectOfferCore } from '../../shared/offerAcceptance.ts';

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { offer_id } = body;
    if (!offer_id) return Response.json({ error: 'Missing offer_id' }, { status: 400 });

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const result = await rejectOfferCore(base44, offer_id, { ip, userAgent });
    if (!result.ok) return Response.json({ error: result.error }, { status: result.status });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}