import React, { useState } from "react";
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

export default function Classrooms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classroomName, setClassroomName] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array(6)
      .fill()
      .map(() =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      )
      .join("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedCode = generateCode();
    const newClassroom = {
      name: classroomName,
      code: generatedCode,
      content: {
        Videos: [],
        Lectures: [],
        Notes: [],
        Syllabus: [],
      },
    };
    setClassrooms((prevClassrooms) => [...prevClassrooms, newClassroom]);
    setClassroomName("");
    setIsModalOpen(false);
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
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-gray-900 rounded-xl to-purple-900 text-white">
      {!selectedClassroom && (
        <Button
          className="border border-purple-500 hover:scale-105 hover:bg-purple-500/50 transition-all duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          Create Classroom
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
                Create a Classroom
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Classroom Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={classroomName}
                    onChange={(e) => setClassroomName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
                  >
                    Create
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
                {classroom.name}
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

function ClassroomDetail({ classroom, setSelectedClassroom, updateClassroom }) {
  const [activeSection, setActiveSection] = useState("Videos");
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [file, setFile] = useState(null);

  const sections = [
    { name: "Videos", icon: Video, acceptTypes: "video/*" },
    { name: "Lectures", icon: BookOpen, acceptTypes: null },
    { name: "Notes", icon: FileText, acceptTypes: ".pdf,.doc,.docx,.txt" },
    {
      name: "Syllabus",
      icon: GraduationCap,
      acceptTypes: ".pdf,.doc,.docx,.txt",
    },
  ];

  const handleAddContent = () => {
    if (activeSection) {
      let contentToAdd;
      if (file && activeSection !== "Lectures") {
        contentToAdd = {
          type: activeSection.toLowerCase(),
          file: URL.createObjectURL(file),
          name: file.name,
        };
        setFile(null);
      } else if (newContent.trim() !== "" && activeSection === "Lectures") {
        contentToAdd = {
          type: "text",
          content: newContent,
        };
        setNewContent("");
      }

      if (contentToAdd) {
        const updatedClassroom = {
          ...classroom,
          content: {
            ...classroom.content,
            [activeSection]: [
              ...(classroom.content[activeSection] || []),
              contentToAdd,
            ],
          },
        };
        updateClassroom(updatedClassroom);
        setIsAddContentModalOpen(false);
      }
    }
  };

  const renderContent = (content) => {
    switch (content.type) {
      case "video":
        return (
          <div>
            <p className="text-sm text-gray-400 mb-2">{content.name}</p>
            <video controls className="w-full rounded-md" src={content.file} />
          </div>
        );
      case "text":
        return <p className="text-gray-300">{content.content}</p>;
      case "notes":
      case "syllabus":
        return (
          <div>
            <p className="text-sm text-gray-400 mb-2">{content.name}</p>
            <a
              href={content.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              View {content.type}
            </a>
          </div>
        );
      default:
        return <p className="text-gray-400">Unsupported content type</p>;
    }
  };

  return (
    <motion.div
      className="mt-8 p-6 bg-gray-800 rounded-xl text-white overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{classroom.name}</h2>
        <p className="text-lg text-purple-400">Code: {classroom.code}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {sections.map((section) => (
          <motion.button
            key={section.name}
            className={`p-4 rounded-lg flex flex-col items-center justify-center transition-colors ${
              activeSection === section.name
                ? "bg-purple-600"
                : "bg-gray-700 hover:bg-purple-500/50"
            }`}
            onClick={() => setActiveSection(section.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <section.icon className="w-8 h-8 mb-2" />
            <span className="text-sm">{section.name}</span>
          </motion.button>
        ))}
      </div>

      <div className="mb-6">
        <Button
          className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
          onClick={() => setIsAddContentModalOpen(true)}
        >
          Add {activeSection} Content
        </Button>
      </div>

      <div className="space-y-4">
        {classroom.content[activeSection]?.length > 0 ? (
          classroom.content[activeSection].map((content, index) => (
            <motion.div
              key={index}
              className="p-4 bg-gray-900 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {renderContent(content)}
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400">No content available.</p>
        )}
      </div>

      <div className="mt-8">
        <Button
          className="border border-gray-500 hover:bg-gray-700 transition-all duration-300"
          onClick={() => setSelectedClassroom(null)}
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back to Classrooms
        </Button>
      </div>

      <AnimatePresence>
        {isAddContentModalOpen && (
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
                Add {activeSection} Content
              </h2>
              {activeSection === "Lectures" ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Lecture Content
                  </label>
                  <textarea
                    className="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows="4"
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Upload {activeSection} File
                  </label>
                  <input
                    type="file"
                    className="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    accept={
                      sections.find((s) => s.name === activeSection)
                        ?.acceptTypes
                    }
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              )}
              <div className="flex justify-between">
                <Button
                  className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
                  onClick={handleAddContent}
                >
                  Add
                </Button>
                <Button
                  className="bg-gray-500 hover:bg-gray-600 transition-colors duration-300"
                  onClick={() => setIsAddContentModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
