import { AlunoResponse } from "../models/response/alunoResponse";

export abstract class IAlunoAPI {
  protected readonly baseRoute: string;

  constructor(baseRoute: string) {
    this.baseRoute = baseRoute;
  }

  abstract getAlunos(): Promise<AlunoResponse[]>;
}
