import mongoose from 'mongoose';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Quiz from '../model/QuizModel.js';
console.log(process.env.API_KEY);
const api = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GenerateQuiz = async (req, res) => {
    console.log(process.env.API_KEY);
    try {
        const { pdfText, topic, numQuestions, difficulty } = req.body;
   

        // 1. Construct the prompt
        const prompt = `
        You are a quiz generator AI. Please generate ${numQuestions} questions related to the text "${pdfText}" at a "${difficulty}" difficulty level. 
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
            },
            {
                "text": "What is the boiling point of water?",
                "options": ["A: 100°C", "B: 90°C", "C: 80°C", "D: 110°C"],
                "correctAnswer": "A"
            }
        ]
        `;

        // 2. Generate questions using the model
        const generatedContent = await model.generateContent(prompt);
       
        // Get the content parts from the response
        const json = generatedContent.response.candidates[0].content.parts;

        // Remove backticks and clean up the response
        const cleanedText = json[0].text.replace(/`/g, ""); // Remove backticks if they exist
        
        // Parse the cleaned text into JSON
        const questions = JSON.parse(cleanedText.slice(4)); // Assuming the model returns a valid JSON string starting after "```json"

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
        console.error('Error generating questions:', error);
        res.status(500).json({ success: false, error: 'Failed to generate questions. Please try again.' });
    }
};


 // Adjust the path and file extension as needed

const submitQuiz = async (req, res) => {
  try {
    // Extract data from the request body
    const { fileName, questions, teacherId, deadline } = req.body;
    console.log(req.body)
    // Validate the incoming data
    if (!fileName || !questions || !teacherId ) {
      return res.status(400).json({ message: 'All fields are required.' });
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
    return res.status(201).json({ message: 'Quiz created successfully!', quiz: newQuiz });
  } catch (error) {
    // Handle errors
    console.error('Error creating quiz:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export {GenerateQuiz,submitQuiz};
