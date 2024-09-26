import React, { useState } from "react";
import { Tab } from "@headlessui/react"; // Ensure you have headlessui installed
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const scheduledQuizzes = [
  { id: 1, title: "Math Quiz", date: "2024-09-30" },
  { id: 2, title: "Science Quiz", date: "2024-10-05" },
];

const previousQuizzes = [
  { id: 3, title: "History Quiz", score: "85%" },
  { id: 4, title: "Geography Quiz", score: "90%" },
];

export default function Quizzes() {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-4">
          <Tab
            className={({ selected }) =>
              `px-4 py-2 rounded-lg transition duration-300 ${
                selected ? "bg-purple-600 text-white" : "text-gray-400"
              }`
            }
          >
            Scheduled Quizzes
          </Tab>
          <Tab
            className={({ selected }) =>
              `px-4 py-2 rounded-lg transition duration-300 ${
                selected ? "bg-purple-600 text-white" : "text-gray-400"
              }`
            }
          >
            Previous Quizzes
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <ul className="space-y-2">
              {scheduledQuizzes.map((quiz) => (
                <li
                  key={quiz.id}
                  className="flex justify-between bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-purple-700 transition duration-200"
                  onClick={() => navigate(`/quiz-analysis`)} // Use navigate instead of history.push
                >
                  <span className="text-white">{quiz.title}</span>
                  <span className="text-gray-400">{quiz.date}</span>
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel>
            <ul className="space-y-2">
              {previousQuizzes.map((quiz) => (
                <li
                  key={quiz.id}
                  className="flex justify-between bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-purple-700 transition duration-200"
                  onClick={() => navigate(`/quiz-analysis`)} // Use navigate instead of history.push
                >
                  <span className="text-white">{quiz.title}</span>
                  <span className="text-gray-400">{quiz.score}</span>
                </li>
              ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
