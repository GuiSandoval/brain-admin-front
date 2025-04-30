import { cssVarColor } from "@/styles";
import { AppBar } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  margin-left: auto;
`;

export const BrainAppBar = styled(AppBar)`
  &&& {
    background: ${cssVarColor("headerMenu")};
  }
`;
