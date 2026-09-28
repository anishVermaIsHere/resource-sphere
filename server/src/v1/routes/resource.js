import { Router } from "express";
import { ResourceController } from "../controllers/index.js";
import requireAuth from "../../middleware/auth.js";


const resourceRouter = Router();

resourceRouter.post('/', requireAuth, ResourceController.create);
resourceRouter.get('/', requireAuth, ResourceController.get);

export default resourceRouter;