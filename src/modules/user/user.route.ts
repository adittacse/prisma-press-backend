import httpStatus from 'http-status';
import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: Role;
            }
        }
    }
}

router.get("/me", (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    
    const verifiedToken = jwtUtils.verifyToken(accessToken, config.JWT_ACCESS_SECRET);

    if (typeof verifiedToken === "string") {
        throw new Error(verifiedToken);
    }

    const { id, name, email, role } = verifiedToken;

    // const requiredRoles = ["ADMIN", "AUTHOR", "USER"];
    const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER];

    if (!requiredRoles.includes(role)) {
        return res.status(httpStatus.FORBIDDEN).json({
            success: false,
            statusCode: httpStatus.FORBIDDEN,
            message: "Forbidden! You do not have permission to access this resource."
        });
    }

    req.user = {
        id,
        name,
        email,
        role
    }

    next();
}, userController.getMyProfile);
router.post("/register", userController.registerUser);

export const userRoutes = router;
