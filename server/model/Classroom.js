// models/Classroom.js
import mongoose from "mongoose";

// Define the Content Schema for different sections
const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // Type could be 'video', 'note', 'announcement', or 'syllabus'
  },
  fileUrl: {
    type: String, // URL or path to the file (for videos, notes, syllabus)
    required: function () {
      return this.type !== "text"; // Only required for non-text content
    },
  },
  content: {
    type: String, // For announcement text
    required: function () {
      return this.type === "text"; // Only required for text content
    },
  },
  name: {
    type: String, // File name for videos, notes, or syllabus
  },
  timestamp: {
    type: Date,
    default: Date.now, // Timestamp when content was added
  },
});

// Define the Classroom Schema
const ClassroomSchema = new mongoose.Schema(
  {
    teacherId: {
      type: String,
      required: true,
    },
    classroomName: {
      type: String,
      required: true, // Classroom name is required
    },
    teacherName: {
      type: String,
      required: true, // Teacher name is required
    },
    code: {
      type: String,
      required: true, // Classroom code is required
      unique: true, // Ensure classroom codes are unique
    },
    content: {
      videos: [ContentSchema], // Array of content with video type
      notes: [ContentSchema], // Array of content with notes type
      announcements: [ContentSchema], // Array of content with announcement type
      syllabus: [ContentSchema], // Array of content with syllabus type
    },
    students: [{ type: String }], // Array of student IDs
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the Classroom model
export default mongoose.model("Classroom", ClassroomSchema);
