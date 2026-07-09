import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listOffers,
  createOffer,
  updateOffer,
  updateOfferStatus,
  duplicateOffer,
  deleteOffer,
  QUERY_KEY,
} from '@/services/resellerOfferService';

export function useOffers(limit = 200) {
  return useQuery({
    queryKey: [...QUERY_KEY, { limit }],
    queryFn: () => listOffers(limit),
  });
}

export function useCreateOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createOffer,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, auditAction, auditDetails }) =>
      updateOffer(id, data, auditAction, auditDetails),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateOfferStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, auditDetails }) => updateOfferStatus(id, status, auditDetails),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDuplicateOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: duplicateOffer,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteOffer,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}