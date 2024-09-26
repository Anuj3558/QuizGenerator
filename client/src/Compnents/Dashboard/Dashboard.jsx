import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProfilePage from "./ProfilePage";
import CreateQuiz from "./CreateQuiz";

import CreateClassroom from "./CreateClassroom";
import Quizzes from "./Quizzes";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const renderSection = () => {
  switch (activeSection) {
    case "profile":
      return <ProfilePage />;
    case "create-quiz":
      return <CreateQuiz />;
    case "quizzes": // Ensure this matches the sidebar ID
      return <Quizzes />;
    case "create-classroom":
      return <CreateClassroom />;
    default:
      return <ProfilePage />;
  }
};

  return (
    <div className="flex h-screen pt-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div
        className={`flex-1 p-4 md:p-8 overflow-auto ${
          isSidebarOpen ? "bg-opacity-30" : ""
        }`}
      >
        {/* Button to open the sidebar on mobile */}
        <button
          className="md:hidden p-2 bg-gray-800 rounded"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Toggle Sidebar
        </button>

        {/* Render the active section */}
        {renderSection()}
      </div>
    </div>
  );
}
