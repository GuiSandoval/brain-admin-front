"use client";
import { cssVarColor } from "@/styles";
import styled from "styled-components";

export const Container = styled.div`
  background: ${cssVarColor("background")};
`;

export const AreaClass = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
`;
