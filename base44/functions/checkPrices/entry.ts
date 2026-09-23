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

        // Extract the with-VAT price (first productFinalPrice) and the VAT rate, then compute without-VAT
        const priceMatch = html.match(/<div class="productFinalPrice">\s*([\d.,]+)\s*€?\s*<\/div>/);
        const vatMatch = html.match(/Περιλαμβάνει ΦΠΑ\s*(\d+)%/) || html.match(/ΦΠΑ\s*(\d+)%/);
        let price: number | null = null;
        if (priceMatch) {
          const withVat = parseFloat(priceMatch[1].replace(/\./g, '').replace(',', '.').trim());
          const vatRate = vatMatch ? parseFloat(vatMatch[1]) : 24;
          price = withVat / (1 + vatRate / 100);
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

    // Helper: extract domain name from URL for source_name
    function getDomainName(url: string): string {
      try {
        const u = new URL(url);
        return u.hostname.replace(/^www\./, '');
      } catch {
        return 'unknown';
      }
    }

    // Collect all source URLs per item: search_query can contain comma-separated URLs or a keyword
    const itemSources: Map<string, { urls: string[]; keyword: string | null }> = new Map();

    for (const item of watchItems) {
      const sq = (item.search_query || '').trim();
      if (/^https?:\/\//i.test(sq)) {
        // One or more comma/newline-separated URLs
        const urls = sq.split(/[,\n]/).map(s => s.trim()).filter(s => /^https?:\/\//i.test(s));
        itemSources.set(item.id, { urls, keyword: null });
      } else {
        // Keyword search (searches xpatit.gr via LLM)
        itemSources.set(item.id, { urls: [], keyword: sq || item.name });
      }
    }

    // Results: Map<itemId, Array<{ retail_price, source_name, source_url, notes }>>
    const allScrapedResults: Map<string, Array<{ retail_price: number | null; source_name: string; source_url: string; notes: string }>> = new Map();

    // 1. Scrape xpatit.gr URLs directly
    for (const [itemId, sources] of itemSources) {
      for (const url of sources.urls) {
        if (url.includes('xpatit.gr')) {
          const cleanUrl = url.split('?')[0];
          const { price, title, availability } = await fetchPriceFromXpatit(cleanUrl);
          const item = watchItems.find(i => i.id === itemId);
          const notesParts = [];
          if (title && title !== item?.name) notesParts.push(title);
          if (availability) notesParts.push(availability);

          if (!allScrapedResults.has(itemId)) allScrapedResults.set(itemId, []);
          allScrapedResults.get(itemId).push({
            retail_price: price,
            source_name: 'xpatit.gr',
            source_url: cleanUrl,
            notes: price != null ? notesParts.join(' — ') : 'Δεν βρέθηκε τιμή στη σελίδα'
          });
        }
      }
    }

    // 2. For non-xpatit URLs and keyword items, use LLM with web search
    const llmTasks: Array<{ itemId: string; url: string | null; keyword: string | null; name: string }> = [];
    for (const [itemId, sources] of itemSources) {
      // Non-xpatit URLs
      for (const url of sources.urls) {
        if (!url.includes('xpatit.gr')) {
          const item = watchItems.find(i => i.id === itemId);
          llmTasks.push({ itemId, url, keyword: null, name: item.name });
        }
      }
      // Keyword items (search xpatit.gr)
      if (sources.keyword) {
        const item = watchItems.find(i => i.id === itemId);
        llmTasks.push({ itemId, url: null, keyword: sources.keyword, name: item.name });
      }
    }

    if (llmTasks.length > 0) {
      const taskList = llmTasks.map((t, idx) => {
        if (t.url) {
          return `${idx + 1}. "${t.name}" — Βρες την τιμή ΧΩΡΙΣ ΦΠΑ στη διεύθυνση: ${t.url}`;
        } else {
          return `${idx + 1}. "${t.name}" — Ψάξε σε ελληνικά ηλεκτρονικά καταστήματα (ΕΚΤΟΣ από skroutz.gr) για: "${t.keyword}"`;
        }
      }).join('\n');

      const prompt = `Είσαι ένας agent που ψάχνει retail τιμές για τεχνικό εξοπλισμό στην Ελλάδα.
Για κάθε ένα από τα παρακάτω, βρες την τρέχουσα retail τιμή αγοράς ΧΩΡΙΣ ΦΠΑ.

ΑΠΑΓΟΡΕΥΕΤΑΙ το skroutz.gr — ΜΗΝ ψάχνεις και ΜΗΝ επιστρέφεις αποτελέσματα από skroutz.gr. Ψάξε σε οποιοδήποτε άλλο ελληνικό ηλεκτρονικό κατάστημα (π.χ. xpatit.gr, hellasdigital.gr, plaisio.gr, public.gr, multisyst.gr, κ.λπ.).

ΣΗΜΑΝΤΙΚΟ: Η τιμή που πρέπει να επιστρέψεις είναι ΠΑΝΤΑ η τιμή ΧΩΡΙΣ ΦΠΑ. Αν βρεις μόνο την τιμή με ΦΠΑ, χώρισέ την με 1.24 (για ΦΠΑ 24%) για να βρεις τη τιμή χωρίς ΦΠΑ.

Ανάγκες:
${taskList}

Για κάθε ένα, επέστρεψε:
- name: το όνομα του εξοπλισμού
- retail_price: η τιμή ΧΩΡΙΣ ΦΠΑ σε EUR (αριθμός, χωρίς σύμβολο) ή null αν δεν βρεθεί
- source_name: το όνομα του site (π.χ. "xpatit.gr", "hellasdigital.gr")
- source_url: το URL της σελίδας προϊόντος
- notes: σύντομη σημείωση ή "Δεν βρέθηκε" αν δεν υπάρχει τιμή

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
      for (const task of llmTasks) {
        const match = llmResults.find((r: any) =>
          (r.name || '').toLowerCase().includes(task.name.toLowerCase()) ||
          task.name.toLowerCase().includes((r.name || '').toLowerCase())
        );
        if (!allScrapedResults.has(task.itemId)) allScrapedResults.set(task.itemId, []);
        if (match) {
          allScrapedResults.get(task.itemId).push({
            retail_price: match.retail_price ?? null,
            source_name: match.source_name || (task.url ? getDomainName(task.url) : 'xpatit.gr'),
            source_url: match.source_url || task.url || '',
            notes: match.notes || ''
          });
        } else {
          allScrapedResults.get(task.itemId).push({
            retail_price: null,
            source_name: task.url ? getDomainName(task.url) : 'xpatit.gr',
            source_url: task.url || '',
            notes: 'Δεν βρέθηκε αποτέλεσμα'
          });
        }
      }
    }

    const now = new Date().toISOString();

    // Save one PriceWatchResult per source per item
    const saved = [];
    for (const item of watchItems) {
      const results = allScrapedResults.get(item.id) || [];

      const linkedPricing = item.linked_pricing_item_id ? pricingMap.get(item.linked_pricing_item_id) : null;
      const resellerPrice = linkedPricing?.unit_price ?? null;

      if (results.length === 0) {
        // No sources at all — create a single empty result
        const resultRecord = await base44.entities.PriceWatchResult.create({
          watch_item_id: item.id,
          watch_item_name: item.name,
          retail_price: null,
          source_url: '',
          source_name: '',
          reseller_price: resellerPrice,
          price_difference: null,
          price_difference_pct: null,
          checked_at: now,
          notes: 'Δεν βρέθηκε αποτέλεσμα'
        });
        saved.push(resultRecord);
      } else {
        for (const r of results) {
          const diff = (r.retail_price != null && resellerPrice != null) ? (r.retail_price - resellerPrice) : null;
          const diffPct = (r.retail_price != null && resellerPrice != null && resellerPrice > 0) ? ((r.retail_price - resellerPrice) / resellerPrice * 100) : null;

          const resultRecord = await base44.entities.PriceWatchResult.create({
            watch_item_id: item.id,
            watch_item_name: item.name,
            retail_price: r.retail_price,
            source_url: r.source_url,
            source_name: r.source_name,
            reseller_price: resellerPrice,
            price_difference: diff,
            price_difference_pct: diffPct,
            checked_at: now,
            notes: r.notes || ''
          });
          saved.push(resultRecord);
        }
      }
    }

    return Response.json({ results: saved, count: saved.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}