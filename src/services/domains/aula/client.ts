import { httpClient } from "@/services/http";
import {
  AulaAlunoResponse,
  AulaDetalheResponse,
  AulaListaResponse,
  AulaResponse,
} from "./response";
import { IBrainResult } from "@/services/commoResponse";
import { AulaPostRequest, AulaPutRequest } from "./request";

const BASE_ROUTE = "aula";

export class AulaApi {
  getAula(): Promise<IBrainResult<AulaResponse>> {
    return httpClient.get(`${BASE_ROUTE}`);
  }

  getListaAulasPaginada(): Promise<IBrainResult<AulaListaResponse>> {
    return httpClient.get(`${BASE_ROUTE}`);
  }

  getAulaById(id: string): Promise<AulaDetalheResponse> {
    return httpClient.get(`${BASE_ROUTE}/${id}`);
  }

  criarAula(request: AulaPostRequest): Promise<IBrainResult<void>> {
    return httpClient.post(`${BASE_ROUTE}`, request);
  }

  atualizarAula(request: AulaPutRequest): Promise<IBrainResult<void>> {
    return httpClient.put(`${BASE_ROUTE}`, request);
  }

  deleteAula(id: string): Promise<IBrainResult<void>> {
    return httpClient.delete(`${BASE_ROUTE}/${id}`);
  }

  listaAlunosByIdAula(idAula: string): Promise<AulaAlunoResponse[]> {
    return httpClient.get(`${BASE_ROUTE}/${idAula}/alunos`);
  }
}
