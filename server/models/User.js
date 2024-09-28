import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // For normal login
  googleId: { type: String }, // For Google login
  name: { type: String },
});

const User = mongoose.model('User', userSchema);
export default User;
