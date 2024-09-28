import React, { useState } from "react";
import { Button } from "../Home/ui/Button";
import { Input } from "../Home/ui/Input";
import { motion } from "framer-motion";

const JoinClassroom = () => {
  const [classCode, setClassCode] = useState("");

  const handleJoinClassroom = (e) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to join the classroom
    console.log(`Joining classroom with code: ${classCode}`);
    // Reset the input field after submission
    setClassCode("");
  };

  return (
    <motion.div
      className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto mt-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
        Join a Classroom
      </h2>
      <form onSubmit={handleJoinClassroom} className="space-y-4">
        <div>
          <label
            htmlFor="classCode"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Class Code
          </label>
          <Input
            id="classCode"
            type="text"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            placeholder="Enter class code"
            required
            className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 transition-colors duration-300">
          Join Classroom
        </Button>
      </form>
    </motion.div>
  );
};

export default JoinClassroom;
