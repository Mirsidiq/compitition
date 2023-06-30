import { Router } from "express";
import {login} from "./controller.js";
import { UserLoginBodyMiddleware } from "../../middlewares/validation.middleware.js";
const router=Router()
router.post("/login",UserLoginBodyMiddleware,login)
export default router