import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";  // Corrected typo
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // For normal login
  googleId: { type: String }, // For Google login
  name: { type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const User = mongoose.model('User', userSchema);
export default User;
