import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  answer: String,
  correct: Boolean
});

const questionSchema = new mongoose.Schema({
  question: String,
  answers: [answerSchema],
});

const quizSetSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [questionSchema]
});

export default mongoose.model('quiz_set', quizSetSchema);
