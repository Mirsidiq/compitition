import { Router } from "express";
import {  updateGroup,addGroup, getById, groups, deleteGroup } from "./controller.js";
import {  checkGroupsBodyMiddleware, checkParamsId } from "../../middlewares/validation.middleware.js";
import { checkAdminToken } from "../../middlewares/checkToken.js";
const router=Router()

router.get("/groups",groups)
router.get("/groups/:id",checkParamsId,getById)
router.post("/group/add",checkAdminToken,addGroup)
router.put("/group/put/:id",checkAdminToken,checkParamsId,updateGroup)
router.delete("/groups/:id",checkAdminToken,checkParamsId,deleteGroup)

export default router