export interface AvaliacaoListaResponse {
  id: number;
  nome: string;
  disciplina: string;
  peso: number;
  conteudo: string;
  notaExtra?: boolean;
}

export interface AvaliacaoDetalheResponse {
  id: number;
  nome: string;
  disciplinaId: number;
  disciplina: string;
  peso: number;
  conteudo: string;
  notaExtra: boolean;
}
