import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from "../../utils/catchAsync";
import { postService } from './post.service';
import { sendResponse } from '../../utils/sendResponse';
import { Role } from '../../../generated/prisma/enums';

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPostsFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Posts received successfully",
        data: result
    });
});

const getPostsStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostsStatsFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post stats retrieved successfully",
        data: {
            result
        }
    });
});

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const result = await postService.getMyPostsFromDB(authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My posts retrieved successfully",
        data: {
            result
        }
    });
});

const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    if (!postId) {
        throw new Error("Post id required in params.");
    }

    const result = await postService.getPostByIdFromDB(postId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post retrieved successfully.",
        data: {
            result
        }
    });
});

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await postService.createPostInDB(payload, id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Post created successfully",
        data: {
            result
        }
    });
});

const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === Role.ADMIN;
    const postId = req.params.postId;

    if (!postId) {
        throw new Error("Post id required in params.");
    }

    const payload = req.body;
    const result = await postService.updatePostInDB(postId as string, payload, authorId as string, isAdmin);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post updated successfully",
        data: {
            result
        }
    });
});

const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === Role.ADMIN;

    const postId = req.params.postId;

    if (!postId) {
        throw new Error("Post id required is params.");
    }

    await postService.deletePostFromDB(postId as string, authorId as string, isAdmin);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post deleted successfully",
        data: null
    });
});

export const postController = {
    getAllPosts,
    getPostsStats,
    getMyPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}