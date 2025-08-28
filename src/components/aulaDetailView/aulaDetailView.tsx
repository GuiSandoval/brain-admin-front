"use client";
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  Button,
  Stack,
} from "@mui/material";

interface AlunoPresenca {
  id: string;
  nome: string;
  presente: boolean;
  registrosNoBim: number;
  faltas: number;
}

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  dataEnvio: string;
}

interface RegistroDisciplinar {
  id: string;
  aluno: string;
  tipo: string;
  descricao: string;
  data: string;
}

interface AulaDetailViewProps {
  type: "presenca" | "tarefas" | "registros";
  data: AlunoPresenca[] | Tarefa[] | RegistroDisciplinar[];
}

const AulaDetailView: React.FC<AulaDetailViewProps> = ({ type, data }) => {
  if (type === "presenca") {
    const presencaData = data as AlunoPresenca[];

    return (
      <Box>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button variant="contained" size="small">
            📋 Presença
          </Button>
          <Typography variant="h6">Nome</Typography>
        </Stack>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell>Presença</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell align="center">Registros no bim.</TableCell>
                <TableCell align="center">Faltas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {presencaData.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell>
                    <Checkbox checked={aluno.presente} />
                  </TableCell>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell align="center">{aluno.registrosNoBim}</TableCell>
                  <TableCell align="center">{aluno.faltas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  if (type === "tarefas") {
    const tarefasData = data as Tarefa[];

    return (
      <Box>
        {/* Conteúdo do dia */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Conteúdo do dia
          </Typography>
          <Paper sx={{ p: 3, bgcolor: "grey.50" }}>
            <Typography variant="body1" color="text.secondary">
              It is a long established fact that a reader will be distracted
            </Typography>
          </Paper>
        </Box>

        {/* Novas tarefas */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
          >
            <Typography variant="h6">Novas tarefas</Typography>
            <Button variant="contained" color="primary" size="small">
              + SALVAR
            </Button>
          </Box>

          <Stack spacing={3}>
            {tarefasData.map((tarefa) => (
              <Paper key={tarefa.id} sx={{ p: 3, border: "1px solid", borderColor: "grey.200" }}>
                <Typography variant="h6" gutterBottom>
                  {tarefa.titulo}
                </Typography>

                {/* Arquivo anexado */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: "primary.main",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="caption" color="white" sx={{ fontSize: "12px" }}>
                      📄
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      document_file_name.pdf
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      100kb • Complete
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {tarefa.descricao}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    📅 Prazo: {tarefa.dataEnvio}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Box>
    );
  }

  if (type === "registros") {
    const registrosData = data as RegistroDisciplinar[];

    return (
      <Box>
        {/* Registros do dia */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
          >
            <Typography variant="h6">Registros do dia</Typography>
            <Button variant="contained" color="primary" size="small">
              + SALVAR
            </Button>
          </Box>

          <Stack spacing={3}>
            {registrosData.map((registro) => (
              <Paper key={registro.id} sx={{ p: 3, border: "1px solid", borderColor: "grey.200" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {registro.aluno}
                  </Typography>
                  <Chip
                    label={registro.tipo}
                    color="secondary"
                    size="small"
                    sx={{ bgcolor: "grey.200", color: "text.primary" }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Box>
    );
  }

  return null;
};

export default AulaDetailView;
