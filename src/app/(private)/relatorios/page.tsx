"use client";
import { BrainDatePickerControlled } from "@/components/brainForms/brainDatePickerControlled";
import { BrainDropdownControlled } from "@/components/brainForms/brainDropdownControlled";
import BrainFormProvider from "@/components/brainForms/brainFormProvider/brainFormProvider";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import { UserRoleEnum } from "@/enums";
import { useBrainForm } from "@/hooks/useBrainForm";
import { useUnidades } from "@/hooks/useUnidades";
import { useSeries } from "@/hooks/useSeries";
import { useTurmas } from "@/hooks/useTurmas";
import { useDisciplinas } from "@/hooks/useDisciplinas";
import { useAlunos } from "@/hooks/useAlunos";
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
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import * as S from "./styles";

// Constantes para tipos de relatório e períodos
const TIPOS_RELATORIO: KeyValue[] = [
  { key: "comportamento", value: "Comportamento" },
  { key: "atividades_nao_realizadas", value: "Atividades nao realizadas" },
  { key: "notas", value: "Notas" },
];

const PERIODOS: KeyValue[] = [
  { key: "1", value: "1º Bimestre" },
  { key: "2", value: "2º Bimestre" },
  { key: "3", value: "3º Bimestre" },
  { key: "4", value: "4º Bimestre" },
  { key: "anual", value: "Anual" },
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { control, getValues, reset, methodsHookForm, onFormSubmit, setValue } =
    useBrainForm<RelatorioFormData>({
      schema: relatorioSchema,
      defaultValues,
    });

  // Hooks para buscar dados das APIs
  const { unidades } = useUnidades();
  const { series } = useSeries();
  const { turmas } = useTurmas();
  const { disciplinas } = useDisciplinas();
  const { alunos } = useAlunos();

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
  const [isInitialized, setIsInitialized] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 10;

  // Função para atualizar URL com os filtros aplicados
  const updateURLParams = useCallback(
    (filters: RelatorioFormData) => {
      const params = new URLSearchParams();

      if (filters.anoLetivo) {
        params.set("anoLetivo", filters.anoLetivo.getFullYear().toString());
      }
      if (filters.escola) params.set("escola", filters.escola);
      if (filters.serie) params.set("serie", filters.serie);
      if (filters.turma) params.set("turma", filters.turma);
      if (filters.disciplina) params.set("disciplina", filters.disciplina);
      if (filters.tipoRelatorio) params.set("tipoRelatorio", filters.tipoRelatorio);
      if (filters.periodo) params.set("periodo", filters.periodo);
      if (filters.aluno) params.set("aluno", filters.aluno);

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router],
  );

  // Função para carregar filtros da URL
  const loadFiltersFromURL = useCallback(() => {
    const anoLetivoParam = searchParams.get("anoLetivo");
    const escolaParam = searchParams.get("escola");
    const serieParam = searchParams.get("serie");
    const turmaParam = searchParams.get("turma");
    const disciplinaParam = searchParams.get("disciplina");
    const tipoRelatorioParam = searchParams.get("tipoRelatorio");
    const periodoParam = searchParams.get("periodo");
    const alunoParam = searchParams.get("aluno");

    const hasFilters =
      anoLetivoParam ||
      escolaParam ||
      serieParam ||
      turmaParam ||
      disciplinaParam ||
      tipoRelatorioParam ||
      periodoParam ||
      alunoParam;

    if (hasFilters) {
      if (anoLetivoParam) {
        setValue("anoLetivo", new Date(parseInt(anoLetivoParam), 0, 1));
      }
      if (escolaParam) setValue("escola", escolaParam);
      if (serieParam) setValue("serie", serieParam);
      if (turmaParam) setValue("turma", turmaParam);
      if (disciplinaParam) setValue("disciplina", disciplinaParam);
      if (tipoRelatorioParam) setValue("tipoRelatorio", tipoRelatorioParam);
      if (periodoParam) setValue("periodo", periodoParam);
      if (alunoParam) setValue("aluno", alunoParam);

      return true;
    }
    return false;
  }, [searchParams, setValue]);

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
  const handleBuscar = useCallback(async () => {
    if (!validateFilters()) return;

    // Atualizar URL com os filtros aplicados
    const filters = getValues();
    updateURLParams(filters);

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
  }, [getValues, updateURLParams]);

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

    // Limpar URL
    router.replace(pathname, { scroll: false });
  };
  // Converter dados das APIs para formato KeyValue
  const OPTIONS_UNIDADES: KeyValue[] = useMemo(
    () => unidades.map((unidade) => ({ key: unidade.id.toString(), value: unidade.nome })),
    [unidades],
  );

  const OPTIONS_SERIES: KeyValue[] = useMemo(
    () => series.map((serie) => ({ key: serie.id.toString(), value: serie.nome })),
    [series],
  );

  const OPTIONS_TURMAS: KeyValue[] = useMemo(
    () => turmas.map((turma) => ({ key: turma.id.toString(), value: turma.nome })),
    [turmas],
  );

  const OPTIONS_DISCIPLINAS: KeyValue[] = useMemo(
    () =>
      disciplinas.map((disciplina) => ({ key: disciplina.id.toString(), value: disciplina.nome })),
    [disciplinas],
  );

  const OPTIONS_ALUNOS: KeyValue[] = useMemo(
    () => alunos.map((aluno) => ({ key: aluno.id.toString(), value: aluno.nome })),
    [alunos],
  );

  // Carregar filtros da URL na inicialização e fazer busca automática
  useEffect(() => {
    if (!isInitialized && unidades.length > 0) {
      const hasFiltersInURL = loadFiltersFromURL();
      setIsInitialized(true);

      // Se houver filtros na URL, fazer busca automaticamente
      if (hasFiltersInURL) {
        // Pequeno delay para garantir que os valores foram setados
        setTimeout(() => {
          handleBuscar();
        }, 100);
      }
    }
  }, [isInitialized, unidades, loadFiltersFromURL, handleBuscar]);

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
                  label="Unidade"
                  required
                  options={OPTIONS_UNIDADES}
                  placeholder="Selecione a unidade"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="serie"
                  control={control}
                  label="Série"
                  required
                  options={OPTIONS_SERIES}
                  placeholder="Selecione a série"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="turma"
                  control={control}
                  label="Turma"
                  required
                  options={OPTIONS_TURMAS}
                  placeholder="Selecione a turma"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="disciplina"
                  control={control}
                  label="Disciplina"
                  required
                  options={OPTIONS_DISCIPLINAS}
                  placeholder="Selecione a disciplina"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="tipoRelatorio"
                  control={control}
                  label="Tipo de Relatório"
                  required
                  options={TIPOS_RELATORIO}
                  placeholder="Selecione o tipo de relatório"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="periodo"
                  control={control}
                  label="Período (Opcional)"
                  options={PERIODOS}
                  placeholder="Selecione o período"
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="aluno"
                  control={control}
                  label="Aluno (Opcional)"
                  options={OPTIONS_ALUNOS}
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
                      // { field: "turma" as keyof ResultadoItem, label: "Turma" },
                      // { field: "disciplina" as keyof ResultadoItem, label: "Disciplina" },
                      // { field: "data" as keyof ResultadoItem, label: "Data" },
                      // { field: "comportamento" as keyof ResultadoItem, label: "Comportamento" },
                      ...(getValues("tipoRelatorio") === "comportamento"
                        ? [
                            {
                              field: "faltas" as keyof ResultadoItem,
                              label: "Faltas",
                              align: "center",
                            },
                            {
                              field: "registros" as keyof ResultadoItem,
                              label: "Registros",
                              align: "center",
                            },
                          ]
                        : []),
                      // { field: "observacao" as keyof ResultadoItem, label: "Observação" },
                    ].map(({ field, align, label }) => (
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
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: align || "flex-start",
                            gap: 0.5,
                          }}
                        >
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
                      <TableCell>
                        <S.CollumnAluno>{item.aluno}</S.CollumnAluno>
                      </TableCell>
                      {/* <TableCell>{item.turma}</TableCell> */}
                      {/* <TableCell>{item.disciplina}</TableCell>
                      <TableCell>{item.data}</TableCell>
                      <TableCell>{item.comportamento}</TableCell> */}
                      {getValues("tipoRelatorio") === "comportamento" && (
                        <>
                          <TableCell align="center">{item.faltas}</TableCell>
                          <TableCell align="center">{item.registros}</TableCell>
                        </>
                      )}
                      {/* <TableCell>{item.observacao}</TableCell> */}
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
