"use client";
import { BrainTextFieldControlled } from "@/components/brainTextFieldControlled";
import ContainerSection from "@/components/containerSection/containerSection";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import { useBrainForm } from "@/hooks/useBrainForm";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { professorDefaultValues, ProfessorFormData, professorSchema } from "./schema";

export default function ProfessorPage() {
  const router = useRouter();

  const { control, handleSubmit, onFormSubmit, errors, isSubmitting, isValid } =
    useBrainForm<ProfessorFormData>({
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

  const QUANTITY_COLLUMNS_DEFAULT = 3;
  console.log("fsdajklhfasdjkfasd");
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

        <form onSubmit={handleSubmit(onFormSubmit)}>
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

            <BrainTextFieldControlled
              name="dataNascimento"
              control={control}
              label="Data de Nascimento"
              placeholder="dd/mm/aaaa"
              required
            />
            <Controller
              name="genero"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.genero}>
                  <InputLabel>Gênero *</InputLabel>
                  <Select {...field} label="Gênero *" size="small">
                    <MenuItem value="">Selecione o gênero</MenuItem>
                    <MenuItem value="masculino">Masculino</MenuItem>
                    <MenuItem value="feminino">Feminino</MenuItem>
                    <MenuItem value="outro">Outro</MenuItem>
                  </Select>
                  {errors.genero && (
                    <span
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.75rem",
                        marginTop: "3px",
                        marginLeft: "14px",
                      }}
                    >
                      {errors.genero.message}
                    </span>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="corRaca"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.corRaca}>
                  <InputLabel>Cor/Raça *</InputLabel>
                  <Select {...field} label="Cor/Raça *" size="small">
                    <MenuItem value="">Selecione a cor/raça</MenuItem>
                    <MenuItem value="branca">Branca</MenuItem>
                    <MenuItem value="preta">Preta</MenuItem>
                    <MenuItem value="parda">Parda</MenuItem>
                    <MenuItem value="amarela">Amarela</MenuItem>
                    <MenuItem value="indigena">Indígena</MenuItem>
                  </Select>
                  {errors.corRaca && (
                    <span
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.75rem",
                        marginTop: "3px",
                        marginLeft: "14px",
                      }}
                    >
                      {errors.corRaca.message}
                    </span>
                  )}
                </FormControl>
              )}
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
            <BrainTextFieldControlled
              name="cpf"
              control={control}
              label="CPF"
              placeholder="000.000.000-00"
              required
            />

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

            <Controller
              name="uf"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.uf}>
                  <InputLabel>UF *</InputLabel>
                  <Select {...field} label="UF *" size="small">
                    <MenuItem value="">UF</MenuItem>
                    <MenuItem value="AC">AC</MenuItem>
                    <MenuItem value="AL">AL</MenuItem>
                    <MenuItem value="AP">AP</MenuItem>
                    <MenuItem value="AM">AM</MenuItem>
                    <MenuItem value="BA">BA</MenuItem>
                    <MenuItem value="CE">CE</MenuItem>
                    <MenuItem value="DF">DF</MenuItem>
                    <MenuItem value="ES">ES</MenuItem>
                    <MenuItem value="GO">GO</MenuItem>
                    <MenuItem value="MA">MA</MenuItem>
                    <MenuItem value="MT">MT</MenuItem>
                    <MenuItem value="MS">MS</MenuItem>
                    <MenuItem value="MG">MG</MenuItem>
                    <MenuItem value="PA">PA</MenuItem>
                    <MenuItem value="PB">PB</MenuItem>
                    <MenuItem value="PR">PR</MenuItem>
                    <MenuItem value="PE">PE</MenuItem>
                    <MenuItem value="PI">PI</MenuItem>
                    <MenuItem value="RJ">RJ</MenuItem>
                    <MenuItem value="RN">RN</MenuItem>
                    <MenuItem value="RS">RS</MenuItem>
                    <MenuItem value="RO">RO</MenuItem>
                    <MenuItem value="RR">RR</MenuItem>
                    <MenuItem value="SC">SC</MenuItem>
                    <MenuItem value="SP">SP</MenuItem>
                    <MenuItem value="SE">SE</MenuItem>
                    <MenuItem value="TO">TO</MenuItem>
                  </Select>
                  {errors.uf && (
                    <span
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.75rem",
                        marginTop: "3px",
                        marginLeft: "14px",
                      }}
                    >
                      {errors.uf.message}
                    </span>
                  )}
                </FormControl>
              )}
            />
          </ContainerSection>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
            <Button variant="outlined" onClick={handleCancel} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar Professor"}
            </Button>
          </Box>
        </form>
      </Container>
    </ProtectedRoute>
  );
}
