"use client";
import { Button, TextField, Typography, Paper } from "@mui/material";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { loginApi } from "@/services/api";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  async function onSubmitLogin() {
    try {
      setIsLoading(true);
      const response = await loginApi.login({
        email,
        senha: password,
      });

      if (!response || !response.tokenAcesso || !response.refreshToken) {
        throw new Error("Credenciais inválidas");
      }

      Cookies.set("token", response.tokenAcesso);
      Cookies.set("refreshToken", response.refreshToken);

      try {
        const base64Url = response.tokenAcesso.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join(""),
        );

        const payload = JSON.parse(jsonPayload);
        const role = payload.role.replace(/[\[\]]/g, ""); // Remove os colchetes

        let redirectPath = "/";
        switch (role) {
          case "ESTUDANTE":
            redirectPath = "/aluno";
            break;
          case "PROFESSOR":
            redirectPath = "/professor";
            break;
          case "ADMIN":
            redirectPath = "/admin";
            break;
        }

        toast.success("Login realizado com sucesso!");

        window.location.href = redirectPath;
      } catch (decodeError) {
        console.error("Erro ao decodificar token:", decodeError);
        toast.success("Login realizado com sucesso!");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      const messageError = "Credenciais inválidas";
      // const messageError = error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(messageError);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <S.LoginWrapper>
      <Paper elevation={6}>
        <S.FormBox>
          <Typography variant="h5" component="h1" gutterBottom>
            Brain
          </Typography>

          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <Button
            onClick={onSubmitLogin}
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2, borderRadius: "8px" }}
          >
            Login
          </Button>
        </S.FormBox>
      </Paper>
    </S.LoginWrapper>
  );
}
