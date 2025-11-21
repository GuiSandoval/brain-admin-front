"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import PageTitle from "@/components/pageTitle/pageTitle";
import { UserRole } from "@/constants/enums";
import { useAuth } from "@/hooks/useAuth";
import { Container, Typography } from "@mui/material";

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageTitle title="Dashboard do Administrador" />

        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo, Admin {user?.email}!
        </Typography>
      </Container>
    </ProtectedRoute>
  );
}
