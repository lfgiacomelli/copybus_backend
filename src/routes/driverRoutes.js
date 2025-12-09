import express from "express";

import {createDriver, deleteDriver, getAllDrivers, getDriverById, updateDriver} from "../controllers/driverController.js";

import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";

const router = express.Router();

router.get("/", authUserMiddleware, getAllDrivers);
router.get("/:mot_codigo", authUserMiddleware, getDriverById);
router.post("/", authUserMiddleware, createDriver);
router.put("/:mot_codigo", authUserMiddleware, updateDriver);
router.delete("/:mot_codigo", authUserMiddleware, deleteDriver);

export default router;