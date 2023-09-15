import express from "express";
import { authMiddleware } from "./Auth";

const app = express();

app.use(express.json(), authMiddleware);

export default app;
