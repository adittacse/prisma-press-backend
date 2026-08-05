import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";

const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: config.APP_URL,
    credentials: true,
}));

app.get("/", (req: Request, res: Response) => {
    res.send("Prisma Press backend is running!");
});

export default app;
