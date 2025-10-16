"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";

// Mock data
const mockProfessores = [
  {
    matricula: "M04673918215",
    nome: "Teste da silva",
    sobrenome: "Teste",
    cpf: "046.739.182-15",
    email: "teste@test.com",
    emailProfissional: "04673918215@gmail.com",
  },
];

export default function ProfessorPage() {
  const router = useRouter();

  const handleEditProfessor = (matricula: string) => {
    console.log("Editar professor:", matricula);
  };

  const handleDeleteProfessor = (matricula: string) => {
    console.log("Excluir professor:", matricula);
  };

  const handleNewProfessor = () => {
    router.push("/professor");
  };

  return (
    <ProtectedRoute allowedRoles={["PROFESSOR"]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Professores
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gerencie os professores cadastrados no sistema
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleNewProfessor}
            sx={{ height: "fit-content" }}
          >
            Novo Professor
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
          <Table sx={{ minWidth: 650 }} aria-label="tabela de professores">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Matrícula</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>CPF</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>E-mail</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>E-mail Profissional</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockProfessores.map((professor) => (
                <TableRow
                  key={professor.matricula}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {professor.matricula}
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {professor.nome}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {professor.sobrenome}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{professor.cpf}</TableCell>
                  <TableCell>{professor.email}</TableCell>
                  <TableCell>{professor.emailProfissional}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditProfessor(professor.matricula)}
                        sx={{ color: "primary.main" }}
                        title="Editar"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteProfessor(professor.matricula)}
                        sx={{ color: "error.main" }}
                        title="Excluir"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ProtectedRoute>
  );
}
