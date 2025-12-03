import { IBrainResult } from "@/services/commoResponse";
import { httpClient } from "@/services/http";
import { AvaliacaoPostRequest, AvaliacaoPutRequest } from "./request";
import { AvaliacaoDetalheResponse, AvaliacaoListaResponse } from "./response";

const BASE_ROUTE = "avaliacao";

export class AvaliacaoApi {
  criarAvaliacao(request: AvaliacaoPostRequest): Promise<IBrainResult<void>> {
    return httpClient.post(`${BASE_ROUTE}`, request);
  }

  getListaAvaliacoes(): Promise<IBrainResult<AvaliacaoListaResponse>> {
    return httpClient.get(`${BASE_ROUTE}`);
  }

  getAvaliacaoById(id: string): Promise<AvaliacaoDetalheResponse> {
    return httpClient.get(`${BASE_ROUTE}/${id}`);
  }

  atualizarAvaliacao(request: AvaliacaoPutRequest): Promise<IBrainResult<void>> {
    return httpClient.put(`${BASE_ROUTE}/${request.id}`, request);
  }

  deleteAvaliacao(id: string): Promise<IBrainResult<void>> {
    return httpClient.delete(`${BASE_ROUTE}/${id}`);
  }
}
