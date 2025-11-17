import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000'
});

export const getQuizSets = () => api.get('/quiz-sets');
export const getQuizSet = (id: string) => api.get(`/quiz-sets/${id}`);
