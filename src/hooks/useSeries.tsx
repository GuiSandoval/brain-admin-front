"use client";

import { serieApi } from "@/services/api";
import { SerieResponse } from "@/services/domains/serie/response";
import { useQuery } from "@tanstack/react-query";

interface UseSeriesReturn {
  series: SerieResponse[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook para buscar lista de séries
 */
export function useSeries(): UseSeriesReturn {
  const {
    data: seriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["series"],
    queryFn: async () => {
      const response = await serieApi.getListaSeries();
      return response;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    series: seriesData ?? [],
    loading: isLoading,
    error: error ? "Erro ao carregar séries. Tente novamente." : null,
  };
}
