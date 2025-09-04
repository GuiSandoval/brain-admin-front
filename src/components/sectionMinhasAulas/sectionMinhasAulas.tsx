"use client";

import CardClass from "@/components/cardClass/cardClass";
import { useAulas } from "@/hooks/useAulas";
import { useRouter } from "next/navigation";
import * as S from "./styles";

export default function SectionMinhasAulas() {
  const { aulas, loading, error, refetch, isFetching } = useAulas();
  const router = useRouter();

  const handleAulaClick = (aulaIndex: number) => {
    // Por enquanto vamos usar o index como ID, mas idealmente seria o ID real da aula
    router.push(`/aulas/aula/${aulaIndex + 1}`);
  };

  if (loading) {
    return (
      <S.Container>
        <p>Carregando aulas...</p>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <p style={{ color: "red" }}>{error}</p>
        <button
          onClick={refetch}
          style={{
            marginTop: "8px",
            padding: "4px 8px",
            cursor: "pointer",
            opacity: isFetching ? 0.6 : 1,
          }}
          disabled={isFetching}
        >
          {isFetching ? "Carregando..." : "Tentar novamente"}
        </button>
      </S.Container>
    );
  }

  if (!aulas || aulas.length === 0) {
    return (
      <S.Container>
        <p>Nenhuma aula encontrada.</p>
        <button
          onClick={refetch}
          style={{
            marginTop: "8px",
            padding: "4px 8px",
            cursor: "pointer",
            opacity: isFetching ? 0.6 : 1,
          }}
          disabled={isFetching}
        >
          {isFetching ? "Carregando..." : "Atualizar"}
        </button>
      </S.Container>
    );
  }
  const formataHora = (horarioInicio: number[], horarioFim: number[]): string => {
    const pad = (num: number) => num.toString().padStart(2, "0");
    return `${pad(horarioInicio[0])}:${pad(horarioInicio[1])} - ${pad(horarioFim[0])}:${pad(horarioFim[1])}`;
  };

  return (
    <S.Container>
      {aulas.map((aula, index) => (
        <CardClass
          key={`${aula.disciplina}-${aula.turma}-${index}`} // Chave mais específica
          title={`${aula.disciplina} - ${aula.serie} ${aula.turma} `}
          image={"https://placehold.co/100.png"}
          hour={formataHora(aula.horarioInicio, aula.horarioFim)}
          classroom={`${aula.sala} ${aula.turma}`}
          campus={aula.unidade}
          quantityStudents={aula.quantidadeAlunos}
          onClick={() => handleAulaClick(index)}
        />
      ))}
    </S.Container>
  );
}
