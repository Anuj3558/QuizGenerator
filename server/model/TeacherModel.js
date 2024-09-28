// teacherSchema.js
import mongoose from 'mongoose';
import User from './userSchema.js';

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  subject: [String],
  qualification: String,
  experience: Number,
  currentSchool: String,
  achievements: [String],
  courses: [{
    title: String,
    students: Number,
  }],
  teachingStats: {
    studentSatisfaction: Number,
    courseCompletionRate: Number,
    averageQuizScore: Number,
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
