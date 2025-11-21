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
import { UserRole, Routes, RouteLabels } from "./enums";

export interface RouteConfig {
  text: RouteLabels;
  icon: React.JSX.Element;
  router: Routes;
  isShowMenu: boolean;
  roles: UserRole[];
}

export const ROUTES: RouteConfig[] = [
  {
    text: RouteLabels.HOME_DASHBOARD,
    icon: <DashboardIcon fontSize="small" />,
    router: Routes.HOME,
    isShowMenu: true,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.HOME_ESTUDANTE,
    icon: <DashboardIcon fontSize="small" />,
    router: Routes.HOME_ESTUDANTE,
    isShowMenu: true,
    roles: [UserRole.ESTUDANTE],
  },
  {
    text: RouteLabels.HOME_ADMIN,
    icon: <DashboardIcon fontSize="small" />,
    router: Routes.HOME_ADMIN,
    isShowMenu: true,
    roles: [UserRole.ADMIN],
  },
  {
    text: RouteLabels.PROFESSORES,
    icon: <PersonIcon fontSize="small" />,
    router: Routes.PROFESSOR_LISTA,
    isShowMenu: true,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.PROFESSOR,
    icon: <PersonIcon fontSize="small" />,
    router: Routes.PROFESSOR,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.TURMAS,
    icon: <GroupIcon fontSize="small" />,
    router: Routes.TURMA_LISTA,
    isShowMenu: true,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.TURMA,
    icon: <GroupIcon fontSize="small" />,
    router: Routes.TURMA,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.GRUPOS_DISCIPLINA,
    icon: <CategoryIcon fontSize="small" />,
    router: Routes.GRUPO_DISCIPLINA_LISTA,
    isShowMenu: true,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.GRUPO_DISCIPLINA,
    icon: <CategoryIcon fontSize="small" />,
    router: Routes.GRUPO_DISCIPLINA,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.DISCIPLINAS,
    icon: <MenuBookIcon fontSize="small" />,
    router: Routes.DISCIPLINA_LISTA,
    isShowMenu: true,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.DISCIPLINA,
    icon: <MenuBookIcon fontSize="small" />,
    router: Routes.DISCIPLINA,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.SERIES,
    icon: <SchoolIcon fontSize="small" />,
    router: Routes.SERIE_LISTA,
    isShowMenu: true,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.SERIE,
    icon: <SchoolIcon fontSize="small" />,
    router: Routes.SERIE,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.AULAS,
    icon: <ClassIcon fontSize="small" />,
    router: Routes.AULA_LISTA,
    isShowMenu: true,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.AULA,
    icon: <ClassIcon fontSize="small" />,
    router: Routes.AULA,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR, UserRole.ADMIN],
  },
  {
    text: RouteLabels.HORARIOS,
    icon: <ScheduleIcon fontSize="small" />,
    router: Routes.HORARIO_LISTA,
    isShowMenu: true,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.HORARIO,
    icon: <ScheduleIcon fontSize="small" />,
    router: Routes.HORARIO,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.MINHAS_AULAS,
    icon: <MenuBookIcon fontSize="small" />,
    router: Routes.MINHAS_AULAS,
    isShowMenu: true,
    roles: [UserRole.ESTUDANTE],
  },
  {
    text: RouteLabels.MINHAS_AULAS,
    icon: <ClassIcon fontSize="small" />,
    router: Routes.MINHAS_AULAS,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR, UserRole.ADMIN],
  },
  {
    text: RouteLabels.CALENDARIO,
    icon: <CalendarIcon fontSize="small" />,
    router: Routes.CALENDARIO,
    isShowMenu: true,
    roles: [UserRole.ESTUDANTE],
  },
  {
    text: RouteLabels.CALENDARIO,
    icon: <CalendarIcon fontSize="small" />,
    router: Routes.CALENDARIO,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.BOLETIM,
    icon: <GradeIcon fontSize="small" />,
    router: Routes.BOLETIM,
    isShowMenu: true,
    roles: [UserRole.ESTUDANTE],
  },
  {
    text: RouteLabels.AVALIACOES,
    icon: <AssessmentIcon fontSize="small" />,
    router: Routes.AVALIACOES,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.COMUNICADOS,
    icon: <AnnouncementIcon fontSize="small" />,
    router: Routes.COMUNICADOS,
    isShowMenu: true,
    roles: [UserRole.ADMIN],
  },
  {
    text: RouteLabels.COMUNICADOS,
    icon: <AnnouncementIcon fontSize="small" />,
    router: Routes.COMUNICADOS,
    isShowMenu: false,
    roles: [UserRole.PROFESSOR],
  },
  {
    text: RouteLabels.PERFIL,
    icon: <PersonIcon fontSize="small" />,
    router: Routes.PERFIL,
    isShowMenu: false,
    roles: [UserRole.ESTUDANTE, UserRole.PROFESSOR, UserRole.ADMIN],
  },
  {
    text: RouteLabels.USUARIOS,
    icon: <GroupIcon fontSize="small" />,
    router: Routes.USUARIOS,
    isShowMenu: true,
    roles: [UserRole.ADMIN],
  },
  {
    text: RouteLabels.RELATORIOS,
    icon: <AssessmentIcon fontSize="small" />,
    router: Routes.RELATORIOS,
    isShowMenu: true,
    roles: [UserRole.ADMIN],
  },
  {
    text: RouteLabels.CONFIGURACOES,
    icon: <SettingsIcon fontSize="small" />,
    router: Routes.CONFIGURACOES,
    isShowMenu: true,
    roles: [UserRole.ADMIN],
  },
  {
    text: RouteLabels.AULAS,
    icon: <ClassIcon fontSize="small" />,
    router: Routes.AULAS,
    isShowMenu: false,
    roles: [UserRole.ADMIN],
  },
];

export function getAllowedRoutes(role: UserRole): string[] {
  return ROUTES.filter((route) => route.roles.includes(role)).map((route) => route.router);
}

export function getMenuRoutes(role: UserRole): RouteConfig[] {
  return ROUTES.filter((route) => route.roles.includes(role) && route.isShowMenu);
}
