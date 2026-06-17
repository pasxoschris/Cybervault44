import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const MAX_TICKETS_TO_SCAN = 500;
const RESPONSE_LIMIT = 20;

const isAllowedServiceDeskUser = async (base44, user) => {
  if (user?.role === 'admin') return true;
  if (!user?.email) return false;

  const allowedUsers = await base44.asServiceRole.entities.AllowedUser.filter({
    email: user.email.toLowerCase(),
  });

  return allowedUsers.length > 0;
};

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const allowed = await isAllowedServiceDeskUser(base44, user);
  if (!allowed) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const storeId = String(body.store_id || '').trim();
  const storeName = String(body.store || '').trim();

  if (!storeId && !storeName) {
    return Response.json({ error: 'Missing store identifier' }, { status: 400 });
  }

  try {
    const tickets = await base44.asServiceRole.entities.Ticket.list('-created_date', MAX_TICKETS_TO_SCAN);
    const matchingTickets = tickets
      .filter((ticket) => {
        if (storeId && ticket.store_id === storeId) return true;
        if (storeName && ticket.store === storeName) return true;
        return false;
      })
      .slice(0, RESPONSE_LIMIT)
      .map((ticket) => ({
        id: ticket.id,
        date: ticket.date || '',
        time: ticket.time || '',
        operator: ticket.operator || '',
        store: ticket.store || '',
        caller: ticket.caller || '',
        phone: ticket.phone || '',
        problem: ticket.problem || '',
        resolved: Boolean(ticket.resolved),
        notes: ticket.notes || '',
        category_not_spotlight: Boolean(ticket.category_not_spotlight),
        category_printers: Boolean(ticket.category_printers),
        category_settings: Boolean(ticket.category_settings),
        category_pos: Boolean(ticket.category_pos),
        category_pda: Boolean(ticket.category_pda),
        category_invoices: Boolean(ticket.category_invoices),
        created_date: ticket.created_date || '',
      }));

    return Response.json({ tickets: matchingTickets });
  } catch (error) {
    console.error('Failed to load store tickets:', error?.message || error);
    return Response.json({ error: 'Failed to load store tickets' }, { status: 500 });
  }
});
