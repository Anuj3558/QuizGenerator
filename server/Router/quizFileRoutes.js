
import express from "express";
import {
  GenerateQuiz,
  submitQuiz,
  generateMannually,
} from "../controller/QuizController.js";
// Multer configuration

const QuizRouter = express.Router();

QuizRouter.post("/generate-quiz", GenerateQuiz);
QuizRouter.post("/submit", submitQuiz);
QuizRouter.post("/generate-manually", generateMannually);


export default QuizRouter;
