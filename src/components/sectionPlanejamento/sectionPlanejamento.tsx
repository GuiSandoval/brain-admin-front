"use client";

import * as S from "./styles";

interface Task {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
}

interface Evaluation {
  id: string;
  title: string;
  subject: string;
  date: string;
}

export default function SectionPlanejamento() {
  // Mock data - em produção, estes dados viriam de uma API
  const tasks: Task[] = [
    {
      id: "1",
      title: "Tarefa 1",
      subject: "Matemática 1",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when...",
      dueDate: "14/01/25",
    },
    {
      id: "2",
      title: "Tarefa 2",
      subject: "Matemática 2",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when...",
      dueDate: "14/01/25",
    },
  ];

  const evaluations: Evaluation[] = [
    {
      id: "1",
      title: "Avaliação",
      subject: "Matemática 1",
      date: "14/01/25",
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <S.Title>Planejamento</S.Title>
          <S.Subtitle>
            Visualize rapidamente as tarefas para hoje e as próximas avaliações
          </S.Subtitle>
        </S.HeaderContent>
      </S.Header>

      <S.TasksSection>
        <S.SectionTitle>
          Tarefas para hoje
          <S.TaskCount>{tasks.length}</S.TaskCount>
        </S.SectionTitle>

        {tasks.map((task) => (
          <S.TaskItem key={task.id}>
            <S.TaskTitle>{task.title}</S.TaskTitle>
            <S.TaskMeta>
              <S.TaskSubject>{task.subject}</S.TaskSubject>
              <span>Envio: {task.dueDate}</span>
            </S.TaskMeta>
            <S.TaskDescription>{task.description}</S.TaskDescription>
          </S.TaskItem>
        ))}

        <S.ViewMoreButton>VER MAIS</S.ViewMoreButton>
      </S.TasksSection>

      <S.EvaluationsSection>
        <S.SectionTitle>
          Avaliações próximas
          <S.TaskCount>{evaluations.length}</S.TaskCount>
        </S.SectionTitle>

        {evaluations.map((evaluation) => (
          <S.EvaluationItem key={evaluation.id}>
            <S.EvaluationIcon />
            <S.EvaluationContent>
              <S.EvaluationTitle>{evaluation.title}</S.EvaluationTitle>
              <S.EvaluationMeta>3ª série - {evaluation.subject}</S.EvaluationMeta>
            </S.EvaluationContent>
            <S.EvaluationDate>Data: {evaluation.date}</S.EvaluationDate>
          </S.EvaluationItem>
        ))}
      </S.EvaluationsSection>
    </S.Container>
  );
}
