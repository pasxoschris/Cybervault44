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

    // Helper: fetch and parse price directly from xpatit.gr product page HTML
    async function fetchPriceFromXpatit(url: string): Promise<{ price: number | null; title: string | null; availability: string | null }> {
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
        });
        if (!res.ok) return { price: null, title: null, availability: null };
        const html = await res.text();

        // Extract price WITHOUT VAT (secondary container): "Τιμή χωρίς ΦΠΑ: ... 108,87 €"
        const noVatMatch = html.match(/Τιμή χωρίς ΦΠΑ:[\s\S]*?<div class="productFinalPrice">\s*([\d.,]+)\s*€?\s*<\/div>/);
        let price: number | null = null;
        if (noVatMatch) {
          const numStr = noVatMatch[1].replace(/\./g, '').replace(',', '.').trim();
          price = parseFloat(numStr);
        } else {
          // Fallback: first productFinalPrice (with VAT)
          const priceMatch = html.match(/<div class="productFinalPrice">\s*([\d.,]+)\s*€?\s*<\/div>/);
          if (priceMatch) {
            const numStr = priceMatch[1].replace(/\./g, '').replace(',', '.').trim();
            price = parseFloat(numStr);
          }
        }

        // Extract product title
        const titleMatch = html.match(/<h1 class="productTitle">\s*([\s\S]*?)\s*<\/h1>/);
        const title = titleMatch ? titleMatch[1].trim() : null;

        // Extract availability
        const availMatch = html.match(/<div class="productAvailability"[^>]*>\s*([\s\S]*?)\s*<\/div>/);
        const availability = availMatch ? availMatch[1].trim() : null;

        return { price, title, availability };
      } catch {
        return { price: null, title: null, availability: null };
      }
    }

    // Separate items: those with a direct URL vs those needing LLM search
    const urlItems = watchItems.filter(i => /^https?:\/\//i.test(i.search_query || ''));
    const keywordItems = watchItems.filter(i => !/^https?:\/\//i.test(i.search_query || ''));

    const scrapedResults: Map<string, { retail_price: number | null; source_name: string; source_url: string; notes: string }> = new Map();

    // 1. Directly scrape URL items
    for (const item of urlItems) {
      const url = item.search_query.split('?')[0]; // strip query params like srsltid
      const { price, title, availability } = await fetchPriceFromXpatit(url);
      const notesParts = [];
      if (title && title !== item.name) notesParts.push(title);
      if (availability) notesParts.push(availability);
      scrapedResults.set(item.id, {
        retail_price: price,
        source_name: 'xpatit.gr',
        source_url: url,
        notes: price != null ? notesParts.join(' — ') : 'Δεν βρέθηκε τιμή στη σελίδα'
      });
    }

    // 2. LLM search for keyword items
    if (keywordItems.length > 0) {
      const searchList = keywordItems.map((item, idx) => ({
        index: idx,
        name: item.name,
        search_query: item.search_query || item.name
      }));

      const prompt = `Είσαι ένας agent που ψάχνει retail τιμές για τεχνικά ανταλλακτικά POS/ηλεκτρονικού εξοπλισμού στην Ελλάδα.
Για κάθε ένα από τα παρακάτω ανταλλακτικά, ψάξε ΑΠΟΚΛΕΙΣΤΙΚΑ στο ηλεκτρονικό κατάστημα xpatit.gr (https://www.xpatit.gr/el) και βρες την τρέχουσα retail τιμή αγοράς (όχι χονδρική).
Χρησιμοποίησε το site:www.xpatit.gr στην αναζήτηση για να βρεις το κάθε προϊόν.

Ανταλλακτικά:
${searchList.map(s => `${s.index + 1}. "${s.name}" — αναζήτηση: "${s.search_query}"`).join('\n')}

Για κάθε ανταλλακτικό, επέστρεψε:
- name: το όνομα του ανταλλακτικού
- retail_price: η retail τιμή από το xpatit.gr σε EUR (αριθμός, χωρίς σύμβολο)
- source_name: "xpatit.gr"
- source_url: το URL της σελίδας προϊόντος στο xpatit.gr
- notes: σύντομη σημείωση (π.χ. διαθεσιμότητα, μοντέλο) ή κενό αν δεν βρέθηκε

Αν δεν βρεις τιμή για κάποιο ανταλλακτικό στο xpatit.gr, βάλε retail_price: null και source_url: "" με notes: "Δεν βρέθηκε στο xpatit.gr".

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

      const llmResults = (llmRes as any)?.results || [];
      for (const item of keywordItems) {
        const match = llmResults.find((r: any) =>
          (r.name || '').toLowerCase().includes(item.name.toLowerCase()) ||
          item.name.toLowerCase().includes((r.name || '').toLowerCase())
        );
        if (match) {
          scrapedResults.set(item.id, {
            retail_price: match.retail_price ?? null,
            source_name: match.source_name || 'xpatit.gr',
            source_url: match.source_url || '',
            notes: match.notes || ''
          });
        } else {
          scrapedResults.set(item.id, {
            retail_price: null,
            source_name: 'xpatit.gr',
            source_url: '',
            notes: 'Δεν βρέθηκε αποτέλεσμα'
          });
        }
      }
    }

    const now = new Date().toISOString();

    // Save results for each watch item
    const saved = [];
    for (const item of watchItems) {
      const scraped = scrapedResults.get(item.id);

      const linkedPricing = item.linked_pricing_item_id ? pricingMap.get(item.linked_pricing_item_id) : null;
      const resellerPrice = linkedPricing?.unit_price ?? null;
      const retailPrice = scraped?.retail_price ?? null;

      const diff = (retailPrice != null && resellerPrice != null) ? (retailPrice - resellerPrice) : null;
      const diffPct = (retailPrice != null && resellerPrice != null && resellerPrice > 0) ? ((retailPrice - resellerPrice) / resellerPrice * 100) : null;

      const resultRecord = await base44.entities.PriceWatchResult.create({
        watch_item_id: item.id,
        watch_item_name: item.name,
        retail_price: retailPrice,
        source_url: scraped?.source_url || '',
        source_name: scraped?.source_name || '',
        reseller_price: resellerPrice,
        price_difference: diff,
        price_difference_pct: diffPct,
        checked_at: now,
        notes: scraped?.notes || 'Δεν βρέθηκε αποτέλεσμα'
      });

      saved.push(resultRecord);
    }

    return Response.json({ results: saved, count: saved.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}