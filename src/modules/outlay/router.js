import { Router } from "express";
import {  updateOutlay,addOutlay, outlays } from "./controller.js";
import { checkOutlaysBodyMiddleware } from "../../middlewares/validation.middleware.js";
import { checkParamsId } from "../../middlewares/validation.middleware.js";

const router=Router()

router.get("/outlays",outlays)
router.post("/outlays",checkOutlaysBodyMiddleware,addOutlay)
router.put("/outlays/:id",checkParamsId,updateOutlay)

export default router