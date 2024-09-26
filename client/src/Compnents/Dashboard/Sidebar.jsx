import React, { useState } from "react";
import { Button } from "../Home/ui/Button.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileUp, NotebookPen, User, BarChart } from "lucide-react";

export default function Sidebar({ activeSection, setActiveSection }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const sidebarItems = [
  { name: "Profile", id: "profile", icon: <User className="h-4 w-4" /> },
  {
    name: "Create Quiz",
    id: "create-quiz",
    icon: <FileUp className="h-4 w-4" />,
  },
  {
    name: "Quizzes",
    id: "quizzes", // Change this to "quizzes"
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    name: "Create Classroom",
    id: "create-classroom",
    icon: <NotebookPen className="h-4 w-4" />,
  },
];


  const SidebarButton = ({ item, onClick }) => (
    <Button
      key={item.id}
      variant="ghost"
      className={`w-full justify-start text-left transition-all duration-300 ease-in-out 
        ${activeSection === item.id ? "bg-gray-700" : ""}
        hover:bg-gray-700 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50
        group relative overflow-hidden`}
      onClick={onClick}
    >
      <div className="flex items-center justify-start">
        <div className="justify-start mr-2">{item.icon}</div>
        {item.name}
      </div>
      <div className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      <div className="absolute left-0 top-0 h-full w-1 bg-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
    </Button>
  );

  return (
    <>
      {/* Static Sidebar for Large Screens */}
      <div className="hidden md:block w-64 bg-gray-800 h-full p-4 border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-left">AI Quiz Gen</h2>
        <nav className="space-y-4">
          {sidebarItems.map((item) => (
            <SidebarButton
              key={item.id}
              item={item}
              onClick={() => setActiveSection(item.id)}
            />
          ))}
        </nav>
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
                <h2 className="text-2xl font-bold text-left">AI Quiz Gen</h2>
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
