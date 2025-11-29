import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteQuizSet, getQuizSets } from "../api/quizSet";

export default function QuizSetList() {
  const [sets, setSets] = useState<any[]>([]);

  useEffect(() => {
    getQuizSets().then((res) => setSets(res.data));
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este set?")) {
      try {
        await deleteQuizSet(id);
        setSets(sets.filter((s) => s._id !== id));
      } catch (err) {
        alert("Error al eliminar el set");
      }
    }
  };

  return (
    <div>
      <h1>Quizz Sets</h1>

      <Link to="/create">
        <button>Crear nuevo set</button>
      </Link>

      <ul>
        {sets.map((s) => (
          <li
            key={s._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            <Link to={`/set/${s._id}`}>{s.title}</Link>
            <button
              onClick={() => handleDelete(s._id)}
              style={{
                background: "#ff4444",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
