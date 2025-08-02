import { Router } from "express";
import userRouter from "../../user/routes/index.js";
import authRouter from "./auth.js";
import resourceRouter from "./resource.js";

const routerV1 = Router();

routerV1.use('/auth', authRouter);
routerV1.use('/users', userRouter);
routerV1.use('/resources', resourceRouter);


export default routerV1;