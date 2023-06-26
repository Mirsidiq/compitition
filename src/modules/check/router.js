import { Router } from "express";
import {  addCheck, checks } from "./controller.js";
const router=Router()

router.get("/checks",checks)
router.post("/checks/post",addCheck)


export default router