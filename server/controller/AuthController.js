import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../model/userSchema.js';

const registerUser = async (req, res) => {
    const { userName, userEmail, userPass } = req.body;

    try {
        const existingUser = await User.findOne({ email: userEmail });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(userPass, 12);
        const uid = uuidv4();

        const newUser = new User({
            uid,
            fullName: userName,
            email: userEmail,
            password: hashedPassword,
            status: 'Pending',
        });

        await newUser.save();

        // Create JWT with email and name
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, name: newUser.fullName },
            process.env.JWT_SECRET,
        );

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong during registration.' });
    }
};

const signupWithGoogle = async (req, res) => {
    const { userName, userEmail, userProfilePic, uid } = req.body;

    try {
        const existingUser = await User.findOne({ email: userEmail });
        if (existingUser) {
            const token = jwt.sign(
                { id: existingUser._id, email: existingUser.email, name: existingUser.fullName },
                process.env.JWT_SECRET,
            );
            return res.status(200).json({ token });
        }

        const newUser = new User({
            uid,
            fullName: userName,
            email: userEmail,
            password: 'Google',
            profilePicUrl: userProfilePic,
            status: 'Pending',
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, name: newUser.fullName },
            process.env.JWT_SECRET,
        );

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong during Google signup.' });
    }
};

const loginUser = async (req, res) => {
    const { userEmail, userPass } = req.body;

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(userPass, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Create JWT with email and name
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.fullName },
            process.env.JWT_SECRET,
        );

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong during login.' });
    }
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming "Bearer TOKEN"
     console.log()
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        console.log(token)
        req.userId = decoded.id; // Store user ID in request
        next();
    });
};
const checkAuth = async (req, res) => {
    // This function relies on the verifyToken middleware
    const userId = req.userId; // This is set by the verifyToken middleware

    try {
        // Fetch the user from the database
        const user = await User.findById(userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Return user information (excluding password)
        res.status(200).json({
            uid: user.uid,
            fullName: user.fullName,
            email: user.email,
            profilePicUrl: user.profilePicUrl,
            status: user.status,
            userType: user.userType
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong while checking authentication.' });
    }
};

export { registerUser, signupWithGoogle, loginUser, verifyToken,checkAuth };
