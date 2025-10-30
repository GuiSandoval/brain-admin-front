"use client";

import { unidadeApi } from "@/services/api";
import { UnidadeResponse } from "@/services/domains/unidade/response";
import { useQuery } from "@tanstack/react-query";

interface UseUnidadesReturn {
  unidades: UnidadeResponse[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook para buscar lista de unidades
 */
export function useUnidades(): UseUnidadesReturn {
  const {
    data: unidadesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["unidades"],
    queryFn: async () => {
      const response = await unidadeApi.getListaUnidades();
      return response;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    unidades: unidadesData ?? [],
    loading: isLoading,
    error: error ? "Erro ao carregar unidades. Tente novamente." : null,
  };
}
