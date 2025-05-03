"use client";
import { Button, TextField, Typography, Paper } from "@mui/material";
import * as S from "./styles";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  function onSubmitLogin() {
    const randomToken = Math.random().toString(36).substring(2);
    Cookies.set("token", randomToken, { expires: 7 });
    router.push("/");
  }

  return (
    <S.LoginWrapper>
      <Paper elevation={6}>
        <S.FormBox>
          <Typography variant="h5" component="h1" gutterBottom>
            Brain
          </Typography>

          <TextField fullWidth label="Email" type="email" margin="normal" variant="outlined" />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
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
