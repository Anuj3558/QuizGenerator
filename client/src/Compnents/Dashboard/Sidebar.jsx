import React from "react";
import { Button } from "../Home/ui/Button.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  BookOpen,
  PlusCircle,
  Users,
  LogOut,
} from "lucide-react";

export default function Sidebar({
  activeSection,
  setActiveSection,
  isSidebarOpen,
  setIsSidebarOpen,
  userType,
}) {
  // Sidebar items based on user type
  const sidebarItems =
    userType === "teacher"
      ? [
          { id: "profile", icon: User, label: "Profile" },
          { id: "create-quiz", icon: PlusCircle, label: "Create Quiz" },
          { id: "quizzes", icon: BookOpen, label: "Quizzes" },
          { id: "classrooms", icon: Users, label: "Classrooms" },
        ]
      : [
          { id: "profile", icon: User, label: "Profile" },
          { id: "classrooms", icon: Users, label: "Classrooms" },
        ];

  const SidebarButton = ({ item, onClick }) => (
    <Button
      variant="ghost"
      className={`w-full justify-start text-left transition-all duration-300 ease-in-out 
        ${activeSection === item.id ? "bg-gray-700" : ""} 
        group relative overflow-hidden 
        hover:scale-105 hover:bg-gray-700`}
      onClick={onClick}
    >
      <div className="flex items-center justify-start">
        <div className="justify-start mr-2">
          {<item.icon className="h-4 w-4" />}
        </div>
        {item.label}
      </div>

      {/* Glowing Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute left-0 top-0 h-full w-1 bg-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
    </Button>
  );

  return (
    <>
      {/* Static Sidebar for Large Screens */}
      <div className="hidden md:block w-64  bg-gray-800 h-full p-4 border-r border-gray-700">
        
        <nav className="space-y-4">
          {sidebarItems.map((item) => (
            <SidebarButton
              key={item.id}
              item={item}
              onClick={() => setActiveSection(item.id)}
            />
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <button
            onClick={() => {
              // Handle logout logic here
            }}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Sidebar for Mobile/Tablet */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed top-0 left-0 z-40 h-full w-64 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-r border-gray-700 overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-left text-purple-500">
                  AI Quiz Gen
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  className="hover:bg-gray-700 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="space-y-4">
                {sidebarItems.map((item) => (
                  <SidebarButton
                    key={item.id}
                    item={item}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsSidebarOpen(false);
                    }}
                  />
                ))}
              </nav>
              <div className="absolute bottom-4 left-4">
                <button
                  onClick={() => {
                    // Handle logout logic here
                  }}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 hover:bg-gray-700 hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <Menu className="h-6 w-6" />
      </Button>
    </>
  );
}
