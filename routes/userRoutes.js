import express from "express";
import usersController from "../controllers/usersController.js";
import validateUser from "../middlewares/userMiddleware.js";
import {authenticationToken} from "../middlewares/authLoginMiddleware.js"

const userRouter = express.Router();

userRouter.get("/",authenticationToken, usersController.getAllUsers);
userRouter.get("/user_id/:user_id",authenticationToken, usersController.getUserById);
userRouter.get("/user_email/:user_email",authenticationToken, usersController.getUserByEmail);
userRouter.post("/",authenticationToken, validateUser, usersController.createUser);
userRouter.put("/:user_id",authenticationToken, validateUser, usersController.updateUser);
userRouter.delete("/:user_id",authenticationToken, usersController.deleteUser);




export default userRouter;