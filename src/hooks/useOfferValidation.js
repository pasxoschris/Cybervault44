import { useCallback } from 'react';
import { validate, offerSchema, validateOfferLines } from '@/lib/validation/reseller.schemas';

/**
 * Returns validation helpers for offers.
 */
export function useOfferValidation() {
  const validateOffer = useCallback((data, { allowEmptyLines = true } = {}) => {
    const lineResult = validateOfferLines(data.items || [], { allowEmpty: allowEmptyLines });
    if (!lineResult.success) {
      return { success: false, errors: { ...lineResult.errors } };
    }
    const result = validate(offerSchema, { ...data, items: lineResult.data || [] });
    return result;
  }, []);

  const validateField = useCallback((schema, field, value) => {
    const result = schema.safeParse({ [field]: value });
    if (result.success) return null;
    const issue = result.error.issues.find(i => i.path[0] === field);
    return issue ? issue.message : null;
  }, []);

  return { validateOffer, validateField };
}