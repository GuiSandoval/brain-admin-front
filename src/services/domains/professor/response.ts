export interface ProfessorAulaResponse {
  aulaId: number;
  disciplina: string;
  serie: string;
  turma: string;
  sala: string;
  professor: string;
  horarioInicio: number[];
  horarioFim: number[];
  quantidadeAlunos: number;
  unidade: string;
}
