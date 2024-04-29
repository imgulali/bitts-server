import { Router } from "express";
import { DeleteUser, FetchUser, LoginUser, RegisterUser, UpdateUser } from "../controllers/UserController.js";
import { validate } from "../middlewares/Validate.js";
import { LoginUserSchema, RegisterUserSchema, UpdateUserSchema } from "../validators/UserValidator.js";
import { verifyUser } from "../middlewares/VerifyUser.js";

const UserRouter = Router();

UserRouter.post("/register", validate(RegisterUserSchema), RegisterUser);
UserRouter.post("/login", validate(LoginUserSchema), LoginUser);
UserRouter.post("/fetch", verifyUser, FetchUser);
UserRouter.put("/update", validate(UpdateUserSchema), verifyUser, UpdateUser);
UserRouter.delete("/delete", verifyUser, DeleteUser);

export default UserRouter;