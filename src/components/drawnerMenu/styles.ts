import { cssVarColor } from "@/styles";
import { AppBar, Box } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  margin-left: auto;
`;

export const BrainAppBar = styled(AppBar)`
  &&& {
    background: ${cssVarColor("headerMenu")};
  }
`;

export const BrainBox = styled(Box)`
  &&& {
    background: ${cssVarColor("background")};

    .MuiSvgIcon-root {
      color: ${cssVarColor("text")};
    }
  }
`;
