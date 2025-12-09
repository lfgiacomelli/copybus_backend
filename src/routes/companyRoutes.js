import express from "express";

import { getCompanyById, updateCompany } from "../controllers/companyController.js";
import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";

const router = express.Router();

router.get("/:emp_codigo", authUserMiddleware, getCompanyById);
router.put("/:emp_codigo", authUserMiddleware, updateCompany);

export default router;