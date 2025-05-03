import { AlunoResponse } from "./response";

export abstract class IAlunoAPI {
  abstract getAlunos(): Promise<AlunoResponse[]>;
}
