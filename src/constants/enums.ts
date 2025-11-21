/**
 * Enums para as roles de usuário no sistema
 */
export enum UserRole {
  ESTUDANTE = "ESTUDANTE",
  PROFESSOR = "PROFESSOR",
  ADMIN = "ADMIN",
}

/**
 * Enums para as rotas do sistema
 */
export enum Routes {
  // Home routes
  HOME = "/",
  HOME_ESTUDANTE = "/aluno",
  HOME_ADMIN = "/admin",

  // Professor routes
  PROFESSOR_LISTA = "/professor/lista",
  PROFESSOR = "/professor",

  // Turma routes
  TURMA_LISTA = "/turma/lista",
  TURMA = "/turma",

  // Grupo Disciplina routes
  GRUPO_DISCIPLINA_LISTA = "/grupo-disciplina/lista",
  GRUPO_DISCIPLINA = "/grupo-disciplina",

  // Disciplina routes
  DISCIPLINA_LISTA = "/disciplina/lista",
  DISCIPLINA = "/disciplina",

  // Serie routes
  SERIE_LISTA = "/serie/lista",
  SERIE = "/serie",

  // Aula routes
  AULA_LISTA = "/aula/lista",
  AULA = "/aula",
  AULAS = "/aulas",

  // Horario routes
  HORARIO_LISTA = "/horario/lista",
  HORARIO = "/horario",

  // Common routes
  MINHAS_AULAS = "/minhas-aulas",
  CALENDARIO = "/calendario",
  BOLETIM = "/boletim",
  AVALIACOES = "/avaliacoes",
  COMUNICADOS = "/comunicados",
  PERFIL = "/perfil",

  // Admin routes
  USUARIOS = "/usuarios",
  RELATORIOS = "/relatorios",
  CONFIGURACOES = "/configuracoes",
}

/**
 * Labels de texto para as rotas
 */
export enum RouteLabels {
  // Home labels
  HOME_DASHBOARD = "Home Dashboard",
  HOME_ESTUDANTE = "Home Estudante",
  HOME_ADMIN = "Home Admin",

  // Professor labels
  PROFESSORES = "Professores",
  PROFESSOR = "Professor",

  // Turma labels
  TURMAS = "Turmas",
  TURMA = "Turma",

  // Grupo Disciplina labels
  GRUPOS_DISCIPLINA = "Grupos de disciplina",
  GRUPO_DISCIPLINA = "Grupo Disciplina",

  // Disciplina labels
  DISCIPLINAS = "Disciplinas",
  DISCIPLINA = "Disciplina",

  // Serie labels
  SERIES = "Séries",
  SERIE = "Série",

  // Aula labels
  AULAS = "Aulas",
  AULA = "Aula",

  // Horario labels
  HORARIOS = "Horários",
  HORARIO = "Horário",

  // Common labels
  MINHAS_AULAS = "Minhas aulas",
  CALENDARIO = "Calendário",
  BOLETIM = "Boletim",
  AVALIACOES = "Avaliações",
  COMUNICADOS = "Comunicados",
  PERFIL = "Perfil",

  // Admin labels
  USUARIOS = "Usuários",
  RELATORIOS = "Relatórios",
  CONFIGURACOES = "Configurações",
}
