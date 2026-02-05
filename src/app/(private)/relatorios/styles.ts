import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

export const CollumnAluno = styled.div`
  &:hover {
    cursor: pointer;
    color: #1976d2;
    text-decoration: underline;
  }
`;
