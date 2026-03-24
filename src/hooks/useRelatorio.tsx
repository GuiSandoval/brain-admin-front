"use client";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { relatorioApi } from "@/services/api";
import { RelatorioAnoPorAnoResponse } from "@/services/domains/relatorio/response";
import { useQuery } from "@tanstack/react-query";

interface UseRelatorioAnosReturn {
  anos: number[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  isSuccess: boolean;
}

/**
 * Hook para buscar lista de anos disponíveis
 */
export function useRelatorioAnos(): UseRelatorioAnosReturn {
  const { data, isLoading, error, refetch, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.relatorios.anos(),
    queryFn: async () => {
      return await relatorioApi.getAnos();
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    meta: {
      errorMessage: "Erro ao carregar a lista de anos. Tente novamente.",
    },
  });

  return {
    anos: data ?? [],
    loading: isLoading,
    error: error ? "Erro ao carregar a lista de anos. Tente novamente." : null,
    refetch: () => {
      refetch();
    },
    isSuccess,
  };
}

interface UseRelatorioFiltrosPorAnoReturn {
  dados: RelatorioAnoPorAnoResponse;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  isSuccess: boolean;
}

/**
 * Hook para buscar dados de filtros por ano selecionado
 */
export function useRelatorioFiltrosPorAno(ano: number | null): UseRelatorioFiltrosPorAnoReturn {
  const { data, isLoading, error, refetch, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.relatorios.filtrosPorAno(ano!),
    queryFn: async () => {
      return await relatorioApi.filtrosPorAno(ano!);
    },
    enabled: !!ano,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    meta: {
      errorMessage: "Erro ao carregar os dados do ano. Tente novamente.",
    },
  });

  return {
    dados: data ?? [],
    loading: isLoading,
    error: error ? "Erro ao carregar os dados do ano. Tente novamente." : null,
    refetch: () => {
      refetch();
    },
    isSuccess,
  };
}
