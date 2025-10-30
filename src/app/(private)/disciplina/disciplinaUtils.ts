import { DisciplinaFormData } from "@/app/(private)/disciplina/schema";
import { DisciplinaPostRequest, DisciplinaPutRequest } from "@/services/domains/disciplina/request";
import { DisciplinaDetalheResponse } from "@/services/domains/disciplina/response";

export function mapFormDataToDisciplinaPostRequest(
  formData: DisciplinaFormData,
): DisciplinaPostRequest {
  return {
    unidadeId: Number(formData.unidadeId),
    serieId: Number(formData.serieId),
    nome: formData.nome,
    cargaHoraria: formData.cargaHoraria,
    grupoId: Number(formData.grupoId),
  };
}

export function mapFormDataToDisciplinaPutRequest(
  formData: DisciplinaFormData,
  id: string,
): DisciplinaPutRequest {
  return {
    id,
    unidadeId: Number(formData.unidadeId),
    serieId: Number(formData.serieId),
    nome: formData.nome,
    cargaHoraria: formData.cargaHoraria,
    grupoId: Number(formData.grupoId),
  };
}

/**
 * Mapeia os dados da disciplina da API para o formato do formulário
 */
export function mapDisciplinaResponseToFormData(
  disciplina: DisciplinaDetalheResponse,
): DisciplinaFormData {
  return {
    unidadeId: disciplina.unidadeId?.toString() || "",
    serieId: disciplina.serieId?.toString() || "",
    nome: disciplina.nome || "",
    cargaHoraria: disciplina.cargaHoraria || "",
    grupoId: disciplina.grupoId?.toString() || "",
  };
}
