import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const toLabel = (store) => store.store_name || store.trade_name || store.business_name || '';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const allStores = [];
    let skip = 0;
    const limit = 200;

    while (true) {
      const batch = await base44.asServiceRole.entities.Store.list('business_name', limit, skip);
      allStores.push(...batch);
      if (batch.length < limit) break;
      skip += limit;
    }

    const stores = allStores
      .map((store) => ({
        id: store.id,
        label: toLabel(store),
        business_name: store.business_name || '',
        trade_name: store.trade_name || '',
        store_name: store.store_name || '',
        vat_number: store.vat_number || '',
        status: store.status || '',
      }))
      .filter((store) => store.id && store.label)
      .sort((a, b) => a.label.localeCompare(b.label, 'el', { sensitivity: 'base' }));

    return Response.json({ stores });
  } catch (error) {
    console.error('Failed to load stores:', error?.message || error);
    return Response.json({ error: 'Failed to load stores' }, { status: 500 });
  }
});
