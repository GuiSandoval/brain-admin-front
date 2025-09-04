import { IBrainResult } from "@/services/commoResponse";
import { httpClient } from "@/services/http";
import { TarefaResponse } from "./response";

const BASE_ROUTE = "tarefa";

export class TarefaApi {
  listaTodasTarefas(): Promise<IBrainResult<TarefaResponse>> {
    return httpClient.get(`${BASE_ROUTE}`);
  }
}
