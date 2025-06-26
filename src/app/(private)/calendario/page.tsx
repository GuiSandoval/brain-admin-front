import LayoutColumns from "@/components/layoutColumns/layoutColumns";
import * as S from "./styles";
import PageTitle from "@/components/pageTitle/pageTitle";
export default function Calendario() {
  return (
    <S.Container>
      <PageTitle title="Calendar" description="Manage your schedule and upcoming events" />
      <LayoutColumns sizeLeft="70%" sizeRight="30%">
        <div>Calendario</div>
        <div>Sidebar</div>
      </LayoutColumns>
    </S.Container>
  );
}
