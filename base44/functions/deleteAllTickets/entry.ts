import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' });

    // Fetch all tickets and delete in sequence to avoid rate limits
    const tickets = await base44.asServiceRole.entities.Ticket.list();
    let deleted = 0;
    for (const t of tickets) {
      await base44.asServiceRole.entities.Ticket.delete(t.id);
      deleted++;
    }
    return Response.json({ deleted });
  } catch (error) {
    return Response.json({ error: error.message });
  }
});