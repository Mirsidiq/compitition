import { Router } from "express";
import { deleteUser, addUser, updateUser, userById } from "./controller.js";
import { checkAdminToken } from "../../middlewares/checkToken.js";
// import { checkUsersBodyMiddleware } from "../../middlewares/validation.middleware.js";
import {  checkParamsId } from "../../middlewares/validation.middleware.js";

const router=Router()

// router.get("/users/assistents",checkAdminToken,assistents)
router.get('/user/:id',checkParamsId,userById)
router.post("/user/add",checkAdminToken,addUser)
router.put("/users/:id",checkAdminToken,checkParamsId,updateUser)
router.delete("/users/:id",checkAdminToken,checkParamsId,deleteUser)
export default router