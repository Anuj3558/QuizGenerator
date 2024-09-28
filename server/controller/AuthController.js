import bcrypt from "bcryptjs";
import User from "../model/userSchema.js"; // Assuming you have a User model
import jwt from "jsonwebtoken";

// User registration function
const registerUser = async (req, res) => {
  const { userEmail, userPass, userName, userType } = req.body;

  // Check for missing fields
  if (!userEmail || !userPass || !userName || !userType) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the passwor
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPass, salt);

    // Create a new user

    const newUser = new User({
      email: userEmail,
      password: hashedPassword,
      fullName: userName,
      type: userType,
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Optionally generate a JWT token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
        type: savedUser.type,
      },
      token,
    });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
const loginUser = async (req, res) => {
  const { userEmail, userPass } = req.body;

  // Check if both email and password are provided
  if (!userEmail || !userPass) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email: userEmail });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      userPass,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET, // Ensure you have a JWT secret in your .env
      { expiresIn: "1h" }
    );

    // Update the user document with the generated token (uid)
    existingUser.uid = token; // Assuming 'uid' is the field you want to set
    await existingUser.save(); // Save the updated user

    // Send back the response with the user details and token
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        type: existingUser.type,
      },
      token,
    });
  } catch (error) {
    // Handle any error that occurs
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const handleData = async (req, res) => {
  try {
    const { token } = req.body;

    // Log the token for debugging purposes
    console.log("Received token:", token);

    // Find the user with the matching uid (token)
    const user = await User.findOne({ uid: token });

    // Check if the user was found

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send the user data back to the frontend
    res.status(200).json({
      message: "User retrieved successfully.",
      user: {
        id: user._id,
        email: user?.email,
        name: user?.fullName,
        type: user.userType,
      },
    });
  } catch (error) {
    console.error("Error occurred in data retrieval:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export { registerUser, loginUser, handleData };
