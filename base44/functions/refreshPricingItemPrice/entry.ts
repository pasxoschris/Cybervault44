import { createClientFromRequest } from 'npm:@base44/sdk@0.8.49';

/**
 * Parses a European-format price string like "166,94 €" or "1.234,56 €" into a number.
 * Removes thousand-separator dots, converts decimal comma to dot.
 */
function parsePriceStr(str) {
  if (!str) return null;
  const cleaned = String(str)
    .replace(/\./g, '')   // remove thousand separators
    .replace(/\s/g, '')    // remove whitespace
    .replace(',', '.')     // decimal comma → dot
    .replace(/[^0-9.]/g, ''); // keep only digits and dot
  const price = parseFloat(cleaned);
  return isNaN(price) ? null : price;
}

/**
 * Extracts the "price without VAT" from an xpatit.gr product page HTML.
 * The page has two .productFinalPrice divs: first = with VAT, second = without VAT.
 * Also tries labeled extraction (EN/EL) for robustness.
 */
function parsePriceWithoutVat(html) {
  // Try labeled patterns first (most precise)
  const labeledPatterns = [
    /Sales price without VAT[\s\S]{0,400}?productFinalPrice[^>]*>\s*([\d.,\s]+€)/i,
    /Τιμή πώλησης χωρίς ΦΠΑ[\s\S]{0,400}?productFinalPrice[^>]*>\s*([\d.,\s]+€)/i,
  ];
  for (const pattern of labeledPatterns) {
    const match = html.match(pattern);
    if (match) {
      const price = parsePriceStr(match[1]);
      if (price != null) return price;
    }
  }
  // Fallback: collect all productFinalPrice values, take the second (without VAT)
  const allMatches = [...html.matchAll(/productFinalPrice[^>]*>\s*([\d.,\s]+€)/gi)];
  if (allMatches.length >= 2) {
    const price = parsePriceStr(allMatches[1][1]);
    if (price != null) return price;
  }
  // Last resort: first productFinalPrice (with VAT) — better than nothing
  if (allMatches.length >= 1) {
    const price = parsePriceStr(allMatches[0][1]);
    if (price != null) return price;
  }
  return null;
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const { item_id } = body || {};

    // Determine which items to refresh
    let items;
    if (item_id) {
      const item = await base44.entities.ResellerPricingItem.get(item_id);
      items = [item];
    } else {
      items = await base44.entities.ResellerPricingItem.list('-updated_date', 500);
      items = items.filter(i => i.source_url);
    }

    if (items.length === 0) {
      return Response.json({ results: [], message: 'Δεν βρέθηκαν προϊόντα με URL για ανανέωση' });
    }

    const results = [];
    for (const item of items) {
      if (!item.source_url) {
        results.push({ id: item.id, name: item.name, status: 'skipped', reason: 'No source URL' });
        continue;
      }
      try {
        const resp = await fetch(item.source_url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'en-US,en;q=0.9,el;q=0.8',
          },
          redirect: 'follow',
        });
        if (!resp.ok) {
          results.push({ id: item.id, name: item.name, status: 'error', reason: `HTTP ${resp.status}` });
          continue;
        }
        const html = await resp.text();
        const newPrice = parsePriceWithoutVat(html);
        if (newPrice == null) {
          results.push({ id: item.id, name: item.name, status: 'error', reason: 'Price not found on page' });
          continue;
        }

        const oldPrice = item.unit_price || 0;
        const changePct = oldPrice > 0 ? ((newPrice - oldPrice) / oldPrice) * 100 : 0;
        const now = new Date().toISOString();

        await base44.entities.ResellerPricingItem.update(item.id, {
          unit_price: newPrice,
          previous_unit_price: oldPrice,
          last_price_update: now,
          price_change_percentage: Math.round(changePct * 100) / 100,
        });

        results.push({
          id: item.id,
          name: item.name,
          status: 'ok',
          old_price: oldPrice,
          new_price: newPrice,
          change_pct: Math.round(changePct * 100) / 100,
          updated_at: now,
        });
      } catch (e) {
        results.push({ id: item.id, name: item.name, status: 'error', reason: e.message });
      }
    }

    return Response.json({ results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}