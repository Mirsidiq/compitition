import { Router } from "express";
import {  addCenter, centers, } from "./controller.js";

const router=Router()

router.get("/center",centers)

router.post("/center/post",addCenter)


export default router