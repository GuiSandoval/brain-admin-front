"use client";
import {
  mapFormDataToAlunoPostRequest,
  mapFormDataToAlunoPutRequest,
  mapAlunoResponseToFormData,
} from "@/app/(private)/aluno/alunoUtils";
import { useAlunoMutations } from "@/app/(private)/aluno/useAlunoMutations";
import BrainButtonPrimary from "@/components/brainButtons/brainButtonPrimary/brainButtonPrimary";
import BrainButtonSecondary from "@/components/brainButtons/brainButtonSecondary/brainButtonSecondary";
import { BrainDateTextControlled } from "@/components/brainForms/brainDateTextControlled";
import { BrainDropdownControlled } from "@/components/brainForms/brainDropdownControlled";
import BrainFormProvider from "@/components/brainForms/brainFormProvider/brainFormProvider";
import { BrainTextCEPControlled } from "@/components/brainForms/brainTextCEPControlled";
import { BrainTextCPFControlled } from "@/components/brainForms/brainTextCPFControlled";
import { BrainTextFieldControlled } from "@/components/brainForms/brainTextFieldControlled";
import { BrainTextRGControlled } from "@/components/brainForms/brainTextRGControlled";
import { BrainTextPhoneControlled } from "@/components/brainForms/brainTextPhoneControlled";
import ContainerSection from "@/components/containerSection/containerSection";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import { useBrainForm } from "@/hooks/useBrainForm";
import { useAluno } from "@/hooks/useAluno";
import { buscarCep } from "@/services/cep";
import { KeyValue } from "@/services/models/keyValue";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { alunoDefaultValues, AlunoFormData, alunoSchema } from "./schema";

function AlunoPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const alunoId = searchParams.get("id");

  const { aluno, loading: loadingAluno, error: errorAluno } = useAluno(alunoId);
  const { createAluno, updateAluno } = useAlunoMutations();

  const isEditMode = !!alunoId;

  const {
    control,
    handleSubmit,
    onFormSubmit,
    isSubmitting,
    reset,
    methodsHookForm,
    setValue,
    watch,
  } = useBrainForm<AlunoFormData>({
    schema: alunoSchema,
    defaultValues: alunoDefaultValues,
    onSubmit: onSubmit,
    mode: "all",
  });

  const [buscandoCep, setBuscandoCep] = useState(false);
  const watcherCepValue = watch("cep");

  useEffect(() => {
    if (aluno && isEditMode) {
      const formData = mapAlunoResponseToFormData(aluno);
      reset(formData);
    }
  }, [aluno, isEditMode, reset]);

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

  async function onSubmit(data: AlunoFormData) {
    try {
      if (isEditMode && alunoId) {
        const alunoData = mapFormDataToAlunoPutRequest(data, alunoId);
        await updateAluno.mutateAsync(alunoData);
      } else {
        const alunoData = mapFormDataToAlunoPostRequest(data);
        await createAluno.mutateAsync(alunoData);
      }

      router.push("/lista-aluno");
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }
  }

  function handleCancel() {
    router.push("/lista-aluno");
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
    <ProtectedRoute allowedRoles={["ADMIN", "PROFESSOR"]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loadingAluno && isEditMode ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : errorAluno && isEditMode ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorAluno}
          </Alert>
        ) : (
          <>
            <PageTitle
              title={isEditMode ? "Editar Aluno" : "Cadastro de Aluno"}
              description="Preencha os dados abaixo para completar o cadastro no sistema"
            />
            <BrainFormProvider
              methodsHookForm={methodsHookForm}
              onSubmit={handleSubmit(onFormSubmit)}
            >
              {/* Seção Informações Pessoais */}
              <ContainerSection
                title="Informações Pessoais"
                description="Dados básicos do aluno"
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

                <BrainTextPhoneControlled
                  name="telefone"
                  control={control}
                  label="Telefone"
                  required
                />
              </ContainerSection>

              {/* Seção Documentos */}
              <ContainerSection
                title="Documentos"
                description="Informações de documentação"
                numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
              >
                <BrainTextCPFControlled name="cpf" control={control} label="CPF" required={true} />

                <BrainTextRGControlled name="rg" control={control} label="RG" required={true} />
              </ContainerSection>

              {/* Seção Endereço */}
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

              {/* Seção Dados do Responsável */}
              <ContainerSection
                title="Dados do Responsável"
                description="Informações do responsável legal (opcional)"
                numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
              >
                <BrainTextFieldControlled
                  name="nomeResponsavel"
                  control={control}
                  label="Nome do Responsável"
                  placeholder="Digite o nome completo"
                />

                <BrainTextPhoneControlled
                  name="telefoneResponsavel"
                  control={control}
                  label="Telefone do Responsável"
                />

                <BrainTextFieldControlled
                  name="emailResponsavel"
                  control={control}
                  label="E-mail do Responsável"
                  placeholder="exemplo@email.com"
                  type="email"
                />
              </ContainerSection>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                <BrainButtonSecondary onClick={handleCancel}>Cancelar</BrainButtonSecondary>
                <BrainButtonPrimary
                  type="submit"
                  disabled={isSubmitting || createAluno.isPending || updateAluno.isPending}
                >
                  {createAluno.isPending || updateAluno.isPending ? "Salvando..." : "Salvar"}
                </BrainButtonPrimary>
              </Box>
            </BrainFormProvider>
          </>
        )}
      </Container>
    </ProtectedRoute>
  );
}

export default function AlunoPage() {
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
      <AlunoPageContent />
    </Suspense>
  );
}
