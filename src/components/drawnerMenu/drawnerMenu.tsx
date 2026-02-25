"use client";
import {
  getMenuModules,
  getRoutesByModule,
  getRoutesWithoutModule,
  type RouteConfig,
  type MenuModule,
} from "@/constants/routesConfig";
import { RoutesModuleEnum, RoutesEnum } from "@/enums";
import { useAuth } from "@/hooks/useAuth";
import { useDrawer } from "@/contexts/DrawerContext";
import { useAlertas } from "@/hooks/useAlertas";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter, usePathname } from "next/navigation";
import type { AlertaResponse } from "@/services/domains/alerta";

import {
  AppBar,
  Avatar,
  Badge,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  Collapse,
} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import * as S from "./styles";

const DRAWER_WIDTH = 240;
const DRAWER_WIDTH_CLOSED = 60;

const settings = [
  {
    text: "Perfil",
    icon: <PersonIcon fontSize="small" />,
    router: "/perfil",
  },
];

type DateGroupKey = "hoje" | "ontem" | "antes";

function groupAlertasByDate(alertas: AlertaResponse[]): Record<DateGroupKey, AlertaResponse[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const groups: Record<DateGroupKey, AlertaResponse[]> = {
    hoje: [],
    ontem: [],
    antes: [],
  };

  alertas.forEach((alerta) => {
    const [year, month, day] = alerta.data;
    const alertaDate = new Date(year, month - 1, day);
    alertaDate.setHours(0, 0, 0, 0);

    if (alertaDate.getTime() === today.getTime()) {
      groups.hoje.push(alerta);
    } else if (alertaDate.getTime() === yesterday.getTime()) {
      groups.ontem.push(alerta);
    } else {
      groups.antes.push(alerta);
    }
  });

  return groups;
}

function formatGroupTimeLabel(alerta: AlertaResponse): string {
  const [year, month, day] = alerta.data;
  const alertaDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  alertaDate.setHours(0, 0, 0, 0);

  if (alertaDate.getTime() === today.getTime()) return "Hoje";
  if (alertaDate.getTime() === yesterday.getTime()) return "Ontem";
  const d = String(alertaDate.getDate()).padStart(2, "0");
  const m = String(alertaDate.getMonth() + 1).padStart(2, "0");
  return `${d}/${m}`;
}

