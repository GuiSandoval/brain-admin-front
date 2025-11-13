import { IBrainResult } from "@/services/commoResponse";
import { httpClient } from "@/services/http";
import { TurmaPostRequest, TurmaPutRequest } from "./request";
import { TurmaDetalheResponse, TurmaListaResponse, TurmaResponse } from "./response";

const BASE_ROUTE = "turma";

export class TurmaApi {
  getListaTurmas(): Promise<TurmaResponse[]> {
    return httpClient.get(`${BASE_ROUTE}`);
  }

  criarTurma(request: TurmaPostRequest): Promise<IBrainResult<void>> {
    return httpClient.post(`${BASE_ROUTE}`, request);
  }

  getListaTurmasPaginada(): Promise<IBrainResult<TurmaListaResponse>> {
    return httpClient.get(`${BASE_ROUTE}/paginado`);
  }

  getTurmaById(id: string): Promise<TurmaDetalheResponse> {
    return httpClient.get(`${BASE_ROUTE}/${id}`);
  }

  atualizarTurma(request: TurmaPutRequest): Promise<IBrainResult<void>> {
    return httpClient.put(`${BASE_ROUTE}`, request);
  }

  deleteTurma(id: string): Promise<IBrainResult<void>> {
    return httpClient.delete(`${BASE_ROUTE}/${id}`);
  }
}
