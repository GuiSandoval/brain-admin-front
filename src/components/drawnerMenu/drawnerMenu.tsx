"use client";
import { RoutesConstants } from "@/constants/routesConstants";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/utils/auth";
import AdbIcon from "@mui/icons-material/Adb";
import BookIcon from "@mui/icons-material/AutoStories";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

import { AppBar, Avatar, Button, Container, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import * as S from "./styles";

const menusByRole: Record<
  UserRole,
  Array<{ text: string; icon: React.JSX.Element; router: string }>
> = {
  ESTUDANTE: [
    {
      text: "Home",
      icon: <DashboardIcon fontSize="small" />,
      router: "/aluno",
    },
    {
      text: "Minhas aulas",
      icon: <BookIcon fontSize="small" />,
      router: RoutesConstants.MINHAS_AULAS,
    },
    {
      text: "Calendário",
      icon: <CalendarIcon fontSize="small" />,
      router: RoutesConstants.CALENDARIO,
    },
    {
      text: "Boletim",
      icon: <BookIcon fontSize="small" />,
      router: RoutesConstants.BOLETIM,
    },
  ],
  PROFESSOR: [
    {
      text: "Home ",
      icon: <DashboardIcon fontSize="small" />,
      router: "/",
    },
    {
      text: "Professor",
      icon: <PersonIcon fontSize="small" />,
      router: "/lista-professor",
    },
    // {
    //   text: "Turmas",
    //   icon: <GroupIcon fontSize="small" />,
    //   router: "/minhas-aulas",
    // },
    // {
    //   text: "Avaliações e tarefas",
    //   icon: <AssessmentIcon fontSize="small" />,
    //   router: "/avaliacoes",
    // },
    // {
    //   text: "Comunicados",
    //   icon: <AnnouncementIcon fontSize="small" />,
    //   router: "/comunicados",
    // },
    // {
    //   text: "Calendário",
    //   icon: <CalendarIcon fontSize="small" />,
    //   router: RoutesConstants.CALENDARIO,
    // },
  ],
  ADMIN: [
    {
      text: "Home",
      icon: <DashboardIcon fontSize="small" />,
      router: "/admin",
    },
    {
      text: "Usuários",
      icon: <GroupIcon fontSize="small" />,
      router: "/usuarios",
    },
    {
      text: "Relatórios",
      icon: <AssessmentIcon fontSize="small" />,
      router: "/relatorios",
    },
    {
      text: "Comunicados",
      icon: <AnnouncementIcon fontSize="small" />,
      router: "/comunicados",
    },
    {
      text: "Configurações",
      icon: <SettingsIcon fontSize="small" />,
      router: "/configuracoes",
    },
  ],
};

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

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // Obtém o menu baseado no role do usuário
  const pages = user ? menusByRole[user.role] || [] : [];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
    handleCloseNavMenu();
  };

  // Se não há usuário logado, não exibe o menu
  if (!user) {
    return null;
  }

  return (
    <AppBar
      color="default"
      position="static"
      style={{
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <S.LinkLogo href="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Brain
            </Typography>
          </S.LinkLogo>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={() => handleNavigateToPage(page.router)}>
                  <Typography
                    color="black"
                    sx={{ textAlign: "center", display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {page.icon}
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Brain
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <S.ItemMenu key={page.text} href={page.router}>
                <Button sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {page.icon}
                  {page.text}
                </Button>
              </S.ItemMenu>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {user.email} ({user.role})
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
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
                  <Typography
                    sx={{ textAlign: "center", display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {setting.icon}
                    {setting.text}
                  </Typography>
                </MenuItem>
              ))}

              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: "center" }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
