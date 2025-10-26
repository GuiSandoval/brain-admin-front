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

export interface ProfessorPlanejamentoResponse {
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}

interface ProfessorEnderecoResponse {
  logradouro: string;
  bairro: string;
  cep: string;
  complemento: string;
  numero: string;
  uf: string;
  cidade?: string;
}
export interface ProfessorListaResponse {
  id: number;
  cpf: string;
  matricula: string;
  nome: string;
  nomeSocial: string;
  email: string;
  emailProfissional: string;
  endereco: ProfessorEnderecoResponse;
  rg: string;
  carteiraDeTrabalho: string;
}

export interface ProfessorDetalheResponse {
  id: number;
  cpf: string;
  matricula: string;
  nome: string;
  nomeSocial: string;
  email: string;
  emailProfissional: string;
  endereco: ProfessorEnderecoResponse;
  rg: string;
  carteiraDeTrabalho: string;
  dataDeNascimento?: string;
  genero?: string;
  corRaca?: string;
  cidadeNaturalidade?: string;
}
