import { Router } from "express";

const AuthRouter = Router();

// Import your controllers
import {
  registerUser,
  loginUser,
  handleData,
} from "../controller/AuthController.js"; // Update the path accordingly

// Register route
AuthRouter.post("/register", registerUser);

// // Login route
AuthRouter.post("/login", loginUser);
AuthRouter.post("/data",handleData);

// // Logout route
// AuthRouter.post("/logout", logoutUser);

// // Example protected route
// AuthRouter.post("/signup-with-google",signupWithGoogle)

export default AuthRouter;
