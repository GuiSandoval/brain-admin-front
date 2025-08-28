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
        <Typography variant="h6" gutterBottom>
          Conteúdo e Tarefas
        </Typography>

        <Stack spacing={2}>
          {tarefasData.map((tarefa) => (
            <Paper key={tarefa.id} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {tarefa.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {tarefa.descricao}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  📅 Envio: {tarefa.dataEnvio}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    );
  }

  if (type === "registros") {
    const registrosData = data as RegistroDisciplinar[];

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Registros Disciplinares
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell>Aluno</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrosData.map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell>{registro.aluno}</TableCell>
                  <TableCell>
                    <Chip label={registro.tipo} color="warning" size="small" />
                  </TableCell>
                  <TableCell>{registro.descricao}</TableCell>
                  <TableCell>{registro.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return null;
};

export default AulaDetailView;
