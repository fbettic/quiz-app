import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import quizSetsRoutes from "./routes/quizSets.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/quiz-sets", quizSetsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Servidor en puerto", process.env.PORT);
});
