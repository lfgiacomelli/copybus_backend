import express from "express";
import {
    getAllFleets,
    getFleetById,
    createFleet,
    updateFleet,
    deleteFleet,
    countVeiclesInFleet
} from "../controllers/fleetController.js";

import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";

const router = express.Router();

router.get("/", authUserMiddleware, getAllFleets);
router.get("/:fro_codigo", authUserMiddleware, getFleetById);
router.get("/count_vehicles/:fro_codigo", authUserMiddleware, countVeiclesInFleet);
router.post("/", authUserMiddleware, createFleet);
router.put("/:fro_codigo", authUserMiddleware, updateFleet);
router.delete("/:fro_codigo", authUserMiddleware, deleteFleet);

export default router;
