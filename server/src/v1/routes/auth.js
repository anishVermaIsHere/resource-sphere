import { Router } from "express";
import { AuthController } from "../controllers/index.js";
import requireAuth from "../../middleware/auth.js";

const authRouter = Router();

authRouter.post('/login', AuthController.find);
authRouter.post('/logout', requireAuth, AuthController.logout);

export default authRouter;