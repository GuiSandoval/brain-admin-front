import { httpClient } from "@/services/http";
import { AulaResponse } from "./response";
import { IBrainResult } from "@/services/commoResponse";

const BASE_ROUTE = "professor";

export class AulaApi {
  getAulasProfessor(): Promise<IBrainResult<AulaResponse>> {
    return httpClient.get(`${BASE_ROUTE}/aulas`);
  }
}
