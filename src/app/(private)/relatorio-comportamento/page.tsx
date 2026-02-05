"use client";
import { BrainDatePickerControlled } from "@/components/brainForms/brainDatePickerControlled";
import { BrainDropdownControlled } from "@/components/brainForms/brainDropdownControlled";
import BrainFormProvider from "@/components/brainForms/brainFormProvider/brainFormProvider";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import { UserRoleEnum } from "@/enums";
import { useBrainForm } from "@/hooks/useBrainForm";
import { KeyValue } from "@/services/models/keyValue";
import { ArrowDownward, ArrowUpward, Download, Print } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import * as S from "./styles";

// Mock data para os dropdowns
const ESCOLAS_MOCK: KeyValue[] = [
  { key: "1", value: "Unidade Centro" },
  { key: "2", value: "Unidade Norte" },
  { key: "3", value: "Unidade Sul" },
  { key: "4", value: "Unidade Leste" },
];

const SERIES_MOCK: KeyValue[] = [
  { key: "1", value: "1º Ano" },
  { key: "2", value: "2º Ano" },
  { key: "3", value: "3º Ano" },
  { key: "4", value: "4º Ano" },
  { key: "5", value: "5º Ano" },
  { key: "6", value: "6º Ano" },
  { key: "7", value: "7º Ano" },
  { key: "8", value: "8º Ano" },
  { key: "9", value: "9º Ano" },
];

const TURMAS_MOCK: KeyValue[] = [
  { key: "1", value: "Turma A" },
  { key: "2", value: "Turma B" },
  { key: "3", value: "Turma C" },
  { key: "4", value: "Turma D" },
];

const DISCIPLINAS_MOCK: KeyValue[] = [
  { key: "1", value: "Matemática" },
  { key: "2", value: "Português" },
  { key: "3", value: "História" },
  { key: "4", value: "Geografia" },
  { key: "5", value: "Ciências" },
  { key: "6", value: "Inglês" },
  { key: "7", value: "Educação Física" },
  { key: "8", value: "Artes" },
];

const TIPOS_RELATORIO_MOCK: KeyValue[] = [
  { key: "comportamento", value: "Comportamento" },
  { key: "rendimento", value: "Rendimento" },
  { key: "frequencia", value: "Frequência" },
  { key: "geral", value: "Geral" },
];

const PERIODOS_MOCK: KeyValue[] = [
  { key: "1", value: "1º Bimestre" },
  { key: "2", value: "2º Bimestre" },
  { key: "3", value: "3º Bimestre" },
  { key: "4", value: "4º Bimestre" },
  { key: "anual", value: "Anual" },
];

const ALUNOS_MOCK: KeyValue[] = [
  { key: "1", value: "Ana Costa" },
  { key: "2", value: "Beatriz Lima" },
  { key: "3", value: "Carlos Souza" },
  { key: "4", value: "João Silva" },
  { key: "5", value: "Juliana Martins" },
  { key: "6", value: "Maria Santos" },
  { key: "7", value: "Pedro Oliveira" },
  { key: "8", value: "Rafael Alves" },
];

// Schema de validação
const relatorioSchema = z.object({
  anoLetivo: z.date().nullable().optional(),
  escola: z.string().optional(),
  serie: z.string().optional(),
  turma: z.string().optional(),
  disciplina: z.string().optional(),
  tipoRelatorio: z.string().optional(),
  periodo: z.string().optional(),
  aluno: z.string().optional(),
});

type RelatorioFormData = z.infer<typeof relatorioSchema>;

type ResultadoItem = {
  id: number;
  alunoId: string;
  aluno: string;
  turma: string;
  disciplina: string;
  data: string;
  comportamento: string;
  observacao: string;
  faltas?: number;
  registros?: number;
};

type SortField = keyof ResultadoItem | null;
type SortDirection = "asc" | "desc";

const defaultValues: RelatorioFormData = {
  anoLetivo: new Date(2026, 0, 1), // Ano atual
  escola: "",
  serie: "",
  turma: "",
  disciplina: "",
  tipoRelatorio: "",
  periodo: "",
  aluno: "",
};

