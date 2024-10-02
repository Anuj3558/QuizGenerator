import express from 'express';
import {GenerateQuiz, submitQuiz} from '../controller/QuizController.js';
 // Multer configuration

const QuizRouter = express.Router();

QuizRouter.post('/generate-quiz', GenerateQuiz);
QuizRouter.post('/submit', submitQuiz);
export default QuizRouter;
