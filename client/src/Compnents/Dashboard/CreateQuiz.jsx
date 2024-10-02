import React, { useState, useContext } from "react";
import axios from "axios";
import pdfToText from "react-pdftotext";
import { Button } from "../Home/ui/Button";
import { Input } from "../Home/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../Home/ui/Card";
import { UserContext } from "../../Context/UserContext";
import { ThemeContext } from "../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Edit } from "lucide-react";
import CreateManually from "./quiz/CreateManually";

export default function CreateQuiz() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("medium");
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topicInput, setTopicInput] = useState("");
  const [createMethod, setCreateMethod] = useState(null);
  const [manualQuestions, setManualQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [pdfText, setPdfText] = useState("");

  const createOptions = [
    {
      name: "Upload Notes",
      icon: <FileText className="h-4 w-4" />,
      id: "notes",
    },
    {
      name: "Create Manually",
      icon: <Edit className="h-4 w-4" />,
      id: "manual",
    },
  ];

  const { theme, setTheme, setSuccessMsg, setWarningMsg, setErrMsg } =
    useContext(ThemeContext);
  const navigate = useNavigate();
  const { uid } = useContext(UserContext);

  const handleCreate = (method) => {
    setCreateMethod(method);
    if (method === "notes") {
      document.getElementById("fileInput").click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setFileName(file.name);
      setIsModalOpen(true);
      setError(null);
      try {
        const text = await pdfToText(file);
        setPdfText(text);
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
        setError("Failed to extract text from PDF. Please try again.");
      }
    } else {
      setError("Please select a valid PDF file.");
    }
  };

  const generateQuestions = async () => {
    setIsLoading(true);
    setError(null);

    const requestData = {
      pdfText: createMethod === "notes" ? pdfText : undefined,
      fileName: createMethod === "notes" ? fileName : undefined,
      numQuestions,
      difficulty,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/generate-quiz`,
        requestData
      );
      setGeneratedQuestions(response.data.questions);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error generating questions:", error);
      setError(
        error.response?.data?.error ||
          "Failed to generate questions. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const submitQuiz = async () => {
    const requestData = {
      questions: generatedQuestions,
      fileName: createMethod === "notes" ? fileName : "Manual Questions",
      teacherId: uid,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/submit`,
        requestData
      );
      if (response) {
        setSuccessMsg("Test submitted successfully");
        setTheme("Success");
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError(
        error.response?.data?.error ||
          "Failed to submit quiz. Please try again."
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl backdrop-filter backdrop-blur-lg border border-gray-700">
      <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Create a Quiz
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {createOptions.map((option) => (
          <Button
            key={option.id}
            onClick={() => handleCreate(option.id)}
            className={`py-2 px-4 text-sm flex items-center justify-center transition-all duration-300 ease-in-out
              rounded-lg group relative overflow-hidden ${
                createMethod === option.id
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            <div className="flex items-center space-x-2 z-10">
              {option.icon}
              <span>{option.name}</span>
            </div>
            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
          </Button>
        ))}
      </div>
      <Input
        id="fileInput"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && (
        <div className="mt-4 p-4 bg-destructive text-destructive-foreground rounded-lg">
          {error}
        </div>
      )}
      {createMethod === "manual" ? (
        <CreateManually
          questions={manualQuestions}
          setQuestions={setManualQuestions}
        />
      ) : (
        isModalOpen && (
          <Card className="mt-6 bg-gray-800 bg-opacity-50">
            <CardHeader>
              <CardTitle className="text-white">Configure Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="text-gray-300">Number of Questions</label>
                <div className="flex flex-col">
                  {[5, 10, 15].map((num) => (
                    <label
                      key={num}
                      className="flex items-center space-x-2 text-gray-300"
                    >
                      <input
                        type="radio"
                        name="numQuestions"
                        value={num}
                        checked={numQuestions === num}
                        onChange={() => setNumQuestions(num)}
                        className="text-purple-500 focus:ring-purple-500"
                      />
                      <span>{num}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="text-gray-300">Difficulty</label>
                <div className="flex flex-col">
                  {["easy", "medium", "hard"].map((level) => (
                    <label
                      key={level}
                      className="flex items-center space-x-2 text-gray-300"
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={difficulty === level}
                        onChange={() => setDifficulty(level)}
                        className="text-purple-500 focus:ring-purple-500"
                      />
                      <span>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end mt-4">
              <Button
                onClick={generateQuestions}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? "Loading..." : "Generate Questions"}
              </Button>
            </div>
          </Card>
        )
      )}
      {generatedQuestions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Generated Questions
          </h2>
          {generatedQuestions.map((q, index) => (
            <div key={index} className="mb-6 bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">
                {index + 1}. {q.text}
              </h3>
              <ul className="mt-2 space-y-1">
                {q.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="text-gray-300">
                    {option}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-bold text-purple-400">
                Correct Answer: {q.correctAnswer}
              </p>
            </div>
          ))}
          <div className="flex justify-end mt-6">
            <Button
              onClick={submitQuiz}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
