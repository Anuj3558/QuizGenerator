import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Change here
import { motion } from "framer-motion";
import { ChevronRight, User, UserCog } from "lucide-react";
import { UserContext } from "../../Context/UserContext";

const Button = ({ children, className, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export default function SelectUserType() {
  const navigate = useNavigate(); // Change here
  const { usertype, setUserType } = useContext(UserContext);

  useEffect(() => {
    if (usertype === "NA") {
      navigate("/");
    }
  }, []);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    localStorage.setItem("userType", type);
    navigate("/form"); // Change here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-center mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Select User Type
              </span>
            </h2>
            <div className="space-y-6">
              <Button onClick={() => handleUserTypeSelection("student")}>
                <User className="inline-block mr-2" size={18} />
                Student
                <ChevronRight className="inline-block ml-2" size={18} />
              </Button>
              <Button onClick={() => handleUserTypeSelection("teacher")}>
                <UserCog className="inline-block mr-2" size={18} />
                Teacher
                <ChevronRight className="inline-block ml-2" size={18} />
              </Button>
            </div>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
