import { Router } from "express";
import {  deleteDepartment,updateDepartment,addDepartment, departments,departmentById } from "./controller.js";
import { checkDepartmentBody, checkParamsId } from "../../middlewares/validation.middleware.js";
import { checkAdminToken } from "../../middlewares/checkToken.js";

const router=Router()

router.get("/departments",checkAdminToken,departments)
router.get("/department/:id",checkParamsId,checkAdminToken,departmentById)
router.post("/department",checkAdminToken,checkDepartmentBody,addDepartment)
router.put("/department/:id",checkAdminToken,checkParamsId,updateDepartment)
router.delete("/department/:id",checkAdminToken,checkParamsId,deleteDepartment)
export default router