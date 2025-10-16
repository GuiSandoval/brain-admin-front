"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import LayoutColumns from "@/components/layoutColumns/layoutColumns";
import PageTitle from "@/components/pageTitle/pageTitle";
import { Container } from "@mui/material";

export default function ProfessorPage() {
  return (
    <ProtectedRoute allowedRoles={["PROFESSOR"]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageTitle title={"Listagem de professores"} />

        <LayoutColumns sizeLeft="70%" sizeRight="30%">
          <div> lista de professores</div>
          <div> Menu com açoes</div>
        </LayoutColumns>
      </Container>
    </ProtectedRoute>
  );
}
