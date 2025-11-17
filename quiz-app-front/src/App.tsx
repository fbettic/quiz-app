import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizSetCreate from "./pages/QuizSetCreate.tsx";
import QuizSetDetail from "./pages/QuizSetDetail.tsx";
import QuizSetList from "./pages/QuizSetList.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizSetList />} />
        <Route path="/set/:id" element={<QuizSetDetail />} />
        <Route path="/create" element={<QuizSetCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
