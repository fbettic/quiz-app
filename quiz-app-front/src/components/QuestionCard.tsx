import { useEffect, useState } from "react";
import { sendAnswer } from "../api/quizSet";

type Answer = {
  answer: string;
  correct: boolean;
};

type Question = {
  _id: string;
  question: string;
  answers: Answer[];
  code?: string;
};

type Props = {
  setId: string;
  question: Question;
  onAnswerSelected: () => void;
};

export default function QuestionCard({
  setId,
  question,
  onAnswerSelected,
}: Props) {
  const [shuffled, setShuffled] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const shuffledAnswers = [...question.answers].sort(
      () => Math.random() - 0.5
    );
    setShuffled(shuffledAnswers);
    setSelected(null);
  }, [question]);

  const handleSelect = (index: number) => {
    !selected && setSelected(index);
    sendAnswer(setId, question._id, shuffled[index].correct);
    onAnswerSelected();
  };

  return (
    <div>
      <h3>{question.question}</h3>
      {question.code && (
        <pre
          style={{
            background: "#000000ff",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
            marginBottom: "10px",
          }}
        >
          <code>{question.code}</code>
        </pre>
      )}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {shuffled.map((a, i) => {
          const isSelected = selected === i;
          const isCorrect = a.correct;

          return (
            <li
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                marginBottom: "6px",
                cursor: "pointer",
                background: isSelected
                  ? isCorrect
                    ? "#c1f2c1"
                    : "#f2c1c1"
                  : "none",
              }}
            >
              {a.answer}
            </li>
          );
        })}
      </ul>

      {selected !== null && (
        <p>{shuffled[selected].correct ? "Correcto" : "Incorrecto"}</p>
      )}
    </div>
  );
}
