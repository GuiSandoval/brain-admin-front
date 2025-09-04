"use client";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { professorApi } from "@/services/api";
import { AulaResponse } from "@/services/domains/aula/response";
import { useQuery } from "@tanstack/react-query";

interface UseAulasReturn {
  aulas: AulaResponse[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  isSuccess: boolean;
  isFetching: boolean;
}

/**
 * Hook para gerenciar o estado das aulas usando React Query
 * @returns {UseAulasReturn} Estado das aulas e funções de controle
 */
export function useAulas(): UseAulasReturn {
  const { data, isLoading, error, refetch, isSuccess, isFetching } = useQuery({
    queryKey: QUERY_KEYS.aulas.lists(),
    queryFn: async () => {
      const response = await professorApi.getAulasProfessor({ data: "2025-09-01" });
      return response.content;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 2,
    refetchOnWindowFocus: false,
    meta: {
      errorMessage: "Erro ao carregar as aulas. Tente novamente.",
    },
  });

  return {
    aulas: data ?? [],
    loading: isLoading,
    error: error ? "Erro ao carregar as aulas. Tente novamente." : null,
    refetch: () => {
      refetch();
    },
    isSuccess,
    isFetching,
  };
}
