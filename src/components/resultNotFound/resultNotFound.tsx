import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import * as S from "./styles";
interface IBrainResultNotFoundProps {
  customMessage?: string;
}

function BrainResultNotFound({ customMessage }: IBrainResultNotFoundProps) {
  return (
    <S.Container>
      <SearchIcon color="primary" />
      <S.TitleResultNotFound>
        {customMessage || "Não foram encontrado resultados"}
      </S.TitleResultNotFound>
    </S.Container>
  );
}

export default BrainResultNotFound;
