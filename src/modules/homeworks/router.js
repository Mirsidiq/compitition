import { Router } from "express";
import {  deleteHomework, addHomework, updateHomework, homeworksByStudentId, homeworkById } from "./controller.js";
import { checkHomeworksMiddleware, checkParamsId } from "../../middlewares/validation.middleware.js";
import { checkAssistentToken } from "../../middlewares/checkToken.js";

const router=Router()

router.get("/homeworks/students/:id",checkParamsId,homeworksByStudentId)
router.get("/homeworks/:id",checkParamsId,homeworkById)
router.post("/homeworks",checkAssistentToken,checkHomeworksMiddleware,addHomework)
router.put("/homeworks/put/:id",checkAssistentToken,checkParamsId,updateHomework)
router.delete("/homeworks/delete/:id",checkAssistentToken,checkParamsId,deleteHomework)
export default router