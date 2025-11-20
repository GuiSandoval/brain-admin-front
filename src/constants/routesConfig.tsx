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
  roles: UserRole[];
}

export const ROUTES: RouteConfig[] = [
  {
    text: "Home Dashboard",
    icon: <DashboardIcon fontSize="small" />,
    router: "/",
    isShowMenu: true,
    roles: ["PROFESSOR"],
  },
  {
    text: "Home Estudante",
    icon: <DashboardIcon fontSize="small" />,
    router: "/aluno",
    isShowMenu: true,
    roles: ["ESTUDANTE"],
  },
  {
    text: "Home Admin",
    icon: <DashboardIcon fontSize="small" />,
    router: "/admin",
    isShowMenu: true,
    roles: ["ADMIN"],
  },
  {
    text: "Professores",
    icon: <PersonIcon fontSize="small" />,
    router: "/professor/lista",
    isShowMenu: true,
    roles: ["PROFESSOR"],
  },
  {
    text: "Professor",
    icon: <PersonIcon fontSize="small" />,
    router: "/professor",
    isShowMenu: false,
    roles: ["PROFESSOR"],
  },
  {
    text: "Turmas",
    icon: <GroupIcon fontSize="small" />,
    router: "/turma/lista",
    isShowMenu: true,
    roles: ["PROFESSOR"],
  },
  {
    text: "Turma",
    icon: <GroupIcon fontSize="small" />,
    router: "/turma",
    isShowMenu: false,
    roles: ["PROFESSOR"],
  },
  {
    text: "Grupos de disciplina",
    icon: <CategoryIcon fontSize="small" />,
    router: "/grupo-disciplina/lista",
    isShowMenu: true,
    roles: ["PROFESSOR"],
  },
  {
    text: "Grupo Disciplina",
    icon: <CategoryIcon fontSize="small" />,
    router: "/grupo-disciplina",
    isShowMenu: false,
    roles: ["PROFESSOR"],
  },
  {
    text: "Disciplinas",
    icon: <MenuBookIcon fontSize="small" />,
    router: "/disciplina/lista",
    isShowMenu: true,
    roles: ["PROFESSOR"],
  },
  {
    text: "Disciplina",
    icon: <MenuBookIcon fontSize="small" />,
    router: "/disciplina",
    isShowMenu: false,
    roles: ["PROFESSOR"],
  },
  {
    text: "Séries",
    icon: <SchoolIcon fontSize="small" />,
    router: "/serie/lista",
    isShowMenu: true,
    roles: ["PROFESSOR"],
  },
  {
    text: "Série",
    icon: <SchoolIcon fontSize="small" />,
    router: "/serie",
    isShowMenu: false,
    roles: ["PROFESSOR"],
  },
  {
    text: "Aulas",
    icon: <ClassIcon fontSize="small" />,
    router: "/aula/lista",
    isShowMenu: true,
    roles: ["PROFESSOR"],
  },
  {
    text: "Aula",
    icon: <ClassIcon fontSize="small" />,
    router: "/aula",
    isShowMenu: false,
    roles: ["PROFESSOR", "ADMIN"],
  },
  {
    text: "Horários",
    icon: <ScheduleIcon fontSize="small" />,
    router: "/horario/lista",
    isShowMenu: true,
    roles: ["PROFESSOR"],
  },
  {
    text: "Horário",
    icon: <ScheduleIcon fontSize="small" />,
    router: "/horario",
    isShowMenu: false,
    roles: ["PROFESSOR"],
  },
  {
    text: "Minhas aulas",
    icon: <MenuBookIcon fontSize="small" />,
    router: "/minhas-aulas",
    isShowMenu: true,
    roles: ["ESTUDANTE"],
  },
  {
    text: "Minhas aulas",
    icon: <ClassIcon fontSize="small" />,
    router: "/minhas-aulas",
    isShowMenu: false,
    roles: ["PROFESSOR", "ADMIN"],
  },
  {
    text: "Calendário",
    icon: <CalendarIcon fontSize="small" />,
    router: "/calendario",
    isShowMenu: true,
    roles: ["ESTUDANTE"],
  },
  {
    text: "Calendário",
    icon: <CalendarIcon fontSize="small" />,
    router: "/calendario",
    isShowMenu: false,
    roles: ["PROFESSOR"],
  },
  {
    text: "Boletim",
    icon: <GradeIcon fontSize="small" />,
    router: "/boletim",
    isShowMenu: true,
    roles: ["ESTUDANTE"],
  },
  {
    text: "Avaliações",
    icon: <AssessmentIcon fontSize="small" />,
    router: "/avaliacoes",
    isShowMenu: false,
    roles: ["PROFESSOR"],
  },
  {
    text: "Comunicados",
    icon: <AnnouncementIcon fontSize="small" />,
    router: "/comunicados",
    isShowMenu: true,
    roles: ["ADMIN"],
  },
  {
    text: "Comunicados",
    icon: <AnnouncementIcon fontSize="small" />,
    router: "/comunicados",
    isShowMenu: false,
    roles: ["PROFESSOR"],
  },
  {
    text: "Perfil",
    icon: <PersonIcon fontSize="small" />,
    router: "/perfil",
    isShowMenu: false,
    roles: ["ESTUDANTE", "PROFESSOR", "ADMIN"],
  },
  {
    text: "Usuários",
    icon: <GroupIcon fontSize="small" />,
    router: "/usuarios",
    isShowMenu: true,
    roles: ["ADMIN"],
  },
  {
    text: "Relatórios",
    icon: <AssessmentIcon fontSize="small" />,
    router: "/relatorios",
    isShowMenu: true,
    roles: ["ADMIN"],
  },
  {
    text: "Configurações",
    icon: <SettingsIcon fontSize="small" />,
    router: "/configuracoes",
    isShowMenu: true,
    roles: ["ADMIN"],
  },
  {
    text: "Aulas",
    icon: <ClassIcon fontSize="small" />,
    router: "/aulas",
    isShowMenu: false,
    roles: ["ADMIN"],
  },
];

export function getAllowedRoutes(role: UserRole): string[] {
  return ROUTES.filter((route) => route.roles.includes(role)).map((route) => route.router);
}

export function getMenuRoutes(role: UserRole): RouteConfig[] {
  return ROUTES.filter((route) => route.roles.includes(role) && route.isShowMenu);
}
