import { Router } from "express";
import setUser from "../controller/UserContorller.js";
import { verifyToken } from "../controller/AuthController.js";



const UserRouter = Router();


UserRouter.post("/setUserType",verifyToken,setUser);

export default UserRouter;