interface AlunoEnderecoRequest {
  logradouro: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  complemento: string;
  numero: string;
}

export interface AlunoPostRequest {
  cpf: string;
  rg: string;
  nome: string;
  nomeSocial: string;
  email: string;
  dataDeNascimento: string;
  endereco: AlunoEnderecoRequest;
  genero: string;
  corRaca: string;
  cidadeNaturalidade: string;
  telefones: string[];
}

export interface AlunoPutRequest extends AlunoPostRequest {
  id: string;
}
