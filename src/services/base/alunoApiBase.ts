import { AlunoResponse } from "../models/response/alunoResponse";

export abstract class IAlunoAPI {
  abstract getAlunos(): Promise<AlunoResponse[]>;
}
