import { base44 } from '@/api/base44Client';
import { validate, settingsSchema } from '@/lib/validation/reseller.schemas';

/**
 * Settings Service — centralizes ResellerSettings operations.
 * There is only one settings record (singleton pattern).
 */

const QUERY_KEY = ['reseller', 'settings'];

export async function getSettings() {
  const list = await base44.entities.ResellerSettings.list();
  return list[0] || null;
}

export async function saveSettings(data) {
  const { success, data: valid, errors } = validate(settingsSchema, data);
  if (!success) throw new ValidationError('Validation failed', errors);

  const existing = await getSettings();
  if (existing) {
    return base44.entities.ResellerSettings.update(existing.id, valid);
  }
  return base44.entities.ResellerSettings.create(valid);
}

export class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export { QUERY_KEY };