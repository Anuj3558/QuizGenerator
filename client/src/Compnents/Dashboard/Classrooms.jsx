import React, { useContext, useState, useEffect } from "react";
import { Button } from "../Home/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  ArrowLeft,
  Video,
  BookOpen,
  FileText,
  GraduationCap,
} from "lucide-react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";
import ClassroomDetail from "./ClassroomDetails.jsx";

export default function Classrooms({ userType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classroomName, setClassroomName] = useState("");
  const [classroomCode, setClassroomCode] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const { uid, fullName } = useContext(UserContext);

  // Fetch classrooms on component mount
  useEffect(() => {
    const fetchClassrooms = async () => {
      const token = Cookie.get("_id");

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/user/get-classrooms`,
          { teacherId: uid },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.classrooms) {
          setClassrooms(response.data.classrooms); // Assuming the backend returns an array of classrooms
        } else {
          console.log("Error fetching classrooms: " + response.data.message);
        }
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };

    fetchClassrooms();
  }, []);

  const createClassroom = async () => {
    const token = Cookie.get("_id");

    // Create a classroom object with necessary fields
    const classroom = {
      teacherId: uid,
      classroomName,
      teacherName: fullName,
      content: {
        videos: [],
        notes: [],
        announcements: [],
        syllabus: [],
      },
    };

    // Validate the classroom data
    console.log(classroomName, fullName, uid);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/create-classroom`,
        { classroom },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        console.log("Classroom created successfully!");
        setClassrooms((prevClassrooms) => [
          ...prevClassrooms,
          response.data.classroom, // Add the new classroom to the existing list
        ]);
        setClassroomName("");
        setIsModalOpen(false);
      } else {
        console.log("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating classroom:", error);
      console.log("Failed to create classroom: " + error.message);
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "Teacher") {
      createClassroom(); // Moved classroom creation logic here
    } else {
      // For students, add classroom logic if needed
    }
  };

  const updateClassroom = (updatedClassroom) => {
    setClassrooms((prevClassrooms) =>
      prevClassrooms.map((classroom) =>
        classroom.code === updatedClassroom.code ? updatedClassroom : classroom
      )
    );
    setSelectedClassroom(updatedClassroom);
  };

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-gray-900 rounded-xl to-black text-white">
      {!selectedClassroom && (
        <Button
          className="border border-purple-500 hover:scale-105 hover:bg-purple-500/50 transition-all duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          {userType === "Teacher" ? "Create Classroom" : "Join Classroom"}
        </Button>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                {userType === "Teacher"
                  ? "Create a Classroom"
                  : "Join a Classroom"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    {userType === "Teacher"
                      ? "Classroom Name"
                      : "Classroom Code"}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={
                      userType === "Teacher" ? classroomName : classroomCode
                    }
                    onChange={(e) =>
                      userType === "Teacher"
                        ? setClassroomName(e.target.value)
                        : setClassroomCode(e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
                  >
                    {userType === "Teacher" ? "Create" : "Join"}
                  </Button>
                  <Button
                    className="bg-gray-500 hover:bg-gray-600 transition-colors duration-300"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedClassroom ? (
        <ClassroomDetail
          classroom={selectedClassroom}
          setSelectedClassroom={setSelectedClassroom}
          updateClassroom={updateClassroom}
          userType={userType}
        />
      ) : (
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {classrooms.map((classroom, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer overflow-hidden group transition-shadow duration-300 ease-in-out"
              whileHover={{ boxShadow: "0 4px 20px rgba(147, 51, 234, 0.5)" }}
              onClick={() => setSelectedClassroom(classroom)}
            >
              <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                {classroom.classroomName} {/* Use the classroom name */}
              </h3>
              <p className="text-sm text-gray-400">Code: {classroom.code}</p>
              <div className="mt-4 h-1 w-full bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
