import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Use service role to read Store records despite admin-only RLS
    const stores = await base44.asServiceRole.entities.Store.list('label');
    const mapped = stores.map(s => ({
      id: s.id,
      label: s.store_name || s.trade_name || s.business_name || '—',
      business_name: s.business_name || '',
      trade_name: s.trade_name || '',
      store_name: s.store_name || '',
      vat_number: s.vat_number || '',
      status: s.status || 'active',
    })).sort((a, b) => a.label.localeCompare(b.label, 'el'));

    return Response.json({ stores: mapped });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});