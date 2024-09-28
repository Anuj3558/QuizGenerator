import express from 'express';
import { signup, login, googleSignIn,logoutUser } from '../controllers/authController.js';

const router = express.Router();

// Normal Sign-Up Route
router.post('/signup', signup);

// Normal Login Route
router.post('/login', login);
router.get('/logout',logoutUser)

// Google Sign-In Route
router.post('/google', googleSignIn);

export default router;
