"use client";
import ContainerSection from "@/components/containerSection/containerSection";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfessorPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    nomeSocial: "",
    email: "",
    dataNascimento: "",
    genero: "",
    corRaca: "",
    cidadeNaturalidade: "",
    cpf: "",
    rg: "",
    carteiraTrabalho: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Dados do formulário:", formData);
  };

  const handleCancel = () => {
    console.log("Cancelar");
    router.push("/lista-professor");
  };

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

        {/* Seção Informações Pessoais */}
        <ContainerSection
          title="Informações Pessoais"
          description="Dados básicos do professor"
          numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
        >
          <TextField
            fullWidth
            size="small"
            label="Nome Completo *"
            placeholder="Digite o nome completo"
            value={formData.nomeCompleto}
            onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="Nome Social"
            placeholder="Digite o nome social (opcional)"
            value={formData.nomeSocial}
            onChange={(e) => handleInputChange("nomeSocial", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="E-mail *"
            placeholder="exemplo@email.com"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="Data de Nascimento *"
            placeholder="dd/mm/aaaa"
            value={formData.dataNascimento}
            onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Gênero *</InputLabel>
            <Select
              value={formData.genero}
              label="Gênero *"
              size="small"
              onChange={(e) => handleInputChange("genero", e.target.value)}
            >
              <MenuItem value="">Selecione o gênero</MenuItem>
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
              <MenuItem value="outro">Outro</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Cor/Raça *</InputLabel>
            <Select
              value={formData.corRaca}
              label="Cor/Raça *"
              size="small"
              onChange={(e) => handleInputChange("corRaca", e.target.value)}
            >
              <MenuItem value="">Selecione a cor/raça</MenuItem>
              <MenuItem value="branca">Branca</MenuItem>
              <MenuItem value="preta">Preta</MenuItem>
              <MenuItem value="parda">Parda</MenuItem>
              <MenuItem value="amarela">Amarela</MenuItem>
              <MenuItem value="indigena">Indígena</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            size="small"
            label="Cidade de Naturalidade *"
            placeholder="Digite a cidade de nascimento"
            value={formData.cidadeNaturalidade}
            onChange={(e) => handleInputChange("cidadeNaturalidade", e.target.value)}
          />
        </ContainerSection>
        {/* Seção Documentos */}

        <ContainerSection
          title="Documentos"
          description="Informações de documentação "
          numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
        >
          <TextField
            fullWidth
            size="small"
            label="CPF *"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => handleInputChange("cpf", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="RG *"
            placeholder="Digite o RG"
            value={formData.rg}
            onChange={(e) => handleInputChange("rg", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="Carteira de Trabalho *"
            placeholder="Digite o número"
            value={formData.carteiraTrabalho}
            onChange={(e) => handleInputChange("carteiraTrabalho", e.target.value)}
          />
        </ContainerSection>
        <ContainerSection
          title="Endereço"
          description="Informações de localização"
          numberOfCollumns={QUANTITY_COLLUMNS_DEFAULT}
        >
          <TextField
            fullWidth
            size="small"
            label="CEP *"
            placeholder="00000-000"
            value={formData.cep}
            onChange={(e) => handleInputChange("cep", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="Logradouro *"
            placeholder="Rua, Avenida, etc."
            value={formData.logradouro}
            onChange={(e) => handleInputChange("logradouro", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="Número *"
            placeholder="Nº"
            value={formData.numero}
            onChange={(e) => handleInputChange("numero", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="Complemento"
            placeholder="Apto, Bloco, etc. (opcional)"
            value={formData.complemento}
            onChange={(e) => handleInputChange("complemento", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="Bairro *"
            placeholder="Digite o bairro"
            value={formData.bairro}
            onChange={(e) => handleInputChange("bairro", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="Cidade *"
            placeholder="Digite a cidade"
            value={formData.cidade}
            onChange={(e) => handleInputChange("cidade", e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>UF *</InputLabel>
            <Select
              value={formData.uf}
              label="UF *"
              size="small"
              onChange={(e) => handleInputChange("uf", e.target.value)}
            >
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
          </FormControl>
        </ContainerSection>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Cadastrar Professor
          </Button>
        </Box>
      </Container>
    </ProtectedRoute>
  );
}
