"use client";
import { mapFormDataToFichaMedicaPostRequest } from "@/app/(private)/ficha-medica/fichaMedicaUtils";
import { useFichaMedicaMutations } from "@/app/(private)/ficha-medica/useFichaMedicaMutations";
import { RoutesEnum, UserRoleEnum } from "@/enums";
import BrainButtonPrimary from "@/components/brainButtons/brainButtonPrimary/brainButtonPrimary";
import BrainButtonSecondary from "@/components/brainButtons/brainButtonSecondary/brainButtonSecondary";
import { BrainDropdownControlled } from "@/components/brainForms/brainDropdownControlled";
import { BrainTextFieldControlled } from "@/components/brainForms/brainTextFieldControlled";
import BrainFormProvider from "@/components/brainForms/brainFormProvider/brainFormProvider";
import ContainerSection from "@/components/containerSection/containerSection";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import { useBrainForm } from "@/hooks/useBrainForm";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { Suspense, use, useEffect } from "react";
import { fichaMedicaDefaultValues, FichaMedicaFormData, fichaMedicaSchema } from "../schema";

interface PageProps {
  params: Promise<{
    dadosPessoaisId: string;
  }>;
}

function FichaMedicaPageContent({ params }: PageProps) {
  const router = useRouter();
  const { dadosPessoaisId } = use(params);

  const { createFichaMedica } = useFichaMedicaMutations();

  const {
    control,
    handleSubmit,
    onFormSubmit,
    isSubmitting,
    reset,
    methodsHookForm,
  } = useBrainForm<FichaMedicaFormData>({
    schema: fichaMedicaSchema,
    defaultValues: fichaMedicaDefaultValues,
    onSubmit: onSubmit,
    mode: "all",
  });

  // Set dadosPessoaisId from URL
  useEffect(() => {
    if (dadosPessoaisId) {
      reset({
        ...fichaMedicaDefaultValues,
        dadosPessoaisId: dadosPessoaisId,
      });
    }
  }, [dadosPessoaisId, reset]);

  async function onSubmit(data: FichaMedicaFormData) {
    try {
      const fichaMedicaData = mapFormDataToFichaMedicaPostRequest(data);
      await createFichaMedica.mutateAsync(fichaMedicaData);
      router.push(RoutesEnum.FICHA_MEDICA_LISTA);
    } catch (error) {
      console.error("Erro ao salvar ficha médica:", error);
    }
  }

  function handleCancel() {
    router.push(RoutesEnum.FICHA_MEDICA_LISTA);
  }

  // Opções de tipo sanguíneo
  const OPTIONS_TIPO_SANGUINEO = [
    { key: "A_POSITIVO", value: "A+" },
    { key: "A_NEGATIVO", value: "A-" },
    { key: "B_POSITIVO", value: "B+" },
    { key: "B_NEGATIVO", value: "B-" },
    { key: "AB_POSITIVO", value: "AB+" },
    { key: "AB_NEGATIVO", value: "AB-" },
    { key: "O_POSITIVO", value: "O+" },
    { key: "O_NEGATIVO", value: "O-" },
  ];

  const QUANTITY_COLLUMNS_DEFAULT = 2;

  return (
    <ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.PROFESSOR]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageTitle
          title="Cadastro de Ficha Médica"
          description="Preencha os dados abaixo para completar o cadastro no sistema"
        />
            <BrainFormProvider
              methodsHookForm={methodsHookForm}
              onSubmit={handleSubmit(onFormSubmit)}
            >
              {/* Seção Identificação */}
              <ContainerSection
                title="Identificação"
                description="Usuário selecionado"
                numberOfCollumns={1}
              >
                <BrainTextFieldControlled
                  name="dadosPessoaisId"
                  control={control}
                  label="Usuário"
                  placeholder={`ID: ${dadosPessoaisId}`}
                  disabled={true}
                />
              </ContainerSection>

              {/* Seção Informações Médicas Básicas */}
              <ContainerSection
                title="Informações Médicas Básicas"
                description="Dados gerais de saúde"
                numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
              >
                <BrainDropdownControlled
                  name="tipoSanguineo"
                  control={control}
                  label="Tipo Sanguíneo"
                  options={OPTIONS_TIPO_SANGUINEO}
                  placeholder="Selecione o tipo sanguíneo"
                />

                <BrainTextFieldControlled
                  name="necessidadesEspeciais"
                  control={control}
                  label="Necessidades Especiais"
                  placeholder="Descreva as necessidades especiais (opcional)"
                  multiline
                  rows={3}
                />
              </ContainerSection>

              {/* Seção Condições de Saúde */}
              <ContainerSection
                title="Condições de Saúde"
                description="Informações sobre condições médicas"
                numberOfCollumns={1}
              >
                <BrainTextFieldControlled
                  name="doencasRespiratorias"
                  control={control}
                  label="Doenças Respiratórias"
                  placeholder="Descreva doenças respiratórias (opcional)"
                  multiline
                  rows={3}
                />
              </ContainerSection>

              {/* Seção Alergias */}
              <ContainerSection
                title="Alergias"
                description="Informações sobre alergias"
                numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
              >
                <BrainTextFieldControlled
                  name="alergiasAlimentares"
                  control={control}
                  label="Alergias Alimentares"
                  placeholder="Descreva alergias alimentares (opcional)"
                  multiline
                  rows={3}
                />

                <BrainTextFieldControlled
                  name="alergiasMedicamentosas"
                  control={control}
                  label="Alergias Medicamentosas"
                  placeholder="Descreva alergias a medicamentos (opcional)"
                  multiline
                  rows={3}
                />
              </ContainerSection>

              {/* Seção Laudos e Observações */}
              <ContainerSection
                title="Laudos e Observações"
                description="Informações adicionais e laudos médicos"
                numberOfCollumns={1}
              >
                <BrainTextFieldControlled
                  name="laudos"
                  control={control}
                  label="Laudos"
                  placeholder="Adicione laudos médicos ou observações importantes (opcional)"
                  multiline
                  rows={4}
                />
              </ContainerSection>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                <BrainButtonSecondary onClick={handleCancel}>Cancelar</BrainButtonSecondary>
                <BrainButtonPrimary
                  type="submit"
                  disabled={isSubmitting || createFichaMedica.isPending}
                >
                  {createFichaMedica.isPending ? "Salvando..." : "Salvar"}
                </BrainButtonPrimary>
              </Box>
            </BrainFormProvider>
      </Container>
    </ProtectedRoute>
  );
}

export default function FichaMedicaPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <FichaMedicaPageContent params={params} />
    </Suspense>
  );
}
