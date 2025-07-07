import { httpClient } from "@/services/http";
import { AlunoResponse } from "./response";
import { IBrainResult } from "@/services/commoResponse";

const BASE_ROUTE = "aluno";

export class AlunoApi {
  getAlunos(): Promise<IBrainResult<AlunoResponse>> {
    console.log("aqui");
    return httpClient.get(`${BASE_ROUTE}`);
  }
}
