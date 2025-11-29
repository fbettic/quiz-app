type Props = {
  onSelectLimit: (limit: number) => void;
  onCancel: () => void;
};

const QUESTION_LIMITS = [5, 10, 15];
const BUTTON_COLORS = ["#4CAF50", "#2196F3", "#FF9800"];

export default function QuestionLimitModal({ onSelectLimit, onCancel }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "black",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2>¿Cuántas preguntas quieres responder?</h2>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {QUESTION_LIMITS.map((limit, index) => (
            <button
              key={limit}
              onClick={() => onSelectLimit(limit)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                background: BUTTON_COLORS[index],
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {limit} preguntas
            </button>
          ))}
        </div>
        <button
          onClick={onCancel}
          style={{
            marginTop: "15px",
            padding: "8px 16px",
            background: "#ddd",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
