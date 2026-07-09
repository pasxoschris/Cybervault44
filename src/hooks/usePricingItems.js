import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listPricingItems,
  createPricingItem,
  updatePricingItem,
  togglePricingItemActive,
  reorderPricingItems,
} from '@/services/pricingService';

const QUERY_KEY = ['reseller', 'pricing-items'];

/**
 * Fetch all pricing items (cached via React Query).
 * @param {object} options
 * @param {boolean} options.activeOnly — if true, filters to is_active items only
 */
export function usePricingItems({ activeOnly = false } = {}) {
  return useQuery({
    queryKey: [...QUERY_KEY, { activeOnly }],
    queryFn: () => listPricingItems({ activeOnly }),
  });
}

export function useCreatePricingItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPricingItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdatePricingItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePricingItem(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useTogglePricingItemActive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: togglePricingItemActive,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useReorderPricingItems() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: reorderPricingItems,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}