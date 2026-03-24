export type AnosResponse = number[];

export interface RelatorioUnidade {
  id: number;
  nome: string;
}

export interface RelatorioSerie {
  id: number;
  nome: string;
  unidadeId: number;
}

export interface RelatorioTurma {
  id: number;
  nome: string;
  disciplinaId: number;
}

export interface RelatorioDisciplina {
  id: number;
  nome: string;
  unidadeId: number;
  serieId: number;
}

export interface RelatorioAnoPorAnoItem {
  unidades: RelatorioUnidade[];
  series: RelatorioSerie[];
  turmas: RelatorioTurma[];
  disciplinas: RelatorioDisciplina[];
}

export type RelatorioAnoPorAnoResponse = RelatorioAnoPorAnoItem[];
