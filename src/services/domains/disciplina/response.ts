export interface DisciplinaListaResponse {
  cargaHoraria: string;
  grupo: string;
  id: number;
  nome: string;
  serie: string;
  unidade: string;
}

export interface DisciplinaDetalheResponse {
  id: number;
  unidadeId: number;
  serieId: number;
  nome: string;
  cargaHoraria: string;
  grupoId: number;
}
