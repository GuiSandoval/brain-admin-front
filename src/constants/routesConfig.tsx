import { UserRole } from "@/utils/auth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/AutoStories";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import * as React from "react";

export interface RouteConfig {
  text: string;
  icon: React.JSX.Element;
  router: string;
  showInMenu: boolean;
}

export const ROUTES_BY_ROLE: Record<UserRole, RouteConfig[]> = {
  ESTUDANTE: [
    {
      text: "Home",
      icon: <DashboardIcon fontSize="small" />,
      router: "/aluno",
      showInMenu: true,
    },
    {
      text: "Minhas aulas",
      icon: <BookIcon fontSize="small" />,
      router: "/minhas-aulas",
      showInMenu: true,
    },
    {
      text: "Calendário",
      icon: <CalendarIcon fontSize="small" />,
      router: "/calendario",
      showInMenu: true,
    },
    {
      text: "Boletim",
      icon: <BookIcon fontSize="small" />,
      router: "/boletim",
      showInMenu: true,
    },
    {
      text: "Perfil",
      icon: <PersonIcon fontSize="small" />,
      router: "/perfil",
      showInMenu: false,
    },
  ],
  PROFESSOR: [
    {
      text: "Home",
      icon: <DashboardIcon fontSize="small" />,
      router: "/",
      showInMenu: true,
    },
    {
      text: "Professor",
      icon: <PersonIcon fontSize="small" />,
      router: "/lista-professor",
      showInMenu: true,
    },
    {
      text: "Grupos de disciplina",
      icon: <GroupIcon fontSize="small" />,
      router: "/lista-grupo-disciplina",
      showInMenu: true,
    },
    {
      text: "Disciplinas",
      icon: <BookIcon fontSize="small" />,
      router: "/lista-disciplina",
      showInMenu: true,
    },
    {
      text: "Séries",
      icon: <BookIcon fontSize="small" />,
      router: "/lista-serie",
      showInMenu: true,
    },
    {
      text: "Turmas",
      icon: <GroupIcon fontSize="small" />,
      router: "/lista-turma",
      showInMenu: true,
    },
    {
      text: "Aulas",
      icon: <BookIcon fontSize="small" />,
      router: "/lista-aula",
      showInMenu: true,
    },
    {
      text: "Horários",
      icon: <CalendarIcon fontSize="small" />,
      router: "/lista-horario",
      showInMenu: true,
    },
    {
      text: "Perfil",
      icon: <PersonIcon fontSize="small" />,
      router: "/perfil",
      showInMenu: false,
    },
    {
      text: "Minhas aulas",
      icon: <BookIcon fontSize="small" />,
      router: "/minhas-aulas",
      showInMenu: false,
    },
    {
      text: "Avaliações",
      icon: <AssessmentIcon fontSize="small" />,
      router: "/avaliacoes",
      showInMenu: false,
    },
    {
      text: "Comunicados",
      icon: <AnnouncementIcon fontSize="small" />,
      router: "/comunicados",
      showInMenu: false,
    },
    {
      text: "Calendário",
      icon: <CalendarIcon fontSize="small" />,
      router: "/calendario",
      showInMenu: false,
    },
    {
      text: "Aula",
      icon: <BookIcon fontSize="small" />,
      router: "/aula",
      showInMenu: false,
    },
    {
      text: "Horário",
      icon: <CalendarIcon fontSize="small" />,
      router: "/horario",
      showInMenu: false,
    },
    {
      text: "Disciplina",
      icon: <BookIcon fontSize="small" />,
      router: "/disciplina",
      showInMenu: false,
    },
    {
      text: "Grupo Disciplina",
      icon: <GroupIcon fontSize="small" />,
      router: "/grupo-disciplina",
      showInMenu: false,
    },
    {
      text: "Série",
      icon: <BookIcon fontSize="small" />,
      router: "/serie",
      showInMenu: false,
    },
    {
      text: "Turma",
      icon: <GroupIcon fontSize="small" />,
      router: "/turma",
      showInMenu: false,
    },
  ],
  ADMIN: [
    {
      text: "Home",
      icon: <DashboardIcon fontSize="small" />,
      router: "/admin",
      showInMenu: true,
    },
    {
      text: "Usuários",
      icon: <GroupIcon fontSize="small" />,
      router: "/usuarios",
      showInMenu: true,
    },
    {
      text: "Relatórios",
      icon: <AssessmentIcon fontSize="small" />,
      router: "/relatorios",
      showInMenu: true,
    },
    {
      text: "Comunicados",
      icon: <AnnouncementIcon fontSize="small" />,
      router: "/comunicados",
      showInMenu: true,
    },
    {
      text: "Configurações",
      icon: <SettingsIcon fontSize="small" />,
      router: "/configuracoes",
      showInMenu: true,
    },
    {
      text: "Perfil",
      icon: <PersonIcon fontSize="small" />,
      router: "/perfil",
      showInMenu: false,
    },
    {
      text: "Aulas",
      icon: <BookIcon fontSize="small" />,
      router: "/aulas",
      showInMenu: false,
    },
    {
      text: "Minhas aulas",
      icon: <BookIcon fontSize="small" />,
      router: "/minhas-aulas",
      showInMenu: false,
    },
    {
      text: "Aula",
      icon: <BookIcon fontSize="small" />,
      router: "/aula",
      showInMenu: false,
    },
    {
      text: "Lista de Aulas",
      icon: <BookIcon fontSize="small" />,
      router: "/lista-aula",
      showInMenu: false,
    },
  ],
};

// Função auxiliar para obter todas as rotas permitidas por role
export function getAllowedRoutes(role: UserRole): string[] {
  return ROUTES_BY_ROLE[role]?.map((route) => route.router) || [];
}

// Função auxiliar para obter apenas as rotas que aparecem no menu
export function getMenuRoutes(role: UserRole): RouteConfig[] {
  return ROUTES_BY_ROLE[role]?.filter((route) => route.showInMenu) || [];
}
