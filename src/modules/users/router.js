import { Router } from "express";
import {  addUser, updateUser } from "./controller.js";
import { checkAdminToken } from "../../middlewares/checkToken.js";
import {  checkParamsId } from "../../middlewares/validation.middleware.js";

const router=Router()
router.post("/users/admin/add",addUser)
router.put("/users/admin/:id",checkAdminToken,checkParamsId,updateUser)
export default router