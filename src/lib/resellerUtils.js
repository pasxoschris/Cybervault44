/**
 * Shared utility functions for the Reseller Console.
 * Pure functions — no side effects, no API calls.
 */

// ─── Formatting ──────────────────────────────────────────────────

export function formatCurrency(n) {
  return Number(n || 0).toFixed(2);
}

export function formatEuro(n) {
  return n != null ? `€${Number(n).toFixed(2)}` : '—';
}

export function formatDate(s) {
  return s ? new Date(s).toLocaleDateString('el-GR') : '—';
}

export function formatDateTime(s) {
  return s ? new Date(s).toLocaleString('el-GR', { dateStyle: 'short', timeStyle: 'short' }) : '—';
}

// ─── Date helpers ─────────────────────────────────────────────────

export function todayISODate() {
  return new Date().toISOString().split('T')[0];
}

export function nowTime() {
  return new Date().toTimeString().slice(0, 5);
}

export function addDays(days) {
  return new Date(Date.now() + days * 86400000).toISOString().split('T')[0];
}

// ─── Token generation ─────────────────────────────────────────────

export function generatePublicToken() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─── Sorting ─────────────────────────────────────────────────────

/**
 * Sort items within a category: by display_order (nulls last), then by name.
 */
export function sortItems(items) {
  return [...items].sort((a, b) => {
    const ao = a.display_order == null ? 99999 : a.display_order;
    const bo = b.display_order == null ? 99999 : b.display_order;
    if (ao !== bo) return ao - bo;
    return (a.name || '').localeCompare(b.name || '');
  });
}

export function sortByDisplayOrder(items) {
  return [...items].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
}

// ─── Audit log ────────────────────────────────────────────────────

/**
 * Build an audit log entry. The caller appends it to the existing log.
 */
export function buildAuditEntry(action, actor = 'admin', details = {}) {
  return {
    action,
    timestamp: new Date().toISOString(),
    actor,
    details,
  };
}

/**
 * Append a new entry to an existing audit log (JSON string or array).
 */
export function appendAuditLog(existingLog, entry) {
  let log = [];
  try {
    log = typeof existingLog === 'string' ? JSON.parse(existingLog || '[]') : (existingLog || []);
  } catch {
    log = [];
  }
  log.push(entry);
  return JSON.stringify(log);
}

// ─── Offer line helpers ──────────────────────────────────────────

/**
 * Calculate the total for a single offer line (after discount).
 */
export function lineTotal(line) {
  const sub = line.quantity * line.unit_price;
  return sub * (1 - (line.discount_pct || 0) / 100);
}

/**
 * Create a new offer line from a pricing item.
 */
export function createLineFromItem(item) {
  return {
    id: Date.now() + Math.random(),
    name: item.name,
    description: item.description || '',
    quantity: 1,
    unit_price: item.unit_price,
    discount_pct: item.default_discount_percentage || 0,
    is_vat_exempt: item.is_vat_exempt || false,
  };
}

// ─── Status labels & colors ──────────────────────────────────────

export const STATUS_LABELS = {
  draft: 'Draft', sent: 'Sent', viewed: 'Viewed',
  accepted: 'Accepted', rejected: 'Rejected', expired: 'Expired',
};

export const STATUS_COLORS = {
  draft:    'bg-gray-100 text-gray-600 border-gray-200',
  sent:     'bg-blue-100 text-blue-700 border-blue-200',
  viewed:   'bg-purple-100 text-purple-700 border-purple-200',
  accepted: 'bg-green-100 text-green-700 border-green-200',
  rejected: 'bg-red-100 text-red-600 border-red-200',
  expired:  'bg-amber-100 text-amber-700 border-amber-200',
};

export const ALL_STATUSES = ['draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired'];