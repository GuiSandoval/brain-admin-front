export interface AvaliacaoPostRequest {
  nome: string;
  disciplinaId: number;
  peso: number;
  conteudo: string;
  notaExtra: boolean;
}

export interface AvaliacaoPutRequest extends AvaliacaoPostRequest {
  id: string;
}