export default function DrawnerMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { drawerOpen, setDrawerOpen } = useDrawer();
  const { alertas } = useAlertas();

  const [readNotificationIds, setReadNotificationIds] = React.useState<Set<string>>(() => new Set());
  const unreadCount = alertas?.filter((a) => !readNotificationIds.has(a.id.toString())).length ?? 0;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElNotificacoes, setAnchorElNotificacoes] = React.useState<null | HTMLElement>(null);
  const [expandedModules, setExpandedModules] = React.useState<
    Partial<Record<RoutesModuleEnum, boolean>>
  >({});

  // Obtém os módulos, rotas com módulo e sem módulo baseadas no role do usuário
  const modules = user ? getMenuModules(user.role) : [];
  const routesWithoutModule = user ? getRoutesWithoutModule(user.role) : [];

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotificacoes = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotificacoes(event.currentTarget);
  };

  const handleCloseNotificacoes = () => {
    setAnchorElNotificacoes(null);
  };

  const handleMarkAllNotificationsRead = () => {
    setReadNotificationIds((prev) => {
      const next = new Set(prev);
      alertas?.forEach((a) => next.add(a.id.toString()));
      return next;
    });
  };

  const handleNotificationClick = (id: string) => {
    setReadNotificationIds((prev) => new Set(prev).add(id));
    handleCloseNotificacoes();
    router.push(RoutesEnum.ALERTA_DETALHAMENTO);
  };

  const groupedAlertas = React.useMemo(
    () => (alertas?.length ? groupAlertasByDate(alertas) : null),
    [alertas],
  );

  const handleLogout = () => {
    signOut();
  };

  const handleNavigateToSetting = (route: string) => {
    router.push(route);
    handleCloseUserMenu();
  };

  const handleNavigateToPage = (route: string) => {
    router.push(route);
    handleDrawerClose();
    setMobileOpen(false);
  };

  const handleToggleModule = (moduleId: RoutesModuleEnum) => {
    // Se o drawer estiver fechado, abre primeiro
    if (!drawerOpen) {
      setDrawerOpen(true);
      // Expande o módulo após abrir o drawer
      setExpandedModules((prev) => ({
        ...prev,
        [moduleId]: true,
      }));
    } else {
      // Se já estiver aberto, apenas alterna o estado do módulo
      setExpandedModules((prev) => ({
        ...prev,
        [moduleId]: !prev[moduleId],
      }));
    }
  };

  const handleClickOutside = () => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  // Se não há usuário logado, não exibe o menu
  if (!user) {
    return null;
  }

  const renderMenuItem = (page: RouteConfig, isSubItem: boolean = false) => {
    const isActive = pathname === page.router;
    return (
      <ListItem key={page.text} disablePadding sx={{ pl: isSubItem ? 2 : 0 }}>
        <Tooltip title={!drawerOpen && !isSubItem ? page.text : ""} placement="right">
          <ListItemButton
            onClick={() => handleNavigateToPage(page.router)}
            sx={{
              minHeight: 48,
              justifyContent: drawerOpen ? "initial" : "center",
              px: 2.5,
              backgroundColor: "transparent",
              color: "inherit",
              borderRight: isActive ? "4px solid" : "4px solid transparent",
              borderColor: isActive ? "primary.dark" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              "& .MuiListItemIcon-root": {
                color: "inherit",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {page.icon}
            </ListItemIcon>
            {drawerOpen && (
              <ListItemText
                primary={page.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 400,
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </ListItem>
    );
  };

  const renderModuleMenu = (module: MenuModule) => {
    const moduleRoutes = getRoutesByModule(user.role, module.id);
    const isExpanded = expandedModules[module.id] || false;
    const hasActiveRoute = moduleRoutes.some((route) => pathname === route.router);

    return (
      <React.Fragment key={module.id}>
        <ListItem disablePadding>
          <Tooltip title={!drawerOpen ? module.text : ""} placement="right">
            <ListItemButton
              onClick={() => handleToggleModule(module.id)}
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? "initial" : "center",
                px: 2.5,
                borderRight: hasActiveRoute ? "4px solid" : "4px solid transparent",
                borderColor: hasActiveRoute ? "primary.main" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : "auto",
                  justifyContent: "center",
                  color: hasActiveRoute ? "primary.main" : "inherit",
                }}
              >
                {module.icon}
              </ListItemIcon>
              {drawerOpen && (
                <>
                  <ListItemText
                    primary={module.text}
                    primaryTypographyProps={{
                      fontWeight: hasActiveRoute ? 700 : 400,
                    }}
                  />
                  {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>
        {drawerOpen && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {moduleRoutes.map((route) => renderMenuItem(route, true))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const renderMenuItemMobile = (page: RouteConfig, isSubItem: boolean = false) => {
    const isActive = pathname === page.router;
    return (
      <ListItem key={page.text} disablePadding sx={{ pl: isSubItem ? 2 : 0 }}>
        <ListItemButton
          onClick={() => handleNavigateToPage(page.router)}
          sx={{
            backgroundColor: "transparent",
            color: "inherit",
            borderRight: isActive ? "4px solid" : "4px solid transparent",
            borderColor: isActive ? "primary.dark" : "transparent",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
            "& .MuiListItemIcon-root": {
              color: "inherit",
            },
          }}
        >
          <ListItemIcon>{page.icon}</ListItemIcon>
          <ListItemText
            primary={page.text}
            primaryTypographyProps={{
              fontWeight: isActive ? 700 : 400,
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderModuleMenuMobile = (module: MenuModule) => {
    const moduleRoutes = getRoutesByModule(user.role, module.id);
    const isExpanded = expandedModules[module.id] || false;
    const hasActiveRoute = moduleRoutes.some((route) => pathname === route.router);

    return (
      <React.Fragment key={module.id}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleToggleModule(module.id)}
            sx={{
              backgroundColor: "transparent",
              borderRight: hasActiveRoute ? "4px solid" : "4px solid transparent",
              borderColor: hasActiveRoute ? "primary.main" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: hasActiveRoute ? "primary.main" : "inherit",
              }}
            >
              {module.icon}
            </ListItemIcon>
            <ListItemText
              primary={module.text}
              primaryTypographyProps={{
                fontWeight: hasActiveRoute ? 700 : 400,
              }}
            />
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {moduleRoutes.map((route) => renderMenuItemMobile(route, true))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  return (
    <>
      {/* Overlay para fechar o drawer quando clicar fora - Desktop */}
      {drawerOpen && (
        <Box
          onClick={handleClickOutside}
          sx={{
            display: { xs: "none", md: "block" },
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent",
            zIndex: (theme) => theme.zIndex.drawer - 1,
          }}
        />
      )}

      {/* Drawer para Desktop */}
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_CLOSED,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            width: drawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_CLOSED,
            boxSizing: "border-box",
            overflowX: "hidden",
            backgroundColor: "#f5f5f5",
            borderRight: "1px solid #e0e0e0",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: drawerOpen ? "space-between" : "center",
            padding: 2,
            minHeight: 64,
          }}
        >
          {drawerOpen && (
            <Typography variant="h6" fontWeight={700}>
              Menu
            </Typography>
          )}
          <IconButton onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}>
            {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "#e0e0e0" }} />
        <List>
          {routesWithoutModule.map((page) => renderMenuItem(page, false))}
          {modules.map((module) => renderModuleMenu(module))}
        </List>
      </Drawer>

      {/* Drawer para Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleMobileDrawerToggle}
        ModalProps={{
          keepMounted: true, // Melhor performance em mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            minHeight: 64,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Menu
          </Typography>
          <IconButton onClick={handleMobileDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "#e0e0e0" }} />
        <List>
          {routesWithoutModule.map((page) => renderMenuItemMobile(page, false))}
          {modules.map((module) => renderModuleMenuMobile(module))}
        </List>
      </Drawer>

      <AppBar
        position="fixed"
        color="default"
        sx={{
          marginLeft: { xs: 0, md: drawerOpen ? `${DRAWER_WIDTH}px` : `${DRAWER_WIDTH_CLOSED}px` },
          width: {
            xs: "100%",
            md: drawerOpen
              ? `calc(100% - ${DRAWER_WIDTH}px)`
              : `calc(100% - ${DRAWER_WIDTH_CLOSED}px)`,
          },
          borderBottom: "1px solid #e0e0e0",
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Botão de menu para mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleMobileDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <S.LinkLogo href="/">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Brain
              </Typography>
            </S.LinkLogo>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {user.email} ({user.role})
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Notificações">
                <IconButton
                  onClick={handleOpenNotificacoes}
                  sx={{ color: "inherit" }}
                  aria-controls={anchorElNotificacoes ? "menu-notificacoes" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorElNotificacoes ? "true" : undefined}
                >
                  {unreadCount > 0 ? (
                    <Badge
                      badgeContent={unreadCount}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          bgcolor: "#EF4444",
                          color: "white",
                          fontSize: "0.7rem",
                          minWidth: 18,
                          height: 18,
                        },
                      }}
                    >
                      <NotificationsIcon />
                    </Badge>
                  ) : (
                    <NotificationsIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-notificacoes"
                anchorEl={anchorElNotificacoes}
                open={Boolean(anchorElNotificacoes)}
                onClose={handleCloseNotificacoes}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1.5,
                      minWidth: 360,
                      maxWidth: 360,
                      maxHeight: 440,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                      borderRadius: 2,
                    },
                  },
                }}
                MenuListProps={{ sx: { py: 0 }, disablePadding: true }}
              >
                <Paper elevation={0} sx={{ overflow: "hidden" }}>
                  <Box
                    sx={{
                      px: 2,
                      py: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={700}>
                      Notificações
                    </Typography>
                    <Typography
                      component="button"
                      variant="caption"
                      onClick={handleMarkAllNotificationsRead}
                      sx={{
                        color: "primary.main",
                        cursor: "pointer",
                        border: "none",
                        background: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        fontWeight: 600,
                      }}
                    >
                      <CheckCircleIcon sx={{ fontSize: 16 }} />
                      MARCAR TUDO COMO LIDO
                    </Typography>
                  </Box>
                  <Box sx={{ maxHeight: 360, overflow: "auto" }}>
                    {alertas?.length ? (
                      <>
                        {(["hoje", "ontem", "antes"] as const).map((groupKey) => {
                          const items = groupedAlertas?.[groupKey] ?? [];
                          if (!items.length) return null;
                          const groupLabel =
                            groupKey === "hoje"
                              ? "Hoje"
                              : groupKey === "ontem"
                                ? "Ontem"
                                : "Anterior";
                          return (
                            <Box key={groupKey}>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ px: 2, py: 1, display: "block" }}
                              >
                                {groupLabel}
                              </Typography>
                              {items.map((alerta) => {
                                const isUnread = !readNotificationIds.has(alerta.id.toString());
                                return (
                                  <ListItemButton
                                    key={alerta.id}
                                    onClick={() => handleNotificationClick(alerta.id.toString())}
                                    sx={{
                                      py: 1.5,
                                      px: 2,
                                      bgcolor: isUnread ? "rgba(255, 152, 0, 0.08)" : "transparent",
                                      borderLeft: isUnread ? "3px solid" : "3px solid transparent",
                                      borderLeftColor: isUnread ? "#FF9800" : "transparent",
                                      "&:hover": {
                                        bgcolor: isUnread
                                          ? "rgba(255, 152, 0, 0.12)"
                                          : "action.hover",
                                      },
                                    }}
                                  >
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                      {isUnread ? (
                                        <WarningAmberIcon
                                          sx={{ color: "#FF9800", fontSize: 22 }}
                                        />
                                      ) : (
                                        <InfoIcon sx={{ color: "info.main", fontSize: 22 }} />
                                      )}
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={alerta.titulo || "{Title}"}
                                      primaryTypographyProps={{
                                        variant: "body2",
                                        fontWeight: isUnread ? 600 : 400,
                                        noWrap: true,
                                      }}
                                      secondary={formatGroupTimeLabel(alerta)}
                                      secondaryTypographyProps={{
                                        variant: "caption",
                                        color: "text.secondary",
                                      }}
                                    />
                                    {isUnread && (
                                      <Box
                                        sx={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: "50%",
                                          bgcolor: "#FF9800",
                                          flexShrink: 0,
                                          ml: 0.5,
                                        }}
                                      />
                                    )}
                                  </ListItemButton>
                                );
                              })}
                            </Box>
                          );
                        })}
                      </>
                    ) : (
                      <Box sx={{ py: 4, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          Nenhuma notificação
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Menu>
              <Tooltip title="Configurações">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.email} src="/static/images/avatar/2.jpg">
                    {user.email.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.text}
                    onClick={() => handleNavigateToSetting(setting.router)}
                  >
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <Typography>{setting.text}</Typography>
                  </MenuItem>
                ))}

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
