// userSchema.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicUrl: {
    type: String,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  location: String,
  userType: {
    type: String,
    enum: ["Teacher", "Student"],
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Partial"],
    default: "Pending",
  },
});

const User = mongoose.model('User', userSchema);

export default User;
