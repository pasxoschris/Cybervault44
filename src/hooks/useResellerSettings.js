import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, saveSettings, QUERY_KEY } from '@/services/settingsService';

export function useResellerSettings() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getSettings,
  });
}

export function useSaveSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: saveSettings,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}