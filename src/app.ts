import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { userRoutes } from "./modules/user/user.route";
import { loginRoutes } from "./modules/auth/auth.routes";
import { postRoutes } from "./modules/post/post.route";

const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: config.APP_URL,
    credentials: true,
}));

app.get("/", async (req: Request, res: Response) => {
    res.send("Prisma Press backend is running!");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/posts", postRoutes);

export default app;
