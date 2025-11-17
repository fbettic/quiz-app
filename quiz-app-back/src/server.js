import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import quizSetsRoutes from './routes/quizSets.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/quiz-sets', quizSetsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => {
  console.log('Servidor en puerto', process.env.PORT);
});
