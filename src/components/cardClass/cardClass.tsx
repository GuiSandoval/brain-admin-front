import React from "react";
import * as S from "./styles";
import Image from "next/image";
import { isNullUndefined } from "@/utils/utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface ICardClassProps {
  title: string;
  image?: string;
  startHour: string;
  endHour: string;
  classroom: string;
  campus: string;
  quantityStudents: number;
}

function CardClass({
  campus,
  classroom,
  endHour,
  image,
  quantityStudents,
  startHour,
  title,
}: ICardClassProps) {
  const showAreaImage = !isNullUndefined(image);

  return (
    <S.Container>
      {showAreaImage && (
        <S.AreaImage>
          <Image src={image} alt="Placeholder" width={75} height={75} />
        </S.AreaImage>
      )}
      <S.AreaInfo>
        <S.AreaTitle>{title}</S.AreaTitle>
        <S.AreaHours>
          <AccessTimeIcon fontSize="small" />
          {startHour} - {endHour}
        </S.AreaHours>
        <S.AreaClassroom>
          <LocationOnIcon fontSize="small" />
          {classroom}
        </S.AreaClassroom>
        <S.AreaCampus>{campus}</S.AreaCampus>
        <S.AreaQuantityStudents>
          {quantityStudents} {quantityStudents === 1 ? "Aluno" : "Alunos"}
        </S.AreaQuantityStudents>
      </S.AreaInfo>
    </S.Container>
  );
}

export default CardClass;
