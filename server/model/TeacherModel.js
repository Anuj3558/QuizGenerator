import mongoose from 'mongoose';
import User from './userSchema.js';

const teacherSchema = new mongoose.Schema({
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

const Teacher = User.discriminator('Teacher', teacherSchema);

export default Teacher;