export default function RelatorioComportamentoPage() {
  const router = useRouter();
  const { control, getValues, reset, methodsHookForm, onFormSubmit } =
    useBrainForm<RelatorioFormData>({
      schema: relatorioSchema,
      defaultValues,
    });

  // Estados para controlar carregamento
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [loadingBuscar, setLoadingBuscar] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resultados, setResultados] = useState<ResultadoItem[]>([]);
  const [todosResultados, setTodosResultados] = useState<ResultadoItem[]>([]);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchAluno, setSearchAluno] = useState("");
  const observerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 10;

  // Função para ordenar resultados
  const handleSort = (field: keyof ResultadoItem) => {
    const newDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);

    const sorted = [...todosResultados].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      if (!aValue && !bValue) return 0;
      if (!aValue) return newDirection === "asc" ? -1 : 1;
      if (!bValue) return newDirection === "asc" ? 1 : -1;
      if (aValue < bValue) return newDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return newDirection === "asc" ? 1 : -1;
      return 0;
    });

    setTodosResultados(sorted);
    setResultados(sorted.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(sorted.length > ITEMS_PER_PAGE);
  };

  // Função para carregar mais itens
  const loadMoreItems = useCallback(() => {
    if (!hasMore || loadingBuscar) return;

    const nextPage = page + 1;
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newItems = todosResultados.slice(startIndex, endIndex);

    if (newItems.length > 0) {
      setResultados((prev) => [...prev, ...newItems]);
      setPage(nextPage);
      setHasMore(endIndex < todosResultados.length);
    } else {
      setHasMore(false);
    }
  }, [page, todosResultados, hasMore, loadingBuscar]);

  // Observer para scroll infinito
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreItems, hasMore]);

  // Função para validar filtros
  const validateFilters = () => {
    const values = getValues();
    const { anoLetivo, escola, serie, turma, tipoRelatorio } = values;

    if (!anoLetivo) {
      setError("Selecione o ano letivo");
      return false;
    }

    if (!escola) {
      setError("Selecione a escola");
      return false;
    }

    if (!serie) {
      setError("Selecione a série");
      return false;
    }

    if (!turma) {
      setError("Selecione a turma");
      return false;
    }

    if (!tipoRelatorio) {
      setError("Selecione o tipo de relatório");
      return false;
    }

    setError("");
    return true;
  };

  // Função para gerar relatório em PDF (abre página de impressão)
  const handleGerarPDF = () => {
    if (!validateFilters()) return;

    setLoadingPDF(true);

    // Simula chamada à API
    setTimeout(() => {
      setLoadingPDF(false);
      setSuccess("Abrindo visualização para impressão...");

      // Aqui você pode abrir uma nova página com o conteúdo formatado para impressão
      // const values = getValues();
      // window.open('/relatorio-comportamento/preview', '_blank');
      // ou usar window.print() após carregar o conteúdo

      // Por enquanto, apenas mostramos uma mensagem
      setTimeout(() => setSuccess(""), 3000);
    }, 1500);
  };

  // Função para gerar relatório em Excel (download via API)
  const handleGerarExcel = async () => {
    if (!validateFilters()) return;

    setLoadingExcel(true);

    // Simula chamada à API do backend
    setTimeout(() => {
      setLoadingExcel(false);
      setSuccess("Relatório Excel gerado com sucesso! Download iniciado.");

      // Aqui você faria a chamada real à API:
      // const values = getValues();
      // const response = await fetch('/api/relatorios/comportamento/excel', {
      //   method: 'POST',
      //   body: JSON.stringify(values),
      // });
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'relatorio-comportamento.xlsx';
      // a.click();

      setTimeout(() => setSuccess(""), 3000);
    }, 1500);
  };

  // Função para buscar relatórios
  const handleBuscar = async () => {
    if (!validateFilters()) return;

    setLoadingBuscar(true);
    setError("");

    // Simula chamada à API
    setTimeout(() => {
      setLoadingBuscar(false);

      // Mock de dados retornados pela API (expandido para simular paginação)
      const mockResultados: ResultadoItem[] = Array.from({ length: 35 }, (_, index) => ({
        id: index + 1,
        alunoId: `${(index % 8) + 1}`,
        aluno: [
          "João Silva",
          "Maria Santos",
          "Pedro Oliveira",
          "Ana Costa",
          "Carlos Souza",
          "Beatriz Lima",
          "Rafael Alves",
          "Juliana Martins",
        ][index % 8],
        turma: ["Turma A - 1º Ano", "Turma B - 2º Ano", "Turma C - 3º Ano"][index % 3],
        disciplina: [
          "Matemática",
          "Português",
          "História",
          "Geografia",
          "Ciências",
          "Inglês",
          "Ed. Física",
        ][index % 7],
        data: `${10 + (index % 20)}/01/2026`,
        comportamento: ["Excelente", "Bom", "Regular", "Precisa Melhorar"][index % 4],
        observacao: [
          "Participativo e atencioso",
          "Precisa melhorar a concentração",
          "Conversa muito durante a aula",
          "Ótimo desempenho nas atividades",
          "Demonstra interesse pela matéria",
        ][index % 5],
        faltas: Math.floor(Math.random() * 10),
        registros: Math.floor(Math.random() * 20) + 1,
      }));

      setTodosResultados(mockResultados);
      setResultados(mockResultados.slice(0, ITEMS_PER_PAGE));
      setPage(1);
      setHasMore(mockResultados.length > ITEMS_PER_PAGE);
      setSortField(null);
      setSortDirection("asc");
      setSuccess("Busca realizada com sucesso!");
      setTimeout(() => setSuccess(""), 3000);
    }, 1500);
  };

  // Função para filtrar resultados por busca de aluno
  const resultadosFiltrados = searchAluno
    ? resultados.filter((item) => item.aluno.toLowerCase().includes(searchAluno.toLowerCase()))
    : resultados;

  // Função para redirecionar para página do aluno
  const handleAlunoClick = (alunoId: string) => {
    router.push(`/aluno/${alunoId}`);
  };

  // Função para limpar filtros
  const handleLimparFiltros = () => {
    reset();
    setError("");
    setSuccess("");
    setResultados([]);
    setTodosResultados([]);
    setSortField(null);
    setSortDirection("asc");
    setPage(1);
    setHasMore(true);
    setSearchAluno("");
  };

  return (
    <ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.PROFESSOR]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <PageTitle
            title="Relatório"
            description="Gere relatórios detalhados com base em diversos filtros personalizáveis."
          />
        </Box>

        {/* Botões de Ação - Geração de Relatórios */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={loadingPDF ? <CircularProgress size={20} color="inherit" /> : <Print />}
            onClick={handleGerarPDF}
            disabled={loadingPDF || resultados.length === 0}
          >
            {loadingPDF ? "Gerando..." : "Exportar PDF"}
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={loadingExcel ? <CircularProgress size={20} color="inherit" /> : <Download />}
            onClick={handleGerarExcel}
            disabled={loadingExcel || resultados.length === 0}
          >
            {loadingExcel ? "Gerando..." : "Exportar Excel"}
          </Button>
        </Box>

        {/* Box de Filtros */}
        <Paper sx={{ p: 3, mb: 3, boxShadow: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            Filtros
          </Typography>

          <BrainFormProvider onSubmit={onFormSubmit} methodsHookForm={methodsHookForm}>
            <S.Container>
              <Box>
                <BrainDatePickerControlled
                  name="anoLetivo"
                  control={control}
                  label="Ano Letivo *"
                  format="yyyy"
                  views={["year"]}
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="escola"
                  control={control}
                  label="Escola"
                  required
                  options={ESCOLAS_MOCK}
                  placeholder="Selecione a escola"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="serie"
                  control={control}
                  label="Série"
                  required
                  options={SERIES_MOCK}
                  placeholder="Selecione a série"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="turma"
                  control={control}
                  label="Turma"
                  required
                  options={TURMAS_MOCK}
                  placeholder="Selecione a turma"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="disciplina"
                  control={control}
                  label="Disciplina"
                  required
                  options={DISCIPLINAS_MOCK}
                  placeholder="Selecione a disciplina"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="tipoRelatorio"
                  control={control}
                  label="Tipo de Relatório"
                  required
                  options={TIPOS_RELATORIO_MOCK}
                  placeholder="Selecione o tipo de relatório"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="periodo"
                  control={control}
                  label="Período (Opcional)"
                  options={PERIODOS_MOCK}
                  placeholder="Selecione o período"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="aluno"
                  control={control}
                  label="Aluno (Opcional)"
                  options={ALUNOS_MOCK}
                  placeholder="Selecione o aluno"
                />
              </Box>
            </S.Container>
            {/* Botões de Filtro */}
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" onClick={handleLimparFiltros}>
                Limpar Filtros
              </Button>
              <Button
                variant="contained"
                onClick={handleBuscar}
                disabled={loadingBuscar}
                startIcon={loadingBuscar ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loadingBuscar ? "Buscando..." : "Buscar"}
              </Button>
            </Box>
          </BrainFormProvider>
        </Paper>

        {/* Mensagens de Feedback */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}

        {/* Grid de Resultados */}
        {resultados.length > 0 && (
          <Paper sx={{ boxShadow: 2 }}>
            <TableContainer sx={{ overflowX: "initial" }}>
              <Table>
                <TableHead sx={{ position: "sticky", top: 65, zIndex: 1000 }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        position: "sticky",
                        top: 0,
                        backgroundColor: "gray",
                        color: "white",
                        zIndex: 100,
                        borderBottom: "2px solid",
                        borderBottomColor: "divider",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            cursor: "pointer",
                          }}
                          onClick={() => handleSort("aluno")}
                        >
                          Aluno
                          {sortField === "aluno" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpward fontSize="small" />
                            ) : (
                              <ArrowDownward fontSize="small" />
                            ))}
                        </Box>
                      </Box>
                      {/* <TextField
                        size="small"
                        placeholder="Buscar aluno..."
                        value={searchAluno}
                        onChange={(e) => setSearchAluno(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          mt: 1,
                          "& .MuiInputBase-root": {
                            backgroundColor: "white",
                            borderRadius: 1,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      /> */}
                    </TableCell>
                    {[
                      { field: "turma" as keyof ResultadoItem, label: "Turma" },
                      { field: "disciplina" as keyof ResultadoItem, label: "Disciplina" },
                      { field: "data" as keyof ResultadoItem, label: "Data" },
                      { field: "comportamento" as keyof ResultadoItem, label: "Comportamento" },
                      ...(getValues("tipoRelatorio") === "comportamento"
                        ? [
                            { field: "faltas" as keyof ResultadoItem, label: "Faltas" },
                            { field: "registros" as keyof ResultadoItem, label: "Registros" },
                          ]
                        : []),
                      { field: "observacao" as keyof ResultadoItem, label: "Observação" },
                    ].map(({ field, label }) => (
                      <TableCell
                        key={field}
                        onClick={() => handleSort(field)}
                        sx={{
                          cursor: "pointer",
                          fontWeight: 600,
                          userSelect: "none",
                          position: "sticky",
                          top: 0,
                          backgroundColor: "gray",
                          color: "white",
                          zIndex: 100,
                          borderBottom: "2px solid",
                          borderBottomColor: "divider",
                          "&:hover": {
                            color: "ActiveBorder",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          {label}
                          {sortField === field &&
                            (sortDirection === "asc" ? (
                              <ArrowUpward fontSize="small" />
                            ) : (
                              <ArrowDownward fontSize="small" />
                            ))}
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultadosFiltrados.map((item) => (
                    <TableRow
                      key={item.id}
                      hover
                      onClick={() => handleAlunoClick(item.alunoId)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{item.aluno}</TableCell>
                      <TableCell>{item.turma}</TableCell>
                      <TableCell>{item.disciplina}</TableCell>
                      <TableCell>{item.data}</TableCell>
                      <TableCell>{item.comportamento}</TableCell>
                      {getValues("tipoRelatorio") === "comportamento" && (
                        <>
                          <TableCell>{item.faltas}</TableCell>
                          <TableCell>{item.registros}</TableCell>
                        </>
                      )}
                      <TableCell>{item.observacao}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Observer para scroll infinito - fora do container com scroll horizontal */}
            <Box
              ref={observerRef}
              sx={{
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              {hasMore && <CircularProgress size={24} />}
            </Box>
          </Paper>
        )}
      </Container>
    </ProtectedRoute>
  );
}
