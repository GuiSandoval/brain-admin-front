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
}
