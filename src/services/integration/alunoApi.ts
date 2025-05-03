import { httpClient } from "@/services/api";
import { IAlunoAPI } from "../base";
import { AlunoResponse } from "@/services/models/response";

const BASE_ROUTE = "aluno";

export class AlunoApi extends IAlunoAPI {
  getAlunos(): Promise<AlunoResponse[]> {
    return httpClient.get(`${BASE_ROUTE}`);
  }
}
