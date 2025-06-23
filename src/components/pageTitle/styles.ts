"use client";
import { cssVarColor } from "@/styles";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const AreaTitle = styled.div`
  font-size: 2rem;
  line-height: 1.2em;
  font-weight: bold;
  color: ${cssVarColor("text")};
`;
export const AreaDescription = styled.div`
  font-size: 1.2rem;
  line-height: 1.5em;
  color: ${cssVarColor("textSecondary")};
`;
