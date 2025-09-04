export interface AulaResponse {
  turma: string;
  professor: string;
  disciplina: string;
  horario: string;
}

export interface AulaAlunoResponse {
  id: string;
  nome: string;
  registros: number;
  faltas: number;
}
