import { base44 } from '@/api/base44Client';
import {
  generatePublicToken,
  appendAuditLog,
  buildAuditEntry,
} from '@/lib/resellerUtils';
import { validate, offerSchema } from '@/lib/validation/reseller.schemas';

/**
 * Reseller Offer Service — centralizes all ResellerOffer operations.
 * Handles validation, audit logging, and reference number generation.
 */

const QUERY_KEY = ['reseller', 'offers'];

// ─── Read ─────────────────────────────────────────────────────────

export async function listOffers(limit = 200) {
  return base44.entities.ResellerOffer.list('-created_date', limit);
}

export async function getOffer(id) {
  return base44.entities.ResellerOffer.get(id);
}

// ─── Create / Update ──────────────────────────────────────────────

/**
 * Create a new offer. Validates data, generates reference + token via backend,
 * and initializes the audit log.
 */
export async function createOffer(data) {
  // Validate
  const { success, data: valid, errors } = validate(offerSchema, data);
  if (!success) throw new ValidationError('Validation failed', errors);

  // Generate deterministic reference number via backend function
  const refResult = await base44.functions.invoke('generateOfferReference', {});
  const referenceNumber = refResult.data?.reference_number;
  if (!referenceNumber) throw new Error('Failed to generate reference number');

  const publicToken = generatePublicToken();
  const now = new Date().toISOString();

  const auditLog = JSON.stringify([
    buildAuditEntry('created', 'admin', { reference_number: referenceNumber }),
  ]);

  const payload = {
    ...valid,
    reference_number: referenceNumber,
    public_token: publicToken,
    items: JSON.stringify(valid.items || []),
    audit_log: auditLog,
  };

  return base44.entities.ResellerOffer.create(payload);
}

/**
 * Update an existing offer. Validates data and appends to audit log.
 * System fields (reference_number, public_token, created_by, created_date) are protected.
 */
export async function updateOffer(id, data, auditAction = 'updated', auditDetails = {}) {
  // Validate
  const { success, data: valid, errors } = validate(offerSchema, data);
  if (!success) throw new ValidationError('Validation failed', errors);

  // Fetch existing to append audit log
  const existing = await base44.entities.ResellerOffer.get(id);
  const updatedLog = appendAuditLog(existing.audit_log, buildAuditEntry(auditAction, 'admin', auditDetails));

  const payload = {
    ...valid,
    items: JSON.stringify(valid.items || []),
    audit_log: updatedLog,
  };

  // Never allow overriding system fields
  delete payload.reference_number;
  delete payload.public_token;
  delete payload.created_by_id;
  delete payload.created_date;

  return base44.entities.ResellerOffer.update(id, payload);
}

// ─── Status changes ──────────────────────────────────────────────

export async function updateOfferStatus(id, status, auditDetails = {}) {
  const existing = await base44.entities.ResellerOffer.get(id);
  const auditLog = appendAuditLog(existing.audit_log, buildAuditEntry(`status_${status}`, 'admin', auditDetails));

  const payload = { status, audit_log: auditLog };
  if (status === 'accepted') payload.accepted_at = new Date().toISOString();
  if (status === 'rejected') payload.rejected_at = new Date().toISOString();

  return base44.entities.ResellerOffer.update(id, payload);
}

// ─── Duplicate ───────────────────────────────────────────────────

export async function duplicateOffer(offer) {
  const {
    id, reference_number, public_token, created_date, updated_date,
    accepted_at, rejected_at, viewed_at, otp_hash, otp_expires_at,
    otp_attempts, otp_last_sent_at, verification_details, audit_log,
    accepted_pdf_url, pdf_url, pdf_generated_at, last_sent_at, last_sent_to,
    email_history, ...rest
  } = offer;

  // Generate new reference + token via backend
  const refResult = await base44.functions.invoke('generateOfferReference', {});
  const referenceNumber = refResult.data?.reference_number;
  const publicToken = generatePublicToken();

  const now = new Date().toISOString();
  const newAuditLog = JSON.stringify([
    buildAuditEntry('created', 'admin', { reference_number: referenceNumber, duplicated_from: offer.reference_number }),
  ]);

  return base44.entities.ResellerOffer.create({
    ...rest,
    reference_number: referenceNumber,
    public_token: publicToken,
    status: 'draft',
    audit_log: newAuditLog,
  });
}

// ─── Delete ──────────────────────────────────────────────────────

export async function deleteOffer(id) {
  return base44.entities.ResellerOffer.delete(id);
}

// ─── Error class ─────────────────────────────────────────────────

export class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export { QUERY_KEY };