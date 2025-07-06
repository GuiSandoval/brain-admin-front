import { httpClient } from "@/services/http";
import { AlunoResponse } from "./response";

const BASE_ROUTE = "aluno";

export class AlunoApi {
  getAlunos(): Promise<AlunoResponse[]> {
    return httpClient.get(`${BASE_ROUTE}`);
  }
}
