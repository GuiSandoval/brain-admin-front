"use client";
import {
  mapFormDataToTurmaPostRequest,
  mapFormDataToTurmaPutRequest,
  mapTurmaResponseToFormData,
} from "@/app/(private)/turma/turmaUtils";
import { useTurmaMutations } from "@/app/(private)/turma/useTurmaMutations";
import { UserRole } from "@/constants/enums";
import BrainButtonPrimary from "@/components/brainButtons/brainButtonPrimary/brainButtonPrimary";
import BrainButtonSecondary from "@/components/brainButtons/brainButtonSecondary/brainButtonSecondary";
import BrainFormProvider from "@/components/brainForms/brainFormProvider/brainFormProvider";
import { BrainTextFieldControlled } from "@/components/brainForms/brainTextFieldControlled";
import ContainerSection from "@/components/containerSection/containerSection";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import { useBrainForm } from "@/hooks/useBrainForm";
import { useTurma } from "@/hooks/useTurma";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { turmaDefaultValues, TurmaFormData, turmaSchema } from "./schema";

function TurmaPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const turmaId = searchParams.get("id");

  const { turma, loading: loadingTurma, error: errorTurma } = useTurma(turmaId);
  const { createTurma, updateTurma } = useTurmaMutations();

  const isEditMode = !!turmaId;

  const { control, handleSubmit, onFormSubmit, isSubmitting, reset, methodsHookForm } =
    useBrainForm<TurmaFormData>({
      schema: turmaSchema,
      defaultValues: turmaDefaultValues,
      onSubmit: onSubmit,
      mode: "all",
    });

  useEffect(() => {
    if (turma && isEditMode) {
      const formData = mapTurmaResponseToFormData(turma);
      reset(formData);
    }
  }, [turma, isEditMode, reset]);

  async function onSubmit(data: TurmaFormData) {
    try {
      if (isEditMode && turmaId) {
        const turmaData = mapFormDataToTurmaPutRequest(data, turmaId);
        await updateTurma.mutateAsync(turmaData);
      } else {
        const turmaData = mapFormDataToTurmaPostRequest(data);
        await createTurma.mutateAsync(turmaData);
      }

      router.push("/turma/lista");
    } catch (error) {
      console.error("Erro ao salvar turma:", error);
    }
  }

  function handleCancel() {
    router.push("/turma/lista");
  }

  const QUANTITY_COLLUMNS_DEFAULT = 1;

  return (
    <ProtectedRoute allowedRoles={[UserRole.PROFESSOR]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loadingTurma && isEditMode ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : errorTurma && isEditMode ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorTurma}
          </Alert>
        ) : (
          <>
            <PageTitle
              title={isEditMode ? "Editar Turma" : "Cadastro de Turma"}
              description="Preencha os dados abaixo para completar o cadastro no sistema"
            />
            <BrainFormProvider
              methodsHookForm={methodsHookForm}
              onSubmit={handleSubmit(onFormSubmit)}
            >
              {/* Seção Informações Básicas */}
              <ContainerSection
                title="Informações Básicas"
                description="Dados principais da turma"
                numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
              >
                <BrainTextFieldControlled
                  name="nome"
                  control={control}
                  label="Nome da Turma"
                  placeholder="Digite o nome da turma"
                  required
                />
              </ContainerSection>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                <BrainButtonSecondary onClick={handleCancel}>Cancelar</BrainButtonSecondary>
                <BrainButtonPrimary
                  type="submit"
                  disabled={isSubmitting || createTurma.isPending || updateTurma.isPending}
                >
                  {createTurma.isPending || updateTurma.isPending ? "Salvando..." : "Salvar"}
                </BrainButtonPrimary>
              </Box>
            </BrainFormProvider>
          </>
        )}
      </Container>
    </ProtectedRoute>
  );
}

export default function TurmaPage() {
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
      <TurmaPageContent />
    </Suspense>
  );
}
