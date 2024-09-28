import bcrypt from 'bcryptjs';
import User from '../model/userSchema'; // Assuming you have a User model
import jwt from 'jsonwebtoken';

// User registration function
const registerUser = async (req, res) => {
  const { userEmail, userPass, userName, UserType } = req.body;

  // Check if all required fields are provided
  if (!userEmail || !userPass || !userName || !UserType) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPass, salt);

    // Create a new user
    const newUser = new User({
      email: userEmail,
      password: hashedPassword,
      name: userName,
      type: UserType,
    });

    // Save the new user in the database
    const savedUser = await newUser.save();

    // Generate a JWT token for the user (optional)
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET, // Ensure you have a JWT secret in your .env
      { expiresIn: '1h' }
    );

    // Send back the response with the user details and token
    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
        type: savedUser.type,
      },
      token,
    });
  } catch (error) {
    // Handle any error that occurs
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export { registerUser };
