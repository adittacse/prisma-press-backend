import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/me", userController.getMyProfile);
router.post("/register", userController.registerUser);

export const userRoutes = router;
