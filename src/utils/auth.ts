import Cookies from "js-cookie";

export type UserRole = "ESTUDANTE" | "PROFESSOR" | "ADMIN";

export interface JWTPayload {
  iss: string;
  sub: string;
  id: number;
  role: string;
  exp: number;
}

export interface UserData {
  id: number;
  email: string;
  role: UserRole;
  exp: number;
}

/**
 * Decodifica o JWT token e extrai as informações do usuário
 */
export function decodeToken(token: string): UserData | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    const payload: JWTPayload = JSON.parse(jsonPayload);

    // Remove os colchetes do role
    const role = payload.role.replace(/[\[\]]/g, "") as UserRole;

    return {
      id: payload.id,
      email: payload.sub,
      role,
      exp: payload.exp,
    };
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

/**
 * Verifica se o token está válido (não expirado)
 */
export function isTokenValid(token: string): boolean {
  const userData = decodeToken(token);
  if (!userData) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  return userData.exp > currentTime;
}

/**
 * Obtém os dados do usuário atual a partir do cookie
 */
export function getCurrentUser(): UserData | null {
  const token = Cookies.get("token");
  if (!token) return null;

  if (!isTokenValid(token)) {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    return null;
  }

  return decodeToken(token);
}

/**
 * Verifica se o usuário tem permissão para acessar uma rota
 */
export function hasPermission(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Define as rotas permitidas para cada role
 */
export const ROLE_ROUTES: Record<UserRole, string[]> = {
  ESTUDANTE: ["/", "/aluno", "/boletim", "/calendario", "/minhas-aulas", "/perfil"],
  PROFESSOR: [
    "/",
    "/professor",
    "/minhas-aulas",
    "/calendario",
    "/perfil",
    "/aulas",
    "/minhas-aulas",
    "/comunicados",
  ],
  ADMIN: [
    "/",
    "/admin",
    "/usuarios",
    "/relatorios",
    "/configuracoes",
    "/perfil",
    "/aulas",
    "/minhas-aulas",
    "/comunicados",
  ],
};

/**
 * Verifica se o usuário pode acessar uma rota específica
 */
export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const allowedRoutes = ROLE_ROUTES[userRole];

  // Verifica se a rota exata está permitida
  if (allowedRoutes.includes(route)) return true;

  // Verifica se é uma subrota permitida
  return allowedRoutes.some(
    (allowedRoute) => route.startsWith(allowedRoute + "/") || route === allowedRoute,
  );
}

/**
 * Obtém a rota padrão baseada no role do usuário
 */
export function getDefaultRoute(userRole: UserRole): string {
  switch (userRole) {
    case "ESTUDANTE":
      return "/aluno";
    case "PROFESSOR":
      return "/professor";
    case "ADMIN":
      return "/admin";
    default:
      return "/";
  }
}

/**
 * Faz logout removendo os tokens
 */
export function logout(): void {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  window.location.href = "/login";
}
