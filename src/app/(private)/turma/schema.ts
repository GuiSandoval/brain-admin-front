import { z } from "zod";

export const turmaSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
});

export type TurmaFormData = z.infer<typeof turmaSchema>;

export const turmaDefaultValues: TurmaFormData = {
  nome: "",
};
