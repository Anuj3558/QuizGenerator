// studentSchema.js
import mongoose from 'mongoose';
import User from './userSchema.js';

const studentSchema = new mongoose.Schema({
  userId: {
    type: String, // Reference to the User model
    required: true,
  },
  grade: String,
  school: String,
  achievements: [String],
  enrolledCourses: [{
    title: String,
    grade: String,
  }],
  learningStats: {
    gpa: Number,
    attendanceRate: Number,
    homeworkCompletion: Number,
  },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
