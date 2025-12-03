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
import FolderIcon from "@mui/icons-material/Folder";
import * as React from "react";
import { UserRoleEnum, RoutesEnum, RouteLabelsEnum, RoutesCategoryEnum } from "@/enums";

export interface RouteConfig {
  text: RouteLabelsEnum;
  icon: React.JSX.Element;
  router: RoutesEnum;
  isShowMenu: boolean;
  roles: UserRoleEnum[];
  categoryMenu?: RoutesCategoryEnum | null;
}

export interface MenuCategory {
  id: RoutesCategoryEnum;
  text: string;
  icon: React.JSX.Element;
  roles: UserRoleEnum[];
}

const CATEGORY_CONFIG: Record<RoutesCategoryEnum, { text: string; icon: React.JSX.Element }> = {
  [RoutesCategoryEnum.CADASTROS]: {
    text: "Cadastros",
    icon: <FolderIcon fontSize="small" />,
  },
};

export const ROUTES: RouteConfig[] = [
  {
    text: RouteLabelsEnum.HOME_DASHBOARD,
    icon: <DashboardIcon fontSize="small" />,
    router: RoutesEnum.HOME,
    isShowMenu: true,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.HOME_ESTUDANTE,
    icon: <DashboardIcon fontSize="small" />,
    router: RoutesEnum.HOME_ESTUDANTE,
    isShowMenu: true,
    roles: [UserRoleEnum.ESTUDANTE],
  },
  {
    text: RouteLabelsEnum.HOME_ADMIN,
    icon: <DashboardIcon fontSize="small" />,
    router: RoutesEnum.HOME_ADMIN,
    isShowMenu: true,
    roles: [UserRoleEnum.ADMIN],
  },
  {
    text: RouteLabelsEnum.PROFESSORES,
    icon: <PersonIcon fontSize="small" />,
    router: RoutesEnum.PROFESSOR_LISTA,
    isShowMenu: true,
    roles: [UserRoleEnum.PROFESSOR],
    categoryMenu: RoutesCategoryEnum.CADASTROS,
  },
  {
    text: RouteLabelsEnum.PROFESSOR,
    icon: <PersonIcon fontSize="small" />,
    router: RoutesEnum.PROFESSOR,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.TURMAS,
    icon: <GroupIcon fontSize="small" />,
    router: RoutesEnum.TURMA_LISTA,
    isShowMenu: true,
    roles: [UserRoleEnum.PROFESSOR],
    categoryMenu: RoutesCategoryEnum.CADASTROS,
  },
  {
    text: RouteLabelsEnum.TURMA,
    icon: <GroupIcon fontSize="small" />,
    router: RoutesEnum.TURMA,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.GRUPOS_DISCIPLINA,
    icon: <CategoryIcon fontSize="small" />,
    router: RoutesEnum.GRUPO_DISCIPLINA_LISTA,
    isShowMenu: true,
    roles: [UserRoleEnum.PROFESSOR],
    categoryMenu: RoutesCategoryEnum.CADASTROS,
  },
  {
    text: RouteLabelsEnum.GRUPO_DISCIPLINA,
    icon: <CategoryIcon fontSize="small" />,
    router: RoutesEnum.GRUPO_DISCIPLINA,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.DISCIPLINAS,
    icon: <MenuBookIcon fontSize="small" />,
    router: RoutesEnum.DISCIPLINA_LISTA,
    isShowMenu: true,
    roles: [UserRoleEnum.PROFESSOR],
    categoryMenu: RoutesCategoryEnum.CADASTROS,
  },
  {
    text: RouteLabelsEnum.DISCIPLINA,
    icon: <MenuBookIcon fontSize="small" />,
    router: RoutesEnum.DISCIPLINA,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.SERIES,
    icon: <SchoolIcon fontSize="small" />,
    router: RoutesEnum.SERIE_LISTA,
    isShowMenu: true,
    roles: [UserRoleEnum.PROFESSOR],
    categoryMenu: RoutesCategoryEnum.CADASTROS,
  },
  {
    text: RouteLabelsEnum.SERIE,
    icon: <SchoolIcon fontSize="small" />,
    router: RoutesEnum.SERIE,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.AULAS,
    icon: <ClassIcon fontSize="small" />,
    router: RoutesEnum.AULA_LISTA,
    isShowMenu: true,
    categoryMenu: RoutesCategoryEnum.CADASTROS,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.AULA,
    icon: <ClassIcon fontSize="small" />,
    router: RoutesEnum.AULA,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR, UserRoleEnum.ADMIN],
  },
  {
    text: RouteLabelsEnum.HORARIOS,
    icon: <ScheduleIcon fontSize="small" />,
    router: RoutesEnum.HORARIO_LISTA,
    isShowMenu: true,
    roles: [UserRoleEnum.PROFESSOR],
    categoryMenu: RoutesCategoryEnum.CADASTROS,
  },
  {
    text: RouteLabelsEnum.HORARIO,
    icon: <ScheduleIcon fontSize="small" />,
    router: RoutesEnum.HORARIO,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.MINHAS_AULAS,
    icon: <MenuBookIcon fontSize="small" />,
    router: RoutesEnum.MINHAS_AULAS,
    isShowMenu: true,
    roles: [UserRoleEnum.ESTUDANTE],
  },
  {
    text: RouteLabelsEnum.MINHAS_AULAS,
    icon: <ClassIcon fontSize="small" />,
    router: RoutesEnum.MINHAS_AULAS,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR, UserRoleEnum.ADMIN],
  },
  {
    text: RouteLabelsEnum.CALENDARIO,
    icon: <CalendarIcon fontSize="small" />,
    router: RoutesEnum.CALENDARIO,
    isShowMenu: true,
    roles: [UserRoleEnum.ESTUDANTE],
  },
  {
    text: RouteLabelsEnum.CALENDARIO,
    icon: <CalendarIcon fontSize="small" />,
    router: RoutesEnum.CALENDARIO,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.BOLETIM,
    icon: <GradeIcon fontSize="small" />,
    router: RoutesEnum.BOLETIM,
    isShowMenu: true,
    roles: [UserRoleEnum.ESTUDANTE],
  },
  {
    text: RouteLabelsEnum.AVALIACOES,
    icon: <AssessmentIcon fontSize="small" />,
    router: RoutesEnum.AVALIACOES,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.COMUNICADOS,
    icon: <AnnouncementIcon fontSize="small" />,
    router: RoutesEnum.COMUNICADOS,
    isShowMenu: true,
    roles: [UserRoleEnum.ADMIN],
  },
  {
    text: RouteLabelsEnum.COMUNICADOS,
    icon: <AnnouncementIcon fontSize="small" />,
    router: RoutesEnum.COMUNICADOS,
    isShowMenu: false,
    roles: [UserRoleEnum.PROFESSOR],
  },
  {
    text: RouteLabelsEnum.PERFIL,
    icon: <PersonIcon fontSize="small" />,
    router: RoutesEnum.PERFIL,
    isShowMenu: false,
    roles: [UserRoleEnum.ESTUDANTE, UserRoleEnum.PROFESSOR, UserRoleEnum.ADMIN],
  },
  {
    text: RouteLabelsEnum.USUARIOS,
    icon: <GroupIcon fontSize="small" />,
    router: RoutesEnum.USUARIOS,
    isShowMenu: true,
    roles: [UserRoleEnum.ADMIN],
  },
  {
    text: RouteLabelsEnum.RELATORIOS,
    icon: <AssessmentIcon fontSize="small" />,
    router: RoutesEnum.RELATORIOS,
    isShowMenu: true,
    roles: [UserRoleEnum.ADMIN],
  },
  {
    text: RouteLabelsEnum.CONFIGURACOES,
    icon: <SettingsIcon fontSize="small" />,
    router: RoutesEnum.CONFIGURACOES,
    isShowMenu: true,
    roles: [UserRoleEnum.ADMIN],
  },
  {
    text: RouteLabelsEnum.AULAS,
    icon: <ClassIcon fontSize="small" />,
    router: RoutesEnum.AULAS,
    isShowMenu: false,
    roles: [UserRoleEnum.ADMIN],
  },
];

