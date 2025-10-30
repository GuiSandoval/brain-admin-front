export interface DisciplinaPostRequest {
  unidadeId: number;
  serieId: number;
  nome: string;
  cargaHoraria: string;
  grupoId: number;
}

export interface DisciplinaPutRequest extends DisciplinaPostRequest {
  id: string;
}
