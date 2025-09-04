import { useAula } from "@/hooks/useAula";
import {
  Box,
  Checkbox,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface IListaPresencaProps {
  idAula?: string;
}

function ListaPresenca({ idAula }: IListaPresencaProps) {
  const { alunos, loading, error } = useAula({ idAula: idAula || "" });

  if (loading && idAula) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && idAula) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: 0 }}>
      <TableContainer component={Paper} sx={{ p: 0 }}>
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
            {alunos.map((aluno) => (
              <TableRow key={aluno.id}>
                <TableCell>
                  {/* TODO: verificar essa parte */}
                  <Checkbox checked={false} />
                </TableCell>
                <TableCell>{aluno.nome}</TableCell>
                <TableCell align="center">{aluno.faltas}</TableCell>
                <TableCell align="center">{aluno.faltas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListaPresenca;
