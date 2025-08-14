export const dynamic = "force-dynamic";

import CardClass from "@/components/cardClass/cardClass";
import { aulaApi } from "@/services/api";
import { generateTitlePage } from "@/utils/utils";
import { Metadata } from "next";
import * as S from "./styles";

export const metadata: Metadata = {
  title: generateTitlePage("Minhas Aulas"),
  description: "Gerencie suas aulas e atividades",
};

export default async function SectionMinhasAulas() {
  const aulas = await aulaApi.getAula();
  const { content } = aulas;
  return (
    <S.Container>
      {content.map((aula, index) => (
        <CardClass
          key={index}
          title={aula.disciplina}
          image={"https://placehold.co/100.png"}
          hour={aula.horario}
          classroom={aula.turma}
          campus={""}
          quantityStudents={0}
        />
      ))}
    </S.Container>
  );
}
