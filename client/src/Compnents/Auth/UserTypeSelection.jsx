import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, ChevronRight } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useAuth } from "../../Context/AuthContext";

export default function UserTypeSelection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userTypes = [
    {
      type: "Teacher",
      icon: BookOpen,
      description: "Create quizzes, manage classes, and track student progress",
      gradient: "from-blue-400 to-indigo-600",
    },
    {
      type: "Student",
      icon: GraduationCap,
      description:
        "Take quizzes, view results, and track your learning journey",
      gradient: "from-teal-400 to-emerald-600",
    },
  ];

  const handleUserTypeSelection = async (userType) => {
    try {
      const token = Cookie.get("_id");
      console.log(token);

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/setUserType`,
        {
          userType,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.reload();
      localStorage.setItem("userType", userType);
      navigate(`/`);
    } catch (error) {
      console.error("Error sending user type:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 flex flex-col items-center justify-center p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      >
        Automated Quiz Generation Tool
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl md:text-2xl text-gray-600 mb-12 text-center max-w-2xl"
      >
        Select your role to enter the future of education
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {userTypes.map((userType, index) => (
          <motion.div
            key={userType.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <button
              className={`w-full h-64 bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-${
                userType.gradient.split("-")[1]
              }-400 group`}
              onClick={() => handleUserTypeSelection(userType.type)}
              aria-label={`Select ${userType.type} role`}
            >
              <div
                className={`mb-4 p-3 rounded-full bg-gradient-to-br ${userType.gradient} text-white`}
              >
                <userType.icon size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{userType.type}</h2>
              <p className="text-gray-600 mb-4">{userType.description}</p>
              <div className={`flex items-center text-sm font-semibold text-${userType.gradient.split("-")[1]}-500 group-hover:text-${userType.gradient.split("-")[1]}-600`}>
                Enter as {userType.type}{" "}
                <ChevronRight size={16} className="ml-1" />
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

