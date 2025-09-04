import { httpClient } from "@/services/http";
import { AulaAlunoResponse, AulaResponse } from "./response";
import { IBrainResult } from "@/services/commoResponse";

const BASE_ROUTE = "aula";

export class AulaApi {
  getAula(): Promise<IBrainResult<AulaResponse>> {
    return httpClient.get(`${BASE_ROUTE}`);
  }
  putAula(): Promise<void> {
    return httpClient.put(`${BASE_ROUTE}`);
  }
  postAula(): Promise<void> {
    return httpClient.post(`${BASE_ROUTE}`);
  }
  listaAlunosByIdAula(idAula: string): Promise<AulaAlunoResponse[]> {
    return httpClient.get(`${BASE_ROUTE}/${idAula}/alunos`);
  }
}
