import { createClientFromRequest } from 'npm:@base44/sdk@0.8.49';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const itemIds = Array.isArray(body?.item_ids) ? body.item_ids : null;

    // Load watch items (all active, or specific ones)
    const allItems = await base44.entities.PriceWatchItem.list();
    let watchItems = allItems.filter(i => i.is_active !== false);
    if (itemIds && itemIds.length > 0) {
      watchItems = watchItems.filter(i => itemIds.includes(i.id));
    }

    if (watchItems.length === 0) {
      return Response.json({ error: 'Δεν βρέθηκαν ανταλλακτικά προς έλεγχο' }, { status: 400 });
    }

    // Load linked pricing items for comparison
    const pricingItems = await base44.entities.ResellerPricingItem.list();
    const pricingMap = new Map(pricingItems.map(p => [p.id, p]));

    // Build search list for LLM
    const searchList = watchItems.map((item, idx) => ({
      index: idx,
      name: item.name,
      search_query: item.search_query || item.name,
      linked_price: item.linked_pricing_item_id ? (pricingMap.get(item.linked_pricing_item_id)?.unit_price ?? null) : null
    }));

    const prompt = `Είσαι ένας agent που ψάχνει retail τιμές για τεχνικά ανταλλακτικά POS/ηλεκτρονικού εξοπλισμού στην Ελλάδα.
Για κάθε ένα από τα παρακάτω ανταλλακτικά, ψάξε στο διαδίκτυο (Ελλάδα, σε EUR) και βρες την τρέχουσα retail τιμή αγοράς (όχι χονδρική).

Ανταλλακτικά:
${searchList.map(s => `${s.index + 1}. "${s.name}" — αναζήτηση: "${s.search_query}"`).join('\n')}

Για κάθε ανταλλακτικό, επέστρεψε:
- name: το όνομα του ανταλλακτικού
- retail_price: η χαμηλότερη retail τιμή σε EUR (αριθμός, χωρίς σύμβολο)
- source_name: όνομα ιστοσελίδας/καταστήματος
- source_url: URL σελίδας προϊόντος
- notes: σύντομη σημείωση (π.χ. διαθεσιμότητα, μοντέλο) ή κενό αν δεν βρέθηκε

Αν δεν βρεις τιμή για κάποιο ανταλλακτικό, βάλε retail_price: null και source_url: "" με notes: "Δεν βρέθηκε τιμή".

Επέστρεψε ΜΟΝΟ JSON με πεδίο "results" που είναι array με αντικείμενα {name, retail_price, source_name, source_url, notes}.`;

    const llmRes = await base44.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          results: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                retail_price: { type: 'number' },
                source_name: { type: 'string' },
                source_url: { type: 'string' },
                notes: { type: 'string' }
              }
            }
          }
        }
      }
    });

    const results = (llmRes as any)?.results || [];
    const now = new Date().toISOString();

    // Match results back to watch items by name (case-insensitive)
    const saved = [];
    for (const item of watchItems) {
      const match = results.find((r: any) =>
        (r.name || '').toLowerCase().includes(item.name.toLowerCase()) ||
        item.name.toLowerCase().includes((r.name || '').toLowerCase())
      );

      const linkedPricing = item.linked_pricing_item_id ? pricingMap.get(item.linked_pricing_item_id) : null;
      const resellerPrice = linkedPricing?.unit_price ?? null;
      const retailPrice = match?.retail_price ?? null;

      const diff = (retailPrice != null && resellerPrice != null) ? (retailPrice - resellerPrice) : null;
      const diffPct = (retailPrice != null && resellerPrice != null && resellerPrice > 0) ? ((retailPrice - resellerPrice) / resellerPrice * 100) : null;

      const resultRecord = await base44.entities.PriceWatchResult.create({
        watch_item_id: item.id,
        watch_item_name: item.name,
        retail_price: retailPrice,
        source_url: match?.source_url || '',
        source_name: match?.source_name || '',
        reseller_price: resellerPrice,
        price_difference: diff,
        price_difference_pct: diffPct,
        checked_at: now,
        notes: match?.notes || (match ? '' : 'Δεν βρέθηκε αποτέλεσμα')
      });

      saved.push(resultRecord);
    }

    return Response.json({ results: saved, count: saved.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}