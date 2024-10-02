import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import ConnectToMongoDb from "./connection.js";
import AuthRouter from "./Router/AuthRouter.js";
import dotenv from "dotenv";
import UserRouter from "./Router/UserRouter.js";
import { verifyToken } from "./controller/AuthController.js";
import QuizRouter from "./Router/quizFileRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.NODE_MONGO_URL;

ConnectToMongoDb(MONGOURL);


  if (!MONGOURL) {
    console.error(
      "MongoDB URL is missing. Please check your environment variables."
    );
    process.exit(1); // Exit the app if no MongoDB URL is provided
  }
// Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", AuthRouter);
app.use("/user", verifyToken);
app.use("/user", UserRouter);
app.use("/api/quiz", QuizRouter);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
