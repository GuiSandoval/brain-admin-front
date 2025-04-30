import DrawnerMenu from "@/components/drawnerMenu/drawnerMenu";
import * as S from "./styles";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <S.Container>
      <DrawnerMenu />
      {children}
    </S.Container>
  );
}
