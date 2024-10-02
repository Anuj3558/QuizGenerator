import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Quiz from "../model/QuizModel.js";

const api = process.env.API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyDkd5EeKWI7BZz9Fv2dFiSkEZGdqvhc5pk");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GenerateQuiz = async (req, res) => {
  try {
    const { pdfText, topic, numQuestions, difficulty } = req.body;

    // 1. Construct the appropriate prompt based on the availability of topic or pdfText
    const prompt = topic
      ? `You are a quiz generator AI. Please generate ${numQuestions} questions related to the topic "${topic}" at a "${difficulty}" difficulty level. 
            For each question, provide the following structure:
            - A question text
            - An array of 4 answer options (label them A, B, C, and D)
            - The correct answer (indicate the letter of the correct option, e.g., "A")
    
            Make sure the questions are clear, concise, and appropriate for the specified difficulty level. Here’s an example of the output format you should follow:
    
            [
                {
                    "text": "What is the capital of France?",
                    "options": ["A: Paris", "B: Berlin", "C: Rome", "D: Madrid"],
                    "correctAnswer": "A"
                }
            ]`
      : `You are a quiz generator AI. Please generate ${numQuestions} questions related to the text "${pdfText}" at a "${difficulty}" difficulty level. 
            For each question, provide the following structure:
            - A question text
            - An array of 4 answer options (label them A, B, C, and D)
            - The correct answer (indicate the letter of the correct option, e.g., "A")
    
            Make sure the questions are clear, concise, and appropriate for the specified difficulty level. Here’s an example of the output format you should follow:
    
            [
                {
                    "text": "What is the capital of France?",
                    "options": ["A: Paris", "B: Berlin", "C: Rome", "D: Madrid"],
                    "correctAnswer": "A"
                }
            ]`;

    // 2. Generate questions using the model
    const generatedContent = await model.generateContent(prompt);

    // Get the content parts from the response
    const json = generatedContent.response.candidates[0].content.parts;

    // Remove backticks and clean up the response
    const cleanedText = json[0].text.replace(/`/g, "").slice(4); // Remove backticks if they exist
    console.log(cleanedText);
    // Parse the cleaned text into JSON
    const questions = JSON.parse(cleanedText); // Assuming the model returns a valid JSON string

    // 3. Prepare questions for insertion
    const questionDocuments = questions.map((question) => ({
      text: question.text,
      options: question.options,
      correctAnswer: question.correctAnswer,
      difficulty,
      topic,
      createdAt: new Date(),
    }));

    // 4. Insert questions into MongoDB
    console.log(questionDocuments);

    // 5. Send a response back to the client
    res.status(200).json({ success: true, questions: questionDocuments });
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate questions. Please try again.",
    });
  }
};

const submitQuiz = async (req, res) => {
  try {
    // Extract data from the request body
    const { fileName, questions, teacherId, deadline } = req.body;
    console.log(req.body);

    // Validate the incoming data
    if (!fileName || !questions || !teacherId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new Quiz instance
    const newQuiz = new Quiz({
      fileName,
      questions,
      teacherId,
      deadline,
    });

    // Save the quiz to the database
    await newQuiz.save();

    // Respond with success
    return res
      .status(201)
      .json({ message: "Quiz created successfully!", quiz: newQuiz });
  } catch (error) {
    // Handle errors
    console.error("Error creating quiz:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const generateMannually = async (req, res) => {
  console.log(req.body);
  try {
    // Extract data from the request body
    const { questions, userId } = req.body;

    // Validate the incoming data
    if (!questions || !userId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Prepare questions for insertion
    const questionDocuments = questions.map((q) => ({
      text: q.question,
      options: q.options,
      correctAnswer: q.options[q.correctOptionIndex], // Get the correct option based on the index
      difficulty: "mannual", // Set difficulty to manual
      createdAt: new Date(),
    }));

    // Set the fileName
    const fileName = `Quiz_${Date.now()}`; // Generating a unique filename based on the current timestamp

    // Create a new Quiz instance
    const newQuiz = new Quiz({
      fileName,
      questions: questionDocuments, // Use prepared question documents
      teacherId: userId,
    });

    // Save the quiz to the database
    await newQuiz.save();

    // Respond with success
    return res
      .status(201)
      .json({ message: "Quiz created successfully!", quiz: newQuiz });
  } catch (error) {
    // Handle errors
    console.error("Error creating quiz:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export { GenerateQuiz, submitQuiz, generateMannually };