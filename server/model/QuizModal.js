import mongoose from "mongoose";

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of strings for options
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true, 
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard","mannual"],
    default: "medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the schema for the quiz
const quizSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    questions: [questionSchema], // Array of questions using the questionSchema
    teacherId: {
      type: String,
      required: true, // Assuming you have a Teacher model
    },
    topic: {
      type: String,
      default: null,
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the model from the schema
const Quiz = mongoose.model("Quiz", quizSchema);

// Export the Quiz model
export default Quiz;
