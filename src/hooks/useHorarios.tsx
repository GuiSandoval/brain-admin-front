"use client";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { horarioApi } from "@/services/api";
import { HorarioResponse } from "@/services/domains/horario/response";

interface UseHorariosReturn {
  horarios: HorarioResponse[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook para buscar lista de horários
 */
export function useHorarios(): UseHorariosReturn {
  const {
    data: horariosData,
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.horarios.lists(),
    queryFn: async () => {
      const response = await horarioApi.getHorarios();
      return response.content;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    horarios: horariosData ?? [],
    loading: isLoading,
    error: error ? "Erro ao carregar horários. Tente novamente." : null,
  };
}
