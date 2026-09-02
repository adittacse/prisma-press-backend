import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";

const getCommentsByAuthorId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    const result = await commentService.getCommentsByAuthorIdFromDB(authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comments retrieved successfully",
        data: {
            result
        }
    });
});

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id as string;
    const result = await commentService.createCommentIntoDB(authorId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Comment created successfully",
        data: {
            result
        }
    });
});

const getCommentByPostId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const result = await commentService.getCommentByPostIdFromDB(postId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment retrieved successfully",
        data: {
            result
        }
    });
});

export const commentController = {
    getCommentsByAuthorId,
    createComment,
    getCommentByPostId
}
