// models/Classroom.js
import mongoose from "mongoose";

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
      videos: [{ type: String }], // Array of video URLs or file paths
      notes: [{ type: String }], // Array of note URLs or document paths
      announcements: [{ type: String }], // Array of announcement texts
      syllabus: [{ type: String }], // Array of syllabus URLs or document paths
    },
    students: [{ type: String }], // Array of student IDs
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the Classroom model
export default mongoose.model("Classroom", ClassroomSchema);
