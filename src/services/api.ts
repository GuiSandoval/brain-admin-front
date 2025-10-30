import { AlunoApi } from "./domains/aluno";
import { AulaApi } from "./domains/aula";
import { LoginAPI } from "./domains/login";
import { LoginGoogleAPI } from "./domains/login-google";
import { ProfessorApi } from "./domains/professor";
import { DisciplinaApi } from "./domains/disciplina";
import { TarefaApi } from "./domains/tarefa";
import { UsuarioAPI } from "./domains/usuario";

export const alunoApi = new AlunoApi();
export const aulaApi = new AulaApi();
export const loginApi = new LoginAPI();
export const professorApi = new ProfessorApi();
export const disciplinaApi = new DisciplinaApi();
export const tarefaApi = new TarefaApi();
export const loginGoogleApi = new LoginGoogleAPI();
export const usuarioApi = new UsuarioAPI();
