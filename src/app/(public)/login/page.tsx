"use client";
import { Button, TextField, Typography, Paper } from "@mui/material";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { loginApi } from "@/services/api";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  async function onSubmitLogin() {
    try {
      console.log("teste");

      setIsLoading(true);
      const response = await loginApi.login({
        email,
        senha: password,
      });
      console.log("teste", response);
      if (!response) throw new Error("Credenciais inválidas");
      Cookies.set("token", response.tokenAcesso);
      router.push("/");
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      const messageError = error instanceof Error ? error.message : "Erro desconhecido";
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
