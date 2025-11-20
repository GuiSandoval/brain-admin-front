"use client";
import { getMenuRoutes } from "@/constants/routesConfig";
import { useAuth } from "@/hooks/useAuth";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/navigation";

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
  const { user, signOut } = useAuth();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // Obtém o menu baseado no role do usuário
  const pages = user ? getMenuRoutes(user.role) : [];

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
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
  };

  // Se não há usuário logado, não exibe o menu
  if (!user) {
    return null;
  }

  return (
    <>
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
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
          {pages.map((page) => (
            <ListItem key={page.text} disablePadding>
              <Tooltip title={!drawerOpen ? page.text : ""} placement="right">
                <ListItemButton
                  onClick={() => handleNavigateToPage(page.router)}
                  sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? "initial" : "center",
                    px: 2.5,
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
                  {drawerOpen && <ListItemText primary={page.text} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <AppBar
        position="fixed"
        color="default"
        sx={{
          marginLeft: drawerOpen ? `${DRAWER_WIDTH}px` : `${DRAWER_WIDTH_CLOSED}px`,
          width: drawerOpen
            ? `calc(100% - ${DRAWER_WIDTH}px)`
            : `calc(100% - ${DRAWER_WIDTH_CLOSED}px)`,
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
          marginLeft: drawerOpen ? `${DRAWER_WIDTH}px` : `${DRAWER_WIDTH_CLOSED}px`,
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
