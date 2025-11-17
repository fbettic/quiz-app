import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizSet } from "../api/quizSet";
import QuestionCard from "../components/QuestionCard";

type Answer = {
  answer: string;
  correct: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

type QuizSet = {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
};

export default function QuizSetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [set, setSet] = useState<QuizSet | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getQuizSet(id!).then((res) => {
      // Mezclar preguntas
      const shuffledQuestions = [...res.data.questions].sort(
        () => Math.random() - 0.5
      );

      setSet({
        ...res.data,
        questions: shuffledQuestions,
      });

      setIndex(0);
    });
  }, [id]);

  if (!set) return null;

  const isLast = index === set.questions.length - 1;

  const handleNext = () => {
    if (isLast) navigate("/");
    else setIndex((i) => i + 1);
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>Volver al inicio</button>

      <h2>{set.title}</h2>

      <QuestionCard question={set.questions[index]} />

      <div style={{ marginTop: "16px" }}>
        <button disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          Anterior
        </button>

        <button onClick={handleNext}>
          {isLast ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
