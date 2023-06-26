import { Router } from "express";
import {  deletePosition,updatePosition,addPosition, positionById,positions, } from "./controller.js";
import { checkParamsId,checkPositionBodyMiddleware } from "../../middlewares/validation.middleware.js";
import { checkAdminToken } from "../../middlewares/checkToken.js";

const router=Router()

router.get("/positions",positions)
router.get("/department/positions/:id",checkAdminToken,checkParamsId,positionById)
router.post("/positions",checkPositionBodyMiddleware,checkAdminToken,addPosition)
router.put("/positions/:id",checkAdminToken,checkParamsId,updatePosition)
router.delete("/positions/:id",checkAdminToken,checkParamsId,deletePosition)
export default router