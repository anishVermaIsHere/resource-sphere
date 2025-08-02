import { Router } from "express";
import { ResourceController } from "../controllers/index.js";

const resourceRouter = Router();

resourceRouter.post('/', ResourceController.create);

export default resourceRouter;