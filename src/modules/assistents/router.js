import { Router } from "express";
import {  updateAssistent, addAssistent, assistents, assistentById, deleteAssistent } from "./controller.js";
import { checkAdminToken, checkAssistentToken } from "../../middlewares/checkToken.js";
// import { checkUsersBodyMiddleware } from "../../middlewares/validation.middleware.js";
import {  checkAssistentBodyMiddleware, checkParamsId } from "../../middlewares/validation.middleware.js";

const router=Router()

router.get("/users/assistents",checkAdminToken,assistents)
router.get('/users/assistent/:id',checkParamsId,assistentById)
router.post("/users/assistent/add",checkAdminToken,checkAssistentBodyMiddleware,addAssistent)
router.put("/users/assistent/:id",checkAssistentToken,checkParamsId,updateAssistent)
router.delete("/users/assistent/:id",checkAdminToken,checkParamsId,deleteAssistent)
export default router