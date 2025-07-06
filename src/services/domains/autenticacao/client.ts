import { httpClient } from "@/services/http";
import { ILoginRequest } from "./request";
import { IDadosToken } from "./response";

const BASE_ROUTE = "login";

export class AutenticacaoAPI {
  login(request: ILoginRequest): Promise<IDadosToken[]> {
    return httpClient.post(`${BASE_ROUTE}/login`, request);
  }
}
