import React, { useState, useContext } from "react";
import axios from "axios";
import pdfToText from "react-pdftotext";
import { Button } from "../Home/ui/Button";
import { Input } from "../Home/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../Home/ui/Card";
import { UserContext } from "../../Context/UserContext";
import { ThemeContext } from "../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Edit, Lightbulb } from "lucide-react";
import CreateManually from "./quiz/CreateManually";

const ManualQuestionInput = ({
  question,
  options,
  correctAnswer,
  onChange,
  index,
}) => (
  <div className="mb-4 space-y-2">
    <Input
      type="text"
      value={question}
      onChange={(e) => onChange(index, "question", e.target.value)}
      placeholder="Question"
    />
    {options.map((option, optionIndex) => (
      <Input
        key={optionIndex}
        type="text"
        value={option}
        onChange={(e) => onChange(index, "option", e.target.value, optionIndex)}
        placeholder={`Option ${optionIndex + 1}`}
      />
    ))}
    <Input
      type="text"
      value={correctAnswer}
      onChange={(e) => onChange(index, "correctAnswer", e.target.value)}
      placeholder="Correct Answer"
    />
  </div>
);

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
      name: "Create from Topic",
      icon: <Lightbulb className="h-4 w-4" />,
      id: "topic",
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
    } else {
      setIsModalOpen(true);
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
      topic: createMethod === "topic" ? topicInput : undefined,
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

  const handleManualQuestionChange = (index, field, value, optionIndex) => {
    const updatedQuestions = [...manualQuestions];
    if (field === "option") {
      updatedQuestions[index].options[optionIndex] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setManualQuestions(updatedQuestions);
  };

  const addManualQuestion = () => {
    setManualQuestions([
      ...manualQuestions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const submitQuiz = async () => {
    const requestData = {
      questions: generatedQuestions,
      fileName:
        createMethod === "notes"
          ? fileName
          : createMethod === "topic"
          ? topicInput
          : "Manual Questions",
      topic: createMethod === "topic" ? topicInput : undefined,
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {createOptions.map((option) => (
          <Button
            key={option.id}
            onClick={() => handleCreate(option.id)}
            disabled={!!createMethod && createMethod !== option.id} // Disable if another method is selected
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
                        onChange={(e) =>
                          setNumQuestions(Number(e.target.value))
                        }
                      />
                      <span>{num}</span>
                    </label>
                  ))}
                </div>
              </div>
              {createMethod === "topic" && (
                <div className="mb-4">
                  <label className="text-gray-300">Enter Topic</label>
                  <Input
                    type="text"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                  />
                </div>
              )}
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
                        onChange={(e) => setDifficulty(e.target.value)}
                      />
                      <span>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button onClick={generateQuestions} disabled={isLoading}>
                  {isLoading ? "Generating..." : "Generate Questions"}
                </Button>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      )}
      {generatedQuestions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white mb-4">Generated Questions:</h3>
          {generatedQuestions.map((q, index) => (
            <div key={index} className="mb-4">
              <strong className="text-gray-200">
                {index + 1}. {q.question}
              </strong>
              <ul className="list-disc list-inside text-gray-400">
                {q.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
          <Button onClick={submitQuiz}>Submit Quiz</Button>
        </div>
      )}
    </div>
  );
}
