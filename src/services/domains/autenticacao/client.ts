import { httpClient } from "@/services/http";
import { IAutenticacaoAPI } from "./abstract";
import { IDadosToken } from "./response";
import { ILoginRequest } from "./request";

const BASE_ROUTE = "login";

export class AutenticacaoAPI extends IAutenticacaoAPI {
  login(request: ILoginRequest): Promise<IDadosToken[]> {
    return httpClient.post(`${BASE_ROUTE}/login`, request);
  }
}
