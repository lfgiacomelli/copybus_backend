import express from "express";
import {addKilometragem, createVehicle, deleteVehicle, getAllVehicles, getVehicleById, updateVehicle} from "../controllers/vehicleController.js";

import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";

const router = express.Router();

router.get("/:emp_codigo", authUserMiddleware, getAllVehicles);
router.get("/vehicle/:vei_codigo", authUserMiddleware, getVehicleById);
router.post("/", authUserMiddleware, createVehicle);
router.put("/:vei_codigo", authUserMiddleware, updateVehicle);
router.delete("/:vei_codigo", authUserMiddleware, deleteVehicle);
router.post("/kilometragem/:vei_codigo", authUserMiddleware, addKilometragem);

export default router;