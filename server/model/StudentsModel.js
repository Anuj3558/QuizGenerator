import mongoose from 'mongoose';
import User from './userSchema.js';

const studentSchema = new mongoose.Schema({
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

const Student = User.discriminator('Student', studentSchema);

export default Student;