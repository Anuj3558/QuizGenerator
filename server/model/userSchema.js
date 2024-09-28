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
  status: {
    type: String,
    enum: ["Pending", "Completed"], // Corrected enum syntax
    default: "Pending", // Set default to "Pending"
  },
});

const User = mongoose.model('User', userSchema);

export default User;
