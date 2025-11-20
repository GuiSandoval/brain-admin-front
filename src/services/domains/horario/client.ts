import { httpClient } from "@/services/http";
import { HorarioResponse } from "./response";
import { IBrainResult } from "@/services/commoResponse";
import { HorarioPostRequest, HorarioPutRequest } from "./request";

const BASE_ROUTE = "horario";

export class HorarioApi {
  getHorarios(): Promise<IBrainResult<HorarioResponse>> {
    return httpClient.get(`${BASE_ROUTE}`);
  }

  getHorarioById(id: number): Promise<HorarioResponse> {
    return httpClient.get(`${BASE_ROUTE}/${id}`);
  }

  criarHorario(request: HorarioPostRequest): Promise<IBrainResult<void>> {
    return httpClient.post(`${BASE_ROUTE}`, request);
  }

  atualizarHorario(request: HorarioPutRequest): Promise<IBrainResult<void>> {
    return httpClient.put(`${BASE_ROUTE}`, request);
  }

  deleteHorario(id: number): Promise<IBrainResult<void>> {
    return httpClient.delete(`${BASE_ROUTE}/${id}`);
  }
}
