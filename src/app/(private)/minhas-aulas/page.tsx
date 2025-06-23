import { Metadata } from "next";
import * as S from "./styles";
import { generateTitlePage } from "@/utils/utils";
import PageTitle from "@/components/pageTitle/pageTitle";
import CardClass from "@/components/cardClass/cardClass";

export const metadata: Metadata = {
  title: generateTitlePage("Minhas Aulas"),
  description: "Gerencie suas aulas e atividades",
};

export default function MinhasAulas() {
  const mockAulas = [
    {
      title: "Matemática 10A",
      image: "https://placehold.co/100.png",
      startHour: "08:00",
      endHour: "09:30",
      classroom: "Sala 204",
      campus: "Campus Central",
      quantityStudents: 28,
    },
    {
      title: "Matematica 10B",
      image: "https://placehold.co/100.png",
      startHour: "10:00",
      endHour: "11:30",
      classroom: "Sala 102",
      campus: "Campus Norte",
      quantityStudents: 20,
    },
  ];

  return (
    <S.Container>
      <PageTitle title="Minhas Aulas" description="Manage your classes and view today's schedule" />
      <S.AreaClass>
        {mockAulas.map((aula, index) => (
          <CardClass
            key={index}
            title={aula.title}
            image={aula.image}
            startHour={aula.startHour}
            endHour={aula.endHour}
            classroom={aula.classroom}
            campus={aula.campus}
            quantityStudents={aula.quantityStudents}
          />
        ))}
      </S.AreaClass>
    </S.Container>
  );
}
