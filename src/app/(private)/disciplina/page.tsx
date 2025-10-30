"use client";
import {
  mapFormDataToDisciplinaPostRequest,
  mapFormDataToDisciplinaPutRequest,
  mapDisciplinaResponseToFormData,
} from "@/app/(private)/disciplina/disciplinaUtils";
import { useDisciplinaMutations } from "@/app/(private)/disciplina/useDisciplinaMutations";
import BrainButtonPrimary from "@/components/brainButtons/brainButtonPrimary/brainButtonPrimary";
import BrainButtonSecondary from "@/components/brainButtons/brainButtonSecondary/brainButtonSecondary";
import { BrainDropdownControlled } from "@/components/brainForms/brainDropdownControlled";
import BrainFormProvider from "@/components/brainForms/brainFormProvider/brainFormProvider";
import { BrainTextFieldControlled } from "@/components/brainForms/brainTextFieldControlled";
import ContainerSection from "@/components/containerSection/containerSection";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import { useBrainForm } from "@/hooks/useBrainForm";
import { useDisciplina } from "@/hooks/useDisciplina";
import { useUnidades } from "@/hooks/useUnidades";
import { useSeries } from "@/hooks/useSeries";
import { KeyValue } from "@/services/models/keyValue";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { disciplinaDefaultValues, DisciplinaFormData, disciplinaSchema } from "./schema";

function DisciplinaPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const disciplinaId = searchParams.get("id");

  const {
    disciplina,
    loading: loadingDisciplina,
    error: errorDisciplina,
  } = useDisciplina(disciplinaId);
  const { createDisciplina, updateDisciplina } = useDisciplinaMutations();

  // Buscar unidades e séries das APIs
  const { unidades, loading: loadingUnidades } = useUnidades();
  const { series, loading: loadingSeries } = useSeries();

  const isEditMode = !!disciplinaId;

  const { control, handleSubmit, onFormSubmit, isSubmitting, reset, methodsHookForm } =
    useBrainForm<DisciplinaFormData>({
      schema: disciplinaSchema,
      defaultValues: disciplinaDefaultValues,
      onSubmit: onSubmit,
      mode: "all",
    });

  useEffect(() => {
    if (disciplina && isEditMode) {
      const formData = mapDisciplinaResponseToFormData(disciplina);
      reset(formData);
    }
  }, [disciplina, isEditMode, reset]);

  async function onSubmit(data: DisciplinaFormData) {
    try {
      if (isEditMode && disciplinaId) {
        const disciplinaData = mapFormDataToDisciplinaPutRequest(data, disciplinaId);
        await updateDisciplina.mutateAsync(disciplinaData);
      } else {
        const disciplinaData = mapFormDataToDisciplinaPostRequest(data);
        await createDisciplina.mutateAsync(disciplinaData);
      }

      router.push("/lista-disciplina");
    } catch (error) {
      console.error("Erro ao salvar disciplina:", error);
    }
  }

  function handleCancel() {
    router.push("/lista-disciplina");
  }

  const QUANTITY_COLLUMNS_DEFAULT = 3;

  // Converter unidades para formato KeyValue
  const OPTIONS_UNIDADES: KeyValue[] = useMemo(
    () => unidades.map((unidade) => ({ key: unidade.id.toString(), value: unidade.nome })),
    [unidades],
  );

  // Converter séries para formato KeyValue
  const OPTIONS_SERIES: KeyValue[] = useMemo(
    () => series.map((serie) => ({ key: serie.id.toString(), value: serie.nome })),
    [series],
  );

  const OPTIONS_GRUPOS: KeyValue[] = [
    { key: "1", value: "Grupo A" },
    { key: "2", value: "Grupo B" },
    { key: "3", value: "Grupo C" },
  ];

  return (
    <ProtectedRoute allowedRoles={["PROFESSOR"]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {(loadingDisciplina && isEditMode) || loadingUnidades || loadingSeries ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : errorDisciplina && isEditMode ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorDisciplina}
          </Alert>
        ) : (
          <>
            <PageTitle
              title={isEditMode ? "Editar Disciplina" : "Cadastro de Disciplina"}
              description="Preencha os dados abaixo para completar o cadastro no sistema"
            />
            <BrainFormProvider
              methodsHookForm={methodsHookForm}
              onSubmit={handleSubmit(onFormSubmit)}
            >
              {/* Seção Informações Básicas */}
              <ContainerSection
                title="Informações Básicas"
                description="Dados principais da disciplina"
                numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
              >
                <BrainDropdownControlled
                  name="unidadeId"
                  control={control}
                  label="Unidade"
                  required
                  options={OPTIONS_UNIDADES}
                  placeholder="Selecione a unidade"
                />

                <BrainDropdownControlled
                  name="serieId"
                  control={control}
                  label="Série"
                  required
                  options={OPTIONS_SERIES}
                  placeholder="Selecione a série"
                />

                <BrainDropdownControlled
                  name="grupoId"
                  control={control}
                  label="Grupo"
                  required
                  options={OPTIONS_GRUPOS}
                  placeholder="Selecione o grupo"
                />

                <BrainTextFieldControlled
                  name="nome"
                  control={control}
                  label="Nome da Disciplina"
                  placeholder="Digite o nome da disciplina"
                  required
                />

                <BrainTextFieldControlled
                  name="cargaHoraria"
                  control={control}
                  label="Carga Horária"
                  placeholder="Digite a carga horária"
                  required
                />
              </ContainerSection>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                <BrainButtonSecondary onClick={handleCancel}>Cancelar</BrainButtonSecondary>
                <BrainButtonPrimary
                  type="submit"
                  disabled={
                    isSubmitting || createDisciplina.isPending || updateDisciplina.isPending
                  }
                >
                  {createDisciplina.isPending || updateDisciplina.isPending
                    ? "Salvando..."
                    : "Salvar"}
                </BrainButtonPrimary>
              </Box>
            </BrainFormProvider>
          </>
        )}
      </Container>
    </ProtectedRoute>
  );
}

export default function DisciplinaPage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        </Container>
      }
    >
      <DisciplinaPageContent />
    </Suspense>
  );
}
