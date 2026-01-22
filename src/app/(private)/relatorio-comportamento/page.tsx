"use client";
import { BrainDatePickerControlled } from "@/components/brainForms/brainDatePickerControlled";
import { BrainDropdownControlled } from "@/components/brainForms/brainDropdownControlled";
import BrainFormProvider from "@/components/brainForms/brainFormProvider/brainFormProvider";
import { BrainMultiSelectControlled } from "@/components/brainForms/brainMultiSelectControlled";
import { BrainTextFieldControlled } from "@/components/brainForms/brainTextFieldControlled";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import { UserRoleEnum } from "@/enums";
import { useBrainForm } from "@/hooks/useBrainForm";
import { KeyValue } from "@/services/models/keyValue";
import { Download, Print } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Container, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import * as S from "./styles";

// Mock data para os dropdowns
const TURMAS_MOCK: KeyValue[] = [
  { key: "1", value: "Turma A - 1º Ano" },
  { key: "2", value: "Turma B - 2º Ano" },
  { key: "3", value: "Turma C - 3º Ano" },
];

const PERIODOS_MOCK: KeyValue[] = [
  { key: "1", value: "1º Bimestre" },
  { key: "2", value: "2º Bimestre" },
  { key: "3", value: "3º Bimestre" },
  { key: "4", value: "4º Bimestre" },
  { key: "anual", value: "Anual" },
];

const DISCIPLINAS_MOCK: KeyValue[] = [
  { key: "1", value: "Matemática" },
  { key: "2", value: "Português" },
  { key: "3", value: "História" },
  { key: "4", value: "Geografia" },
  { key: "5", value: "Ciências" },
  { key: "6", value: "Inglês" },
  { key: "7", value: "Educação Física" },
];

// Schema de validação
const relatorioSchema = z.object({
  nomeAluno: z.string().optional(),
  turma: z.string().optional(),
  periodo: z.string().optional(),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  dataInicioCalendario: z.date().nullable().optional(),
  dataFimCalendario: z.date().nullable().optional(),
  disciplinas: z.array(z.string()).optional(),
});

type RelatorioFormData = z.infer<typeof relatorioSchema>;

const defaultValues: RelatorioFormData = {
  nomeAluno: "",
  turma: "",
  periodo: "",
  dataInicio: "",
  dataFim: "",
  dataInicioCalendario: null,
  dataFimCalendario: null,
  disciplinas: [],
};

export default function RelatorioComportamentoPage() {
  const { control, getValues, reset, methodsHookForm, onFormSubmit } =
    useBrainForm<RelatorioFormData>({
      schema: relatorioSchema,
      defaultValues,
    });

  // Estados para controlar carregamento
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Função para validar filtros
  const validateFilters = () => {
    const values = getValues();
    const { nomeAluno, turma, periodo, dataInicio, dataFim } = values;

    if (!turma && !nomeAluno && !periodo && !dataInicio && !dataFim) {
      setError("Selecione pelo menos um filtro para gerar o relatório");
      return false;
    }

    if ((dataInicio && !dataFim) || (!dataInicio && dataFim)) {
      setError("Preencha ambas as datas (início e fim)");
      return false;
    }

    if (dataInicio && dataFim) {
      // Converter formato dd/mm/yyyy para Date
      const [diaInicio, mesInicio, anoInicio] = dataInicio.split("/");
      const [diaFim, mesFim, anoFim] = dataFim.split("/");
      const dateInicio = new Date(Number(anoInicio), Number(mesInicio) - 1, Number(diaInicio));
      const dateFim = new Date(Number(anoFim), Number(mesFim) - 1, Number(diaFim));

      if (dateInicio > dateFim) {
        setError("A data de início não pode ser maior que a data de fim");
        return false;
      }
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

  // Função para limpar filtros
  const handleLimparFiltros = () => {
    reset();
    setError("");
    setSuccess("");
  };

  return (
    <ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.PROFESSOR]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <PageTitle
            title="Relatório de Comportamento"
            description="Gere relatórios detalhados sobre o comportamento dos alunos"
          />
        </Box>

        {/* Box de Filtros */}
        <Paper sx={{ p: 3, mb: 3, boxShadow: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            Filtros
          </Typography>

          <BrainFormProvider onSubmit={onFormSubmit} methodsHookForm={methodsHookForm}>
            <S.Container>
              <Box sx={{ display: "flex", gap: 1 }}>
                <BrainDatePickerControlled
                  name="dataInicioCalendario"
                  control={control}
                  label="Data Início"
                  format="dd/MM/yyyy"
                />
                <BrainDatePickerControlled
                  name="dataFimCalendario"
                  control={control}
                  label="Data Fim"
                  format="dd/MM/yyyy"
                  disablePast
                />
              </Box>

              <Box>
                <BrainDropdownControlled
                  name="periodo"
                  control={control}
                  label="Período"
                  options={PERIODOS_MOCK}
                  placeholder="Selecione um período"
                />
              </Box>
              <Box>
                <BrainDropdownControlled
                  name="turma"
                  control={control}
                  label="Turma"
                  options={TURMAS_MOCK}
                  placeholder="Selecione uma turma"
                />
              </Box>

              <Box>
                <BrainTextFieldControlled
                  name="nomeAluno"
                  control={control}
                  label="Nome do Aluno"
                  placeholder="Digite o nome do aluno"
                />
              </Box>

              <Box>
                <BrainMultiSelectControlled
                  name="disciplinas"
                  control={control}
                  label="Disciplinas"
                  options={DISCIPLINAS_MOCK}
                  placeholder="Selecione uma ou mais disciplinas"
                />
              </Box>
            </S.Container>
            {/* Botões de Ação */}
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" onClick={handleLimparFiltros}>
                Limpar Filtros
              </Button>
              <Button
                variant="contained"
                startIcon={loadingPDF ? <CircularProgress size={20} color="inherit" /> : <Print />}
                onClick={handleGerarPDF}
                disabled={loadingPDF}
              >
                {loadingPDF ? "Gerando..." : "Pré-visualizar PDF"}
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={
                  loadingExcel ? <CircularProgress size={20} color="inherit" /> : <Download />
                }
                onClick={handleGerarExcel}
                disabled={loadingExcel}
              >
                {loadingExcel ? "Gerando..." : "Gerar Relatório"}
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
      </Container>
    </ProtectedRoute>
  );
}
