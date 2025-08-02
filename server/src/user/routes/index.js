import { Router } from "express";
import UserController from "../controllers/index.js";

const userRouter = Router();

userRouter.post('/', UserController.create);
userRouter.get('/search', UserController.search);
userRouter.get('/:id', UserController.findDetails);


export default userRouter;