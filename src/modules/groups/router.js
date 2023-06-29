import { Router } from "express";
import {  updateGroup,addGroup, getById, groups, deleteGroup } from "./controller.js";
import {  checkGroupsBodyMiddleware, checkPaginationMiddleware, checkParamsId } from "../../middlewares/validation.middleware.js";
import { checkAdminToken } from "../../middlewares/checkToken.js";
const router=Router()

router.get("/groups",checkPaginationMiddleware,groups)
router.get("/groups/:id",checkParamsId,getById)
router.post("/groups/add",checkAdminToken,checkGroupsBodyMiddleware,addGroup)
router.put("/group/put/:id",checkAdminToken,checkParamsId,updateGroup)
router.delete("/groups/delete/:id",checkAdminToken,checkParamsId,deleteGroup)

export default router