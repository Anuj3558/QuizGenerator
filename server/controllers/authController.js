import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { generateToken } from "../utils/jwtToken.js"; 
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

// Sign-Up with email/password
export const signup =catchAsyncErrors( async (req, res,next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  generateToken(user, "User Registered!", 200, res);
});

// Login with email/password
export const login = catchAsyncErrors(async (req, res,next) => {
  const { email, password } = req.body;
  if (!email || !password ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
 
  generateToken(user, "Login Successfully!", 201, res);
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("userToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "user Logged Out Successfully.",
    });
});

// Google Sign-In
export const googleSignIn = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ email, googleId, name });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during Google sign-in:", err); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
};
