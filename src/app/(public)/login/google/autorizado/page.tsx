"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { CircularProgress, Typography, Paper, Box } from "@mui/material";
import { toast } from "react-toastify";

export default function GoogleAutorizadoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleGoogleCallback } = useGoogleLogin();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const processGoogleCallback = async () => {
      try {
        // Captura os parâmetros da URL
        const code = searchParams.get("code");
        const scope = searchParams.get("scope");
        const error = searchParams.get("error");

        // Verifica se houve erro na autorização do Google
        if (error) {
          throw new Error(`Erro na autorização do Google: ${error}`);
        }

        // Verifica se o código foi fornecido
        if (!code) {
          throw new Error("Código de autorização não encontrado na URL");
        }

        console.log("Processando callback do Google:", { code, scope });

        // Chama o hook para processar o callback
        await handleGoogleCallback(code, scope || undefined);

        setStatus("success");
      } catch (error) {
        console.error("Erro no callback do Google:", error);
        const message =
          error instanceof Error ? error.message : "Erro desconhecido no callback do Google";
        setErrorMessage(message);
        setStatus("error");
        toast.error(message);

        // Redireciona para a página de login após 3 segundos em caso de erro
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    };

    processGoogleCallback();
  }, [searchParams, handleGoogleCallback, router]);

  const renderContent = () => {
    switch (status) {
      case "processing":
        return (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <CircularProgress size={60} />
            <Typography variant="h6" align="center">
              Processando login com Google...
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Aguarde enquanto validamos suas credenciais
            </Typography>
          </Box>
        );

      case "success":
        return (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Typography variant="h6" align="center" color="success.main">
              Login realizado com sucesso!
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Redirecionando...
            </Typography>
          </Box>
        );

      case "error":
        return (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Typography variant="h6" align="center" color="error.main">
              Erro no login
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {errorMessage}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Redirecionando para a página de login...
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "background.default", padding: 2 }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        {renderContent()}
      </Paper>
    </Box>
  );
}
