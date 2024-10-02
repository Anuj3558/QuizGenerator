import React from "react";
import { Button } from "../../Home/ui/Button.jsx";
import { Input } from "../../Home/ui/Input.jsx";
import { Card, CardContent } from "../../Home/ui/Card.jsx";
import { Trash2, GripVertical, PlusCircle } from "lucide-react";
import TextArea from "../../Home/ui/Textarea.jsx";
import axios from "axios";
import Cookie from "js-cookie";
import { useAuth } from "../../../Context/AuthContext.js";

const CreateManually=({ questions = [], setQuestions })=> {
    const { user } = useAuth();
  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { question: "", options: ["", ""], correctOptionIndex: 0 }, // Initialize correctOptionIndex
    ]);
  };

  const removeQuestion = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  const updateQuestion = (index, field, value) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value,
      };
      return newQuestions;
    });
  };

  const addOption = (questionIndex) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].options.push("");
      return newQuestions;
    });
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].options[optionIndex] = value;
      return newQuestions;
    });
  };

  const removeOption = (questionIndex, optionIndex) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      if (newQuestions[questionIndex].options.length > 2) {
        newQuestions[questionIndex].options = newQuestions[
          questionIndex
        ].options.filter((_, i) => i !== optionIndex);
      }
      return newQuestions;
    });
  };

  const handleGenerateQuiz = async () => {
    const token = Cookie.get("_id");
    console.log(questions);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/generate-manually`,
        { 
            questions,
            userId:user.uid
         },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions([]);
      // Handle response
      console.log(response.data);
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  const updateCorrectOption = (questionIndex, value) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].correctOptionIndex = value;
      return newQuestions;
    });
  };

  return (
    <div className="space-y-6">
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <Card key={index} className="bg-gray-800 bg-opacity-50">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <GripVertical className="h-5 w-5 text-gray-500 cursor-move" />
                  <h3 className="text-lg font-semibold text-purple-400">
                    Question {index + 1}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeQuestion(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
              <TextArea
                placeholder="Enter your multiple choice question"
                value={q.question}
                onChange={(e) =>
                  updateQuestion(index, "question", e.target.value)
                }
                className="w-full bg-gray-700 border-gray-600 focus:border-purple-500 focus:ring-purple-500"
              />
              <div className="space-y-2">
                {q.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <Input
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        updateOption(index, optionIndex, e.target.value)
                      }
                      className="flex-grow bg-gray-700 border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                    />
                    {q.options.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index, optionIndex)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Input
                      type="radio"
                      checked={q.correctOptionIndex === optionIndex}
                      onChange={() => updateCorrectOption(index, optionIndex)}
                      className="h-4 w-4 text-purple-500"
                    />
                  </div>
                ))}
                <Button
                  onClick={() => addOption(index)}
                  variant="outline"
                  className="w-full mt-2"
                >
                  Add Option
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center text-gray-400">
          No questions added yet. Click "Add Question" to start.
        </div>
      )}
      <Button
        onClick={addQuestion}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
      >
        <PlusCircle className="h-5 w-5 mr-2" />
        Add Question
      </Button>
      {questions.length > 0 && (
        <Button
          onClick={handleGenerateQuiz}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Generate Quiz
        </Button>
      )}
    </div>
  );
}
export default CreateManually;