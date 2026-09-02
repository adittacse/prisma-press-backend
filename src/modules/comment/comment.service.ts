import { prisma } from "../../lib/prisma"
import { ICreateCommentPayload, IModerateCommentPayload, IUpdateCommentPayload } from "./comment.interface";

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
        },
        // include: {
        //     post: true
        // }
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

const updateCommentInDB = async (commentId: string, authorId: string, payload: IUpdateCommentPayload) => {
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

const moderateCommentInDB = async (commentId: string, payload: IModerateCommentPayload) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId
        },
        select: {
            id: true,
            status: true
        }
    });

    if (commentData.status === payload.status) {
        throw new Error(`Your provided status ${payload.status} is already up to date.`);
    }

    const comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: payload
    });

    return comment;
};

const deleteCommentFromDB = async (commentId: string, authorId: string) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    });

    await prisma.comment.delete({
        where: {
            id: commentData.id
        }
    });
}

export const commentService = {
    getCommentsByAuthorIdFromDB,
    createCommentIntoDB,
    getCommentByPostIdFromDB,
    updateCommentInDB,
    moderateCommentInDB,
    deleteCommentFromDB
}
