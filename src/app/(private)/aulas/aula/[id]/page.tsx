"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import AulaDetailView from "@/components/aulaDetailView";
import LayoutColumns from "@/components/layoutColumns/layoutColumns";
import PageTitle from "@/components/pageTitle/pageTitle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
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
              <AulaDetailView type="presenca" idAula={aulaId} />
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
