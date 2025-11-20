import { UserRole } from "@/utils/auth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GradeIcon from "@mui/icons-material/Grade";
import CategoryIcon from "@mui/icons-material/Category";
import * as React from "react";

export interface RouteConfig {
  text: string;
  icon: React.JSX.Element;
  router: string;
  isShowMenu: boolean;
}

export const ROUTES_BY_ROLE: Record<UserRole, RouteConfig[]> = {
  ESTUDANTE: [
    {
      text: "Home",
      icon: <DashboardIcon fontSize="small" />,
      router: "/aluno",
      isShowMenu: true,
    },
    {
      text: "Minhas aulas",
      icon: <MenuBookIcon fontSize="small" />,
      router: "/minhas-aulas",
      isShowMenu: true,
    },
    {
      text: "Calendário",
      icon: <CalendarIcon fontSize="small" />,
      router: "/calendario",
      isShowMenu: true,
    },
    {
      text: "Boletim",
      icon: <GradeIcon fontSize="small" />,
      router: "/boletim",
      isShowMenu: true,
    },
    {
      text: "Perfil",
      icon: <PersonIcon fontSize="small" />,
      router: "/perfil",
      isShowMenu: false,
    },
  ],
  PROFESSOR: [
    {
      text: "Home",
      icon: <DashboardIcon fontSize="small" />,
      router: "/",
      isShowMenu: true,
    },
    {
      text: "Professor",
      icon: <PersonIcon fontSize="small" />,
      router: "/professor/lista",
      isShowMenu: true,
    },
    {
      text: "Turmas",
      icon: <GroupIcon fontSize="small" />,
      router: "/turma/lista",
      isShowMenu: true,
    },
    {
      text: "Professor",
      icon: <PersonIcon fontSize="small" />,
      router: "/professor",
      isShowMenu: false,
    },
    {
      text: "Grupos de disciplina",
      icon: <CategoryIcon fontSize="small" />,
      router: "/grupo-disciplina/lista",
      isShowMenu: true,
    },
    {
      text: "Disciplinas",
      icon: <MenuBookIcon fontSize="small" />,
      router: "/disciplina/lista",
      isShowMenu: true,
    },
    {
      text: "Séries",
      icon: <SchoolIcon fontSize="small" />,
      router: "/serie/lista",
      isShowMenu: true,
    },

    {
      text: "Aulas",
      icon: <ClassIcon fontSize="small" />,
      router: "/aula/lista",
      isShowMenu: true,
    },
    {
      text: "Horários",
      icon: <ScheduleIcon fontSize="small" />,
      router: "/horario/lista",
      isShowMenu: true,
    },
    {
      text: "Perfil",
      icon: <PersonIcon fontSize="small" />,
      router: "/perfil",
      isShowMenu: false,
    },
    {
      text: "Minhas aulas",
      icon: <ClassIcon fontSize="small" />,
      router: "/minhas-aulas",
      isShowMenu: false,
    },
    {
      text: "Avaliações",
      icon: <AssessmentIcon fontSize="small" />,
      router: "/avaliacoes",
      isShowMenu: false,
    },
    {
      text: "Comunicados",
      icon: <AnnouncementIcon fontSize="small" />,
      router: "/comunicados",
      isShowMenu: false,
    },
    {
      text: "Calendário",
      icon: <CalendarIcon fontSize="small" />,
      router: "/calendario",
      isShowMenu: false,
    },
    {
      text: "Aula",
      icon: <ClassIcon fontSize="small" />,
      router: "/aula",
      isShowMenu: false,
    },
    {
      text: "Horário",
      icon: <ScheduleIcon fontSize="small" />,
      router: "/horario",
      isShowMenu: false,
    },
    {
      text: "Disciplina",
      icon: <MenuBookIcon fontSize="small" />,
      router: "/disciplina",
      isShowMenu: false,
    },
    {
      text: "Grupo Disciplina",
      icon: <CategoryIcon fontSize="small" />,
      router: "/grupo-disciplina",
      isShowMenu: false,
    },
    {
      text: "Série",
      icon: <SchoolIcon fontSize="small" />,
      router: "/serie",
      isShowMenu: false,
    },
    {
      text: "Turma",
      icon: <GroupIcon fontSize="small" />,
      router: "/turma",
      isShowMenu: false,
    },
  ],
  ADMIN: [
    {
      text: "Home",
      icon: <DashboardIcon fontSize="small" />,
      router: "/admin",
      isShowMenu: true,
    },
    {
      text: "Usuários",
      icon: <GroupIcon fontSize="small" />,
      router: "/usuarios",
      isShowMenu: true,
    },
    {
      text: "Relatórios",
      icon: <AssessmentIcon fontSize="small" />,
      router: "/relatorios",
      isShowMenu: true,
    },
    {
      text: "Comunicados",
      icon: <AnnouncementIcon fontSize="small" />,
      router: "/comunicados",
      isShowMenu: true,
    },
    {
      text: "Configurações",
      icon: <SettingsIcon fontSize="small" />,
      router: "/configuracoes",
      isShowMenu: true,
    },
    {
      text: "Perfil",
      icon: <PersonIcon fontSize="small" />,
      router: "/perfil",
      isShowMenu: false,
    },
    {
      text: "Aulas",
      icon: <ClassIcon fontSize="small" />,
      router: "/aulas",
      isShowMenu: false,
    },
    {
      text: "Minhas aulas",
      icon: <ClassIcon fontSize="small" />,
      router: "/minhas-aulas",
      isShowMenu: false,
    },
    {
      text: "Aula",
      icon: <ClassIcon fontSize="small" />,
      router: "/aula",
      isShowMenu: false,
    },
    {
      text: "Lista de Aulas",
      icon: <ClassIcon fontSize="small" />,
      router: "/aula/lista",
      isShowMenu: false,
    },
  ],
};

// Função auxiliar para obter todas as rotas permitidas por role
export function getAllowedRoutes(role: UserRole): string[] {
  return ROUTES_BY_ROLE[role]?.map((route) => route.router) || [];
}

// Função auxiliar para obter apenas as rotas que aparecem no menu
export function getMenuRoutes(role: UserRole): RouteConfig[] {
  return ROUTES_BY_ROLE[role]?.filter((route) => route.isShowMenu) || [];
}
