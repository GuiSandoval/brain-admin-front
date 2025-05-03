import { httpClient } from "@/services/http";
import { IAlunoAPI } from "./abstract";
import { AlunoResponse } from "./response";

const BASE_ROUTE = "aluno";

export class AlunoApi extends IAlunoAPI {
  getAlunos(): Promise<AlunoResponse[]> {
    return httpClient.get(`${BASE_ROUTE}`);
  }
}
