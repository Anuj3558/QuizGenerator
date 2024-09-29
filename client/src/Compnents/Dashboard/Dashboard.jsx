import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import ProfilePage from "./ProfilePage";
import CreateQuiz from "./CreateQuiz";
import Quizzes from "./Quizzes";
import Classrooms from "./Classrooms";
import { UserContext } from "../../Context/UserContext"; // Import UserContext

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userType, isLoggedIn } = useContext(UserContext); // Use UserContext
  // const userType = "teacher"; ;
  // Log userType for debugging
  console.log("D ut->", userType);
  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfilePage userType={userType} />;
      case "create-quiz":
        return userType == "Teacher" ? <CreateQuiz /> : null;
      case "quizzes":
        return userType == "Teacher" ? <Quizzes /> : null;
      case "classrooms":
        return <Classrooms userType={userType} />;
      default:
        return <ProfilePage userType={userType} />;
    }
  };

  return (
    <div className="flex h-screen pt-24 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userType={userType}
      />

      {/* Main Content */}
      <div
        className={`flex-1 p-4 md:p-8 overflow-auto ${
          isSidebarOpen ? "bg-opacity-30" : ""
        }`}
      >
        {renderSection()}
      </div>
    </div>
  );
}
