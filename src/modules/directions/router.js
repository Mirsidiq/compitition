import { Router } from "express";
import {  updateDirection,addDirection, directions, getById,getByDirName, deleteDirection } from "./controller.js";
import { checkDirectionBodyMiddleware,checkParamsId } from "../../middlewares/validation.middleware.js";
import { checkAdminToken } from "../../middlewares/checkToken.js";

const router=Router()

router.get("/directions",checkAdminToken,directions)
router.get("/department/directions/:id",checkAdminToken,checkParamsId,getById)
router.get("/department",checkAdminToken,getByDirName)
router.post("/directions",checkAdminToken,checkDirectionBodyMiddleware,addDirection)
router.put("/directions/:id",checkAdminToken,checkParamsId,updateDirection)
router.delete("/directions/:id",checkAdminToken,checkParamsId,deleteDirection)

export default router