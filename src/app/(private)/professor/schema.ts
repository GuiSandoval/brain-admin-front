import { z } from "zod";

export const professorSchema = z.object({
  nomeCompleto: z
    .string()
    .min(2, "Nome completo deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  nomeSocial: z.string().optional(),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  dataNascimento: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato dd/mm/aaaa"),
  genero: z.string().min(1, "Gênero é obrigatório"),
  corRaca: z.string().min(1, "Cor/Raça é obrigatória"),
  cidadeNaturalidade: z
    .string()
    .min(2, "Cidade de naturalidade é obrigatória")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Cidade deve conter apenas letras"),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00"),
  rg: z.string().min(1, "RG é obrigatório").min(7, "RG deve ter pelo menos 7 caracteres"),
  carteiraTrabalho: z
    .string()
    .min(1, "Carteira de trabalho é obrigatória")
    .min(7, "Carteira de trabalho deve ter pelo menos 7 dígitos"),
  cep: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 00000-000"),
  logradouro: z
    .string()
    .min(1, "Logradouro é obrigatório")
    .min(5, "Logradouro deve ter pelo menos 5 caracteres"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z
    .string()
    .min(1, "Bairro é obrigatório")
    .min(2, "Bairro deve ter pelo menos 2 caracteres"),
  cidade: z
    .string()
    .min(1, "Cidade é obrigatória")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Cidade deve conter apenas letras"),
  uf: z.string().min(1, "UF é obrigatório").length(2, "UF deve ter exatamente 2 caracteres"),
});

export type ProfessorFormData = z.infer<typeof professorSchema>;
export const professorDefaultValues: ProfessorFormData = {
  nomeCompleto: "",
  nomeSocial: "",
  email: "",
  dataNascimento: "",
  genero: "",
  corRaca: "",
  cidadeNaturalidade: "",
  cpf: "",
  rg: "",
  carteiraTrabalho: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
};
