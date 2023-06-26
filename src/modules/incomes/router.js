import { Router } from "express";
import { updateIncome, addIncome, incomes } from "./controller.js";
import { checkIncomesBodyMiddleware } from "../../middlewares/validation.middleware.js";
import { checkParamsId } from "../../middlewares/validation.middleware.js";

const router=Router()

router.get("/incomes",incomes)
router.post("/incomes",checkIncomesBodyMiddleware,addIncome)
router.put("/incomes/:id",checkParamsId,updateIncome)

export default router