export function getAllowedRoutes(role: UserRoleEnum): string[] {
  return ROUTES.filter((route) => route.roles.includes(role)).map((route) => route.router);
}

export function getMenuRoutes(role: UserRoleEnum): RouteConfig[] {
  return ROUTES.filter((route) => route.roles.includes(role) && route.isShowMenu);
}

/**
 * Gera dinamicamente as categorias baseadas nas rotas disponíveis para o role
 */
export function getMenuCategories(role: UserRoleEnum): MenuCategory[] {
  // Obtém todas as categorias únicas das rotas visíveis para o role
  const categoriesSet = new Set<RoutesCategoryEnum>();

  ROUTES.forEach((route) => {
    if (
      route.roles.includes(role) &&
      route.isShowMenu &&
      route.categoryMenu !== null &&
      route.categoryMenu !== undefined
    ) {
      categoriesSet.add(route.categoryMenu);
    }
  });

  // Mapeia as categorias para o formato MenuCategory
  return Array.from(categoriesSet).map((categoryId) => ({
    id: categoryId,
    text: CATEGORY_CONFIG[categoryId].text,
    icon: CATEGORY_CONFIG[categoryId].icon,
    roles: getUniqueRolesForCategory(categoryId),
  }));
}

/**
 * Obtém os roles únicos que têm acesso a uma categoria específica
 */
function getUniqueRolesForCategory(categoryId: RoutesCategoryEnum): UserRoleEnum[] {
  const rolesSet = new Set<UserRoleEnum>();

  ROUTES.forEach((route) => {
    if (route.categoryMenu === categoryId && route.isShowMenu) {
      route.roles.forEach((role) => rolesSet.add(role));
    }
  });

  return Array.from(rolesSet);
}

/**
 * Obtém as rotas de uma categoria específica para um role
 */
export function getRoutesByCategory(
  role: UserRoleEnum,
  categoryId: RoutesCategoryEnum,
): RouteConfig[] {
  return ROUTES.filter(
    (route) => route.roles.includes(role) && route.isShowMenu && route.categoryMenu === categoryId,
  );
}

/**
 * Obtém as rotas que não pertencem a nenhuma categoria
 */
export function getRoutesWithoutCategory(role: UserRoleEnum): RouteConfig[] {
  return ROUTES.filter(
    (route) =>
      route.roles.includes(role) &&
      route.isShowMenu &&
      (route.categoryMenu === null || route.categoryMenu === undefined),
  );
}
