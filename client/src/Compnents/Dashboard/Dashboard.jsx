import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProfilePage from "./ProfilePage";
import CreateQuiz from "./CreateQuiz";
import Quizzes from "./Quizzes";
import Classrooms from "./Classrooms";
import JoinClassroom from "./JoinClassroom";

export default function Dashboard({ userType = "student" }) {
  const [activeSection, setActiveSection] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfilePage userType={userType} />;
      case "create-quiz":
        return userType === "teacher" ? <CreateQuiz /> : null;
      case "quizzes":
        return userType === "teacher" ? <Quizzes /> : null;
      case "classrooms":
        return <Classrooms userType={userType} />; // Added return statement here
      default:
        return <ProfilePage userType={userType} />;
    }
  };

  return (

    <div className="flex h-screen pt-24 bg-gradient-to-br from-gray-900  to-black text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userType={userType} // Pass userType to the sidebar
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
