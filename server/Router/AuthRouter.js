import { Router } from "express";

const AuthRouter = Router();

// Import your controllers
import {
    loginUser,
  registerUser,
  signupWithGoogle,

} from "../controller/AuthController.js"; // Update the path accordingly

// Register route
AuthRouter.post("/register", registerUser);

// Login route
AuthRouter.post("/login", loginUser);

// // Logout route
// AuthRouter.post("/logout", logoutUser);

// // Example protected route
AuthRouter.post("/signup-with-google",signupWithGoogle)

export default AuthRouter;
