import { base44 } from '@/api/base44Client';

/**
 * Pricing Service — centralizes all ResellerPricingItem & ResellerCategory operations.
 * Enforces soft-delete pattern (is_active flag) and provides a clean API for components.
 */

// ─── Pricing Items ───────────────────────────────────────────────

export async function listPricingItems({ activeOnly = false } = {}) {
  const items = await base44.entities.ResellerPricingItem.list('display_order', 500);
  return activeOnly ? items.filter(i => i.is_active) : items;
}

export async function filterPricingItems(filter = {}) {
  return base44.entities.ResellerPricingItem.filter(filter);
}

export async function getPricingItem(id) {
  return base44.entities.ResellerPricingItem.get(id);
}

export async function createPricingItem(data) {
  return base44.entities.ResellerPricingItem.create(data);
}

export async function updatePricingItem(id, data) {
  return base44.entities.ResellerPricingItem.update(id, data);
}

/**
 * Soft delete — sets is_active to false instead of removing the record.
 * Preserves referential integrity for existing offers that reference this item.
 */
export async function deactivatePricingItem(id) {
  return base44.entities.ResellerPricingItem.update(id, { is_active: false });
}

/**
 * Restore a soft-deleted item.
 */
export async function activatePricingItem(id) {
  return base44.entities.ResellerPricingItem.update(id, { is_active: true });
}

/**
 * Toggle the is_active flag of a pricing item.
 */
export async function togglePricingItemActive(item) {
  return base44.entities.ResellerPricingItem.update(item.id, { is_active: !item.is_active });
}

/**
 * Bulk reorder pricing items within a category.
 * @param {Array<{id: string, display_order: number}>} updates
 */
export async function reorderPricingItems(updates) {
  return base44.entities.ResellerPricingItem.bulkUpdate(updates);
}

// ─── Categories ──────────────────────────────────────────────────

export async function listCategories({ activeOnly = false } = {}) {
  const cats = await base44.entities.ResellerCategory.list('display_order', 100);
  return activeOnly ? cats.filter(c => c.is_active) : cats;
}

export async function createCategory(data) {
  return base44.entities.ResellerCategory.create(data);
}

export async function updateCategory(id, data) {
  return base44.entities.ResellerCategory.update(id, data);
}

/**
 * Soft delete a category.
 */
export async function deactivateCategory(id) {
  return base44.entities.ResellerCategory.update(id, { is_active: false });
}

export async function toggleCategoryActive(cat) {
  return base44.entities.ResellerCategory.update(cat.id, { is_active: !cat.is_active });
}

/**
 * Bulk reorder categories.
 * @param {Array<{id: string, display_order: number}>} updates
 */
export async function reorderCategories(updates) {
  return base44.entities.ResellerCategory.bulkUpdate(updates);
}

// ─── Composite: Load catalog (items + categories in one call) ────

export async function loadPricingCatalog() {
  const [items, categories] = await Promise.all([
    base44.entities.ResellerPricingItem.list('display_order', 500),
    base44.entities.ResellerCategory.list('display_order', 100),
  ]);
  return {
    items,
    categories: categories.filter(c => c.is_active),
  };
}