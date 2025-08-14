"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import LayoutColumns from "@/components/layoutColumns/layoutColumns";
import PageTitle from "@/components/pageTitle/pageTitle";
import SectionMinhasAulas from "@/components/sectionMinhasAulas/sectionMinhasAulas";
import { useAuth } from "@/hooks/useAuth";
import { Container, Typography } from "@mui/material";
import * as S from "./styles";

export default function ProfessorPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["PROFESSOR"]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageTitle title="Dashboard do Professor" />

        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo, Professor {user?.email}!
        </Typography>
        <LayoutColumns sizeLeft="70%" sizeRight="30%">
          <SectionMinhasAulas />
          <S.AreaAssignments>
            <PageTitle title="Assignments" description="Recent assign and theis status" />
            {/* Here you can add components or content related to assignments */}
            {/* Example: <CardAssignment /> */}
          </S.AreaAssignments>
        </LayoutColumns>
      </Container>
    </ProtectedRoute>
  );
}
