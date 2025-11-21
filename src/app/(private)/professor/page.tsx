"use client";
import {
  mapFormDataToProfessorPostRequest,
  mapFormDataToProfessorPutRequest,
  mapProfessorResponseToFormData,
} from "@/app/(private)/professor/professorUtils";
import { useProfessorMutations } from "@/app/(private)/professor/useProfessorMutations";
import { UserRole } from "@/constants/enums";
import BrainButtonPrimary from "@/components/brainButtons/brainButtonPrimary/brainButtonPrimary";
import BrainButtonSecondary from "@/components/brainButtons/brainButtonSecondary/brainButtonSecondary";
import { BrainDateTextControlled } from "@/components/brainForms/brainDateTextControlled";
import { BrainDropdownControlled } from "@/components/brainForms/brainDropdownControlled";
import BrainFormProvider from "@/components/brainForms/brainFormProvider/brainFormProvider";
import { BrainTextCEPControlled } from "@/components/brainForms/brainTextCEPControlled";
import { BrainTextCPFControlled } from "@/components/brainForms/brainTextCPFControlled";
import { BrainTextFieldControlled } from "@/components/brainForms/brainTextFieldControlled";
import { BrainTextRGControlled } from "@/components/brainForms/brainTextRGControlled";
import ContainerSection from "@/components/containerSection/containerSection";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import { useBrainForm } from "@/hooks/useBrainForm";
import { useProfessor } from "@/hooks/useProfessor";
import { buscarCep } from "@/services/cep";
import { KeyValue } from "@/services/models/keyValue";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { professorDefaultValues, ProfessorFormData, professorSchema } from "./schema";

function ProfessorPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const professorId = searchParams.get("id");

  const { professor, loading: loadingProfessor, error: errorProfessor } = useProfessor(professorId);
  const { createProfessor, updateProfessor } = useProfessorMutations();

  const isEditMode = !!professorId;

  const {
    control,
    handleSubmit,
    onFormSubmit,
    isSubmitting,
    reset,
    methodsHookForm,
    setValue,
    watch,
  } = useBrainForm<ProfessorFormData>({
    schema: professorSchema,
    defaultValues: professorDefaultValues,
    onSubmit: onSubmit,
    mode: "all",
  });

  const [buscandoCep, setBuscandoCep] = useState(false);
  const watcherCepValue = watch("cep");

  useEffect(() => {
    if (professor && isEditMode) {
      const formData = mapProfessorResponseToFormData(professor);
      reset(formData);
    }
  }, [professor, isEditMode, reset]);

  const buscarEnderecoPorCep = useCallback(
    async (cepValue: string) => {
      if (cepValue && cepValue.length === 9) {
        setBuscandoCep(true);
        try {
          const dadosCep = await buscarCep(cepValue);

          if (dadosCep && !dadosCep.erro) {
            setValue("logradouro", dadosCep.logradouro, { shouldValidate: true });
            setValue("bairro", dadosCep.bairro, { shouldValidate: true });
            setValue("cidade", dadosCep.localidade, { shouldValidate: true });
            setValue("uf", dadosCep.uf, { shouldValidate: true });
            if (dadosCep.complemento) {
              setValue("complemento", dadosCep.complemento, { shouldValidate: true });
            }
          } else {
            const message = "CEP não encontrado.";
            toast.error(message);
          }
        } finally {
          setBuscandoCep(false);
        }
      }
    },
    [setValue],
  );

  useEffect(() => {
    buscarEnderecoPorCep(watcherCepValue);
  }, [watcherCepValue, buscarEnderecoPorCep]);

  async function onSubmit(data: ProfessorFormData) {
    try {
      if (isEditMode && professorId) {
        const professorData = mapFormDataToProfessorPutRequest(data, professorId);
        await updateProfessor.mutateAsync(professorData);
      } else {
        const professorData = mapFormDataToProfessorPostRequest(data);
        await createProfessor.mutateAsync(professorData);
      }

      router.push("/professor/lista");
    } catch (error) {
      console.error("Erro ao salvar professor:", error);
    }
  }

  function handleCancel() {
    router.push("/professor/lista");
  }
  const OPTIONS_UF: KeyValue[] = [
    { key: "AC", value: "AC" },
    { key: "AL", value: "AL" },
    { key: "AP", value: "AP" },
    { key: "AM", value: "AM" },
    { key: "BA", value: "BA" },
    { key: "CE", value: "CE" },
    { key: "DF", value: "DF" },
    { key: "ES", value: "ES" },
    { key: "GO", value: "GO" },
    { key: "MA", value: "MA" },
    { key: "MT", value: "MT" },
    { key: "MS", value: "MS" },
    { key: "MG", value: "MG" },
    { key: "PA", value: "PA" },
    { key: "PB", value: "PB" },
    { key: "PR", value: "PR" },
    { key: "PE", value: "PE" },
    { key: "PI", value: "PI" },
    { key: "RJ", value: "RJ" },
    { key: "RN", value: "RN" },
    { key: "RS", value: "RS" },
    { key: "RO", value: "RO" },
    { key: "RR", value: "RR" },
    { key: "SC", value: "SC" },
    { key: "SP", value: "SP" },
    { key: "SE", value: "SE" },
    { key: "TO", value: "TO" },
  ];
  const OPTIONS_GENDER: KeyValue[] = [
    { key: "masculino", value: "Masculino" },
    { key: "feminino", value: "Feminino" },
    { key: "outro", value: "Outro" },
  ];
  const OPTIONS_COR_RACA: KeyValue[] = [
    { key: "branca", value: "Branca" },
    { key: "preta", value: "Preta" },
    { key: "parda", value: "Parda" },
    { key: "amarela", value: "Amarela" },
    { key: "indigena", value: "Indígena" },
    { key: "outro", value: "Outro" },
  ];
  const QUANTITY_COLLUMNS_DEFAULT = 3;

  return (
    <ProtectedRoute allowedRoles={[UserRole.PROFESSOR]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loadingProfessor && isEditMode ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : errorProfessor && isEditMode ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorProfessor}
          </Alert>
        ) : (
          <>
            <PageTitle
              title={isEditMode ? "Editar Professor" : "Cadastro de Professor"}
              description="Preencha os dados abaixo para completar o cadastro no sistema"
            />
            <BrainFormProvider
              methodsHookForm={methodsHookForm}
              onSubmit={handleSubmit(onFormSubmit)}
            >
              {/* Seção Informações Pessoais */}
              <ContainerSection
                title="Informações Pessoais"
                description="Dados básicos do professor"
                numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
              >
                <BrainTextFieldControlled
                  name="nomeCompleto"
                  control={control}
                  label="Nome Completo"
                  placeholder="Digite o nome completo"
                  required
                />

                <BrainTextFieldControlled
                  name="nomeSocial"
                  control={control}
                  label="Nome Social"
                  placeholder="Digite o nome social (opcional)"
                />

                <BrainTextFieldControlled
                  name="email"
                  control={control}
                  label="E-mail"
                  placeholder="exemplo@email.com"
                  type="email"
                  required
                />

                <BrainDateTextControlled
                  name="dataNascimento"
                  control={control}
                  label="Data de Nascimento"
                  required
                />
                <BrainDropdownControlled
                  name="genero"
                  control={control}
                  label="Gênero"
                  required
                  options={OPTIONS_GENDER}
                  placeholder="Selecione o gênero"
                />

                <BrainDropdownControlled
                  name="corRaca"
                  control={control}
                  label="Cor/Raça"
                  required
                  options={OPTIONS_COR_RACA}
                  placeholder="Selecione a cor/raça"
                />

                <BrainTextFieldControlled
                  name="cidadeNaturalidade"
                  control={control}
                  label="Cidade de Naturalidade"
                  placeholder="Digite a cidade de nascimento"
                  required
                />
              </ContainerSection>
              {/* Seção Documentos */}

              <ContainerSection
                title="Documentos"
                description="Informações de documentação "
                numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
              >
                <BrainTextCPFControlled name="cpf" control={control} label="CPF" required={true} />

                <BrainTextRGControlled name="rg" control={control} label="RG" required={true} />

                <BrainTextFieldControlled
                  name="carteiraTrabalho"
                  control={control}
                  label="Carteira de Trabalho"
                  placeholder="Digite o número"
                  required
                />
              </ContainerSection>
              <ContainerSection
                title="Endereço"
                description="Informações de localização"
                numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
              >
                <Box sx={{ position: "relative", width: "100%" }}>
                  <BrainTextCEPControlled
                    name="cep"
                    control={control}
                    label="CEP"
                    required={true}
                  />
                  {buscandoCep && (
                    <Box
                      sx={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <CircularProgress size={20} />
                    </Box>
                  )}
                </Box>
                <BrainTextFieldControlled
                  name="logradouro"
                  control={control}
                  label="Logradouro"
                  placeholder="Rua, Avenida, etc."
                  required
                />

                <BrainTextFieldControlled
                  name="numero"
                  control={control}
                  label="Número"
                  placeholder="Nº"
                  required
                />

                <BrainTextFieldControlled
                  name="complemento"
                  control={control}
                  label="Complemento"
                  placeholder="Apto, Bloco, etc. (opcional)"
                />

                <BrainTextFieldControlled
                  name="bairro"
                  control={control}
                  label="Bairro"
                  placeholder="Digite o bairro"
                  required
                />

                <BrainTextFieldControlled
                  name="cidade"
                  control={control}
                  label="Cidade"
                  placeholder="Digite a cidade"
                  required
                />

                <BrainDropdownControlled
                  name="uf"
                  control={control}
                  label="UF"
                  required
                  options={OPTIONS_UF}
                  placeholder="UF"
                />
              </ContainerSection>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                <BrainButtonSecondary onClick={handleCancel}>Cancelar</BrainButtonSecondary>
                <BrainButtonPrimary
                  type="submit"
                  disabled={isSubmitting || createProfessor.isPending || updateProfessor.isPending}
                >
                  {createProfessor.isPending || updateProfessor.isPending
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

export default function ProfessorPage() {
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
      <ProfessorPageContent />
    </Suspense>
  );
}
