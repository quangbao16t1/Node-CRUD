import express from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", UserController.login);
userRouter.post("/users", UserController.createUser);

export default userRouter;