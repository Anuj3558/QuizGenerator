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


function ClassroomDetail({
  classroom,
  setSelectedClassroom,
  updateClassroom,
  userType,
}) {
  const [activeSection, setActiveSection] = useState("Videos");
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [file, setFile] = useState(null);

  // Sections for content types with accepted file types
  const sections = [
    { name: "Videos", icon: Video, acceptTypes: "video/mp4" }, // Only accept MP4 for videos
    { name: "Announcements", icon: BookOpen, acceptTypes: null }, // No file input
    { name: "Notes", icon: FileText, acceptTypes: ".pdf,.doc,.docx,.txt" }, // Accept document types
    {
      name: "Syllabus",
      icon: GraduationCap,
      acceptTypes: ".pdf,.doc,.docx,.txt",
    },
  ];

  // Function to handle adding new content
  const handleAddContent = () => {
    if (!activeSection || userType !== "Teacher") return;

    let contentToAdd = null;

    // Handle text input for announcements
    if (activeSection === "Announcements" && newContent.trim()) {
      contentToAdd = {
        type: "text",
        content: newContent.trim(),
        timestamp: new Date(), // Add timestamp here
      };
      setNewContent(""); // Reset the new content input
    }
    // Handle file uploads for other sections
    else if (file) {
      const contentType =
        activeSection.toLowerCase() === "videos"
          ? "video"
          : activeSection.toLowerCase();
      contentToAdd = {
        type: contentType,
        file: URL.createObjectURL(file),
        name: file.name,
        timestamp: new Date(), // Add timestamp here
      };
      setFile(null); // Reset the file input
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
      setIsAddContentModalOpen(false); // Close the modal after adding content
    }
  };

  // Function to render content based on its type
  const renderContent = (content) => {
    const timeAgo =""; // Format the timestamp

    switch (content.type) {
      case "video":
        return (
          <div>
            <p className="text-sm text-gray-400 mb-2">{content.name}</p>
            <video controls className="w-full rounded-md" src={content.file} />
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        );
      case "text":
        return (
          <div>
            <p className="text-gray-300">{content.content}</p>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        );
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
            <p className="text-xs text-gray-500">{timeAgo}</p>
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
      {/* Classroom Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{classroom.name}</h2>
        <p className="text-lg text-purple-400">Code: {classroom.code}</p>
      </div>

      {/* Section Navigation */}
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
          >
            <section.icon className="h-8 w-8 mb-2" />
            <span className="text-sm">{section.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Displaying the content */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Contents</h3>
        {classroom.content[activeSection]?.map((content, index) => (
          <div key={index} className="mb-4">
            {renderContent(content)}
          </div>
        ))}
      </div>

      {/* Add Content Button for Teachers */}
      {userType === "Teacher" && (
        <Button
          className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
          onClick={() => setIsAddContentModalOpen(true)}
        >
          Add Content
        </Button>
      )}

      {/* Modal for Adding Content */}
      <AnimatePresence>
        {isAddContentModalOpen && userType === "Teacher" && (
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
                Add Content to {activeSection}
              </h2>
              <div className="mb-4">
                {activeSection === "Announcements" ? (
                  <textarea
                    className="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="4"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Enter announcement details..."
                    required
                  />
                ) : (
                  <input
                    type="file"
                    accept={
                      sections.find((s) => s.name === activeSection)
                        ?.acceptTypes
                    }
                    className="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        const selectedFile = e.target.files[0];
                        // Check if the selected file is of the correct type
                        if (
                          activeSection === "Videos" &&
                          selectedFile.type !== "video/mp4"
                        ) {
                          alert("Please upload a valid MP4 video file.");
                          setFile(null);
                        } else if (
                          activeSection !== "Videos" &&
                          ![
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            "text/plain",
                          ].includes(selectedFile.type)
                        ) {
                          alert(
                            "Please upload a valid document file (PDF, DOC, DOCX, TXT)."
                          );
                          setFile(null);
                        } else {
                          setFile(selectedFile);
                        }
                      } else {
                        setFile(null); // Reset file if no file is selected
                      }
                    }}
                    required
                  />
                )}
              </div>
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

      {/* Back to Classrooms Button */}
      <Button
        className="mt-6 text-purple-400 hover:text-purple-300"
        onClick={() => setSelectedClassroom(null)}
      >
        <ArrowLeft className="w-4 h-4 inline-block mr-1" />
        Back to Classrooms
      </Button>
    </motion.div>
  );
}

export default ClassroomDetail;
