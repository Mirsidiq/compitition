import { Router } from "express";
import {  updateStudent, addStudent, deleteStudent, students, studentByGroupId, studentById } from "./controller.js";
import { checkAdminToken } from "../../middlewares/checkToken.js";
import { checkParamsId, checkStudentBodyMiddleware } from "../../middlewares/validation.middleware.js";

const router=Router()

router.get("/users/students",checkAdminToken,students)
router.get("/users/students/group/:id",studentByGroupId)
router.get("/users/students/:id",studentById)
router.post("/users/students/add",checkAdminToken,checkStudentBodyMiddleware,addStudent)
router.put("/users/students/:id",checkAdminToken,checkParamsId,updateStudent)
router.delete("/users/students/:id",checkAdminToken,checkParamsId,deleteStudent)
export default router