// TODO: verificar se é essa tipagem mesmo
export interface AlunoResponse {
  id: number;
  nome: string;
  cpf: string;
  data_nascimento: string;
  telefone: string;
  email: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  created_at: string;
  updated_at: string;
}
