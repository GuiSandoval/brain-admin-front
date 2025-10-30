export interface DisciplinaListaResponse {
  id: number;
  unidadeId: number;
  unidadeNome?: string;
  serieId: number;
  serieNome?: string;
  nome: string;
  cargaHoraria: string;
  grupoId: number;
  grupoNome?: string;
}

export interface DisciplinaDetalheResponse {
  id: number;
  unidadeId: number;
  serieId: number;
  nome: string;
  cargaHoraria: string;
  grupoId: number;
}
