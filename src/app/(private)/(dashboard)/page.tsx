"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se o usuário acessar "/" diretamente, redireciona para sua página específica
    if (!isLoading && user) {
      let redirectPath = "/";
      switch (user.role) {
      case "ESTUDANTE":
        redirectPath = "/aluno";
        break;
      case "PROFESSOR":
        redirectPath = "/professor";
        break;
      case "ADMIN":
        redirectPath = "/admin";
        break;
      }

      if (redirectPath !== "/") {
        router.replace(redirectPath); // usar replace em vez de push para não criar histórico
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress />
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography>Bem-vindo ao Brain! Redirecionando para sua área específica...</Typography>
      {user && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Usuário: {user.email} | Role: {user.role}
        </Typography>
      )}
    </Box>
  );
}
