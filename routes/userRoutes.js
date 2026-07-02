import express from "express";
import usersController from "../controllers/usersController.js";
import validateUser from "../middlewares/userMiddleware.js";
const userRouter = express.Router();

userRouter.get("/", usersController.getAllUsers);
userRouter.get("/user_id/:user_id", usersController.getUserById);
userRouter.get("/user_email/:user_email", usersController.getUserByEmail);
userRouter.post("/", validateUser, usersController.createUser);
userRouter.put("/:user_id",validateUser, usersController.updateUser);
userRouter.delete("/:user_id", usersController.deleteUser);




export default userRouter;