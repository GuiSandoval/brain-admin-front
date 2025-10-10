"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import PageTitle from "@/components/pageTitle/pageTitle";
import { Container } from "@mui/material";

export default function ProfessorPage() {
  return (
    <ProtectedRoute allowedRoles={["PROFESSOR"]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageTitle
          title={"Cadastro de Professor"}
          description="Preencha os dados abaixo para completar o cadastro no sistema"
        />
      </Container>
    </ProtectedRoute>
  );
}
