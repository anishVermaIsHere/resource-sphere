import { Router } from "express";
import { AuthController } from "../controllers/index.js";

const authRouter = Router();

authRouter.post('/login', AuthController.find);
authRouter.post('/logout', AuthController.logout);

export default authRouter;