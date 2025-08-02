import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import AppConfig from "./config/app.config.js";
import bodyParser from "body-parser";
import { dbConnection } from "./config/db.js";
import routerV1 from "./v1/routes/index.js";
import createFakeUser from "./utils/fake-user.js";


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));
app.use(
  cors({
    origin: AppConfig.corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true, // access-control-allow-credentials:true
  })
);

app.use('/api/v1', routerV1);


// createFakeUser();


app.get('/',(_, res)=>res.json({ message: "AI Resource Sphere: Server started" }));

dbConnection();

export default app;
