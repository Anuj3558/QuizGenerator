import React from "react";
import { Button } from "../Home/ui/Button.jsx";
import { Upload, FileText, Edit } from "lucide-react";

export default function CreateQuiz() {
  const createOptions = [
    {
      name: "Upload Syllabus",
      icon: <Upload className="h-4 w-4" />,
      id: "syllabus",
    },
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

  const handleCreate = (method) => {
    console.log(`Creating quiz using ${method}`);
    // Add your logic here for each creation method
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl backdrop-filter backdrop-blur-lg border border-gray-700">
      <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Create a Quiz
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {createOptions.map((option) => (
          <Button
            key={option.id}
            onClick={() => handleCreate(option.id)}
            className="py-2 px-4 text-sm flex items-center justify-center transition-all duration-300 ease-in-out 
              bg-gray-800 hover:bg-gray-700 rounded-lg
              group relative overflow-hidden"
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
      <div className="mt-8 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
        <p className="text-gray-300 text-center">
          Select a method above to start creating your quiz.
        </p>
      </div>
    </div>
  );
}
