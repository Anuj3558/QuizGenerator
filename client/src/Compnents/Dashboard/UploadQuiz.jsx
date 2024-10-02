"use client";

import React, { useState } from "react";
import { Button } from "../Home/ui/Button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../Home/ui/Card.jsx";
import { Label } from "../Home/ui/Lable.jsx";
import { Upload } from "lucide-react";

const UploadQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      text: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      id: 3,
      text: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Michelangelo",
      ],
      correctAnswer: "Leonardo da Vinci",
    },
  ]);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleUploadQuiz = () => {
    console.log("Uploading quiz:", { questions, selectedAnswers });
    // Implement your upload logic here
  };

  return (
    <div className="container mx-auto p-4 relative">
      <Button
        onClick={handleUploadQuiz}
        className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700"
      >
        <Upload className="mr-2 h-4 w-4" /> Upload Quiz
      </Button>
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
        Quiz Questions
      </h1>
      {questions.map((question) => (
        <Card key={question.id} className="mb-6 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-purple-300">
              {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[question.id] || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem
                    value={option}
                    id={`q${question.id}-option${index}`}
                    className="border-purple-400 text-purple-400"
                  />
                  <Label
                    htmlFor={`q${question.id}-option${index}`}
                    className="text-gray-300 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UploadQuiz;

// RadioGroup and RadioGroupItem components implementation

const RadioGroup = ({ value, onValueChange, children }) => {
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          checked: child.props.value === value,
          onChange: () => onValueChange(child.props.value),
        })
      )}
    </div>
  );
};

const RadioGroupItem = ({ value, id, className, checked, onChange }) => {
  return (
    <input
      type="radio"
      value={value}
      id={id}
      className={`form-radio ${className} ${checked ? "checked" : ""}`}
      checked={checked}
      onChange={onChange}
    />
  );
};
