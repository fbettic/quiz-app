import express from 'express';
import QuizSet from '../models/QuizSet.js';

const router = express.Router();

// Crear set desde JSON completo
router.post('/', async (req, res) => {
  try {
    const quizSet = new QuizSet(req.body);
    await quizSet.save();
    res.json(quizSet);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Listar sets
router.get('/', async (req, res) => {
  const sets = await QuizSet.find({}, 'title description');
  res.json(sets);
});

// Obtener un set con preguntas
router.get('/:id', async (req, res) => {
  const set = await QuizSet.findById(req.params.id);
  res.json(set);
});

export default router;
