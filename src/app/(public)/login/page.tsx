"use client";

import { Button, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import * as S from "./styles";
import Link from "next/link";
import SwitchTheme from "@/components/switchTheme/switchTheme";

export default function LoginPage() {
  async function loadUsers() {
    console.log("teste");

    // const response = await alunoApi.getAlunos();
    // console.log("response", response);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <S.Container>
      <SwitchTheme />
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <CircularProgress />
      <h1>Login</h1>

      <Link href="/teste-ssr">
        <Button variant="contained">Teste SSR</Button>
      </Link>
    </S.Container>
  );
}
