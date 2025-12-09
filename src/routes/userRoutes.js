import express from "express";
import { getUserByIdController, createUserController, updateUserController, deleteUserController } from "../controllers/userController.js";

import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";

const router = express.Router();

router.get("/:usu_codigo", authUserMiddleware, getUserByIdController);
router.post("/", authUserMiddleware, createUserController);
router.put("/:usu_codigo", authUserMiddleware, updateUserController);
router.delete("/:usu_codigo", authUserMiddleware, deleteUserController);

export default router;
