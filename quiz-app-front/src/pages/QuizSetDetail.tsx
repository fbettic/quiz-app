import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizSet } from "../api/quizSet";
import QuestionCard from "../components/QuestionCard";
import QuestionLimitModal from "../components/QuestionLimitModal";

type Answer = {
  answer: string;
  correct: boolean;
};

type Question = {
  _id: string;
  question: string;
  answers: Answer[];
  code: string;
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
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(true);
  const [selectedLimit, setSelectedLimit] = useState<number>(10);

  const handleSelectLimit = (limit: number) => {
    setSelectedLimit(limit);
    setShowModal(false);
  };

  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    getQuizSet(id!, selectedLimit).then((res) => {
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
  }, [id, selectedLimit]);

  useEffect(() => {
    if (timeRemaining === null) return;

    if (timeRemaining <= 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  if (!set) return null;

  const isLast = index === set.questions.length - 1;

  const handleNext = () => {
    setTimeRemaining(null);
    if (isLast) navigate("/");
    else setIndex((i) => i + 1);
  };

  const handleAnswerSelected = () => {
    setTimeRemaining(3);
  };

  if (showModal) {
    return (
      <QuestionLimitModal
        onSelectLimit={handleSelectLimit}
        onCancel={handleCancel}
      />
    );
  }

  if (!set) return null;

  return (
    <div>
      <button onClick={() => navigate("/")}>Volver al inicio</button>

      <h2>{set.title}</h2>

      <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
        Pregunta: {index + 1}/{set.questions.length}
      </div>

      <QuestionCard
        setId={set._id}
        question={set.questions[index]}
        onAnswerSelected={handleAnswerSelected}
      />

      {isLast && timeRemaining !== null && (
        <div style={{ marginTop: "16px" }}>
          <button onClick={handleNext}>Finalizar</button>
        </div>
      )}

      {timeRemaining !== null && (
        <div style={{ marginTop: "16px" }}>
          <button
            onClick={handleNext}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Siguiente ({timeRemaining}s)
          </button>
        </div>
      )}
    </div>
  );
}
