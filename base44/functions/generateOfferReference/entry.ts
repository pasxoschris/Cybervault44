import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

/**
 * Generates a deterministic, incremental daily reference number for offers.
 * Format: CYV-SPOT-YYYYMMDD-NNNN
 * 
 * Queries existing offers for today's date, finds the max sequence, returns next.
 * Uses service role to ensure consistent counting across all users.
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    // Build today's date string in YYYYMMDD format
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const prefix = `CYV-SPOT-${dateStr}-`;

    // Fetch all offers and find the max sequence for today
    const offers = await base44.asServiceRole.entities.ResellerOffer.list('-created_date', 500);

    let maxSeq = 0;
    for (const offer of offers) {
      const ref = offer.reference_number || '';
      if (ref.startsWith(prefix)) {
        const seqStr = ref.substring(prefix.length);
        const seq = parseInt(seqStr, 10);
        if (!isNaN(seq) && seq > maxSeq) {
          maxSeq = seq;
        }
      }
    }

    const nextSeq = maxSeq + 1;
    const referenceNumber = `${prefix}${String(nextSeq).padStart(4, '0')}`;

    return Response.json({ reference_number: referenceNumber });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});