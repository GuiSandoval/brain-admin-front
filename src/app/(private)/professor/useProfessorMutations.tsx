"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { professorApi } from "@/services/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { toast } from "react-toastify";
import { ProfessorPostRequest } from "@/services/domains/professor/request";

/**
 * Hook para mutações relacionadas aos professores
 * Inclui create, update e outras operações que modificam dados
 */
export function useProfessorMutations() {
  const queryClient = useQueryClient();

  // Mutation para criar professor
  const createProfessor = useMutation({
    mutationFn: (data: ProfessorPostRequest) => professorApi.criarProfessor(data),
    onSuccess: () => {
      // Invalida e refetch a lista de professores quando implementada
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.professores.all });
      toast.success("Professor criado com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao criar professor:", error);
      toast.error("Ocorreu um erro ao criar o professor no servidor. Tente novamente.");
    },
  });

  return {
    createProfessor,
  };
}
