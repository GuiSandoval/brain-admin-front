"use client";
import PageTitle from "@/components/pageTitle/pageTitle";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
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

        <Paper sx={{ p: 4, boxShadow: 1 }}>
          {/* Seção Informações Pessoais */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Informações Pessoais
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Dados básicos do professor
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <TextField
                    fullWidth
                    label="Nome Completo *"
                    placeholder="Digite o nome completo"
                    value={formData.nomeCompleto}
                    onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <TextField
                    fullWidth
                    label="Nome Social"
                    placeholder="Digite o nome social (opcional)"
                    value={formData.nomeSocial}
                    onChange={(e) => handleInputChange("nomeSocial", e.target.value)}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <TextField
                    fullWidth
                    label="E-mail *"
                    placeholder="exemplo@email.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <TextField
                    fullWidth
                    label="Data de Nascimento *"
                    placeholder="dd/mm/aaaa"
                    value={formData.dataNascimento}
                    onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <FormControl fullWidth>
                    <InputLabel>Gênero *</InputLabel>
                    <Select
                      value={formData.genero}
                      label="Gênero *"
                      onChange={(e) => handleInputChange("genero", e.target.value)}
                    >
                      <MenuItem value="">Selecione o gênero</MenuItem>
                      <MenuItem value="masculino">Masculino</MenuItem>
                      <MenuItem value="feminino">Feminino</MenuItem>
                      <MenuItem value="outro">Outro</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <FormControl fullWidth>
                    <InputLabel>Cor/Raça *</InputLabel>
                    <Select
                      value={formData.corRaca}
                      label="Cor/Raça *"
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
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <TextField
                    fullWidth
                    label="Cidade de Naturalidade *"
                    placeholder="Digite a cidade de nascimento"
                    value={formData.cidadeNaturalidade}
                    onChange={(e) => handleInputChange("cidadeNaturalidade", e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Seção Documentos */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Documentos
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Informações de documentação
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                <TextField
                  fullWidth
                  label="CPF *"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange("cpf", e.target.value)}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                <TextField
                  fullWidth
                  label="RG *"
                  placeholder="Digite o RG"
                  value={formData.rg}
                  onChange={(e) => handleInputChange("rg", e.target.value)}
                />
              </Box>
              <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                <TextField
                  fullWidth
                  label="Carteira de Trabalho *"
                  placeholder="Digite o número"
                  value={formData.carteiraTrabalho}
                  onChange={(e) => handleInputChange("carteiraTrabalho", e.target.value)}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Seção Endereço */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Endereço
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Informações de localização
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <TextField
                    fullWidth
                    label="CEP *"
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={(e) => handleInputChange("cep", e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <TextField
                    fullWidth
                    label="Logradouro *"
                    placeholder="Rua, Avenida, etc."
                    value={formData.logradouro}
                    onChange={(e) => handleInputChange("logradouro", e.target.value)}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                  <TextField
                    fullWidth
                    label="Número *"
                    placeholder="Nº"
                    value={formData.numero}
                    onChange={(e) => handleInputChange("numero", e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                  <TextField
                    fullWidth
                    label="Complemento"
                    placeholder="Apto, Bloco, etc. (opcional)"
                    value={formData.complemento}
                    onChange={(e) => handleInputChange("complemento", e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                  <TextField
                    fullWidth
                    label="Bairro *"
                    placeholder="Digite o bairro"
                    value={formData.bairro}
                    onChange={(e) => handleInputChange("bairro", e.target.value)}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <TextField
                    fullWidth
                    label="Cidade *"
                    placeholder="Digite a cidade"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange("cidade", e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <FormControl fullWidth>
                    <InputLabel>UF *</InputLabel>
                    <Select
                      value={formData.uf}
                      label="UF *"
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
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Botões de Ação */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Cadastrar Professor
            </Button>
          </Box>
        </Paper>
      </Container>
    </ProtectedRoute>
  );
}
