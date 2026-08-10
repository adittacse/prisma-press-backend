import { auth } from "../../middlewares/auth";
import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { userController } from "./user.controller";

const router = Router();

router.get("/me", auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.getMyProfile);
router.post("/register", userController.registerUser);
router.put("/my-profile", auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.updateMyProfile);

export const userRoutes = router;
