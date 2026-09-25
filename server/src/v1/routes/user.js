import { Router } from "express";
import UserController from "../controllers/user.js";
import requireAuth from "../../middleware/auth.js";

const userRouter = Router();


authRouter.post('/self', requireAuth, UserController.self);

export default userRouter;