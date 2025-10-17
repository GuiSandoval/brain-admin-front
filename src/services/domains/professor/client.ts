import { IBrainResult } from "@/services/commoResponse";
import { httpClient } from "@/services/http";
import { ProfessorAulaRequest, ProfessorPostRequest } from "./request";
import {
  ProfessorAulaResponse,
  ProfessorListaResponse,
  ProfessorPlanejamentoResponse,
} from "./response";

const BASE_ROUTE = "professor";

export class ProfessorApi {
  getAulasProfessor(request: ProfessorAulaRequest): Promise<IBrainResult<ProfessorAulaResponse>> {
    return httpClient.post(`${BASE_ROUTE}/aulas`, request);
  }
  getPlanejamento(): Promise<ProfessorPlanejamentoResponse[]> {
    return httpClient.get(`${BASE_ROUTE}/planejamento`);
  }
  criarProfessor(request: ProfessorPostRequest): Promise<IBrainResult<void>> {
    return httpClient.post(`${BASE_ROUTE}`, request);
  }
  getListaProfessores(): Promise<IBrainResult<ProfessorListaResponse>> {
    return httpClient.get(`${BASE_ROUTE}`);
  }
  deleteProfessor(id: string): Promise<IBrainResult<void>> {
    return httpClient.delete(`${BASE_ROUTE}/${id}`);
  }
}
