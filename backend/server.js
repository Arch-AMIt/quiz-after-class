import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import { generateQuiz } from "./llm.js";
import { quizzes } from "./quizStore.js";

const app = express();
app.use(cors());
app.use(express.json());

// Create quiz
app.post("/api/quiz", async (req, res) => {
  const { subject, topic, difficulty } = req.body;

  const questions = await generateQuiz(subject, topic, difficulty);
  const quizId = uuid();

  quizzes.set(quizId, {
    quizId,
    questions
  });

  res.json({ quizId });
});

// Get quiz (without answers)
app.get("/api/quiz/:id", (req, res) => {
  const quiz = quizzes.get(req.params.id);
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });

  const safeQuestions = quiz.questions.map(q => ({
    question: q.question,
    options: q.options
  }));

  res.json({ questions: safeQuestions });
});

// Submit quiz
app.post("/api/quiz/:id/submit", (req, res) => {
  const quiz = quizzes.get(req.params.id);
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });

  const { answers } = req.body;
  let score = 0;

  quiz.questions.forEach((q, i) => {
    if (q.correctAnswer === answers[i]) score++;
  });

  res.json({ score, total: quiz.questions.length });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
