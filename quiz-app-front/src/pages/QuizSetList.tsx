import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuizSets } from "../api/quizSet";

export default function QuizSetList() {
  const [sets, setSets] = useState<any[]>([]);

  useEffect(() => {
    getQuizSets().then((res) => setSets(res.data));
  }, []);

  return (
    <div>
      <h1>Quizz Sets</h1>

      <Link to="/create">
        <button>Crear nuevo set</button>
      </Link>

      <ul>
        {sets.map((s) => (
          <li key={s._id}>
            <Link to={`/set/${s._id}`}>{s.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
