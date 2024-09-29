import { Router } from "express";
import {completeProfile, setUser} from "../controller/UserContorller.js";

import { verifyToken } from "../controller/AuthController.js";



const UserRouter = Router();


UserRouter.post("/setUserType",setUser);
UserRouter.post("/submit-student-data",completeProfile);

export default UserRouter;