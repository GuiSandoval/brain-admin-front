import { TurmaFormData } from "@/app/(private)/turma/schema";
import { TurmaPostRequest, TurmaPutRequest } from "@/services/domains/turma/request";
import { TurmaDetalheResponse } from "@/services/domains/turma/response";

export function mapFormDataToTurmaPostRequest(formData: TurmaFormData): TurmaPostRequest {
  return {
    nome: formData.nome,
  };
}

export function mapFormDataToTurmaPutRequest(formData: TurmaFormData, id: string): TurmaPutRequest {
  return {
    id,
    nome: formData.nome,
  };
}

/**
 * Mapeia os dados da turma da API para o formato do formulário
 */
export function mapTurmaResponseToFormData(turma: TurmaDetalheResponse): TurmaFormData {
  return {
    nome: turma.nome || "",
  };
}
