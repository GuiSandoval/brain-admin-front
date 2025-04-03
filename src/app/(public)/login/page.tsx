"use client";

import { useEffect, useState } from "react";
import * as S from "./styles";
import { alunoApi } from "@/api/integration";

export default function LoginPage() {
  const [data, setData] = useState<any>(null);

  async function loadUsers() {
    console.log('teste')

    const response = await alunoApi.getAlunos();
    console.log('response', response)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <S.Container>
      <h1>Login</h1>
    </S.Container>
  );
}
