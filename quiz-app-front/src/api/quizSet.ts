import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getQuizSets = () => api.get("/quiz-sets");
export const getQuizSet = (id: string) => api.get(`/quiz-sets/${id}`);
export const createQuizSet = (data: unknown) => api.post("/quiz-sets", data);
export const deleteQuizSet = (id: string) => api.delete(`/quiz-sets/${id}`);
