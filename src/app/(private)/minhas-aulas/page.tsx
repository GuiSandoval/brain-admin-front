import LayoutColumns from "@/components/layoutColumns/layoutColumns";
import PageTitle from "@/components/pageTitle/pageTitle";
import { generateTitlePage } from "@/utils/utils";
import { Metadata } from "next";
import * as S from "./styles";

export const metadata: Metadata = {
  title: generateTitlePage("Minhas Aulas"),
  description: "Gerencie suas aulas e atividades",
};

export default async function MinhasAulas() {
  // const aulas = await aulaApi.getAula();

  return (
    <S.Container>
      <PageTitle title="Minhas Aulas" description="Manage your classes and view today's schedule" />
      <LayoutColumns sizeLeft="70%" sizeRight="30%">
        <S.AreaClass>
          {/* {content.map((aula, index) => (
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
          ))} */}
        </S.AreaClass>
        <S.AreaAssignments>
          <PageTitle title="Assignments" description="Recent assign and theis status" />
          {/* Here you can add components or content related to assignments */}
          {/* Example: <CardAssignment /> */}
        </S.AreaAssignments>
      </LayoutColumns>
    </S.Container>
  );
}
