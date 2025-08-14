"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import PageTitle from "@/components/pageTitle/pageTitle";
import { useAuth } from "@/hooks/useAuth";
import { Container, Typography } from "@mui/material";

export default function ProfessorPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["PROFESSOR"]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageTitle title="Dashboard do Professor" />

        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo, Professor {user?.email}!
        </Typography>
      </Container>
    </ProtectedRoute>
  );
}
