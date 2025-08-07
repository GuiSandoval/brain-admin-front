import { AlunoApi } from "./domains/aluno";
import { AulaApi } from "./domains/aula";
import { LoginAPI } from "./domains/login";

export const alunoApi = new AlunoApi();
export const aulaApi = new AulaApi();
export const loginApi = new LoginAPI();
