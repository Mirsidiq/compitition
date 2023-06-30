import { Router } from "express";
import {  updateDirection,addDirection, directions, deleteDirection } from "./controller.js";
import { checkDirectionBodyMiddleware,checkDirectionBodyUpdateMiddleware,checkParamsId } from "../../middlewares/validation.middleware.js";
import { checkAdminToken } from "../../middlewares/checkToken.js";

const router=Router()

router.get("/directions",directions)
router.post("/direction/add",checkAdminToken,checkDirectionBodyMiddleware,addDirection)
router.put("/direction/put/:id",checkAdminToken,checkParamsId,checkDirectionBodyUpdateMiddleware,updateDirection)
router.delete("/direction/delete/:id",checkAdminToken,checkParamsId,deleteDirection)

export default router