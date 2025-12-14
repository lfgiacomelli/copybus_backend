import express from "express";
import { getUserByIdController, createUserController, updateUserController, deleteUserController, getAllUsersController } from "../controllers/userController.js";

import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";

const router = express.Router();

router.get("/:emp_codigo", authUserMiddleware, getAllUsersController);
router.get("/user/:usu_codigo", authUserMiddleware, getUserByIdController);
router.post("/", authUserMiddleware, createUserController);
router.put("/:usu_codigo", authUserMiddleware, updateUserController);
router.delete("/:usu_codigo", authUserMiddleware, deleteUserController);

export default router;
