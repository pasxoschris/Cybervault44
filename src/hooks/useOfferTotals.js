import { useMemo } from 'react';
import { lineTotal } from '@/lib/resellerUtils';

/**
 * Memoized calculation of all offer totals from lines + settings.
 * Returns: { subtotalBefore, subtotalAfter, totalDiscount, vatRate, vatAmount, finalTotal, exemptBase, vatableBase }
 */
export function useOfferTotals(lines, settings) {
  return useMemo(() => {
    const subtotalBefore = lines.reduce((s, l) => s + l.quantity * l.unit_price, 0);
    const subtotalAfter = lines.reduce((s, l) => s + lineTotal(l), 0);
    const totalDiscount = subtotalBefore - subtotalAfter;
    const vatRate = settings.default_vat_rate || 24;
    const vatableBase = lines.reduce((s, l) => s + (l.is_vat_exempt ? 0 : lineTotal(l)), 0);
    const exemptBase = subtotalAfter - vatableBase;
    const vatAmount = vatableBase * vatRate / 100;
    const finalTotal = subtotalAfter + vatAmount;

    return {
      subtotalBefore,
      subtotalAfter,
      totalDiscount,
      vatRate,
      vatAmount,
      finalTotal,
      exemptBase,
      vatableBase,
    };
  }, [lines, settings.default_vat_rate]);
}