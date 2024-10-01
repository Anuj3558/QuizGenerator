import { Router } from "express";
import {
  completeProfile,
  setUser,
  fetchTeacher,
  handleChanges,
} from "../controller/UserContorller.js";

import { verifyToken } from "../controller/AuthController.js";
import {
  getClassrooms,
  createClassroom,
} from "../controller/ClassroomController.js";
import User from "../model/userSchema.js";



const UserRouter = Router();


UserRouter.post("/setUserType",setUser);
UserRouter.post("/submit-student-data",completeProfile);
UserRouter.post("/create-classroom",createClassroom);
UserRouter.post("/get-classrooms", getClassrooms);
UserRouter.post("/teacher-data",fetchTeacher);
UserRouter.put("/save-changes-teacher",handleChanges);
export default UserRouter;