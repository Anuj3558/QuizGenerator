import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadQuiz from "./UploadQuiz"; // Import the UploadQuiz component

const scheduledQuizzes = [
  { id: 1, title: "Math Quiz", date: "2024-09-30" },
  { id: 2, title: "Science Quiz", date: "2024-10-05" },
];

const previousQuizzes = [
  { id: 3, title: "History Quiz", score: "85%" },
  { id: 4, title: "Geography Quiz", score: "90%" },
];

export default function Quizzes() {
  const [activeTab, setActiveTab] = useState("scheduled");
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Add state to track selected quiz

  const TabButton = ({ label, isActive, onClick }) => (
    <button
      className={`px-4 py-2 rounded-lg transition duration-300 ${
        isActive
          ? "bg-purple-600 text-white"
          : "text-gray-400 hover:bg-gray-800"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const QuizList = ({ quizzes, scoreKey }) => (
    <ul className="space-y-2">
      {quizzes.map((quiz) => (
        <li
          key={quiz.id}
          className="flex justify-between bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-purple-700 transition duration-200"
          onClick={() => setSelectedQuiz(quiz)} // Set the selected quiz on click
        >
          <span className="text-white">{quiz.title}</span>
          <span className="text-gray-400">{quiz[scoreKey]}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* If a quiz is selected, show the UploadQuiz component */}
      {selectedQuiz ? (
        <>
          <h2 className="text-white text-2xl mb-4">{selectedQuiz.title}</h2>
          <UploadQuiz /> {/* Render the UploadQuiz component */}
          <button
            onClick={() => setSelectedQuiz(null)} // Go back to quiz list
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Back to Quiz List
          </button>
        </>
      ) : (
        <>
          <div className="flex space-x-4 mb-4">
            <TabButton
              label="Scheduled Quizzes"
              isActive={activeTab === "scheduled"}
              onClick={() => setActiveTab("scheduled")}
            />
            <TabButton
              label="Previous Quizzes"
              isActive={activeTab === "previous"}
              onClick={() => setActiveTab("previous")}
            />
          </div>

          <div className="mt-4">
            {activeTab === "scheduled" ? (
              <QuizList quizzes={scheduledQuizzes} scoreKey="date" />
            ) : (
              <QuizList quizzes={previousQuizzes} scoreKey="score" />
            )}
          </div>
        </>
      )}
    </div>
  );
}
