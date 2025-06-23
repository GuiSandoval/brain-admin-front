import { Metadata } from "next";
import * as S from "./styles";
import { generateTitlePage } from "@/utils/utils";
import PageTitle from "@/components/pageTitle/pageTitle";

export const metadata: Metadata = {
  title: generateTitlePage("Minhas Aulas"),
  description: "Gerencie suas aulas e atividades",
};

export default function MinhasAulas() {
  return (
    <S.Container>
      <PageTitle title="Minhas Aulas" description="Manage your classes and view today's schedule" />
    </S.Container>
  );
}
