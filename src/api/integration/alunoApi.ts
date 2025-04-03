import { httpClient } from "@/services/api";
import { IAlunoAPI } from "../base";

const BASE_ROUTE = "aluno";

export class AlunoApi extends IAlunoAPI {
  getAlunos(): Promise<any> {
    return httpClient.get(`${BASE_ROUTE}`);
  }
}
