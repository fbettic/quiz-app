import express from "express";
import QuizSet from "../models/QuizSet.js";

const router = express.Router();

// Crear set desde JSON completo
router.post("/", async (req, res) => {
  try {
    const quizSet = new QuizSet(req.body);
    await quizSet.save();
    res.json(quizSet);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Listar sets
router.get("/", async (req, res) => {
  const sets = await QuizSet.find({}, "title description");
  res.json(sets);
});

// Obtener un set con preguntas (opcional: filtrar por cantidad y ordenar por peor score)
router.get("/:id", async (req, res) => {
  try {
    const set = await QuizSet.findById(req.params.id);

    if (!set) {
      return res.status(404).json({ error: "Set no encontrado" });
    }

    let questions = set.questions;

    // Ordenar por score ascendente (peor score primero)
    questions = questions.sort((a, b) => (a.score || 0) - (b.score || 0));

    // Si se proporciona el parámetro limit, limitar la cantidad de preguntas
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    if (limit && limit > 0) {
      questions = questions.slice(0, limit);
    }

    res.json({
      ...set.toObject(),
      questions,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Informar respuesta correcta o incorrecta
router.patch("/:setId/questions/:questionId", async (req, res) => {
  try {
    const answer = req.body.correct;
    const score = answer ? 1 : -1;
    const updatedSet = await QuizSet.findByIdAndUpdate(
      req.params.setId,
      { $inc: { "questions.$[q].score": score } },
      { arrayFilters: [{ "q._id": req.params.questionId }], new: true }
    );
    res.json(updatedSet);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Eliminar un set
router.delete("/:id", async (req, res) => {
  try {
    const deletedSet = await QuizSet.findByIdAndDelete(req.params.id);
    if (!deletedSet) {
      return res.status(404).json({ error: "Set no encontrado" });
    }
    res.json({ message: "Set eliminado correctamente", deletedSet });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
