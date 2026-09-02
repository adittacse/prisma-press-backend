import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { commentController } from "./comment.controller";

const router = Router();

router.get("/author/:authorId", commentController.getCommentsByAuthorId);
router.post("/", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.createComment);
router.get("/:postId", commentController.getCommentByPostId);
router.patch("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.updateComment);
router.patch("/:commentId/moderate", auth(Role.ADMIN), commentController.moderateComment);
router.delete("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.deleteComment);

export const commentRouter = router;
