import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuizSetCreate() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setText(reader.result as string);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    try {
      const json = JSON.parse(text);
      await axios.post("http://localhost:4000/quiz-sets", json);
      navigate("/");
    } catch (err) {
      alert("JSON inválido o error de servidor");
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Set</h2>

      <label>Subir archivo JSON:</label>
      <input type="file" accept=".json" onChange={handleUploadFile} />

      <p>O pegar JSON manualmente:</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={15}
        cols={60}
      />

      <br />

      <button onClick={handleSubmit}>Guardar</button>
      <button onClick={() => navigate("/")}>Cancelar</button>
    </div>
  );
}
