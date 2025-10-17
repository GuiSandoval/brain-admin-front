"use client";
import { BrainDateTextControlled } from "@/components/brainDateTextControlled";
import { BrainDropdownControlled } from "@/components/brainDropdownControlled";
import { BrainTextFieldControlled } from "@/components/brainTextFieldControlled";
import ContainerSection from "@/components/containerSection/containerSection";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import { useBrainForm } from "@/hooks/useBrainForm";
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { professorDefaultValues, ProfessorFormData, professorSchema } from "./schema";
import { KeyValue } from "@/services/models/keyValue";
import { BrainTextCPFControlled } from "@/components/brainTextCPFControlled";

export default function ProfessorPage() {
  const router = useRouter();

  const { control, handleSubmit, onFormSubmit, isSubmitting } = useBrainForm<ProfessorFormData>({
    schema: professorSchema,
    defaultValues: professorDefaultValues,
    onSubmit: onSubmit,
    mode: "all",
  });

  async function onSubmit(data: ProfessorFormData) {
    console.log("Dados do formulário validados:", data);
  }

  function handleCancel() {
    router.push("/lista-professor");
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
  ];
  const QUANTITY_COLLUMNS_DEFAULT = 3;

  return (
    <ProtectedRoute allowedRoles={["PROFESSOR"]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Cabeçalho */}
        <Box sx={{ mb: 4 }}>
          <PageTitle
            title={"Cadastro de Professor"}
            description="Preencha os dados abaixo para completar o cadastro no sistema"
          />
        </Box>

        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
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

            <BrainTextFieldControlled
              name="rg"
              control={control}
              label="RG"
              placeholder="Digite o RG"
              required
            />

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
            <BrainTextFieldControlled
              name="cep"
              control={control}
              label="CEP"
              placeholder="00000-000"
              required
            />

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
            <Button variant="outlined" onClick={handleCancel} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar Professor"}
            </Button>
          </Box>
        </form>
      </Container>
    </ProtectedRoute>
  );
}
