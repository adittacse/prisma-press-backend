import { prisma } from "../../lib/prisma"
import { ICreateCommentPayload } from "./comment.interface";

const getCommentsByAuthorIdFromDB = async (authorId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    });

    return comments;
}

const createCommentIntoDB = async (authorId: string, payload: ICreateCommentPayload) => {
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    });

    const comment = await prisma.comment.create({
        data: {
            ...payload,
            authorId
        }
    });

    return comment;
}

const getCommentByPostIdFromDB = async (postId: string) => {
    const comment = await prisma.comment.findMany({
        where: {
            postId
        }
    });

    return comment;
}

const updateCommentInDB = async (commentId: string, authorId: string, payload: any) => {
    await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    });

    const comment = await prisma.comment.update({
        where: {
            id: commentId,
            authorId
        },
        data: payload
    });

    return comment;
};

export const commentService = {
    getCommentsByAuthorIdFromDB,
    createCommentIntoDB,
    getCommentByPostIdFromDB,
    updateCommentInDB,
}
