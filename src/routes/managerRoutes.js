import express from "express";
import {
    createManager,
    getManagerByEmail,
    getManagerById,
    updateManager,
    deleteManager,
    addCompany,
    updateCompany,
    getAllCompanies,
    verifyEmployeeExists,
    deleteCompany,
    getCompanyById
} from "../controllers/managerController.js";

import { authManagerMiddleware } from "../middlewares/authManagerMiddleware.js";
const router = express.Router();

router.get("/companies/", authManagerMiddleware, getAllCompanies);
router.get("/companies/:emp_codigo", authManagerMiddleware, getCompanyById);
router.get("/companies/employee_exists/:emp_codigo", authManagerMiddleware, verifyEmployeeExists);
router.post("/companies/", authManagerMiddleware, addCompany);
router.put("/companies/:emp_codigo", authManagerMiddleware, updateCompany);
router.delete("/companies/:emp_codigo", authManagerMiddleware, deleteCompany);

router.post("/", authManagerMiddleware, createManager);
router.get("/email/:ges_email", authManagerMiddleware, getManagerByEmail);
router.get("/:ges_codigo", authManagerMiddleware, getManagerById);
router.put("/:ges_codigo", authManagerMiddleware, updateManager);
router.delete("/:ges_codigo", authManagerMiddleware, deleteManager);

export default router;
