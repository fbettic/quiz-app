import { useEffect, useState } from "react";

type Answer = {
  answer: string;
  correct: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

type Props = {
  question: Question;
};

export default function QuestionCard({ question }: Props) {
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
    setSelected(index);
  };

  return (
    <div>
      <h3>{question.question}</h3>

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
                background:
                  isSelected
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
