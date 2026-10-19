import { Router } from "express";
import { ResourceController } from "../controllers/index.js";
import requireAuth from "../../middleware/auth.js";
import { uploadFile } from "../../middleware/file-upload.js";



const resourceRouter = Router();

resourceRouter.post('/', requireAuth, ResourceController.create);
resourceRouter.get('/', requireAuth, ResourceController.get);
resourceRouter.post('/upload', requireAuth, uploadFile.single('file'), ResourceController.uploadFile)

export default resourceRouter;