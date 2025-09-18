import { IBrainResult } from "@/services/commoResponse";
import { httpClient } from "@/services/http";
import { ProfessorAulaRequest } from "./request";
import { ProfessorAulaResponse, ProfessorPlanejamentoResponse } from "./response";

const BASE_ROUTE = "professor";

export class ProfessorApi {
  getAulasProfessor(request: ProfessorAulaRequest): Promise<IBrainResult<ProfessorAulaResponse>> {
    return httpClient.post(`${BASE_ROUTE}/aulas`, request);
  }
  getPlanejamento(): Promise<ProfessorPlanejamentoResponse[]> {
    return httpClient.get(`${BASE_ROUTE}/planejamento`);
  }
}
