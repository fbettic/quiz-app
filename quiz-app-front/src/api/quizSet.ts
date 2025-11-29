import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getQuizSets = () => api.get("/quiz-sets");
export const getQuizSet = (id: string, limit: number = 10) => api.get(`/quiz-sets/${id}?limit=${limit}`);
export const createQuizSet = (data: unknown) => api.post("/quiz-sets", data);
export const deleteQuizSet = (id: string) => api.delete(`/quiz-sets/${id}`);
export const sendAnswer = (
  setId: string,
  questionId: string,
  correct: boolean
) => api.patch(`/quiz-sets/${setId}/questions/${questionId}`, { correct });
