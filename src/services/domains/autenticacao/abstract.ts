import { ILoginRequest } from "./request";
import { IDadosToken } from "./response";

export abstract class IAutenticacaoAPI {
  abstract login(request: ILoginRequest): Promise<IDadosToken[]>;
}
