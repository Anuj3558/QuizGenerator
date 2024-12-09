import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, User, UserCog } from 'lucide-react';
import { UserContext } from "../../Context/UserContext";

const Button = ({ children, className, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-4 px-6 rounded-full hover:from-blue-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-200 shadow-lg hover:shadow-xl ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export default function SelectUserType() {
  const navigate = useNavigate();
  const { usertype, setUserType } = useContext(UserContext);

  useEffect(() => {
    if (usertype === "NA") {
      navigate("/");
    }
  }, [usertype, navigate]);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    localStorage.setItem("userType", type);
    navigate("/form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-80">
          <div className="p-8">
            <h2 className="text-4xl font-extrabold text-center mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Select User Type
              </span>
            </h2>
            <div className="space-y-6">
              <Button onClick={() => handleUserTypeSelection("student")}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="mr-3" size={24} />
                    <span className="text-lg">Student</span>
                  </div>
                  <ChevronRight size={24} />
                </div>
              </Button>
              <Button onClick={() => handleUserTypeSelection("teacher")}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserCog className="mr-3" size={24} />
                    <span className="text-lg">Teacher</span>
                  </div>
                  <ChevronRight size={24} />
                </div>
              </Button>
            </div>
          </div>
          <div className="px-8 py-6 bg-gray-50 text-center rounded-b-3xl">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline font-semibold">
                Log in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

