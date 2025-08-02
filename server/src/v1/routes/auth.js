import { Router } from "express";
import { AuthController } from "../controllers/index.js";

const authRouter = Router();

authRouter.post('/', AuthController.find);

export default authRouter;