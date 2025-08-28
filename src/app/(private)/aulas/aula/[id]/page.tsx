"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import PageTitle from "@/components/pageTitle/pageTitle";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import LayoutColumns from "@/components/layoutColumns/layoutColumns";
import { useRouter } from "next/navigation";
import AulaDetailView from "@/components/aulaDetailView";
import { mockAulaDetail } from "../../../../../mocks/aulaDetail";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AulaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  // Pega o ID da URL para uso futuro
  const aulaId = params.id as string;
  const aula = {
    ...mockAulaDetail,
    titulo: `${mockAulaDetail.titulo} - Aula ${aulaId}`,
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ProtectedRoute allowedRoles={["PROFESSOR", "ADMIN"]}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleGoBack} size="small">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            Página inicial
          </Typography>
        </Box>

        <PageTitle title={aula.titulo} />

        {/* Header da Aula */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "grey.200",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  📚
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {aula.titulo}
                </Typography>

                <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {aula.horario}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {aula.sala}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <GroupIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {aula.numeroEstudantes} estudantes
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="body1" color="text.secondary" paragraph>
                  Resumo da aula e suas entregas
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    label={`Alunos presentes: ${aula.alunosPresentes}/${aula.numeroEstudantes}`}
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={`Novas Tarefas: ${aula.novasTarefas}`}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={`Registros disciplinares: ${aula.registrosDisciplinares}`}
                    color="warning"
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={`Tarefas para hoje: ${aula.tarefasParaHoje}`}
                    color="info"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Tabs */}
        <LayoutColumns sizeLeft="70%" sizeRight="30%">
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="⭐ Lista de Presença" />
                <Tab label="⭐ Conteúdo e Tarefas" />
                <Tab label="⭐ Registros Disciplinares" />
              </Tabs>
            </Box>

            {/* Tab Panels */}
            <TabPanel value={activeTab} index={0}>
              <AulaDetailView type="presenca" data={aula.presenca} />
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <AulaDetailView type="tarefas" data={aula.tarefas} />
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <AulaDetailView type="registros" data={aula.registros} />
            </TabPanel>
          </Box>

          {/* Visão geral - Seção lateral */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Visão geral
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Resumo da aula e suas entregas
            </Typography>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                      Alunos presentes
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {aula.alunosPresentes}/{aula.numeroEstudantes}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                      Novas Tarefas
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {aula.novasTarefas}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                      Registros disciplinares
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {aula.registrosDisciplinares}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                      Tarefas para hoje
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {aula.tarefasParaHoje}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Cards de tarefas na lateral */}
            <Box sx={{ mt: 3 }}>
              {aula.tarefas.slice(0, 3).map((tarefa, index) => (
                <Card key={tarefa.id} sx={{ mb: 2 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Tarefa {index + 1}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      It is a long established fact that a reader will be distracted by the readable
                      content of a page when...
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        🕒 Envio: {tarefa.dataEnvio}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </LayoutColumns>
      </Container>
    </ProtectedRoute>
  );
}
