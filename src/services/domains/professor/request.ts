export interface ProfessorAulaRequest {
  data: string;
}
interface ProfessorEnderecoRequest {
  logradouro: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  complemento: string;
  numero: string;
}
export interface ProfessorDadosBancariosRequest {
  nomeBanco: string;
  tipoConta: string;
  agencia: string;
  conta: string;
  chavePix: string;
}
export interface ProfessorDependenteRequest {
  nomeCompleto: string;
  cpf: string;
  dataDeNascimento: string;
  parentesco: string;
}
export interface ProfessorPostRequest {
  cpf: string;
  rg: string;
  nome: string;
  nomeSocial: string;
  email: string;
  dataDeNascimento: string;
  endereco: ProfessorEnderecoRequest;
  genero: string;
  corRaca: string;
  cidadeNaturalidade: string;
  carteiraDeTrabalho: string;
  telefones: string[];
  disciplinaIds?: number[];
  dadosBancarios?: ProfessorDadosBancariosRequest;
  dependentes?: ProfessorDependenteRequest[];
}
export interface ProfessorPutRequest extends ProfessorPostRequest {
  id: string;
}
