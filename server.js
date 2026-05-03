 import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;

const quiz = [
  {
    question: "Capital of India?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    answer: "Delhi"
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  }
];

app.get("/api/quiz", (req, res) => {
  res.json(quiz.map(q => ({
    question: q.question,
    options: q.options
  })));
});

app.post("/api/submit", (req, res) => {
  const { answers } = req.body;

  let score = 0;
  answers.forEach((ans, i) => {
    if (ans === quiz[i].answer) score++;
  });

  res.json({ score, total: quiz.length });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
