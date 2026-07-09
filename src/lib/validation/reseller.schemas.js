import { z } from 'zod';

// ─── Offer Line (item in an offer) ───────────────────────────────
export const offerLineSchema = z.object({
  id: z.number().or(z.string()).optional(),
  name: z.string().min(1, 'Το όνομα είναι υποχρεωτικό'),
  description: z.string().optional().default(''),
  quantity: z.number().positive('Η ποσότητα πρέπει να είναι τουλάχιστον 1'),
  unit_price: z.number().nonnegative('Η τιμή δεν μπορεί να είναι αρνητική'),
  discount_pct: z.number().min(0).max(100, 'Η έκπτωση πρέπει να είναι 0-100%').default(0),
  is_vat_exempt: z.boolean().default(false),
});

// ─── Offer (full) ─────────────────────────────────────────────────
export const offerSchema = z.object({
  store_name: z.string().optional().default(''),
  company_legal_name: z.string().min(1, 'Η επωνυμία είναι υποχρεωτική'),
  vat_number: z.string().optional().default(''),
  address: z.string().optional().default(''),
  contact_person: z.string().optional().default(''),
  email: z.string().email('Μη έγκυρο email').optional().or(z.literal('')),
  phone: z.string().optional().default(''),
  notes: z.string().optional().default(''),
  items: z.array(offerLineSchema).default([]),
  status: z.enum(['draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired']).default('draft'),
  expires_at: z.string().optional(),
});

// ─── Pricing Item ────────────────────────────────────────────────
export const pricingItemSchema = z.object({
  name: z.string().min(1, 'Το όνομα είναι υποχρεωτικό'),
  description: z.string().optional().default(''),
  category_id: z.string().optional().default(''),
  unit_price: z.number().nonnegative('Η τιμή δεν μπορεί να είναι αρνητική'),
  vat_rate: z.number().min(0).max(100, 'ΦΠΑ 0-100%').default(24),
  is_vat_exempt: z.boolean().default(false),
  default_discount_percentage: z.number().min(0).max(100).default(0),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
});

// ─── Category ─────────────────────────────────────────────────────
export const categorySchema = z.object({
  name: z.string().min(1, 'Το όνομα είναι υποχρεωτικό'),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
});

// ─── Settings ─────────────────────────────────────────────────────
export const settingsSchema = z.object({
  company_name: z.string().optional().default(''),
  company_address: z.string().optional().default(''),
  company_vat_number: z.string().optional().default(''),
  public_email: z.string().email('Μη έγκυρο email').optional().or(z.literal('')),
  public_phone: z.string().optional().default(''),
  offer_validity_days: z.number().int().min(1, 'Τουλάχιστον 1 ημέρα').default(30),
  default_vat_rate: z.number().min(0).max(100).default(24),
  default_email_subject: z.string().optional().default(''),
  default_email_body: z.string().optional().default(''),
  default_terms: z.string().optional().default(''),
});

// ─── Validation helpers ──────────────────────────────────────────

/**
 * Validate data against a schema. Returns { success, data, errors }.
 */
export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data, errors: null };
  }
  const errors = {};
  result.error.issues.forEach(issue => {
    const path = issue.path.join('.');
    errors[path] = issue.message;
  });
  return { success: false, data: null, errors };
}

/**
 * Validate offer lines — at least one line required for non-draft offers.
 */
export function validateOfferLines(lines, { allowEmpty = true } = {}) {
  if (!allowEmpty && lines.length === 0) {
    return { success: false, errors: { items: 'Απαιτείται τουλάχιστον μία γραμμή' } };
  }
  return validate(z.array(offerLineSchema), lines);
}