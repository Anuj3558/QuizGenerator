import { Router } from "express";

const AuthRouter = Router();

// Import your controllers
import {
    checkAuth,
    loginUser,
  registerUser,
  signupWithGoogle,
  verifyToken,

} from "../controller/AuthController.js"; // Update the path accordingly

// Register route
AuthRouter.post("/register", registerUser);

// Login route
AuthRouter.post("/login", loginUser);

// // Logout route
AuthRouter.get("/check",verifyToken,checkAuth);

// // Example protected route

AuthRouter.post("/signup-with-google",signupWithGoogle)

export default AuthRouter;
