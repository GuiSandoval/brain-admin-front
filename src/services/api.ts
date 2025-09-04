import { AlunoApi } from "./domains/aluno";
import { AulaApi } from "./domains/aula";
import { LoginAPI } from "./domains/login";
import { ProfessorApi } from "./domains/professor";

export const alunoApi = new AlunoApi();
export const aulaApi = new AulaApi();
export const loginApi = new LoginAPI();
export const professorApi = new ProfessorApi();
