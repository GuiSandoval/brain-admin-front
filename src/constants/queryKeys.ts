/**
 * Query keys para o React Query
 * Organizados de forma hierárquica para facilitar invalidações
 */

export const QUERY_KEYS = {
  aulas: {
    all: ["aulas"] as const,
    lists: (data?: string) => [...QUERY_KEYS.aulas.all, "list", data] as const,
    list: (filters?: Record<string, unknown>) =>
      [...QUERY_KEYS.aulas.lists(), { filters }] as const,
    details: () => [...QUERY_KEYS.aulas.all, "detail"] as const,
    detail: (id: string | number) => [...QUERY_KEYS.aulas.details(), id] as const,
  },
  // Outros recursos podem ser adicionados aqui futuramente
} as const;
