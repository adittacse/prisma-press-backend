import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {
            user
        }
    });
});

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await userService.getMyProfileFromDB();
});

export const userController = {
    registerUser,
    getMyProfile
}
