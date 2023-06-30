import { Router } from "express";
import {  addUser, updateUser } from "./controller.js";
import { checkAdminToken } from "../../middlewares/checkToken.js";
import {  checkParamsId } from "../../middlewares/validation.middleware.js";

const router=Router()

// router.get("/users/assistents",checkAdminToken,assistents)
// router.get('/user/:id',checkParamsId,userById)
router.post("/users/admin/add",checkAdminToken,addUser)
router.put("/users/admin/:id",checkAdminToken,checkParamsId,updateUser)
// router.delete("/users/:id",checkAdminToken,checkParamsId,deleteUser)
export default router