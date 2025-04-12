"use client";

import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import * as S from "./styles";

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
      <CircularProgress />
      <h1>Login</h1>
    </S.Container>
  );
}
