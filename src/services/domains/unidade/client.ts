import { httpClient } from "@/services/http";
import { UnidadeResponse } from "./response";

const BASE_ROUTE = "unidade";

export class UnidadeApi {
  getListaUnidades(): Promise<UnidadeResponse[]> {
    return httpClient.get(`${BASE_ROUTE}`);
  }
}
