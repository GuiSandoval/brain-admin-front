"use client";
import {
  getMenuCategories,
  getRoutesByCategory,
  getRoutesWithoutCategory,
  type RouteConfig,
  type MenuCategory,
} from "@/constants/routesConfig";
import { RoutesCategoryEnum } from "@/enums";
import { useAuth } from "@/hooks/useAuth";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useRouter, usePathname } from "next/navigation";

import {
  AppBar,
  Avatar,
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

export default function DrawnerMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [expandedCategories, setExpandedCategories] = React.useState<
    Partial<Record<RoutesCategoryEnum, boolean>>
  >({});

  // Obtém as categorias, rotas categorizadas e não categorizadas baseadas no role do usuário
  const categories = user ? getMenuCategories(user.role) : [];
  const uncategorizedRoutes = user ? getRoutesWithoutCategory(user.role) : [];

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

  const handleToggleCategory = (categoryId: RoutesCategoryEnum) => {
    // Se o drawer estiver fechado, abre primeiro
    if (!drawerOpen) {
      setDrawerOpen(true);
      // Expande a categoria após abrir o drawer
      setExpandedCategories((prev) => ({
        ...prev,
        [categoryId]: true,
      }));
    } else {
      // Se já estiver aberto, apenas alterna o estado da categoria
      setExpandedCategories((prev) => ({
        ...prev,
        [categoryId]: !prev[categoryId],
      }));
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

  const renderCategoryMenu = (category: MenuCategory) => {
    const categoryRoutes = getRoutesByCategory(user.role, category.id);
    const isExpanded = expandedCategories[category.id] || false;
    const hasActiveRoute = categoryRoutes.some((route) => pathname === route.router);

    return (
      <React.Fragment key={category.id}>
        <ListItem disablePadding>
          <Tooltip title={!drawerOpen ? category.text : ""} placement="right">
            <ListItemButton
              onClick={() => handleToggleCategory(category.id)}
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
                {category.icon}
              </ListItemIcon>
              {drawerOpen && (
                <>
                  <ListItemText
                    primary={category.text}
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
              {categoryRoutes.map((route) => renderMenuItem(route, true))}
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

  const renderCategoryMenuMobile = (category: MenuCategory) => {
    const categoryRoutes = getRoutesByCategory(user.role, category.id);
    const isExpanded = expandedCategories[category.id] || false;
    const hasActiveRoute = categoryRoutes.some((route) => pathname === route.router);

    return (
      <React.Fragment key={category.id}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleToggleCategory(category.id)}
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
              {category.icon}
            </ListItemIcon>
            <ListItemText
              primary={category.text}
              primaryTypographyProps={{
                fontWeight: hasActiveRoute ? 700 : 400,
              }}
            />
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categoryRoutes.map((route) => renderMenuItemMobile(route, true))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  return (
    <>
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
          {uncategorizedRoutes.map((page) => renderMenuItem(page, false))}
          {categories.map((category) => renderCategoryMenu(category))}
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
          {uncategorizedRoutes.map((page) => renderMenuItemMobile(page, false))}
          {categories.map((category) => renderCategoryMenuMobile(category))}
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

            <Box sx={{ flexGrow: 0 }}>
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

      <Box
        sx={{
          marginLeft: { xs: 0, md: drawerOpen ? `${DRAWER_WIDTH}px` : `${DRAWER_WIDTH_CLOSED}px` },
          transition: (theme) =>
            theme.transitions.create(["margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Toolbar />
      </Box>
    </>
  );
}
